import { S3 } from "aws-sdk";

//S3 presigned url funcitons for uploading and downloading files

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export const getSignedUrl = async (key: string) => {

    const url = await s3.createPresignedPost({
        Fields: {
            key: key,
        },
        Conditions: [
            ["starts-with", "$Content-Type", "image/"],
            ["content-length-range", 0, 5000000],
        ],
        Expires: 60,
        Bucket: "project-rock",
    });
    return url;
}

export const getDownloadUrl = async (key: string) => {

    const params = {
        Bucket: "project-rock",
        Key: key,
        Expires: 30,
    };

    const url = await s3.getSignedUrlPromise("getObject", params);

    return url;
}