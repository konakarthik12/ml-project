import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import prisma from "@/lib/prismadb";
import { join } from "path";
export const upload_dir = "/uploads/";
export const image_dir = join(upload_dir, "images");

if (!fs.existsSync(image_dir)) {
  fs.mkdirSync(image_dir, { recursive: true });
}
const form = formidable({
  keepExtensions: true,
  uploadDir: image_dir,
});

function parseForm(
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({ fields, files });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { fields, files } = await parseForm(req);
  const label = fields["label"] as string;
  const filepath = files["image"].filepath;

  await prisma.image.create({
    data: {
      label,
      filepath,
      User: {
        connect: {
          id: 1,
        },
      },
    },
  });
  res.status(200).end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
