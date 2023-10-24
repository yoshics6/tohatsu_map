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
  fd_id: number,
  fd_code: string,
  fd_dealer: string,
  fd_shop: string,
  fd_busines_type: string,
  fd_province: string,
  fd_address: string,
  fd_road: string,
  fd_subdistrict: string,
  fd_district: string,
  fd_zipcode: string,
  fd_tel: string,
  fd_latitude: string,
  fd_longitude: string,
  fd_created_at: string,
}
interface CoverPaper extends Array<CoverPaperData> { }

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/find_dealer/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM find_dealer ORDER BY CAST(fd_created_at AS UNSIGNED)`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/find_dealer/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      console.log(keyword);
      const [response]: any = await connection.query(
        `SELECT * FROM find_dealer WHERE oc_date LIKE ? OR oc_category_name LIKE ? ORDER BY CAST(oc_category_name AS UNSIGNED)`,
        ["%" + keyword + "%", "%" + keyword + "%"]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/find_dealer/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM find_dealer WHERE oc_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.put(
  "/api/find_dealer/create",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { oc_date, oc_category_name } = fields;
      const [check]: any = await connection.query(
        "SELECT * FROM find_dealer WHERE oc_category_name = ?",
        [oc_category_name]
      );
      if (check.length === 0) {
        await connection.query(
          "INSERT INTO find_dealer (oc_date , oc_category_name) " + " VALUES (?,?)",
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
  "/api/find_dealer/edit",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { oc_id, oc_date, oc_category_name } = fields;
      const [check]: any = await connection.query(
        "SELECT oc_id FROM find_dealer WHERE oc_id != ? AND oc_category_name = ?",
        [oc_id, oc_category_name]
      );

      if (check.length === 0) {
        await connection.query(
          "UPDATE find_dealer SET oc_date = ? , oc_category_name = ? WHERE oc_id = ?",
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
  "/api/find_dealer/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { oc_id } = fields;
      await connection.query(
        `DELETE FROM find_dealer WHERE oc_id = ${oc_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/find_dealer/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { oc_id } = fields;
      let id = oc_id.toString();
      await connection.query(`DELETE FROM find_dealer WHERE oc_id IN (${id})`);
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/find_dealer/upload",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files: any) => {
      fs.copyFileSync(
        files.file.filepath,
        `public/upload/find_dealer/${files.file.originalFilename}`
      );
      var reponse = await importExcelUser(
        `public/upload/find_dealer/${files.file.originalFilename}`
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
  var status = "";
  await Promise.all(
    data.map(async (rows: any, index: any) => {

      const fd_code = rows["Code"];
      const fd_dealer = rows["Dealer"];
      const fd_shop = rows["Shop"];
      const fd_busines_type = rows["BusinessType"];
      const fd_province = rows["Province"];
      const fd_address = rows["Address"];
      const fd_road = rows["Road"];
      const fd_subdistrict = rows["SubDistrict"] == null ? '-' : rows["SubDistrict"];
      const fd_district = rows["District"];
      const fd_zipcode = rows["Zipcode"];
      const fd_tel = rows["Tel"];
      const fd_latitude = rows["Latitude"];
      const fd_longitude = rows["Longitude"];

      const [check]: any = await connection.query(
        "SELECT fd_id FROM find_dealer WHERE fd_code = ?",
        [fd_code]
      );
      if (check.length == 0) {
        const [add] = await connection.query(
          "INSERT INTO find_dealer (fd_code , fd_dealer , fd_shop , fd_busines_type , fd_province , fd_address , fd_road , fd_subdistrict , fd_district , fd_zipcode , fd_tel , fd_latitude , fd_longitude) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [fd_code, fd_dealer, fd_shop, fd_busines_type, fd_province, fd_address, fd_road, fd_subdistrict, fd_district, fd_zipcode, fd_tel, fd_latitude, fd_longitude]
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
