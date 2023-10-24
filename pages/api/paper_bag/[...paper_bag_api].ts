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

interface paperBagData {
  papb_type?: string;
  papb_finished_size?: string;
  papb_page?: string;
  papb_paper?: string;
  papb_printing?: string;
  papb_coating?: string;
  papb_binding?: string;
  papb_100?: number;
  papb_200?: number;
  papb_300?: number;
  papb_400?: number;
  papb_500?: number;
}
interface PaperBag extends Array<paperBagData> {}

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/paper_bag/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM paper_bag ORDER BY papb_id DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/paper_bag/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM paper_bag WHERE (papb_type LIKE ? OR papb_finished_size LIKE ? OR papb_page LIKE ? OR  
        papb_paper LIKE ? OR papb_printing LIKE ? OR papb_coating LIKE ? OR papb_binding LIKE ? OR papb_100 LIKE ? OR papb_200 LIKE ? 
        OR papb_300 LIKE ? OR papb_400 LIKE ? OR papb_500 LIKE ?) ORDER BY papb_id DESC`,
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
  "/api/paper_bag/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM paper_bag WHERE papb_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/paper_bag/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        papb_type,
        papb_finished_size,
        // papb_page,
        papb_paper,
        papb_printing,
        papb_coating,
        papb_binding,
        papb_100,
        papb_200,
        papb_300,
        papb_400,
        papb_500,
      } = fields;

      await connection.query(
        "INSERT INTO paper_bag (papb_type,papb_finished_size,papb_page,papb_paper,papb_printing, " +
          " papb_coating,papb_binding,papb_100,papb_200,papb_300,papb_400,papb_500) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          papb_type,
          papb_finished_size,
          1, // papb_page,
          papb_paper,
          papb_printing,
          papb_coating,
          papb_binding,
          papb_100,
          papb_200,
          papb_300,
          papb_400,
          papb_500,
        ]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/paper_bag/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        papb_type,
        papb_finished_size,
        // papb_page,
        papb_paper,
        papb_printing,
        papb_coating,
        papb_binding,
        papb_100,
        papb_200,
        papb_300,
        papb_400,
        papb_500,
        papb_id,
      } = fields;
      await connection.query(
        "UPDATE paper_bag SET papb_type = ? , papb_finished_size = ? , papb_page = ? , " +
          " papb_paper = ? , papb_printing = ? , papb_coating = ? , papb_binding = ? , papb_100 = ? , papb_200 = ? ," +
          " papb_300 = ? , papb_400 = ? , papb_500 = ? WHERE papb_id = ?",
        [
          papb_type,
          papb_finished_size,
          1, // papb_page,
          papb_paper,
          papb_printing,
          papb_coating,
          papb_binding,
          papb_100,
          papb_200,
          papb_300,
          papb_400,
          papb_500,
          papb_id,
        ]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/paper_bag/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { papb_id } = fields;
      await connection.query(
        `DELETE FROM paper_bag WHERE papb_id = ${papb_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/paper_bag/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { papb_id } = fields;
      let id = papb_id.toString();
      await connection.query(`DELETE FROM paper_bag WHERE papb_id IN (${id})`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/paper_bag/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/paper_bag/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/paper_bag/${files.file.originalFilename}`
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
      const papb_type = rows["Type"];
      const papb_finished_size = rows["Finished Size"];
      // const papb_page = rows["Page"];
      const papb_paper = rows["Paper"];
      const papb_printing = rows["Printing color"];
      const papb_coating = rows["Coating"];
      const papb_binding = rows["Binding"];
      const papb_100 = `${rows["100"]}`;
      const papb_200 = `${rows["200"]}`;
      const papb_300 = `${rows["300"]}`;
      const papb_400 = `${rows["400"]}`;
      const papb_500 = `${rows["500"]}`;
      // const [check]: any = await connection.query(
      //   "SELECT user_id FROM users WHERE status = 'active' AND username = ? ",
      //   [username]
      // );
      // if (check.length == 0) {
      // var hashedPassword = await bcrypt.hashSync(String(pass), 12);
      // var password = hashedPassword;
      const [add] = await connection.query(
        "INSERT INTO paper_bag (papb_type,papb_finished_size,papb_page,papb_paper,papb_printing, " +
          " papb_coating,papb_binding,papb_100,papb_200,papb_300,papb_400,papb_500) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          papb_type,
          papb_finished_size,
          1, // papb_page,
          papb_paper,
          papb_printing,
          papb_coating,
          papb_binding,
          papb_100,
          papb_200,
          papb_300,
          papb_400,
          papb_500,
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
