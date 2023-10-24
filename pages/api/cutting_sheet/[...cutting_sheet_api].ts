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

interface cuttingSheetData {
  cutt_type?: string;
  cutt_finished_size?: string;
  cutt_page?: string;
  cutt_text_paper?: string;
  cutt_printing?: string;
  cutt_text_coating?: string;
  cutt_500?: number;
  cutt_1000?: number;
  cutt_2000?: number;
  cutt_3000?: number;
  cutt_4000?: number;
  cutt_5000?: number;
}
interface Cutting extends Array<cuttingSheetData> {}

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/cutting_sheet/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM cutting_sheet ORDER BY cutt_id DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/cutting_sheet/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM cutting_sheet WHERE (cutt_type LIKE ? OR cutt_finished_size LIKE ? OR cutt_page LIKE ? OR  
        cutt_text_paper LIKE ? OR cutt_printing LIKE ? OR cutt_text_coating LIKE ? OR cutt_500 LIKE ? OR cutt_1000 LIKE ? OR cutt_2000 LIKE ? OR cutt_3000 LIKE ? 
        OR cutt_4000 LIKE ? OR cutt_5000 LIKE ?) ORDER BY cutt_id DESC`,
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
  "/api/cutting_sheet/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM cutting_sheet WHERE cutt_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/cutting_sheet/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {

      const { cutt_type , cutt_finished_size , cutt_page , cutt_text_paper , cutt_printing , cutt_text_coating
      , cutt_500 , cutt_1000 , cutt_2000 , cutt_3000 , cutt_4000 , cutt_5000} = fields;

      await connection.query("INSERT INTO cutting_sheet (cutt_type,cutt_finished_size,cutt_page,cutt_text_paper,cutt_printing, "+
      " cutt_text_coating,cutt_500,cutt_1000,cutt_2000,cutt_3000,cutt_4000,cutt_5000) "+
      " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [
        cutt_type,cutt_finished_size,cutt_page,cutt_text_paper,cutt_printing,cutt_text_coating,
        cutt_500,cutt_1000,cutt_2000,cutt_3000,cutt_4000,cutt_5000
      ]);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/cutting_sheet/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { cutt_type , cutt_finished_size , cutt_page , cutt_text_paper , cutt_printing , cutt_text_coating
      , cutt_500 , cutt_1000 , cutt_2000 , cutt_3000 , cutt_4000 , cutt_5000 , cutt_id} = fields;
      await connection.query("UPDATE cutting_sheet SET cutt_type = ? , cutt_finished_size = ? , cutt_page = ? , "+
      " cutt_text_paper = ? , cutt_printing = ? , cutt_text_coating = ? , cutt_500 = ? , cutt_1000 = ? , cutt_2000 = ? , cutt_3000 = ? ,"+
      " cutt_4000 = ? , cutt_5000 = ? WHERE cutt_id = ?", [
        cutt_type , cutt_finished_size , cutt_page , cutt_text_paper , cutt_printing , cutt_text_coating , 
        cutt_500 , cutt_1000 , cutt_2000 , cutt_3000 , cutt_4000 , cutt_5000 , cutt_id
      ]);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/cutting_sheet/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { cutt_id } = fields;
      await connection.query(`DELETE FROM cutting_sheet WHERE cutt_id = ${cutt_id}`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/cutting_sheet/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { cutt_id } = fields;
      let id = cutt_id.toString();
      await connection.query(`DELETE FROM cutting_sheet WHERE cutt_id IN (${id})`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/cutting_sheet/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/cutting_sheet/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/cutting_sheet/${files.file.originalFilename}`
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
      const cutt_type = rows["Type"];
      const cutt_finished_size = rows["Finished Size"];
      const cutt_page = `${rows["Page"]}`;
      const cutt_text_paper = rows["Text Paper"];
      const cutt_printing = rows["Printing color"];
      const cutt_text_coating = rows["Coating"];
      const cutt_500 = `${rows["500"]}`;
      const cutt_1000 = `${rows["1,000"]}`;
      const cutt_2000 = `${rows["2,000"]}`;
      const cutt_3000 = `${rows["3,000"]}`;
      const cutt_4000 = `${rows["4,000"]}`;
      const cutt_5000 = `${rows["5,000"]}`;
      // const [check]: any = await connection.query(
      //   "SELECT user_id FROM users WHERE status = 'active' AND username = ? ",
      //   [username]
      // );
      // if (check.length == 0) {
      // var hashedPassword = await bcrypt.hashSync(String(pass), 12);
      // var password = hashedPassword;
      const [add] = await connection.query("INSERT INTO cutting_sheet (cutt_type,cutt_finished_size,cutt_page,cutt_text_paper,cutt_printing, "+
      " cutt_text_coating,cutt_500,cutt_1000,cutt_2000,cutt_3000,cutt_4000,cutt_5000) "+
      " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [
        cutt_type,cutt_finished_size,cutt_page,cutt_text_paper,cutt_printing,cutt_text_coating,cutt_500,cutt_1000,cutt_2000,cutt_3000,cutt_4000,cutt_5000
      ]);
      // } else {
      //   status = "duplicate";
      // }
    })
  );

  return status;
}

//////////////////////////////////////////////////////////////////////////////// ดึง master ///////////////////////////////////////////////////////////////////////////

// get cover paper
router.get(
  "/api/cutting_sheet/get_cover_paper",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM cover_paper ORDER BY cp_name ASC`
      );
      // console.log(response)
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// get text no
router.get(
  "/api/cutting_sheet/get_text_no",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM text_no ORDER BY CAST(text_no_name as SIGNED) ASC`
      );
      // console.log(response)
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// get text paper
router.get(
  "/api/cutting_sheet/get_text_paper",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM text_paper ORDER BY text_name ASC`
      );
      // console.log(response)
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// get cutting_sheet
router.get(
  "/api/cutting_sheet/get_cutting_sheet",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM cutting_sheet ORDER BY cutting_sheet_name ASC`
      );
      // console.log(response)
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// get printing
router.get(
  "/api/cutting_sheet/get_printing",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM printing ORDER BY printing_name ASC`
      );
      // console.log(response)
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// get cover paper edit
router.get(
  "/api/cutting_sheet/get_cover_paper_edit",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM cover_paper ORDER BY cp_name ASC`
      );
      // console.log(response)
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
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
