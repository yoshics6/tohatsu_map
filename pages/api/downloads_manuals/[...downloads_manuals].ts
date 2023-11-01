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
  dm_id: String,
  dm_subject: String,
  dm_date: String,
  dm_category: String,
  dm_horse_power: String,
  dm_stroke_models: String,
  dm_additional_file: String,
  dm_file: String,
  dm_status: String,
  dm_create_at: String,
}
interface News extends Array<Data> { }

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/downloads_manuals/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM downloads_manuals ORDER BY dm_date DESC, dm_created_at DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/downloads_manuals/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM downloads_manuals 
        WHERE dm_date LIKE ? OR dm_subject LIKE ? OR dm_category LIKE ? OR dm_horse_power LIKE ? OR dm_stroke_models LIKE ? OR dm_additional_file_en LIKE ? OR
         dm_additional_file_fr LIKE ? OR dm_additional_file_es LIKE ? OR dm_additional_file_de LIKE ? OR dm_file_en LIKE ? OR dm_file_fr LIKE ? OR dm_file_es LIKE ? 
         OR dm_file_de LIKE ? OR dm_status LIKE ? ORDER BY dm_date DESC, dm_created_at DESC`,
        ["%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%"
          , "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%"]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/downloads_manuals/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM downloads_manuals WHERE dm_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/downloads_manuals/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      const { dm_date, dm_subject, dm_category, dm_horse_power, dm_stroke_models, English, Francais, Espanol, Deutsch, dm_status } = fields;
      if (English != '' || Francais != '' || Espanol != '' || Deutsch != '') {
        var name_en = Math.random().toString(16).slice(2) + "_" + files.file_en.originalFilename;
        fs.copyFileSync(files.file_en.filepath, `public/upload/downloads_manuals/${name_en}`);
        var name_fr = Math.random().toString(16).slice(2) + "_" + files.file_fr.originalFilename;
        fs.copyFileSync(files.file_fr.filepath, `public/upload/downloads_manuals/${name_fr}`);
        var name_es = Math.random().toString(16).slice(2) + "_" + files.file_es.originalFilename;
        fs.copyFileSync(files.file_es.filepath, `public/upload/downloads_manuals/${name_es}`);
        var name_de = Math.random().toString(16).slice(2) + "_" + files.file_de.originalFilename;
        fs.copyFileSync(files.file_de.filepath, `public/upload/downloads_manuals/${name_de}`);
      }
      else {
        var name_en = '';
        var name_fr = '';
        var name_es = '';
        var name_de = '';
      }
      // let arr = 0;
      // const [check]: any = await connection.query(
      //   "SELECT MAX(arr) as arr FROM news"
      // );
      // if (check[0].arr != null) {
      //   arr = check[0].arr + 1;
      // }
      await connection.query(
        `INSERT INTO downloads_manuals (dm_date , dm_subject , dm_category , dm_horse_power, dm_stroke_models , 
        dm_additional_file_en , dm_additional_file_fr , dm_additional_file_es , dm_additional_file_de , dm_file_en , dm_file_fr , 
        dm_file_es , dm_file_de , dm_status) VALUES (? , ? , ? , ?, ?, ? , ? , ? , ? , ? , ? , ? , ? , ?)`,
        [dm_date, dm_subject, dm_category, dm_horse_power, dm_stroke_models, name_en, name_fr, name_es, name_de, English, Francais, Espanol, Deutsch, dm_status]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/downloads_manuals/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { dm_id, dm_date, dm_subject, dm_category, dm_horse_power, dm_stroke_models, dm_status } = fields;
      await connection.query(
        "UPDATE downloads_manuals SET dm_date = ?, dm_subject = ?, dm_category = ? , dm_horse_power = ? , dm_stroke_models = ? , dm_status = ? WHERE dm_id = ?",
        [dm_date, dm_subject, dm_category, dm_horse_power, dm_stroke_models, dm_status, dm_id]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/downloads_manuals/edit/withimage",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      const { dm_id, dm_date, dm_subject, dm_category, dm_horse_power, dm_stroke_models, English, Francais, Espanol, Deutsch, dm_status } = fields;
      const name_en = Math.random().toString(16).slice(2) + "_" + files.file_en.originalFilename;
      fs.copyFileSync(files.file_en.filepath, `public/upload/downloads_manuals/${name_en}`);
      const name_fr = Math.random().toString(16).slice(2) + "_" + files.file_fr.originalFilename;
      fs.copyFileSync(files.file_fr.filepath, `public/upload/downloads_manuals/${name_fr}`);
      const name_es = Math.random().toString(16).slice(2) + "_" + files.file_es.originalFilename;
      fs.copyFileSync(files.file_es.filepath, `public/upload/downloads_manuals/${name_es}`);
      const name_de = Math.random().toString(16).slice(2) + "_" + files.file_de.originalFilename;
      fs.copyFileSync(files.file_de.filepath, `public/upload/downloads_manuals/${name_de}`);

      await connection.query(
        "UPDATE downloads_manuals SET dm_additional_file_en = ? , dm_additional_file_fr = ? , dm_additional_file_es = ? , dm_additional_file_de = ? , dm_file_en = ? , dm_file_fr = ? , dm_file_es = ? , dm_file_de = ? WHERE dm_id = ?",
        [name_en, name_fr, name_es, name_de, English, Francais, Espanol, Deutsch, dm_id]
      );

      await connection.query(
        "UPDATE downloads_manuals SET dm_date = ?, dm_subject = ?, dm_category = ? , dm_horse_power = ? , dm_stroke_models = ? , dm_status = ? WHERE dm_id = ?",
        [dm_date, dm_subject, dm_category, dm_horse_power, dm_stroke_models, dm_status, dm_id]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/downloads_manuals/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { dm_id } = fields;
      await connection.query(`DELETE FROM downloads_manuals WHERE dm_id = ${dm_id}`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/downloads_manuals/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { dm_id } = fields;
      let id = dm_id.toString();
      await connection.query(`DELETE FROM downloads_manuals WHERE dm_id IN (${id})`);
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
