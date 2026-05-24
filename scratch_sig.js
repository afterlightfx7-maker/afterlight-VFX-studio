import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "test",
  api_key: "test",
  api_secret: "test",
});

const timestamp = Math.round((new Date).getTime()/1000);
const signature = cloudinary.utils.api_sign_request({
  timestamp: timestamp,
  folder: 'afterlight_studio'
}, "test_secret");

console.log({ timestamp, signature });
