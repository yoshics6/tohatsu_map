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
  "/api/sales_summary/lists",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_summary ORDER BY sals_date DESC`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/sales_summary/get",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { keyword } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_summary 
         WHERE sals_date LIKE ? OR sals_fullname LIKE ? OR 	sals_company_name LIKE ? OR sals_tel LIKE ? OR sals_email LIKE ?
         OR sals_doc_type LIKE ? OR sals_printing_type LIKE ? OR sals_amount LIKE ? OR sals_quotation_request	LIKE ? OR sals_send_quotation LIKE ?
         ORDER BY sals_date DESC`,
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
        ]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.get(
  "/api/sales_summary/getbyid",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { id } = req.query;
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_summary WHERE sals_id = ?`,
        [id]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

router.post(
  "/api/sales_summary/delete",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sals_id } = fields;
      await connection.query(
        `DELETE FROM sales_summary WHERE sals_id = ${sals_id}`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/sales_summary/deleteall",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sals_id } = fields;
      let id = sals_id.toString();
      await connection.query(
        `DELETE FROM sales_summary WHERE sals_id IN (${id})`
      );
      res.status(200).json({ status: "success" });
    });
  }
);

router.post(
  "/api/sales_summary/update_send",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { sals_id } = fields;
      await connection.query(
        `Update sales_summary set sals_send_quotation = 'Sent' WHERE sals_id = ${sals_id}`
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
