// import {NextApiRequest, NextApiResponse} from "next";
// import fs from "fs/promises";
// import path from "path";
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log(req.query)
//     let {file} = req.query;
//     if (!Array.isArray(file)) {
//         file = [file]
//     }
//     console.log(path.join('/uploads', ...file))
//     const data = await fs.readFile(path.join('/uploads', ...file), 'binary')
//     res.status(200).send(data)
// }
import { upload_dir } from "@/pages/api/upload";
import express from "express";

export const config = {
  api: { externalResolver: true },
};

const handler = express();

const serveFiles = express.static(upload_dir);
handler.use(["/api/uploads", "/uploads"], serveFiles);
// Multiple endpoints are passed. The first one is used when visiting /api/images.
// The second one is used when visiting /images using the middleware rewrite I mention below.

// express is just a function that takes (http.IncomingMessage, http.ServerResponse),
// which Next.js supports when externalResolver is enabled.
export default handler;
