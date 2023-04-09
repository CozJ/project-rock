import { S3 } from "aws-sdk";

import { env } from "@/env.mjs";

const s3 = new S3({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
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
        Bucket: env.AWS_BUCKET,
    });
    return url;
}

export const getDownloadUrl = async (key: string) => {

    const params = {
        Bucket: env.AWS_BUCKET,
        Key: key,
        Expires: 30,
    };

    const url = await s3.getSignedUrlPromise("getObject", params);

    return url;
}