import AWS from 'aws-sdk';
import dotenv from "dotenv";

dotenv.config();
// * AWS S3 connect *
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESSID,
    secretAccessKey: process.env.AWS_SECRETID,
    region: process.env.AWS_REGION
})

export default s3;
