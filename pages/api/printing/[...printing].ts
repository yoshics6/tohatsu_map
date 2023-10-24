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
  printing_id?: number;
  printing_name?: string;
}
interface CoverPaper extends Array<CoverPaperData> {}

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/printing/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM printing ORDER BY printing_name ASC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/printing/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM printing WHERE printing_name LIKE ? ORDER BY printing_name ASC`,
        ["%" + keyword + "%"]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/printing/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM printing WHERE printing_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/printing/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { printing_name } = fields;
      const [check]: any = await connection.query(
        "SELECT * FROM printing WHERE printing_name = ?",
        [printing_name]
      );
      if (check.length === 0) {
        await connection.query(
          "INSERT INTO printing (printing_name) " + " VALUES (?)",
          [printing_name]
        );
        res.status(200).json({ status: "success" });
      } else {
        res.status(200).json({ status: "error", message: "Duplicate Name" });
      }
    });
  }
);

router.post(
  "/api/printing/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { printing_id, printing_name } = fields;
      const [check]: any = await connection.query(
        "SELECT printing_id FROM printing WHERE printing_id != ? AND printing_name = ?",
        [printing_id, printing_name]
      );

      if (check.length === 0) {
        await connection.query(
          "UPDATE printing SET printing_name = ? WHERE printing_id = ?",
          [printing_name, printing_id]
        );
        res.status(200).json({ status: "success" });
      } else {
        res.status(200).json({ status: "error", message: "Duplicate Name" });
      }
    });
  }
);

router.post(
  "/api/printing/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { printing_id } = fields;
      await connection.query(
        `DELETE FROM printing WHERE printing_id = ${printing_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/printing/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { printing_id } = fields;
      let id = printing_id.toString();
      await connection.query(
        `DELETE FROM printing WHERE printing_id IN (${id})`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/printing/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/printing/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/printing/${files.file.originalFilename}`
      ).then((result) => {
        return result;
      });
      res.status(200).json({ status: "success" });
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
      const printing_name = rows["Name"];
      const [check]: any = await connection.query(
        "SELECT printing_id FROM printing WHERE printing_name = ? ",
        [printing_name]
      );
      if (check.length == 0) {
        const [add] = await connection.query(
          "INSERT INTO printing (printing_name) VALUES (?)",
          [printing_name]
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
