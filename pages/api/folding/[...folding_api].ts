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

interface foldingData {
  fold_type?: string;
  fold_finished_size?: string;
  fold_open_size?: string;
  fold_column?: string;
  fold_page?: string;
  fold_text_paper?: string;
  fold_printing?: string;
  fold_text_coating?: string;
  fold_500?: number;
  fold_1000?: number;
  fold_2000?: number;
  fold_3000?: number;
  fold_4000?: number;
  fold_5000?: number;
}
interface Folding extends Array<foldingData> {}

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/folding/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM folding ORDER BY fold_id DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/folding/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM folding WHERE (fold_type LIKE ? OR fold_finished_size LIKE ? OR fold_open_size LIKE ? OR fold_column LIKE ? OR fold_page LIKE ? OR  
        fold_text_paper LIKE ? OR fold_printing LIKE ? OR fold_text_coating LIKE ? OR fold_500 LIKE ? OR fold_1000 LIKE ? OR fold_2000 LIKE ? OR fold_3000 LIKE ? 
        OR fold_4000 LIKE ? OR fold_5000 LIKE ?) ORDER BY fold_id DESC`,
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
        ]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/folding/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM folding WHERE fold_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/folding/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {

      const { fold_type , fold_finished_size , fold_open_size , fold_column , fold_page , fold_text_paper , fold_printing , fold_text_coating
      , fold_500 , fold_1000 , fold_2000 , fold_3000 , fold_4000 , fold_5000} = fields;

      await connection.query("INSERT INTO folding (fold_type,fold_finished_size,fold_open_size,fold_column,fold_page,fold_text_paper,fold_printing, "+
      " fold_text_coating,fold_500,fold_1000,fold_2000,fold_3000,fold_4000,fold_5000) "+
      " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        fold_type,fold_finished_size,fold_open_size,fold_column,fold_page,fold_text_paper,fold_printing,fold_text_coating,
        fold_500,fold_1000,fold_2000,fold_3000,fold_4000,fold_5000
      ]);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/folding/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fold_type , fold_finished_size , fold_open_size , fold_column , fold_page , fold_text_paper , fold_printing , fold_text_coating
      , fold_500 , fold_1000 , fold_2000 , fold_3000 , fold_4000 , fold_5000 , fold_id} = fields;
      await connection.query("UPDATE folding SET fold_type = ? , fold_finished_size = ? , fold_open_size = ? , fold_column = ? , fold_page = ? , "+
      " fold_text_paper = ? , fold_printing = ? , fold_text_coating = ? , fold_500 = ? , fold_1000 = ? , fold_2000 = ? , fold_3000 = ? ,"+
      " fold_4000 = ? , fold_5000 = ? WHERE fold_id = ?", [
        fold_type , fold_finished_size , fold_open_size , fold_column , fold_page , fold_text_paper , fold_printing , fold_text_coating , 
        fold_500 , fold_1000 , fold_2000 , fold_3000 , fold_4000 , fold_5000 , fold_id
      ]);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/folding/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fold_id } = fields;
      await connection.query(`DELETE FROM folding WHERE fold_id = ${fold_id}`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/folding/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fold_id } = fields;
      let id = fold_id.toString();
      await connection.query(`DELETE FROM folding WHERE fold_id IN (${id})`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/folding/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/folding/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/folding/${files.file.originalFilename}`
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
      const fold_type = rows["Type"];
      const fold_finished_size = rows["Finished Size"];
      const fold_open_size = `${rows["Open Size"]}`;
      const fold_column = `${rows["Fold"]}`;
      const fold_page = `${rows["Page"]}`;
      const fold_text_paper = rows["Text Paper"];
      const fold_printing = rows["Printing color"];
      const fold_text_coating = rows["Coating"];
      const fold_500 = `${rows["500"]}`;
      const fold_1000 = `${rows["1,000"]}`;
      const fold_2000 = `${rows["2,000"]}`;
      const fold_3000 = `${rows["3,000"]}`;
      const fold_4000 = `${rows["4,000"]}`;
      const fold_5000 = `${rows["5,000"]}`;
      // const [check]: any = await connection.query(
      //   "SELECT user_id FROM users WHERE status = 'active' AND username = ? ",
      //   [username]
      // );
      // if (check.length == 0) {
      // var hashedPassword = await bcrypt.hashSync(String(pass), 12);
      // var password = hashedPassword;
      const [add] = await connection.query("INSERT INTO folding (fold_type,fold_finished_size,fold_open_size,fold_column,fold_page,fold_text_paper,fold_printing, "+
      " fold_text_coating,fold_500,fold_1000,fold_2000,fold_3000,fold_4000,fold_5000) "+
      " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        fold_type,fold_finished_size,fold_open_size,fold_column,fold_page,fold_text_paper,fold_printing,fold_text_coating,fold_500,fold_1000,fold_2000,fold_3000,fold_4000,fold_5000
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
  "/api/folding/get_cover_paper",
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
  "/api/folding/get_text_no",
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
  "/api/folding/get_text_paper",
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

// get folding
router.get(
  "/api/folding/get_folding",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM folding ORDER BY folding_name ASC`
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
  "/api/folding/get_printing",
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
  "/api/folding/get_cover_paper_edit",
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
