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
  db_id: string;
  db_subject: string;
  db_date: string;
  db_category: string;
  db_file: string;
  db_status: string;
  db_create_at: string;
}
interface News extends Array<Data> {}

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/downloads_brochure/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM downloads_brochure ORDER BY db_date DESC, db_created_at DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/downloads_brochure/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM downloads_brochure 
         WHERE db_date LIKE ? OR db_subject LIKE ? OR db_category LIKE ? OR db_file LIKE ? OR db_status LIKE ? ORDER BY db_date DESC, db_created_at DESC`,
        [
          "%" + keyword + "%",
          "%" + keyword + "%",
          "%" + keyword + "%",
          "%" + keyword + "%",
          "%" + keyword + "%",
        ]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/downloads_brochure/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM downloads_brochure WHERE db_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/downloads_brochure/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      const { db_date, db_subject, db_category, db_file, db_status } = fields;
      const name =
        Math.random().toString(16).slice(2) + "_" + files.file.originalFilename;
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/downloads_brochure/${name}`
      );
      // let arr = 0;
      // const [check]: any = await connection.query(
      //   "SELECT MAX(arr) as arr FROM news"
      // );
      // if (check[0].arr != null) {
      //   arr = check[0].arr + 1;
      // }
      await connection.query(
        "INSERT INTO downloads_brochure (db_date , db_subject , db_category , db_file, db_status) VALUES (? , ? , ? , ?, ?)",
        [db_date, db_subject, db_category, name, db_status]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/downloads_brochure/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { db_id, db_date, db_subject, db_category, db_file, db_status } =
        fields;
      await connection.query(
        "UPDATE downloads_brochure SET db_date = ?, db_subject = ?, db_category = ? , db_status = ? WHERE db_id = ?",
        [db_date, db_subject, db_category, db_status, db_id]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/downloads_brochure/edit/withimage",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      const { db_id, db_date, db_subject, db_category, db_file, db_status } =
        fields;
      const name =
        Math.random().toString(16).slice(2) + "_" + files.file.originalFilename;
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/downloads_brochure/${name}`
      );
      await connection.query(
        "UPDATE downloads_brochure SET db_file = ? WHERE db_id = ?",
        [name, db_id]
      );
      await connection.query(
        "UPDATE downloads_brochure SET db_date = ?, db_subject = ?, db_category = ? , db_status = ? WHERE db_id = ?",
        [db_date, db_subject, db_category, db_status, db_id]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/downloads_brochure/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { db_id } = fields;
      await connection.query(
        `DELETE FROM downloads_brochure WHERE db_id = ${db_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/downloads_brochure/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { db_id } = fields;
      let id = db_id.toString();
      await connection.query(
        `DELETE FROM downloads_brochure WHERE db_id IN (${id})`
      );
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
