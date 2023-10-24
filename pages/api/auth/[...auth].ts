import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "@/pages/api/middleware";
import connection from "@/mysql";
import formidable from "formidable";
const { getToken, verifyToken } = require("@/jwtHandler");
const bcrypt = require("bcrypt");
import { setCookie, getCookies } from "cookies-next";
export const config = {
  api: {
    bodyParser: false,
  },
};

import { render } from "@react-email/render";
var nodemailer = require("nodemailer");
var randtoken = require("rand-token");

const reset_token = randtoken.generate(20);

declare module "next" {
  interface NextApiRequest {
    decoded: any;
  }
}

interface Login {
  username?: string;
  password?: string;
}

interface Decoded {
  user_id?: string;
  fullname?: string;
  email?: string;
}

import { createRouter } from "next-connect";
const router = createRouter<NextApiRequest, NextApiResponse>();

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const action = req.query["auth"] ?? [];
  if (action[0] != "login") {
    const decoded = await adminAuth(req, res);
    req.decoded = decoded;
  }
  await next();
});

router.post(
  "/api/auth/login",
  async (req: NextApiRequest, res: NextApiResponse) => {
    
    const form = formidable();
    
    form.parse(req, async (err, fields, files) => {
      const { username, password }: Login = fields;
      const [user]: any = await connection.query(
        `SELECT user_id, username, password, fullname, email, level 
        FROM users 
        WHERE username = '${username}' AND status = 'active' AND level = 'Administrator' `
      );
      console.log(user)
      if (user.length > 0) {
        var passwordIsValid = bcrypt.compareSync(password, user[0].password);
        if (passwordIsValid) {
          var token = getToken({
            user_id: user[0].user_id,
            fullname: user[0].fullname,
            email: user[0].email,
            level: user[0].level,
          });
          setCookie(`${process.env.ACCESS_TOKEN_KEY}`, `Bearer ${token}`, {
            req,
            res,
            maxAge: 60 * 60 * 4,
          });
          res.json({
            status: "success",
            data: {
              token: token,
              user_id: user[0].user_id,
              fullname: user[0].fullname,
              email: user[0].email,
              level: user[0].level,
            },
          });
        } else {
          res.status(200).json({
            status: "error",
            message: "Password doesn't match",
          });
        }
      } else {
        res.status(200).json({
          status: "error",
          message: "Invalid Username or Password",
        });
      }
    });
  }
);

router.get(
  "/api/auth/profile",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const decoded: Decoded = req.decoded;
    res.status(200).json({ status: "success", data: decoded });
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
