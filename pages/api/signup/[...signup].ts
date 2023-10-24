import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "@/pages/api/middleware";
import connection from "@/mysql";
import formidable from "formidable";
const bcrypt = require("bcrypt");
const fs = require("fs");
const XLSX = require("xlsx");
// const { passwordStrength } = require("check-password-strength");
export const config = {
  api: {
    bodyParser: false,
  },
};

var nodemailer = require("nodemailer");

import { createRouter } from "next-connect";
const router = createRouter<NextApiRequest, NextApiResponse>();

declare module "next" {
  interface NextApiRequest {
    decoded: any;
  }
}

interface CoverPaperData {
  fullname:string;
  email: string;
  tel:string;
  password: string;
  confirm_password: string;
}
interface CoverPaper extends Array<CoverPaperData> {}

// Middleware
// router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
//   const decoded = await adminAuth(req, res);
//   req.decoded = decoded;
//   await next();
// });

router.put(
  "/api/signup/register",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {fullname, email, tel, username, password } = fields;

      // const checkpassword = passwordStrength(password).value;

      // if (password != confirm_password) {
      //   res.json("Please check your password");
      //   return;
      // } else if (checkpassword == "Weak" || checkpassword == "Too weak") {
      //   res.json("weak");
      //   return;
      // }

      const [check]: any = await connection.query(
        "SELECT username FROM users WHERE username = ?",
        [username]
      );

      if (check.length == 0) {
        const hashSync = bcrypt.hashSync(password, 12);
        await connection.query(
          "INSERT INTO users (username , password , fullname , email , tel) " + " VALUES (? , ? , ? , ? , ?)",
          [username , hashSync , fullname , email , tel]
        );

        // res.status(200).json({ status: "success" });

        // Email
        const to = email;
        const subject = "Register Successfully";
      
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
            ', <br/> <br/> <p>Please click the following <a href="http://localhost:3000/login' +
            '">Link</a> to login.</p>';
    
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
