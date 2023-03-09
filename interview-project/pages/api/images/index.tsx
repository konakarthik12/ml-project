import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prismadb";
import path from "path";

function decodePoints(points) {
  const xList = [];
  const yList = [];
  if (points && points.length > 0) {
    for (const [x, y] of points) {
      xList.push(x);
      yList.push(y);
    }
  }
  return {xList, yList};
}

function encodePoints(xList, yList) {
  const points = [];
  if (!xList || !yList) return points;
  if (xList.length != yList.length) return points;
  for (let i = 0; i < xList.length; i++) {
    points.push([xList[i], yList[i]]);
  }
  return points;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "POST") {
    for (const image of req.body) {
      const polygons = image?.regions
        ?.filter((r) => r.type === "polygon")
        .map((r) => {
          const {xList, yList} = decodePoints(r.points);
          return {id: r.id, color: r.color, xList, yList, imageId: image.id};
        });
      await prisma.polygon.deleteMany({
        where: {
          imageId: image.id,
        }
      });
      await prisma.polygon.createMany({
        data: polygons,
      });
    }
    res.json({ok: true});
  } else if (req.method === "GET") {
    const images = await prisma.image.findMany({
      where: {
        userId: 1,
      },
      include: {
        polygons: true,
      },
    });

    const data = images.map((img) => ({
      id: img.id,
      src: new URL(path.basename(img.filepath), 'https://ml-project.imgix.net/').href,
      name: img.label,
      regions: img.polygons.map((p) => ({
        id: p.id,
        type: "polygon",
        color: p.color,
        points: encodePoints(p.xList, p.yList),
      })),
    }));
    res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const imageId = req.query.id;
    if (imageId) {

      await prisma.image.delete({
        where: {
          id: Number(imageId),
        }
      });
      res.status(200).end();
    }
    res.status(405).end();
  }
}
