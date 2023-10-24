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
  "/api/sales_envelope/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        // `SELECT * FROM sales_envelope ORDER BY sals_enve_date DESC`
        `SELECT a.* , b.sals_send_quotation FROM sales_envelope a LEFT JOIN sales_summary b on a.sals_enve_id = b.sals_ref_id 
        WHERE b.sals_doc_type = 'Envelope' and b.sals_printing_type = 'Envelope' ORDER BY a.sals_enve_date DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/sales_envelope/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_envelope 
         WHERE sals_enve_date LIKE ? OR sals_enve_fullname LIKE ? OR sals_enve_company_name LIKE ? OR sals_enve_tel LIKE ? OR sals_enve_email LIKE ?
         OR sals_enve_doc_type LIKE ? OR sals_enve_printing_type LIKE ? OR sals_enve_amount LIKE ? OR sals_enve_quotation_request	LIKE ? OR sals_enve_finished_size LIKE ?
         OR sals_enve_page LIKE ? OR sals_enve_paper LIKE ? OR sals_enve_printing LIKE ? OR sals_enve_coating LIKE ? OR sals_enve_printing_volume LIKE ?
         ORDER BY sals_enve_date DESC`,
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
  "/api/sales_envelope/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_envelope WHERE sals_enve_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.post(
  "/api/sales_envelope/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sals_enve_id } = fields;
      await connection.query(
        `DELETE FROM sales_envelope WHERE sals_enve_id = ${sals_enve_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/sales_envelope/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sals_enve_id } = fields;
      let id = sals_enve_id.toString();
      await connection.query(
        `DELETE FROM sales_envelope WHERE sals_enve_id IN (${id})`
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
