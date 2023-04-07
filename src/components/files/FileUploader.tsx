import { api } from "@/utils/api";
import { PresignedPost } from "aws-sdk/clients/s3";
import React from "react";

type FileUploaderProps = {
    routeId: string;
}

export const FileUploader = (props: FileUploaderProps) => {
  const [image, setImage] = React.useState<File | null>(null);

  const signedURL = api.fileManager.getSignedUrl.useMutation();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const signed: PresignedPost = await signedURL.mutateAsync({ routeId: props.routeId });

    const formData = new FormData();
    for (const key in signed.fields) {
      formData.append(key, signed.fields[key]);
    }
    formData.append("Content-Type", image.type);
    formData.append("file", image);

    const response = await fetch(signed.url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully!");
      setImage(null);
    } else {
      console.error("Error uploading file:", response.statusText);
    }
  };

  return (
    <form onSubmit={uploadImage}>
      <input type="file" onChange={onFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};
