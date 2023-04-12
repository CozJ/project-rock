import { api } from "@/utils/api";
import { PresignedPost } from "aws-sdk/clients/s3";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FileUploadModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  routeId: string;
  refetch: () => void;
};

type FormValues = {
  file: FileList;
}

export const FileUploadModal = (props: FileUploadModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const signedURL = api.fileManager.getSignedUrl.useMutation();

  const onFormSubmit = async (data: FormValues) => {

    const image: File = data.file[0];

    if (image.type !== "image/jpeg" && image.type !== "image/png") {
      props.setShowModal(false);
      reset();
      return alert("Only .jpg and .png files are allowed.");
    }

    if (image.size > 8000000) {
      props.setShowModal(false);
      reset();
      return alert("File size is too large. Max size is 8MB.");
    }

    const signed: PresignedPost = await signedURL.mutateAsync({
      routeId: props.routeId,
    });

    const formData = new FormData();
    Object.entries(signed.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("Content-Type", image.type);
    formData.append("file", image);

    const response = await fetch(signed.url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully!");
      props.refetch();
      props.setShowModal(false);
      reset();
    } else {
      console.log(response);
      props.setShowModal(false);
      reset();
    }
  };

  const onErrors = (errors: any) => console.error(errors);

  return (
    <Modal
      title="Upload File"
      show={props.showModal}
      dismissible={true}
      onClose={() => {
        props.setShowModal(false);
      }}
    >
      <Modal.Header>Upload File</Modal.Header>
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <Modal.Body>
          <input
            className="rounded-lg bg-slate-200"
            type="file"
            {...register("file", { required: true })}
          />
          {errors.file && <span>This field is required</span>}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full justify-between">
            <button
              type="button"
              onClick={() => {
                props.setShowModal(false);
              }}
            >
              Close
            </button>
            <button type="submit">Upload</button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
