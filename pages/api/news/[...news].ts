import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "@/pages/api/middleware";
import connection from "@/mysql";
import formidable from "formidable";
const bcrypt = require("bcrypt");
const fs = require("fs");
const XLSX = require("xlsx");
export const config = {
  api: {
    bodyParser: false,
  },
};

import { createRouter } from "next-connect";
const router = createRouter<NextApiRequest, NextApiResponse>();

declare module "next" {
  interface NextApiRequest {
    decoded: any;
  }
}

interface Data {
  news_id?: string;
  news_date?: string;
  news_title?: string;
  status?: string;
}
interface News extends Array<Data> { }

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/news/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM news ORDER BY news_date DESC, news_created_at DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/news/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM news 
         WHERE news_date LIKE ? OR news_title LIKE ? OR news_status LIKE ? ORDER BY news_date DESC, news_created_at DESC`,
        ["%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%"]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/news/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM news WHERE news_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/news/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      const { news_date, news_title, news_image, news_detail, news_status } = fields;
      const name =
        Math.random().toString(16).slice(2) + "_" + files.file.originalFilename;
      fs.copyFileSync(files.file.filepath, `public/upload/news/${name}`);
      // let arr = 0;
      // const [check]: any = await connection.query(
      //   "SELECT MAX(arr) as arr FROM news"
      // );
      // if (check[0].arr != null) {
      //   arr = check[0].arr + 1;
      // }
      await connection.query(
        "INSERT INTO news (news_date , news_title , news_image , news_detail, news_status) VALUES (? , ? , ? , ?, ?)",
        [news_date, news_title, name, news_detail, news_status]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/news/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { news_id, news_date, news_title, news_detail, news_status } = fields;
      await connection.query(
        "UPDATE news SET news_date = ?, news_title = ?, news_detail = ? , news_status = ? WHERE news_id = ?",
        [news_date, news_title, news_detail, news_status, news_id]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/news/edit/withimage",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      const { news_id, news_date, news_title, news_detail, news_status } = fields;
      const name =
        Math.random().toString(16).slice(2) + "_" + files.file.originalFilename;
      fs.copyFileSync(files.file.filepath, `public/upload/news/${name}`);
      await connection.query(
        "UPDATE news SET news_image = ? WHERE news_id = ?",
        [name, news_id]
      );
      await connection.query(
        "UPDATE news SET news_date = ?, news_title = ?, news_detail = ? , news_status = ? WHERE news_id = ?",
        [news_date, news_title, news_detail, news_status, news_id]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/news/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { news_id } = fields;
      await connection.query(`DELETE FROM news WHERE news_id = ${news_id}`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/news/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { news_id } = fields;
      let id = news_id.toString();
      await connection.query(`DELETE FROM news WHERE news_id IN (${id})`);
      res.status(200).json({ status: "success" });
    });
  }
);

export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
});
