import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "@/pages/api/middleware";
import connection from "@/mysql";
import formidable from "formidable";
const bcrypt = require("bcrypt");
const fs = require("fs");
const XLSX = require("xlsx");
const { passwordStrength } = require("check-password-strength");
export const config = {
  api: {
    bodyParser: false,
  },
};

var nodemailer = require("nodemailer");
var randtoken = require("rand-token");

const reset_token = randtoken.generate(20);

import { createRouter } from "next-connect";
const router = createRouter<NextApiRequest, NextApiResponse>();

declare module "next" {
  interface NextApiRequest {
    decoded: any;
  }
}

interface CoverPaperData {
  email: string;
  password: string;
  confirm_password: string;
}
interface CoverPaper extends Array<CoverPaperData> { }

// Middleware
// router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
//   const decoded = await adminAuth(req, res);
//   req.decoded = decoded;
//   await next();
// });

// forgot password
router.post(
  "/api/forgot_password/forgot_password",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { forgot_password } = fields;

      const email = forgot_password;

      const [user_id]: any = await connection.query(
        "SELECT user_id FROM users WHERE email = ?",
        [email]
      );
      if (user_id.length > 0) {
        await connection.query(
          "UPDATE users SET reset_token = ? WHERE user_id = ?",
          [reset_token, user_id[0].user_id]
        );
        res.status(200).json({ status: "success" });
      } else {
        res
          .status(200)
          .json({ status: "error", message: "Mail has been not send." });
      }

      // Email
      const to = email;
      const subject = "Reset Password";

      const transporter = nodemailer.createTransport({
        host: "smtpm.csloxinfo.com",
        port: 587,
        secureConnection: false, // use TLS
        auth: {
          user: "digitalcenter@itp.co.th",
          // pass: "Digital16",
          pass: "$ITP@2023$",
        },
        tls: {
          ciphers: "SSLv3",
        },
      });

      const from = `Administrator <digitalcenter@itp.co.th>`;
      const DataHtml =
        "Dear " +
        to +
        ', <br/> <br/> <p>Please click the following <a href="http://localhost:3000/reset-password?token=' +
        reset_token +
        '">Link</a> to reset your password.</p>';

      const mailData = {
        from: from,
        to: to,
        subject: subject,
        html: DataHtml,
      };

      transporter.sendMail(mailData, function (err: any) {
        if (err) {
          res
            .status(500)
            .json({ status: "error", message: "Mail cannot send." });
          return;
        } else {
          res
            .status(200)
            .json({ status: "success", message: "Mail has been send." });
          return;
        }
      });
    });
  }
);

// get email forgot password
router.get(
  "/api/forgot_password/reset-password",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { token } = req.query;
    console.log(token);
    try {
      const [response]: any = await connection.query(
        `SELECT email FROM users WHERE reset_token = ?`,
        [token]
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// get reset password confirm
router.put(
  "/api/forgot_password/add",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { email, password, confirm_password } = fields;

      const checkpassword = passwordStrength(password).value;

      if (password != confirm_password) {
        res.json("Please check your password");
        return;
      } else if (checkpassword == "Weak" || checkpassword == "Too weak") {
        res.json("weak");
        return;
      }
      const [check]: any = await connection.query(
        "SELECT email FROM users WHERE email = ?",
        [email]
      );

      if (check.length > 0) {
        const hashSync = bcrypt.hashSync(password, 12);
        await connection.query(
          "UPDATE users SET password = ? WHERE email = ?",
          [hashSync, email]
        );
        res.status(200).json({ status: "success" });
      } else {
        res.status(200).json({ status: "error", message: "Duplicate Name" });
      }
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
