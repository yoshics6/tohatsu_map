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

interface envelopeData {
  enve_type?: string;
  enve_finished_size?: string;
  enve_page?: string;
  enve_paper?: string;
  enve_printing?: string;
  enve_coating?: string;
  enve_1000?: number;
  enve_2000?: number;
  enve_3000?: number;
  enve_4000?: number;
  enve_5000?: number;
}
interface Envelope extends Array<envelopeData> {}

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/envelope/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM envelope ORDER BY enve_id DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/envelope/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM envelope WHERE (enve_type LIKE ? OR enve_finished_size LIKE ? OR enve_page LIKE ? OR  
        enve_paper LIKE ? OR enve_printing LIKE ? OR enve_coating LIKE ? OR enve_1000 LIKE ? OR enve_2000 LIKE ? 
        OR enve_3000 LIKE ? OR enve_4000 LIKE ? OR enve_5000 LIKE ?) ORDER BY enve_id DESC`,
        [
          "%" + keyword + "%",
          "%" + keyword + "%",
          "%" + keyword + "%",
          "%" + keyword + "%",
          "%" + keyword + "%",
          "%" + keyword + "%",
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
  "/api/envelope/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM envelope WHERE enve_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/envelope/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        enve_type,
        enve_finished_size,
        enve_page,
        enve_paper,
        enve_printing,
        enve_coating,
        enve_1000,
        enve_2000,
        enve_3000,
        enve_4000,
        enve_5000,
      } = fields;
      await connection.query(
        "INSERT INTO envelope (enve_type,enve_finished_size,enve_page,enve_paper,enve_printing, " +
          " enve_coating,enve_1000,enve_2000,enve_3000,enve_4000,enve_5000) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          enve_type,
          enve_finished_size,
          enve_page,
          enve_paper,
          enve_printing,
          enve_coating,
          enve_1000,
          enve_2000,
          enve_3000,
          enve_4000,
          enve_5000,
        ]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/envelope/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        enve_type,
        enve_finished_size,
        enve_page,
        enve_paper,
        enve_printing,
        enve_coating,
        enve_1000,
        enve_2000,
        enve_3000,
        enve_4000,
        enve_5000,
        enve_id,
      } = fields;
      await connection.query(
        "UPDATE envelope SET enve_type = ? , enve_finished_size = ? , enve_page = ? , " +
          " enve_paper = ? , enve_printing = ? , enve_coating = ? , enve_1000 = ? , enve_2000 = ? ," +
          " enve_3000 = ? , enve_4000 = ? , enve_5000 = ? WHERE enve_id = ?",
        [
          enve_type,
          enve_finished_size,
          enve_page,
          enve_paper,
          enve_printing,
          enve_coating,
          enve_1000,
          enve_2000,
          enve_3000,
          enve_4000,
          enve_5000,
          enve_id,
        ]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/envelope/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { enve_id } = fields;
      await connection.query(
        `DELETE FROM envelope WHERE enve_id = ${enve_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/envelope/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { enve_id } = fields;
      let id = enve_id.toString();
      await connection.query(
        `DELETE FROM envelope WHERE enve_id IN (${id})`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/envelope/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/envelope/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/envelope/${files.file.originalFilename}`
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
      const enve_type = rows["Type"];
      const enve_finished_size = rows["Finished Size"];
      const enve_page = rows["Page"];
      const enve_paper = rows["Paper"];
      const enve_printing = rows["Printing color"];
      const enve_coating = rows["Coating"];
      const enve_1000 = `${rows["1,000"]}`;
      const enve_2000 = `${rows["2,000"]}`;
      const enve_3000 = `${rows["3,000"]}`;
      const enve_4000 = `${rows["4,000"]}`;
      const enve_5000 = `${rows["5,000"]}`;
      // const [check]: any = await connection.query(
      //   "SELECT user_id FROM users WHERE status = 'active' AND username = ? ",
      //   [username]
      // );
      // if (check.length == 0) {
      // var hashedPassword = await bcrypt.hashSync(String(pass), 12);
      // var password = hashedPassword;
      // plas_coating,
      const [add] = await connection.query(
        "INSERT INTO envelope (enve_type,enve_finished_size,enve_page,enve_paper,enve_printing, " +
          " enve_coating,enve_1000,enve_2000,enve_3000,enve_4000,enve_5000) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          enve_type,
          enve_finished_size,
          enve_page,
          enve_paper,
          enve_printing,
          enve_coating,
          enve_1000,
          enve_2000,
          enve_3000,
          enve_4000,
          enve_5000,
        ]
      );
      // } else {
      //   status = "duplicate";
      // }
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
