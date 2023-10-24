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

interface saddle_stitchData {
  sadd_type?: string;
  sadd_finished_size?: string;
  sadd_cover?: string;
  sadd_text?: string;
  sadd_cover_paper?: string;
  sadd_text_paper?: string;
  sadd_printing?: string;
  sadd_cover_coating?: string;
  sadd_text_coating?: string;
  sadd_500?: number;
  sadd_1000?: number;
  sadd_2000?: number;
  sadd_3000?: number;
  sadd_4000?: number;
  sadd_5000?: number;
}
interface Saddle_Stitch extends Array<saddle_stitchData> {}

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/saddle_stitch/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM saddle_stitch ORDER BY sadd_id DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/saddle_stitch/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM saddle_stitch WHERE (sadd_type LIKE ? OR sadd_finished_size LIKE ? OR sadd_cover LIKE ? OR sadd_text LIKE ? OR sadd_cover_paper LIKE ? OR  
        sadd_text_paper LIKE ? OR sadd_printing LIKE ? OR sadd_cover_coating LIKE ? OR sadd_text_coating LIKE ? OR sadd_500 LIKE ? OR sadd_1000 LIKE ? OR sadd_2000 LIKE ? OR sadd_3000 LIKE ? 
        OR sadd_4000 LIKE ? OR sadd_5000 LIKE ?) ORDER BY sadd_id DESC`,
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
  "/api/saddle_stitch/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM saddle_stitch WHERE sadd_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/saddle_stitch/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {

      const { sadd_type , sadd_finished_size , sadd_cover , sadd_text , sadd_cover_paper , sadd_text_paper , sadd_printing , sadd_cover_coating
      , sadd_text_coating , sadd_500 , sadd_1000 , sadd_2000 , sadd_3000 , sadd_4000 , sadd_5000} = fields;

      await connection.query("INSERT INTO saddle_stitch (sadd_type,sadd_finished_size,sadd_cover,sadd_text,sadd_cover_paper,sadd_text_paper,sadd_printing, "+
      " sadd_cover_coating,sadd_text_coating,sadd_500,sadd_1000,sadd_2000,sadd_3000,sadd_4000,sadd_5000) "+
      " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        sadd_type,sadd_finished_size,sadd_cover,sadd_text,sadd_cover_paper,sadd_text_paper,sadd_printing,sadd_cover_coating,sadd_text_coating,
        sadd_500,sadd_1000,sadd_2000,sadd_3000,sadd_4000,sadd_5000
      ]);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/saddle_stitch/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sadd_type , sadd_finished_size , sadd_cover , sadd_text , sadd_cover_paper , sadd_text_paper , sadd_printing , sadd_cover_coating
        , sadd_text_coating , sadd_500 , sadd_1000 , sadd_2000 , sadd_3000 , sadd_4000 , sadd_5000 , sadd_id} = fields;
      await connection.query("UPDATE saddle_stitch SET sadd_type = ? , sadd_finished_size = ? , sadd_cover = ? , sadd_text = ? , sadd_cover_paper = ? , "+
      " sadd_text_paper = ? , sadd_printing = ? , sadd_cover_coating = ? , sadd_text_coating = ? , sadd_500 = ? , sadd_1000 = ? , sadd_2000 = ? , sadd_3000 = ? ,"+
      " sadd_4000 = ? , sadd_5000 = ? WHERE sadd_id = ?", [
        sadd_type , sadd_finished_size , sadd_cover , sadd_text , sadd_cover_paper , sadd_text_paper , sadd_printing , sadd_cover_coating , sadd_text_coating , 
        sadd_500 , sadd_1000 , sadd_2000 , sadd_3000 , sadd_4000 , sadd_5000 , sadd_id
      ]);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/saddle_stitch/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sadd_id } = fields;
      await connection.query(`DELETE FROM saddle_stitch WHERE sadd_id = ${sadd_id}`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/saddle_stitch/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sadd_id } = fields;
      let id = sadd_id.toString();
      await connection.query(`DELETE FROM saddle_stitch WHERE sadd_id IN (${id})`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/saddle_stitch/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/saddle_stitch/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/saddle_stitch/${files.file.originalFilename}`
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
      const sadd_type = rows["Type"];
      const sadd_finished_size = rows["Finished Size"];
      const sadd_cover = `${rows["Cover"]}`;
      const sadd_text = `${rows["Text"]}`;
      const sadd_cover_paper = rows["Cover Paper"];
      const sadd_text_paper = rows["Text Paper"];
      const sadd_printing = rows["Printing color"];
      const sadd_cover_coating = rows["Cover Coating"];
      const sadd_text_coating = rows["Text Coating"];
      const sadd_500 = `${rows["500"]}`;
      const sadd_1000 = `${rows["1,000"]}`;
      const sadd_2000 = `${rows["2,000"]}`;
      const sadd_3000 = `${rows["3,000"]}`;
      const sadd_4000 = `${rows["4,000"]}`;
      const sadd_5000 = `${rows["5,000"]}`;
      // const [check]: any = await connection.query(
      //   "SELECT user_id FROM users WHERE status = 'active' AND username = ? ",
      //   [username]
      // );
      // if (check.length == 0) {
      // var hashedPassword = await bcrypt.hashSync(String(pass), 12);
      // var password = hashedPassword;
      const [add] = await connection.query("INSERT INTO saddle_stitch (sadd_type,sadd_finished_size,sadd_cover,sadd_text,sadd_cover_paper,sadd_text_paper,sadd_printing, "+
      " sadd_cover_coating,sadd_text_coating,sadd_500,sadd_1000,sadd_2000,sadd_3000,sadd_4000,sadd_5000) "+
      " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        sadd_type,sadd_finished_size,sadd_cover,sadd_text,sadd_cover_paper,sadd_text_paper,sadd_printing,sadd_cover_coating,sadd_text_coating,
        sadd_500,sadd_1000,sadd_2000,sadd_3000,sadd_4000,sadd_5000
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
  "/api/saddle_stitch/get_cover_paper",
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
  "/api/saddle_stitch/get_text_no",
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
  "/api/saddle_stitch/get_text_paper",
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

// get saddle_stitch
router.get(
  "/api/saddle_stitch/get_saddle_stitch",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM saddle_stitch ORDER BY saddle_stitch_name ASC`
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
  "/api/saddle_stitch/get_printing",
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
  "/api/saddle_stitch/get_cover_paper_edit",
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
