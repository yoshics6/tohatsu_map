import type { NextApiRequest, NextApiResponse } from "next";
import { Document, Packer, Paragraph, TextRun } from "docx";
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

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const decoded = await adminAuth(req, res);
  req.decoded = decoded;
  await next();
});

router.get(
  "/api/sales_saddle_stitch/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        // `SELECT * FROM sales_saddle_stitch ORDER BY sals_sadd_date DESC`
        `SELECT a.* , b.sals_send_quotation FROM sales_saddle_stitch a LEFT JOIN sales_summary b on a.sals_sadd_id = b.sals_ref_id 
        WHERE b.sals_printing_type = 'Saddle Stitch' ORDER BY a.sals_sadd_date DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/sales_saddle_stitch/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_saddle_stitch 
         WHERE sals_sadd_date LIKE ? OR sals_sadd_fullname LIKE ? OR sals_sadd_company_name LIKE ? OR sals_sadd_tel LIKE ? OR sals_sadd_email LIKE ?
         OR sals_sadd_doc_type LIKE ? OR sals_sadd_printing_type LIKE ? OR sals_sadd_amount LIKE ? OR sals_sadd_quotation_request	LIKE ? OR sals_sadd_finished_size LIKE ?
         OR sals_sadd_cover LIKE ? OR sals_sadd_text LIKE ? OR sals_sadd_cover_paper LIKE ? OR sals_sadd_text_paper LIKE ?
         OR sals_sadd_printing LIKE ? OR sals_sadd_cover_coating LIKE ? OR sals_sadd_text_coating LIKE ? OR sals_sadd_printing_volume LIKE ?
         ORDER BY sals_sadd_date DESC`,
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
  "/api/sales_saddle_stitch/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_saddle_stitch WHERE sals_sadd_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.post(
  "/api/sales_saddle_stitch/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sals_sadd_id } = fields;
      await connection.query(
        `DELETE FROM sales_saddle_stitch WHERE sals_sadd_id = ${sals_sadd_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/sales_saddle_stitch/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sals_sadd_id } = fields;
      let id = sals_sadd_id.toString();
      await connection.query(
        `DELETE FROM sales_saddle_stitch WHERE sals_sadd_id IN (${id})`
      );
      res.status(200).json({ status: "success" });
    });
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
