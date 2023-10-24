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

interface plasticFileData {
  plas_type?: string;
  plas_finished_size?: string;
  plas_page?: string;
  plas_paper?: string;
  plas_printing?: string;
  // plas_coating?: string;
  plas_binding?: string;
  plas_1000?: number;
  plas_2000?: number;
  plas_3000?: number;
  plas_4000?: number;
  plas_5000?: number;
}
interface PlasticFile extends Array<plasticFileData> {}

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/plastic_file/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM plastic_file ORDER BY plas_id DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/plastic_file/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      // OR plas_coating LIKE ?
      const [response]: any = await connection.query(
        `SELECT * FROM plastic_file WHERE (plas_type LIKE ? OR plas_finished_size LIKE ? OR plas_page LIKE ? OR  
        plas_paper LIKE ? OR plas_printing LIKE ? OR plas_binding LIKE ? OR plas_1000 LIKE ? OR plas_2000 LIKE ? 
        OR plas_3000 LIKE ? OR plas_4000 LIKE ? OR plas_5000 LIKE ?) ORDER BY plas_id DESC`,
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
          // "%" + keyword + "%",
        ]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/plastic_file/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM plastic_file WHERE plas_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/plastic_file/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        plas_type,
        plas_finished_size,
        plas_page,
        plas_paper,
        plas_printing,
        // plas_coating,
        plas_binding,
        plas_1000,
        plas_2000,
        plas_3000,
        plas_4000,
        plas_5000,
      } = fields;
      // plas_coating,
      await connection.query(
        "INSERT INTO plastic_file (plas_type,plas_finished_size,plas_page,plas_paper,plas_printing, " +
          " plas_binding,plas_1000,plas_2000,plas_3000,plas_4000,plas_5000) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?)", // ,?
        [
          plas_type,
          plas_finished_size,
          plas_page,
          plas_paper,
          plas_printing,
          // plas_coating,
          plas_binding,
          plas_1000,
          plas_2000,
          plas_3000,
          plas_4000,
          plas_5000,
        ]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/plastic_file/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        plas_type,
        plas_finished_size,
        plas_page,
        plas_paper,
        plas_printing,
        // plas_coating,
        plas_binding,
        plas_1000,
        plas_2000,
        plas_3000,
        plas_4000,
        plas_5000,
        plas_id,
      } = fields;
      // , plas_coating = ?
      await connection.query(
        "UPDATE plastic_file SET plas_type = ? , plas_finished_size = ? , plas_page = ? , " +
          " plas_paper = ? , plas_printing = ? , plas_binding = ? , plas_1000 = ? , plas_2000 = ? ," +
          " plas_3000 = ? , plas_4000 = ? , plas_5000 = ? WHERE plas_id = ?",
        [
          plas_type,
          plas_finished_size,
          plas_page,
          plas_paper,
          plas_printing,
          // plas_coating,
          plas_binding,
          plas_1000,
          plas_2000,
          plas_3000,
          plas_4000,
          plas_5000,
          plas_id,
        ]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/plastic_file/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { plas_id } = fields;
      await connection.query(
        `DELETE FROM plastic_file WHERE plas_id = ${plas_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/plastic_file/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { plas_id } = fields;
      let id = plas_id.toString();
      await connection.query(
        `DELETE FROM plastic_file WHERE plas_id IN (${id})`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/plastic_file/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/plastic_file/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/plastic_file/${files.file.originalFilename}`
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
      const plas_type = rows["Type"];
      const plas_finished_size = rows["Finished Size"];
      // const plas_page = rows["Page"];
      const plas_paper = rows["Paper"];
      const plas_printing = rows["Printing color"];
      // const plas_coating = rows["Coating"];
      const plas_binding = rows["Binding"];
      const plas_1000 = `${rows["1,000"]}`;
      const plas_2000 = `${rows["2,000"]}`;
      const plas_3000 = `${rows["3,000"]}`;
      const plas_4000 = `${rows["4,000"]}`;
      const plas_5000 = `${rows["5,000"]}`;
      // const [check]: any = await connection.query(
      //   "SELECT user_id FROM users WHERE status = 'active' AND username = ? ",
      //   [username]
      // );
      // if (check.length == 0) {
      // var hashedPassword = await bcrypt.hashSync(String(pass), 12);
      // var password = hashedPassword;
      // plas_coating,
      const [add] = await connection.query(
        "INSERT INTO plastic_file (plas_type,plas_finished_size,plas_page,plas_paper,plas_printing, " +
          " plas_binding,plas_1000,plas_2000,plas_3000,plas_4000,plas_5000) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?)", // ,?
        [
          plas_type,
          plas_finished_size,
          1, // plas_page,
          plas_paper,
          plas_printing,
          // plas_coating,
          plas_binding,
          plas_1000,
          plas_2000,
          plas_3000,
          plas_4000,
          plas_5000,
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
