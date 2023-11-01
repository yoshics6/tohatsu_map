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

interface CoverPaperData {
  oc_id?: number;
  oc_date?: string;
  oc_category_name?: string;
  oc_created_at?: string;
}
interface CoverPaper extends Array<CoverPaperData> { }

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/outboards_category/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM outboards_category ORDER BY CAST(oc_category_name AS UNSIGNED)`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/outboards_category/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM outboards_category WHERE oc_date LIKE ? OR oc_category_name LIKE ? ORDER BY CAST(oc_category_name AS UNSIGNED)`,
        ["%" + keyword + "%", "%" + keyword + "%"]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/outboards_category/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM outboards_category WHERE oc_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/outboards_category/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { oc_date, oc_category_name } = fields;
      const [check]: any = await connection.query(
        "SELECT * FROM outboards_category WHERE oc_category_name = ?",
        [oc_category_name]
      );
      if (check.length === 0) {
        await connection.query(
          "INSERT INTO outboards_category (oc_date , oc_category_name) " + " VALUES (?,?)",
          [oc_date, oc_category_name]
        );
        res.status(200).json({ status: "success" });
      } else {
        res.status(200).json({ status: "error", message: "Duplicate Name" });
      }
    });
  }
);

router.post(
  "/api/outboards_category/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { oc_id, oc_date, oc_category_name } = fields;
      const [check]: any = await connection.query(
        "SELECT oc_id FROM outboards_category WHERE oc_id != ? AND oc_category_name = ?",
        [oc_id, oc_category_name]
      );

      if (check.length === 0) {
        await connection.query(
          "UPDATE outboards_category SET oc_date = ? , oc_category_name = ? WHERE oc_id = ?",
          [oc_date, oc_category_name, oc_id]
        );
        res.status(200).json({ status: "success" });
      } else {
        res.status(200).json({ status: "error", message: "Duplicate Name" });
      }
    });
  }
);

router.post(
  "/api/outboards_category/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { oc_id } = fields;
      await connection.query(
        `DELETE FROM outboards_category WHERE oc_id = ${oc_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/outboards_category/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { oc_id } = fields;
      let id = oc_id.toString();
      await connection.query(`DELETE FROM outboards_category WHERE oc_id IN (${id})`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/outboards_category/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/outboards_category/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/outboards_category/${files.file.originalFilename}`
      ).then((result) => {
        return result;
      });
      res.status(200).json({ status: reponse });
    });
  }
);

async function importExcelUser(url: string) {
  const workbook = XLSX.readFile(url);
  let worksheets = workbook.SheetNames.map((sheetName: string) => {
    return {
      sheetName,
      data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]),
    };
  });
  const toJson = JSON.parse(JSON.stringify(worksheets));
  const data = toJson[0].data;
  let status = "success";
  await Promise.all(
    data.map(async (rows: any, index: any) => {
      const oc_date = rows["Post Date"];
      const oc_category_name = rows["Category Name"];
      const [check]: any = await connection.query(
        "SELECT oc_id FROM outboards_category WHERE oc_category_name = ? ",
        [oc_category_name]
      );
      if (check.length == 0) {
        const [add] = await connection.query(
          "INSERT INTO outboards_category (oc_date , oc_category_name) VALUES (?,?)",
          [oc_date, oc_category_name]
        );
      } else {
        status = "duplicate";
      }
    })
  );
  return status;
}

export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
});
