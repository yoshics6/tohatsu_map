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

// interface saddle_stitchData {
//   text_page?: string;
// }
// interface Saddle_Stitch extends Array<saddle_stitchData> {}

// Middleware
// router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
//   const decoded = await adminAuth(req, res);
//   req.decoded = decoded;
//   await next();
// });

//////////////////////////////////////////////////////////////////////////////// ดึง master ///////////////////////////////////////////////////////////////////////////

// get text no , text page
router.get(
  "/api/saddle_stitch_front/get_text_page",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT DISTINCT sadd_text as text_page FROM saddle_stitch order by sadd_text`
      );
      // console.log(response)
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// get cover paper
router.get(
  "/api/saddle_stitch_front/get_cover_paper",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT DISTINCT sadd_cover_paper as cover_paper FROM saddle_stitch order by sadd_cover_paper`
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
  "/api/saddle_stitch_front/get_text_paper",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT DISTINCT sadd_text_paper as text_paper FROM saddle_stitch order by sadd_text_paper`
      );
      // console.log(response)
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// get printing color
router.get(
  "/api/saddle_stitch_front/get_printing_color",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [response]: any = await connection.query(
        `SELECT DISTINCT sadd_printing as printing_color FROM saddle_stitch order by sadd_printing`
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
