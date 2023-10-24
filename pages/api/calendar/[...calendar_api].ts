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

interface calendarData {
  cale_type?: string;
  cale_finished_size?: string;
  cale_page?: string;
  cale_paper?: string;
  cale_printing?: string;
  cale_stand?: string;
  cale_binding?: string;
  cale_o_ring_color?: string;
  cale_100?: number;
  cale_200?: number;
  cale_300?: number;
  cale_400?: number;
  cale_500?: number;
}
interface Calendar extends Array<calendarData> { }

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/calendar/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM calendar ORDER BY cale_id DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/calendar/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM calendar WHERE (cale_type LIKE ? OR cale_finished_size LIKE ? OR cale_page LIKE ? OR  
        cale_paper LIKE ? OR cale_printing LIKE ? OR cale_stand LIKE ? OR cale_binding LIKE ? OR cale_o_ring_color LIKE ? OR cale_100 LIKE ? OR cale_200 LIKE ? 
        OR cale_300 LIKE ? OR cale_400 LIKE ? OR cale_500 LIKE ?) ORDER BY cale_id DESC`,
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
  "/api/calendar/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM calendar WHERE cale_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/calendar/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        cale_type,
        cale_finished_size,
        cale_page,
        cale_paper,
        cale_printing,
        cale_stand,
        cale_binding,
        cale_o_ring_color,
        cale_100,
        cale_200,
        cale_300,
        cale_400,
        cale_500,
      } = fields;

      await connection.query(
        "INSERT INTO calendar (cale_type,cale_finished_size,cale_page,cale_paper,cale_printing, " +
        " cale_stand,cale_binding,cale_o_ring_color,cale_100,cale_200,cale_300,cale_400,cale_500) " +
        " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          cale_type,
          cale_finished_size,
          cale_page,
          cale_paper,
          cale_printing,
          cale_stand,
          cale_binding,
          cale_o_ring_color,
          cale_100,
          cale_200,
          cale_300,
          cale_400,
          cale_500,
        ]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/calendar/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        cale_type,
        cale_finished_size,
        cale_page,
        cale_paper,
        cale_printing,
        cale_stand,
        cale_binding,
        cale_o_ring_color,
        cale_100,
        cale_200,
        cale_300,
        cale_400,
        cale_500,
        cale_id,
      } = fields;
      await connection.query(
        "UPDATE calendar SET 	cale_type = ? , cale_finished_size = ? , cale_page = ? , " +
        " cale_paper = ? , cale_printing = ? , cale_stand = ? , cale_binding = ? , cale_o_ring_color = ? , cale_100 = ? , cale_200 = ? ," +
        " cale_300 = ? , cale_400 = ? , cale_500 = ? WHERE cale_id = ?",
        [
          cale_type,
          cale_finished_size,
          cale_page,
          cale_paper,
          cale_printing,
          cale_stand,
          cale_binding,
          cale_o_ring_color,
          cale_100,
          cale_200,
          cale_300,
          cale_400,
          cale_500,
          cale_id,
        ]
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/calendar/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { cale_id } = fields;
      await connection.query(`DELETE FROM calendar WHERE cale_id = ${cale_id}`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/calendar/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { cale_id } = fields;
      let id = cale_id.toString();
      await connection.query(`DELETE FROM calendar WHERE cale_id IN (${id})`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/calendar/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/calendar/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/calendar/${files.file.originalFilename}`
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
      const cale_type = rows["Type"];
      const cale_finished_size = rows["Finished Size"];
      const cale_page = rows["Page"];
      const cale_paper = rows["Paper"];
      const cale_printing = rows["Printing color"];
      const cale_stand = rows["Stand"];
      const cale_binding = rows["Binding"];
      const cale_o_ring_color = rows["O ring Color"];
      const cale_100 = `${rows["100"]}`;
      const cale_200 = `${rows["200"]}`;
      const cale_300 = `${rows["300"]}`;
      const cale_400 = `${rows["400"]}`;
      const cale_500 = `${rows["500"]}`;
      // const [check]: any = await connection.query(
      //   "SELECT user_id FROM users WHERE status = 'active' AND username = ? ",
      //   [username]
      // );
      // if (check.length == 0) {
      // var hashedPassword = await bcrypt.hashSync(String(pass), 12);
      // var password = hashedPassword;
      const [add] = await connection.query(
        "INSERT INTO calendar (cale_type,cale_finished_size,cale_page,cale_paper,cale_printing, " +
        " cale_stand,cale_binding,cale_o_ring_color,cale_100,cale_200,cale_300,cale_400,cale_500) " +
        " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          cale_type,
          cale_finished_size,
          cale_page,
          cale_paper,
          cale_printing,
          cale_stand,
          cale_binding,
          cale_o_ring_color,
          cale_100,
          cale_200,
          cale_300,
          cale_400,
          cale_500,
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
