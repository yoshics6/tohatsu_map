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

interface perfect_bindingData {
  perf_type?: string;
  perf_finished_size?: string;
  perf_cover?: string;
  perf_text?: string;
  perf_cover_paper?: string;
  perf_text_paper?: string;
  perf_printing?: string;
  perf_cover_coating?: string;
  perf_text_coating?: string;
  perf_500?: number;
  perf_1000?: number;
  perf_2000?: number;
  perf_3000?: number;
  perf_4000?: number;
  perf_5000?: number;
}
interface Perfect_Binding extends Array<perfect_bindingData> {}

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/perfect_binding/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM perfect_binding ORDER BY perf_id DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/perfect_binding/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM perfect_binding WHERE (perf_type LIKE ? OR perf_finished_size LIKE ? OR perf_cover LIKE ? OR perf_text LIKE ? OR perf_cover_paper LIKE ? OR  
        perf_text_paper LIKE ? OR perf_printing LIKE ? OR perf_cover_coating LIKE ? OR perf_text_coating LIKE ? OR perf_500 LIKE ? OR perf_1000 LIKE ? OR perf_2000 LIKE ? OR perf_3000 LIKE ? 
        OR perf_4000 LIKE ? OR perf_5000 LIKE ?) ORDER BY perf_id DESC`,
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
  "/api/perfect_binding/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM perfect_binding WHERE perf_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/perfect_binding/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {

      const { perf_type , perf_finished_size , perf_cover , perf_text , perf_cover_paper , perf_text_paper , perf_printing , perf_cover_coating
      , perf_text_coating , perf_500 , perf_1000 , perf_2000 , perf_3000 , perf_4000 , perf_5000} = fields;

      await connection.query("INSERT INTO perfect_binding (perf_type,perf_finished_size,perf_cover,perf_text,perf_cover_paper,perf_text_paper,perf_printing, "+
      " perf_cover_coating,perf_text_coating,perf_500,perf_1000,perf_2000,perf_3000,perf_4000,perf_5000) "+
      " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        perf_type,perf_finished_size,perf_cover,perf_text,perf_cover_paper,perf_text_paper,perf_printing,perf_cover_coating,perf_text_coating,
        perf_500,perf_1000,perf_2000,perf_3000,perf_4000,perf_5000
      ]);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/perfect_binding/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { perf_type , perf_finished_size , perf_cover , perf_text , perf_cover_paper , perf_text_paper , perf_printing , perf_cover_coating
        , perf_text_coating , perf_500 , perf_1000 , perf_2000 , perf_3000 , perf_4000 , perf_5000 , perf_id} = fields;
      await connection.query("UPDATE perfect_binding SET perf_type = ? , perf_finished_size = ? , perf_cover = ? , perf_text = ? , perf_cover_paper = ? , "+
      " perf_text_paper = ? , perf_printing = ? , perf_cover_coating = ? , perf_text_coating = ? , perf_500 = ? , perf_1000 = ? , perf_2000 = ? , perf_3000 = ? ,"+
      " perf_4000 = ? , perf_5000 = ? WHERE perf_id = ?", [
        perf_type , perf_finished_size , perf_cover , perf_text , perf_cover_paper , perf_text_paper , perf_printing , perf_cover_coating , perf_text_coating , 
        perf_500 , perf_1000 , perf_2000 , perf_3000 , perf_4000 , perf_5000 , perf_id
      ]);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/perfect_binding/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { perf_id } = fields;
      await connection.query(`DELETE FROM perfect_binding WHERE perf_id = ${perf_id}`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/perfect_binding/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { perf_id } = fields;
      let id = perf_id.toString();
      await connection.query(`DELETE FROM perfect_binding WHERE perf_id IN (${id})`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/perfect_binding/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/perfect_binding/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/perfect_binding/${files.file.originalFilename}`
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
      const perf_type = rows["Type"];
      const perf_finished_size = rows["Finished Size"];
      const perf_cover = `${rows["Cover"]}`;
      const perf_text = `${rows["Text"]}`;
      const perf_cover_paper = rows["Cover Paper"];
      const perf_text_paper = rows["Text Paper"];
      const perf_printing = rows["Printing color"];
      const perf_cover_coating = rows["Cover Coating"];
      const perf_text_coating = rows["Text Coating"];
      const perf_500 = `${rows["500"]}`;
      const perf_1000 = `${rows["1,000"]}`;
      const perf_2000 = `${rows["2,000"]}`;
      const perf_3000 = `${rows["3,000"]}`;
      const perf_4000 = `${rows["4,000"]}`;
      const perf_5000 = `${rows["5,000"]}`;
      // const [check]: any = await connection.query(
      //   "SELECT user_id FROM users WHERE status = 'active' AND username = ? ",
      //   [username]
      // );
      // if (check.length == 0) {
      // var hashedPassword = await bcrypt.hashSync(String(pass), 12);
      // var password = hashedPassword;
      const [add] = await connection.query("INSERT INTO perfect_binding (perf_type,perf_finished_size,perf_cover,perf_text,perf_cover_paper,perf_text_paper,perf_printing, "+
      " perf_cover_coating,perf_text_coating,perf_500,perf_1000,perf_2000,perf_3000,perf_4000,perf_5000) "+
      " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        perf_type,perf_finished_size,perf_cover,perf_text,perf_cover_paper,perf_text_paper,perf_printing,perf_cover_coating,perf_text_coating,
        perf_500,perf_1000,perf_2000,perf_3000,perf_4000,perf_5000
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
  "/api/perfect_binding/get_cover_paper",
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
  "/api/perfect_binding/get_text_no",
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
  "/api/perfect_binding/get_text_paper",
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

// get perfect_binding
router.get(
  "/api/perfect_binding/get_perfect_binding",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM perfect_binding ORDER BY perfect_binding_name ASC`
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
  "/api/perfect_binding/get_printing",
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
  "/api/perfect_binding/get_cover_paper_edit",
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
