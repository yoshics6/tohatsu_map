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
  "/api/sales_perfect_binding/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        // `SELECT * FROM sales_perfect_binding ORDER BY sals_perf_date DESC`
        `SELECT a.* , b.sals_send_quotation FROM sales_perfect_binding a LEFT JOIN sales_summary b on a.sals_perf_id = b.sals_ref_id 
        WHERE b.sals_printing_type = 'Perfect Binding' ORDER BY a.sals_perf_date DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/sales_perfect_binding/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_perfect_binding 
         WHERE sals_perf_date LIKE ? OR sals_perf_fullname LIKE ? OR sals_perf_company_name LIKE ? OR sals_perf_tel LIKE ? OR sals_perf_email LIKE ?
         OR sals_perf_doc_type LIKE ? OR sals_perf_printing_type LIKE ? OR sals_perf_amount LIKE ? OR sals_perf_quotation_request	LIKE ? OR sals_perf_finished_size LIKE ?
         OR sals_perf_cover LIKE ? OR sals_perf_text LIKE ? OR sals_perf_cover_paper LIKE ? OR sals_perf_text_paper LIKE ?
         OR sals_perf_printing LIKE ? OR sals_perf_cover_coating LIKE ? OR sals_perf_text_coating LIKE ? OR sals_perf_printing_volume LIKE ?
         ORDER BY sals_perf_date DESC`,
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
  "/api/sales_perfect_binding/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_perfect_binding WHERE sals_perf_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.post(
  "/api/sales_perfect_binding/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sals_perf_id } = fields;
      await connection.query(
        `DELETE FROM sales_perfect_binding WHERE sals_perf_id = ${sals_perf_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/sales_perfect_binding/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sals_perf_id } = fields;
      let id = sals_perf_id.toString();
      await connection.query(
        `DELETE FROM sales_perfect_binding WHERE sals_perf_id IN (${id})`
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
