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
    externalResolver: true,
  },
};

var nodemailer = require("nodemailer");
var randtoken = require("rand-token");

const reset_token = randtoken.generate(20);

import { createRouter } from "next-connect";
import { strict } from "assert";
const router = createRouter<NextApiRequest, NextApiResponse>();

declare module "next" {
  interface NextApiRequest {
    decoded: any;
  }
}

interface FrontEnvelopeData { }
interface FrontEnvelope extends Array<FrontEnvelopeData> { }

// Middleware
router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  //   const decoded = await adminAuth(req, res);
  //   req.decoded = decoded;
  await next();
});

//////////////////////////////////////////////////////////////////////////// Front Saddle Stitch ////////////////////////////////////////////////////////////////////////////
// Get SelectBox
router.get(
  "/api/front_all_api/saddlestitchlist",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [sadd_finished_size]: any = await connection.query(
        `SELECT DISTINCT sadd_finished_size FROM saddle_stitch order by trim(sadd_finished_size) `
      );
      res.status(200).json({
        status: "success",
        sadd_finished_size: sadd_finished_size,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Get SelectBox Filter
router.get(
  "/api/front_all_api/saddlestitchlistfilter",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { sadd_finished_size_chk } = req.query;
    const { sadd_cover_chk } = req.query;
    const { sadd_text_chk } = req.query;
    const { sadd_cover_paper_chk } = req.query;
    const { sadd_text_paper_chk } = req.query;
    const { sadd_printing_chk } = req.query;
    const { sadd_cover_coating_chk } = req.query;

    try {
      const [sadd_cover]: any = await connection.query(
        `SELECT DISTINCT sadd_cover FROM saddle_stitch WHERE sadd_finished_size = '${sadd_finished_size_chk}' order by sadd_cover `
      );
      const [sadd_text]: any = await connection.query(
        `SELECT DISTINCT sadd_text FROM saddle_stitch WHERE sadd_finished_size = '${sadd_finished_size_chk}' AND sadd_cover = '${sadd_cover_chk}' 
        order by cast(sadd_text as unsigned) `
      );
      const [sadd_cover_paper]: any = await connection.query(
        `SELECT DISTINCT sadd_cover_paper FROM saddle_stitch WHERE sadd_finished_size = '${sadd_finished_size_chk}' AND sadd_cover = '${sadd_cover_chk}' 
        AND sadd_text = '${sadd_text_chk}' order by sadd_cover_paper ASC `
      );
      const [sadd_text_paper]: any = await connection.query(
        `SELECT DISTINCT sadd_text_paper FROM saddle_stitch WHERE sadd_finished_size = '${sadd_finished_size_chk}' AND sadd_cover = '${sadd_cover_chk}' 
        AND sadd_text = '${sadd_text_chk}' AND sadd_cover_paper = '${sadd_cover_paper_chk}' order by sadd_text_paper ASC
        `
      );
      const [sadd_printing]: any = await connection.query(
        `SELECT DISTINCT sadd_printing FROM saddle_stitch WHERE sadd_finished_size = '${sadd_finished_size_chk}' AND sadd_cover = '${sadd_cover_chk}' 
        AND sadd_text = '${sadd_text_chk}' AND sadd_cover_paper = '${sadd_cover_paper_chk}' AND sadd_text_paper = '${sadd_text_paper_chk}' order by sadd_printing `
      );
      const [sadd_cover_coating]: any = await connection.query(
        `SELECT DISTINCT sadd_cover_coating FROM saddle_stitch WHERE sadd_finished_size = '${sadd_finished_size_chk}' AND sadd_cover = '${sadd_cover_chk}' 
        AND sadd_text = '${sadd_text_chk}' AND sadd_cover_paper = '${sadd_cover_paper_chk}' AND sadd_text_paper = '${sadd_text_paper_chk}' 
        AND sadd_printing = '${sadd_printing_chk}' order by sadd_cover_coating `
      );
      const [sadd_text_coating]: any = await connection.query(
        `SELECT DISTINCT sadd_text_coating FROM saddle_stitch WHERE sadd_finished_size = '${sadd_finished_size_chk}' AND sadd_cover = '${sadd_cover_chk}' 
        AND sadd_text = '${sadd_text_chk}' AND sadd_cover_paper = '${sadd_cover_paper_chk}' AND sadd_text_paper = '${sadd_text_paper_chk}' 
        AND sadd_printing = '${sadd_printing_chk}' AND sadd_cover_coating = '${sadd_cover_coating_chk}' order by sadd_text_coating `
      );

      res.status(200).json({
        status: "success",
        sadd_cover: sadd_cover,
        sadd_text: sadd_text,
        sadd_cover_paper: sadd_cover_paper,
        sadd_text_paper: sadd_text_paper,
        sadd_printing: sadd_printing,
        sadd_cover_coating: sadd_cover_coating,
        sadd_text_coating: sadd_text_coating,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Saddle Stitch Add
router.put(
  "/api/front_all_api/addSaddleStitch",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        FinishedSize,
        CoverPage,
        TextPage,
        CoverPaper,
        TextPaper,
        PrintingColor,
        CoverCoating,
        TextCoating,
        PrintingVolume,
        printTypeDoc,
        // fullname,
        // companyname,
        // tel,
        // emailF,
      } = fields;

      type Employee = {
        sadd_volume: string;
      };

      const sadd: Employee = {
        sadd_volume: "",
      };

      if (PrintingVolume == "500") {
        sadd.sadd_volume = "sadd_500";
      } else if (PrintingVolume == "1000") {
        sadd.sadd_volume = "sadd_1000";
      } else if (PrintingVolume == "2000") {
        sadd.sadd_volume = "sadd_2000";
      } else if (PrintingVolume == "3000") {
        sadd.sadd_volume = "sadd_3000";
      } else if (PrintingVolume == "4000") {
        sadd.sadd_volume = "sadd_4000";
      } else if (PrintingVolume == "5000") {
        sadd.sadd_volume = "sadd_5000";
      }
      // chk data
      const [check_data]: any = await connection.query(
        "SELECT " +
        sadd.sadd_volume +
        " as data_volume FROM saddle_stitch WHERE sadd_finished_size = ? AND sadd_cover = ? AND sadd_text = ? AND sadd_cover_paper = ? AND sadd_text_paper = ? AND sadd_printing = ?" +
        " AND sadd_cover_coating = ? AND sadd_text_coating = ?",
        [
          FinishedSize,
          CoverPage,
          TextPage,
          CoverPaper,
          TextPaper,
          PrintingColor,
          CoverCoating,
          TextCoating,
        ]
      );
      // max_id
      const [check_id]: any = await connection.query(
        "SELECT MAX(sals_sadd_id) + 1 as new_sals_sadd_id FROM sales_saddle_stitch"
      );
      const new_sals_sadd_id =
        check_id[0].new_sals_sadd_id == null ? 1 : check_id[0].new_sals_sadd_id;

      if (check_data.length > 0) {
        // sals_sadd_fullname , sals_sadd_company_name , sals_sadd_tel , sals_sadd_email ,
        // ?,?,?,?,
        await connection.query(
          "INSERT INTO sales_saddle_stitch (sals_sadd_doc_type , sals_sadd_printing_type , " +
          " sals_sadd_amount , sals_sadd_quotation_request , sals_sadd_finished_size , sals_sadd_cover , sals_sadd_text , sals_sadd_cover_paper , sals_sadd_text_paper , " +
          " sals_sadd_printing , sals_sadd_cover_coating , sals_sadd_text_coating , sals_sadd_printing_volume ) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            // fullname,
            // companyname,
            // tel,
            // emailF,
            printTypeDoc,
            "Saddle Stitch",
            check_data[0].data_volume,
            "No",
            FinishedSize,
            CoverPage,
            TextPage,
            CoverPaper,
            TextPaper,
            PrintingColor,
            CoverCoating,
            TextCoating,
            PrintingVolume,
          ]
        );

        // insert sales_summary
        await connection.query(
          "INSERT INTO sales_summary (sals_doc_type , sals_printing_type , sals_amount , sals_quotation_request , sals_send_quotation , sals_ref_id )" +
          " VALUES (?,?,?,?,?,?)",
          [
            printTypeDoc,
            "Saddle Stitch",
            check_data[0].data_volume,
            "No",
            "Send",
            new_sals_sadd_id
          ]
        );

        res
          .status(200)
          .json({ status: "success", new_sals_sadd_id: new_sals_sadd_id });
      } else {
        res.status(200).json({ status: "error" });
      }
    });
  }
);

// Saddle Stitch Update
router.put(
  "/api/front_all_api/updateSaddleStitch",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fullname, companyname, tel, emailF, eId } = fields;

      await connection.query(
        "UPDATE sales_saddle_stitch set sals_sadd_fullname = ? , sals_sadd_company_name = ? , sals_sadd_tel = ? , sals_sadd_email = ? WHERE sals_sadd_id = ? ",
        [fullname, companyname, tel, emailF, eId]
      );

      // select sals_sadd_doc_type
      const [sals_sadd_doc_type_chk]: any = await connection.query(
        "SELECT sals_sadd_doc_type FROM sales_saddle_stitch WHERE sals_sadd_id = ?", [eId]
      );

      // update sales_summary saddle stitch
      await connection.query(
        "UPDATE sales_summary set sals_fullname = ? , sals_company_name = ? , sals_tel = ? , sals_email = ? WHERE sals_ref_id = ? " +
        "AND sals_printing_type = ? AND sals_doc_type = ? ",
        [fullname, companyname, tel, emailF, eId, 'Saddle Stitch', sals_sadd_doc_type_chk[0].sals_sadd_doc_type]
      );

      res.status(200).json({ status: "success", new_sals_sadd_id: eId });
    });
  }
);

// Saddle Stitch Request
router.get(
  "/api/front_all_api/listsSaddleStitch",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { sals_sadd_id } = req.query;
    // console.log(sals_sadd_id)
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_saddle_stitch WHERE sals_sadd_id = ${sals_sadd_id}`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Saddle Stitch Email
router.post(
  "/api/front_all_api/sendmailSaddleStitch",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { Sals_sadd_id } = fields;

      try {
        const [response]: any = await connection.query(
          `SELECT * FROM sales_saddle_stitch WHERE sals_sadd_id = ${Sals_sadd_id}`
        );

        // Update Quotation Request
        connection.query(
          `Update sales_saddle_stitch set sals_sadd_quotation_request = 'Yes' WHERE sals_sadd_id = ${Sals_sadd_id}`
        );

        // Update sales_summary Quotation Request
        connection.query(
          `Update sales_summary set sals_quotation_request = 'Yes' WHERE sals_ref_id = ${Sals_sadd_id} AND sals_printing_type = 'Saddle Stitch' `
        );

        // Email
        // const to = response[0].sals_sadd_email; // ใช้ mail info@itp.co.th
        // const to = ["yoshics6@gmail.com", "tarntip.m@itp.co.th", "sirorat.b@itp.co.th"];
        const to = ["info@itp.co.th"];
        const subject = "Printing quotation request";

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
        const DataHtml = `Dear Sales manager,
        <br/>
        The following user is interested in our service
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Name – Surname</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_fullname}</td>
          </tr>
          <tr>
            <td> &emsp; Company name</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_company_name}</td>
          </tr>
            <tr>
            <td> &emsp; Phone number</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_tel}</td>
          </tr>
            <tr>
            <td> &emsp; E-mail address</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_email}</td>
          </tr>
        </table>
        <br/>
        Quotation Details
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Document type</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_doc_type}</td>
          </tr>
          <tr>
            <td> &emsp; Printing Type</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_printing_type}</td>
          </tr>
          <tr>
            <td> &emsp; Finished Size</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_finished_size}</td>
          </tr>
          <tr>
            <td> &emsp; Cover page</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_cover}</td>
          </tr>
          <tr>
            <td> &emsp; Text page</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_text}</td>
          </tr>
          <tr>
            <td> &emsp; Cover paper</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_cover_paper}</td>
          </tr>
          <tr>
            <td> &emsp; Text paper</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_text_paper}</td>
          </tr>
          <tr>
            <td> &emsp; Printing color</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_printing}</td>
          </tr>
          <tr>
            <td> &emsp; Cover coating</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_cover_coating}</td>
          </tr>
          <tr>
            <td> &emsp; Text coating</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_text_coating}</td>
          </tr>
          <tr>
            <td> &emsp; Printing volume</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_printing_volume.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
          <tr>
            <td> &emsp; Unit price</td>
            <td width="80%">: &ensp; ${response[0].sals_sadd_amount.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
        </table>
        <br/>
        Please contact client shortly.`;

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

        res.status(200).json({ status: "success" });
      } catch {
        res.status(200).json({ status: "error", message: "Invalid Token" });
      }
    });
  }
);

//////////////////////////////////////////////////////////////////////////// End Saddle Stitch ///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// Front Perfect Binding ///////////////////////////////////////////////////////////////////////
// Get SelectBox
router.get(
  "/api/front_all_api/perfectbindinglist",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [perf_finished_size]: any = await connection.query(
        `SELECT DISTINCT perf_finished_size FROM perfect_binding order by trim(perf_finished_size) asc `
      );
      res.status(200).json({
        status: "success",
        perf_finished_size: perf_finished_size,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Get SelectBox Filter
router.get(
  "/api/front_all_api/perfectbindinglistfilter",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { perf_finished_size_chk } = req.query;
    const { perf_cover_chk } = req.query;
    const { perf_text_chk } = req.query;
    const { perf_cover_paper_chk } = req.query;
    const { perf_text_paper_chk } = req.query;
    const { perf_printing_chk } = req.query;
    const { perf_cover_coating_chk } = req.query;

    try {
      const [perf_cover]: any = await connection.query(
        `SELECT DISTINCT perf_cover FROM perfect_binding WHERE perf_finished_size = '${perf_finished_size_chk}' order by cast(perf_cover as unsigned)`
      );
      const [perf_text]: any = await connection.query(
        `SELECT DISTINCT perf_text FROM perfect_binding WHERE perf_finished_size = '${perf_finished_size_chk}' AND perf_cover = '${perf_cover_chk}' 
        order by cast(perf_text as unsigned) `
      );
      const [perf_cover_paper]: any = await connection.query(
        `SELECT DISTINCT perf_cover_paper FROM perfect_binding WHERE perf_finished_size = '${perf_finished_size_chk}' AND perf_cover = '${perf_cover_chk}' 
        AND perf_text = '${perf_text_chk}' 
        order by perf_cover_paper ASC 
        `
      );
      const [perf_text_paper]: any = await connection.query(
        `SELECT DISTINCT perf_text_paper FROM perfect_binding WHERE perf_finished_size = '${perf_finished_size_chk}' AND perf_cover = '${perf_cover_chk}' 
        AND perf_text = '${perf_text_chk}' AND perf_cover_paper = '${perf_cover_paper_chk}' 
        order by perf_text_paper ASC 
        `
      );
      const [perf_printing]: any = await connection.query(
        `SELECT DISTINCT perf_printing FROM perfect_binding WHERE perf_finished_size = '${perf_finished_size_chk}' AND perf_cover = '${perf_cover_chk}' 
        AND perf_text = '${perf_text_chk}' AND perf_cover_paper = '${perf_cover_paper_chk}' AND perf_text_paper = '${perf_text_paper_chk}' order by perf_printing asc `
      );
      const [perf_cover_coating]: any = await connection.query(
        `SELECT DISTINCT perf_cover_coating FROM perfect_binding WHERE perf_finished_size = '${perf_finished_size_chk}' AND perf_cover = '${perf_cover_chk}' 
        AND perf_text = '${perf_text_chk}' AND perf_cover_paper = '${perf_cover_paper_chk}' AND perf_text_paper = '${perf_text_paper_chk}' 
        AND perf_printing = '${perf_printing_chk}' order by perf_cover_coating asc `
      );
      const [perf_text_coating]: any = await connection.query(
        `SELECT DISTINCT perf_text_coating FROM perfect_binding WHERE perf_finished_size = '${perf_finished_size_chk}' AND perf_cover = '${perf_cover_chk}' 
        AND perf_text = '${perf_text_chk}' AND perf_cover_paper = '${perf_cover_paper_chk}' AND perf_text_paper = '${perf_text_paper_chk}' 
        AND perf_printing = '${perf_printing_chk}' AND perf_cover_coating = '${perf_cover_coating_chk}' order by perf_text_coating asc `
      );

      res.status(200).json({
        status: "success",
        perf_cover: perf_cover,
        perf_text: perf_text,
        perf_cover_paper: perf_cover_paper,
        perf_text_paper: perf_text_paper,
        perf_printing: perf_printing,
        perf_cover_coating: perf_cover_coating,
        perf_text_coating: perf_text_coating,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Perfect Binding Add
router.put(
  "/api/front_all_api/addPerfectBinding",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        FinishedSize,
        CoverPage,
        TextPage,
        CoverPaper,
        TextPaper,
        PrintingColor,
        CoverCoating,
        TextCoating,
        PrintingVolume,
        printTypeDoc,
        // fullname,
        // companyname,
        // tel,
        // emailF,
      } = fields;

      type Employee = {
        perf_volume: string;
      };

      const perf: Employee = {
        perf_volume: "",
      };

      if (PrintingVolume == "500") {
        perf.perf_volume = "perf_500";
      } else if (PrintingVolume == "1000") {
        perf.perf_volume = "perf_1000";
      } else if (PrintingVolume == "2000") {
        perf.perf_volume = "perf_2000";
      } else if (PrintingVolume == "3000") {
        perf.perf_volume = "perf_3000";
      } else if (PrintingVolume == "4000") {
        perf.perf_volume = "perf_4000";
      } else if (PrintingVolume == "5000") {
        perf.perf_volume = "perf_5000";
      }
      // chk data
      const [check_data]: any = await connection.query(
        "SELECT " +
        perf.perf_volume +
        " as data_volume FROM perfect_binding WHERE perf_finished_size = ? AND perf_cover = ? AND perf_text = ? AND perf_cover_paper = ? AND perf_text_paper = ? AND perf_printing = ?" +
        " AND perf_cover_coating = ? AND perf_text_coating = ?",
        [
          FinishedSize,
          CoverPage,
          TextPage,
          CoverPaper,
          TextPaper,
          PrintingColor,
          CoverCoating,
          TextCoating,
        ]
      );
      // max_id
      const [check_id]: any = await connection.query(
        "SELECT MAX(sals_perf_id) + 1 as new_sals_perf_id FROM sales_perfect_binding"
      );
      const new_sals_perf_id =
        check_id[0].new_sals_perf_id == null ? 1 : check_id[0].new_sals_perf_id;

      if (check_data.length > 0) {
        // sals_perf_fullname , sals_perf_company_name , sals_perf_tel , sals_perf_email ,
        // ?,?,?,?,
        await connection.query(
          "INSERT INTO sales_perfect_binding (sals_perf_doc_type , sals_perf_printing_type , " +
          " sals_perf_amount , sals_perf_quotation_request , sals_perf_finished_size , sals_perf_cover , sals_perf_text , sals_perf_cover_paper , sals_perf_text_paper , " +
          " sals_perf_printing , sals_perf_cover_coating , sals_perf_text_coating , sals_perf_printing_volume ) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            // fullname,
            // companyname,
            // tel,
            // emailF,
            printTypeDoc,
            "Perfect Binding",
            check_data[0].data_volume,
            "No",
            FinishedSize,
            CoverPage,
            TextPage,
            CoverPaper,
            TextPaper,
            PrintingColor,
            CoverCoating,
            TextCoating,
            PrintingVolume,
          ]
        );

        // insert sales_summary
        await connection.query(
          "INSERT INTO sales_summary (sals_doc_type , sals_printing_type , sals_amount , sals_quotation_request , sals_send_quotation , sals_ref_id )" +
          " VALUES (?,?,?,?,?,?)",
          [
            printTypeDoc,
            "Perfect Binding",
            check_data[0].data_volume,
            "No",
            "Send",
            new_sals_perf_id
          ]
        );

        res
          .status(200)
          .json({ status: "success", new_sals_perf_id: new_sals_perf_id });
      } else {
        res.status(200).json({ status: "error" });
      }
    });
  }
);

// Perfect Binding Update
router.put(
  "/api/front_all_api/updatePerfectBinding",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fullname, companyname, tel, emailF, eId } = fields;

      await connection.query(
        "UPDATE sales_perfect_binding set sals_perf_fullname = ? , sals_perf_company_name = ? , sals_perf_tel = ? , sals_perf_email = ? WHERE sals_perf_id = ? ",
        [fullname, companyname, tel, emailF, eId]
      );

      // select sals_perf_doc_type
      const [sals_perf_doc_type_chk]: any = await connection.query(
        "SELECT sals_perf_doc_type FROM sales_perfect_binding WHERE sals_perf_id = ?", [eId]
      );

      // update sales_summary perfect binding
      await connection.query(
        "UPDATE sales_summary set sals_fullname = ? , sals_company_name = ? , sals_tel = ? , sals_email = ? WHERE sals_ref_id = ? AND sals_printing_type = ? AND sals_doc_type = ? ",
        [fullname, companyname, tel, emailF, eId, 'Perfect Binding', sals_perf_doc_type_chk[0].sals_perf_doc_type]
      );

      res.status(200).json({ status: "success", new_sals_perf_id: eId });
    });
  }
);

// Perfect Binding Request
router.get(
  "/api/front_all_api/listsPerfectBinding",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { sals_perf_id } = req.query;
    // console.log(sals_perf_id)
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_perfect_binding WHERE sals_perf_id = ${sals_perf_id}`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Perfect Binding Email
router.post(
  "/api/front_all_api/sendmailPerfectBinding",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { Sals_perf_id } = fields;

      try {
        const [response]: any = await connection.query(
          `SELECT * FROM sales_perfect_binding WHERE sals_perf_id = ${Sals_perf_id}`
        );

        // Update Quotation Request
        connection.query(
          `Update sales_perfect_binding set sals_perf_quotation_request = 'Yes' WHERE sals_perf_id = ${Sals_perf_id}`
        );

        // Update sales_summary Quotation Request
        connection.query(
          `Update sales_summary set sals_quotation_request = 'Yes' WHERE sals_ref_id = ${Sals_perf_id} AND sals_printing_type = 'Perfect Binding' `
        );

        // Email
        // const to = response[0].sals_perf_email; // ใช้ mail info@itp.co.th
        // const to = ["apiwat.p@itp.co.th", "yoshics6@gmail.com"];
        // const to = ["yoshics6@gmail.com", "tarntip.m@itp.co.th", "sirorat.b@itp.co.th"];
        const to = ["info@itp.co.th"];
        const subject = "Printing quotation request";

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
        const DataHtml = `Dear Sales manager,
        <br/>
        The following user is interested in our service
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Name – Surname</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_fullname}</td>
          </tr>
          <tr>
            <td> &emsp; Company name</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_company_name}</td>
          </tr>
            <tr>
            <td> &emsp; Phone number</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_tel}</td>
          </tr>
            <tr>
            <td> &emsp; E-mail address</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_email}</td>
          </tr>
        </table>
        <br/>
        Quotation Details
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Document type</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_doc_type}</td>
          </tr>
          <tr>
            <td> &emsp; Printing Type</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_printing_type}</td>
          </tr>
          <tr>
            <td> &emsp; Finished Size</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_finished_size}</td>
          </tr>
          <tr>
            <td> &emsp; Cover page</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_cover}</td>
          </tr>
          <tr>
            <td> &emsp; Text page</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_text}</td>
          </tr>
          <tr>
            <td> &emsp; Cover paper</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_cover_paper}</td>
          </tr>
          <tr>
            <td> &emsp; Text paper</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_text_paper}</td>
          </tr>
          <tr>
            <td> &emsp; Printing color</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_printing}</td>
          </tr>
          <tr>
            <td> &emsp; Cover coating</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_cover_coating}</td>
          </tr>
          <tr>
            <td> &emsp; Text coating</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_text_coating}</td>
          </tr>
          <tr>
            <td> &emsp; Printing volume</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_printing_volume.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
          <tr>
            <td> &emsp; Unit price</td>
            <td width="80%">: &ensp; ${response[0].sals_perf_amount.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
        </table>
        <br/>
        Please contact client shortly.`;

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

        res.status(200).json({ status: "success" });
      } catch {
        res.status(200).json({ status: "error", message: "Invalid Token" });
      }
    });
  }
);

//////////////////////////////////////////////////////////////////////////// End Perfect Binding /////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// Front Folding ///////////////////////////////////////////////////////////////////////////////
// Get SelectBox
router.get(
  "/api/front_all_api/foldinglist",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [fold_finished_size]: any = await connection.query(
        `SELECT DISTINCT fold_finished_size FROM folding order by trim(fold_finished_size) asc`
      );
      res.status(200).json({
        status: "success",
        fold_finished_size: fold_finished_size,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Get SelectBox Filter
router.get(
  "/api/front_all_api/foldinglistfilter",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { fold_finished_size_chk } = req.query;
    const { fold_open_size_chk } = req.query;
    const { fold_column_chk } = req.query;
    const { fold_page_chk } = req.query;
    const { fold_text_paper_chk } = req.query;
    const { fold_printing_chk } = req.query;

    try {
      const [fold_open_size]: any = await connection.query(
        `SELECT DISTINCT fold_open_size FROM folding WHERE fold_finished_size = '${fold_finished_size_chk}' order by fold_open_size asc`
      );
      const [fold_column]: any = await connection.query(
        `SELECT DISTINCT fold_column FROM folding WHERE fold_finished_size = '${fold_finished_size_chk}' AND fold_open_size = '${fold_open_size_chk}' 
        order by fold_column ASC
        `
      );
      const [fold_page]: any = await connection.query(
        `SELECT DISTINCT fold_page FROM folding WHERE fold_finished_size = '${fold_finished_size_chk}' AND fold_open_size = '${fold_open_size_chk}' 
        AND fold_column = '${fold_column_chk}' order by cast(fold_page as unsigned) `
      );
      const [fold_text_paper]: any = await connection.query(
        `SELECT DISTINCT fold_text_paper FROM folding WHERE fold_finished_size = '${fold_finished_size_chk}' AND fold_open_size = '${fold_open_size_chk}' 
        AND fold_column = '${fold_column_chk}' AND fold_page = '${fold_page_chk}' 
        order by fold_text_paper ASC
        `
      );
      const [fold_printing]: any = await connection.query(
        `SELECT DISTINCT fold_printing FROM folding WHERE fold_finished_size = '${fold_finished_size_chk}' AND fold_open_size = '${fold_open_size_chk}' 
        AND fold_column = '${fold_column_chk}' AND fold_page = '${fold_page_chk}' AND fold_text_paper = '${fold_text_paper_chk}' order by fold_printing asc `
      );
      const [fold_text_coating]: any = await connection.query(
        `SELECT DISTINCT fold_text_coating FROM folding WHERE fold_finished_size = '${fold_finished_size_chk}' AND fold_open_size = '${fold_open_size_chk}' 
        AND fold_column = '${fold_column_chk}' AND fold_page = '${fold_page_chk}' AND fold_text_paper = '${fold_text_paper_chk}' 
        AND fold_printing = '${fold_printing_chk}' order by fold_text_coating asc `
      );

      res.status(200).json({
        status: "success",
        fold_open_size: fold_open_size,
        fold_column: fold_column,
        fold_page: fold_page,
        fold_text_paper: fold_text_paper,
        fold_printing: fold_printing,
        fold_text_coating: fold_text_coating,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Folding Add
router.put(
  "/api/front_all_api/addFolding",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        FinishedSize,
        OpenSize,
        Column,
        Page,
        TextPaper,
        PrintingColor,
        TextCoating,
        PrintingVolume,
        printTypeDoc,
        // fullname,
        // companyname,
        // tel,
        // emailF,
      } = fields;

      type Employee = {
        fold_volume: string;
      };

      const fold: Employee = {
        fold_volume: "",
      };

      if (PrintingVolume == "500") {
        fold.fold_volume = "fold_500";
      } else if (PrintingVolume == "1000") {
        fold.fold_volume = "fold_1000";
      } else if (PrintingVolume == "2000") {
        fold.fold_volume = "fold_2000";
      } else if (PrintingVolume == "3000") {
        fold.fold_volume = "fold_3000";
      } else if (PrintingVolume == "4000") {
        fold.fold_volume = "fold_4000";
      } else if (PrintingVolume == "5000") {
        fold.fold_volume = "fold_5000";
      }
      // chk data
      const [check_data]: any = await connection.query(
        "SELECT " +
        fold.fold_volume +
        " as data_volume FROM folding WHERE fold_finished_size = ? AND fold_open_size = ? AND fold_column = ? AND fold_page = ? AND fold_text_paper = ? AND fold_printing = ?" +
        " AND fold_text_coating = ?",
        [
          FinishedSize,
          OpenSize,
          Column,
          Page,
          TextPaper,
          PrintingColor,
          TextCoating,
        ]
      );
      // max_id
      const [check_id]: any = await connection.query(
        "SELECT MAX(sals_fold_id) + 1 as new_sals_fold_id FROM sales_folding"
      );
      const new_sals_fold_id =
        check_id[0].new_sals_fold_id == null ? 1 : check_id[0].new_sals_fold_id;

      if (check_data.length > 0) {
        // sals_fold_fullname , sals_fold_company_name , sals_fold_tel , sals_fold_email ,
        // ?,?,?,?,
        await connection.query(
          "INSERT INTO sales_folding (sals_fold_doc_type , sals_fold_printing_type , " +
          " sals_fold_amount , sals_fold_quotation_request , sals_fold_finished_size , sals_fold_open_size , sals_fold_column , sals_fold_page , sals_fold_text_paper , " +
          " sals_fold_printing , sals_fold_text_coating , sals_fold_printing_volume) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            // fullname,
            // companyname,
            // tel,
            // emailF,
            printTypeDoc,
            "Folding",
            check_data[0].data_volume,
            "No",
            FinishedSize,
            OpenSize,
            Column,
            Page,
            TextPaper,
            PrintingColor,
            TextCoating,
            PrintingVolume,
          ]
        );

        // insert sales_summary
        await connection.query(
          "INSERT INTO sales_summary (sals_doc_type , sals_printing_type , sals_amount , sals_quotation_request , sals_send_quotation , sals_ref_id )" +
          " VALUES (?,?,?,?,?,?)",
          [
            printTypeDoc,
            "Folding",
            check_data[0].data_volume,
            "No",
            "Send",
            new_sals_fold_id
          ]
        );

        res
          .status(200)
          .json({ status: "success", new_sals_fold_id: new_sals_fold_id });
      } else {
        res.status(200).json({ status: "error" });
      }
    });
  }
);

// Folding Update
router.put(
  "/api/front_all_api/updateFolding",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fullname, companyname, tel, emailF, eId } = fields;

      await connection.query(
        "UPDATE sales_folding set sals_fold_fullname = ? , sals_fold_company_name = ? , sals_fold_tel = ? , sals_fold_email = ? WHERE sals_fold_id = ? ",
        [fullname, companyname, tel, emailF, eId]
      );

      // select sals_fold_doc_type
      const [sals_fold_doc_type_chk]: any = await connection.query(
        "SELECT sals_fold_doc_type FROM sales_folding WHERE sals_fold_id = ?", [eId]
      );

      // update sales_summary folding
      await connection.query(
        "UPDATE sales_summary set sals_fullname = ? , sals_company_name = ? , sals_tel = ? , sals_email = ? WHERE sals_ref_id = ? AND sals_printing_type = ? AND sals_doc_type = ? ",
        [fullname, companyname, tel, emailF, eId, 'Folding', sals_fold_doc_type_chk[0].sals_fold_doc_type]
      );

      res.status(200).json({ status: "success", new_sals_fold_id: eId });
    });
  }
);

// Folding Request
router.get(
  "/api/front_all_api/listsFolding",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { sals_fold_id } = req.query;
    // console.log(sals_fold_id)
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_folding WHERE sals_fold_id = ${sals_fold_id}`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Folding Email
router.post(
  "/api/front_all_api/sendmailFolding",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { Sals_fold_id } = fields;

      try {
        const [response]: any = await connection.query(
          `SELECT * FROM sales_folding WHERE sals_fold_id = ${Sals_fold_id}`
        );

        // Update Quotation Request
        connection.query(
          `Update sales_folding set sals_fold_quotation_request = 'Yes' WHERE sals_fold_id = ${Sals_fold_id}`
        );

        // Update sales_summary Quotation Request
        connection.query(
          `Update sales_summary set sals_quotation_request = 'Yes' WHERE sals_ref_id = ${Sals_fold_id} AND sals_printing_type = 'Folding' `
        );

        // Email
        // const to = response[0].sals_fold_email; // ใช้ mail info@itp.co.th
        // const to = ["apiwat.p@itp.co.th", "yoshics6@gmail.com"];
        // const to = ["yoshics6@gmail.com", "tarntip.m@itp.co.th", "sirorat.b@itp.co.th"];
        const to = ["info@itp.co.th"];
        const subject = "Printing quotation request";

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
        const DataHtml = `Dear Sales manager,
        <br/>
        The following user is interested in our service
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Name – Surname</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_fullname}</td>
          </tr>
          <tr>
            <td> &emsp; Company name</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_company_name}</td>
          </tr>
            <tr>
            <td> &emsp; Phone number</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_tel}</td>
          </tr>
            <tr>
            <td> &emsp; E-mail address</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_email}</td>
          </tr>
        </table>
        <br/>
        Quotation Details
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Document type</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_doc_type}</td>
          </tr>
          <tr>
            <td> &emsp; Printing Type</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_printing_type}</td>
          </tr>
          <tr>
            <td> &emsp; Finished Size</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_finished_size}</td>
          </tr>
          <tr>
          <td> &emsp; Open Size</td>
          <td width="80%">: &ensp; ${response[0].sals_fold_open_size}</td>
        </tr>
          <tr>
            <td> &emsp; Fold</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_column}</td>
          </tr>
          <tr>
            <td> &emsp; Page</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_page}</td>
          </tr>
          <tr>
          <td> &emsp; Paper</td>
          <td width="80%">: &ensp; ${response[0].sals_fold_text_paper}</td>
        </tr>
          <tr>
            <td> &emsp; Printing color</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_printing}</td>
          </tr>
          <tr>
            <td> &emsp; Coating</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_text_coating}</td>
          </tr>
          <tr>
            <td> &emsp; Printing volume</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_printing_volume.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
          <tr>
            <td> &emsp; Unit price</td>
            <td width="80%">: &ensp; ${response[0].sals_fold_amount.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
        </table>
        <br/>
        Please contact client shortly.`;

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

        res.status(200).json({ status: "success" });
      } catch {
        res.status(200).json({ status: "error", message: "Invalid Token" });
      }
    });
  }
);

//////////////////////////////////////////////////////////////////////////// End Folding /////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// Front Cutting Sheet /////////////////////////////////////////////////////////////////////////
// Get SelectBox
router.get(
  "/api/front_all_api/cuttingsheetlist",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [cutt_finished_size]: any = await connection.query(
        `SELECT DISTINCT cutt_finished_size FROM cutting_sheet order by trim(cutt_finished_size) asc `
      );
      res.status(200).json({
        status: "success",
        cutt_finished_size: cutt_finished_size,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Get SelectBox Filter
router.get(
  "/api/front_all_api/cuttingsheetlistfilter",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { cutt_finished_size_chk } = req.query;
    const { cutt_page_chk } = req.query;
    const { cutt_text_paper_chk } = req.query;
    const { cutt_printing_chk } = req.query;

    try {
      const [cutt_page]: any = await connection.query(
        `SELECT DISTINCT cutt_page FROM cutting_sheet WHERE cutt_finished_size = '${cutt_finished_size_chk}' order by cast(cutt_page as unsigned) `
      );
      const [cutt_text_paper]: any = await connection.query(
        `SELECT DISTINCT cutt_text_paper FROM cutting_sheet WHERE cutt_finished_size = '${cutt_finished_size_chk}' AND cutt_page = '${cutt_page_chk}'
         order by cutt_text_paper ASC `
      );
      const [cutt_printing]: any = await connection.query(
        `SELECT DISTINCT cutt_printing FROM cutting_sheet WHERE cutt_finished_size = '${cutt_finished_size_chk}' AND cutt_page = '${cutt_page_chk}' 
        AND cutt_text_paper = '${cutt_text_paper_chk}' order by cutt_printing asc `
      );
      const [cutt_text_coating]: any = await connection.query(
        `SELECT DISTINCT cutt_text_coating FROM cutting_sheet WHERE cutt_finished_size = '${cutt_finished_size_chk}' AND cutt_page = '${cutt_page_chk}' 
        AND cutt_text_paper = '${cutt_text_paper_chk}' AND cutt_printing = '${cutt_printing_chk}' order by cutt_text_coating asc `
      );

      res.status(200).json({
        status: "success",
        cutt_page: cutt_page,
        cutt_text_paper: cutt_text_paper,
        cutt_printing: cutt_printing,
        cutt_text_coating: cutt_text_coating,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Cutting Sheet Add
router.put(
  "/api/front_all_api/addCuttingSheet",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        FinishedSize,
        Page,
        TextPaper,
        PrintingColor,
        TextCoating,
        PrintingVolume,
        printTypeDoc,
        // fullname,
        // companyname,
        // tel,
        // emailF,
      } = fields;

      type Employee = {
        cutt_volume: string;
      };

      const cutt: Employee = {
        cutt_volume: "",
      };

      if (PrintingVolume == "500") {
        cutt.cutt_volume = "cutt_500";
      } else if (PrintingVolume == "1000") {
        cutt.cutt_volume = "cutt_1000";
      } else if (PrintingVolume == "2000") {
        cutt.cutt_volume = "cutt_2000";
      } else if (PrintingVolume == "3000") {
        cutt.cutt_volume = "cutt_3000";
      } else if (PrintingVolume == "4000") {
        cutt.cutt_volume = "cutt_4000";
      } else if (PrintingVolume == "5000") {
        cutt.cutt_volume = "cutt_5000";
      }
      // chk data
      const [check_data]: any = await connection.query(
        "SELECT " +
        cutt.cutt_volume +
        " as data_volume FROM cutting_sheet WHERE cutt_finished_size = ? AND cutt_page = ? AND cutt_text_paper = ? AND cutt_printing = ?" +
        " AND cutt_text_coating = ?",
        [
          FinishedSize,
          Page,
          TextPaper,
          PrintingColor,
          TextCoating,
        ]
      );
      // max_id
      const [check_id]: any = await connection.query(
        "SELECT MAX(sals_cutt_id) + 1 as new_sals_cutt_id FROM sales_cutting_sheet"
      );
      const new_sals_cutt_id =
        check_id[0].new_sals_cutt_id == null ? 1 : check_id[0].new_sals_cutt_id;

      if (check_data.length > 0) {
        // sals_cutt_fullname , sals_cutt_company_name , sals_cutt_tel , sals_cutt_email ,
        // ?,?,?,?,
        await connection.query(
          "INSERT INTO sales_cutting_sheet (sals_cutt_doc_type , sals_cutt_printing_type , " +
          " sals_cutt_amount , sals_cutt_quotation_request , sals_cutt_finished_size , sals_cutt_page , sals_cutt_text_paper , " +
          " sals_cutt_printing , sals_cutt_text_coating , sals_cutt_printing_volume) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?)",
          [
            // fullname,
            // companyname,
            // tel,
            // emailF,
            printTypeDoc,
            "Cutting Sheet",
            check_data[0].data_volume,
            "No",
            FinishedSize,
            Page,
            TextPaper,
            PrintingColor,
            TextCoating,
            PrintingVolume,
          ]
        );

        // insert sales_summary
        await connection.query(
          "INSERT INTO sales_summary (sals_doc_type , sals_printing_type , sals_amount , sals_quotation_request , sals_send_quotation , sals_ref_id )" +
          " VALUES (?,?,?,?,?,?)",
          [
            printTypeDoc,
            "Cutting Sheet",
            check_data[0].data_volume,
            "No",
            "Send",
            new_sals_cutt_id
          ]
        );

        res
          .status(200)
          .json({ status: "success", new_sals_cutt_id: new_sals_cutt_id });
      } else {
        res.status(200).json({ status: "error" });
      }
    });
  }
);

// Cutting Sheet Update
router.put(
  "/api/front_all_api/updateCuttingSheet",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fullname, companyname, tel, emailF, eId } = fields;

      await connection.query(
        "UPDATE sales_cutting_sheet set sals_cutt_fullname = ? , sals_cutt_company_name = ? , sals_cutt_tel = ? , sals_cutt_email = ? WHERE sals_cutt_id = ? ",
        [fullname, companyname, tel, emailF, eId]
      );

      // select sals_cutt_doc_type
      const [sals_cutt_doc_type_chk]: any = await connection.query(
        "SELECT sals_cutt_doc_type FROM sales_cutting_sheet WHERE sals_cutt_id = ?", [eId]
      );

      // update sales_summary cutting sheet
      await connection.query(
        "UPDATE sales_summary set sals_fullname = ? , sals_company_name = ? , sals_tel = ? , sals_email = ? WHERE sals_ref_id = ? AND sals_printing_type = ? AND sals_doc_type = ? ",
        [fullname, companyname, tel, emailF, eId, 'Cutting Sheet', sals_cutt_doc_type_chk[0].sals_cutt_doc_type]
      );

      res.status(200).json({ status: "success", new_sals_cutt_id: eId });
    });
  }
);

// Cutting Sheet Request
router.get(
  "/api/front_all_api/listsCuttingSheet",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { sals_cutt_id } = req.query;
    // console.log(sals_cutt_id)
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_cutting_sheet WHERE sals_cutt_id = ${sals_cutt_id}`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Cutting Sheet Email
router.post(
  "/api/front_all_api/sendmailCuttingSheet",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { Sals_cutt_id } = fields;

      try {
        const [response]: any = await connection.query(
          `SELECT * FROM sales_cutting_sheet WHERE sals_cutt_id = ${Sals_cutt_id}`
        );

        // Update Quotation Request
        connection.query(
          `Update sales_cutting_sheet set sals_cutt_quotation_request = 'Yes' WHERE sals_cutt_id = ${Sals_cutt_id}`
        );

        // Update sales_summary Quotation Request
        connection.query(
          `Update sales_summary set sals_quotation_request = 'Yes' WHERE sals_ref_id = ${Sals_cutt_id} AND sals_printing_type = 'Cutting Sheet' `
        );

        // Email
        // const to = response[0].sals_cutt_email; // ใช้ mail info@itp.co.th
        // const to = ["apiwat.p@itp.co.th", "yoshics6@gmail.com"];
        // const to = ["yoshics6@gmail.com", "tarntip.m@itp.co.th", "sirorat.b@itp.co.th"];
        const to = ["info@itp.co.th"];
        const subject = "Printing quotation request";

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
        const DataHtml = `Dear Sales manager,
        <br/>
        The following user is interested in our service
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Name – Surname</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_fullname}</td>
          </tr>
          <tr>
            <td> &emsp; Company name</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_company_name}</td>
          </tr>
            <tr>
            <td> &emsp; Phone number</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_tel}</td>
          </tr>
            <tr>
            <td> &emsp; E-mail address</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_email}</td>
          </tr>
        </table>
        <br/>
        Quotation Details
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Document type</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_doc_type}</td>
          </tr>
          <tr>
            <td> &emsp; Printing Type</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_printing_type}</td>
          </tr>
          <tr>
            <td> &emsp; Finished Size</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_finished_size}</td>
          </tr>
          <tr>
            <td> &emsp; Page</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_page}</td>
          </tr>
          <tr>
          <td> &emsp; Paper</td>
          <td width="80%">: &ensp; ${response[0].sals_cutt_text_paper}</td>
        </tr>
          <tr>
            <td> &emsp; Printing color</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_printing}</td>
          </tr>
          <tr>
            <td> &emsp; Coating</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_text_coating}</td>
          </tr>
          <tr>
            <td> &emsp; Printing volume</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_printing_volume.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
          <tr>
            <td> &emsp; Unit price</td>
            <td width="80%">: &ensp; ${response[0].sals_cutt_amount.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
        </table>
        <br/>
        Please contact client shortly.`;

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

        res.status(200).json({ status: "success" });
      } catch {
        res.status(200).json({ status: "error", message: "Invalid Token" });
      }
    });
  }
);

//////////////////////////////////////////////////////////////////////////// End Cutting Sheet ///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// Front Calendar //////////////////////////////////////////////////////////////////////////////
// Get SelectBox
router.get(
  "/api/front_all_api/calendarlist",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [cale_finished_size]: any = await connection.query(
        `SELECT DISTINCT cale_finished_size FROM calendar order by trim(cale_finished_size) asc `
      );
      res.status(200).json({
        status: "success",
        cale_finished_size: cale_finished_size,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Get SelectBox Filter
router.get(
  "/api/front_all_api/calendarlistfilter",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { cale_finished_size_chk } = req.query;
    const { cale_page_chk } = req.query;
    const { cale_paper_chk } = req.query;
    const { cale_printing_chk } = req.query;
    const { cale_stand_chk } = req.query;
    const { cale_binding_chk } = req.query;

    try {
      const [cale_page]: any = await connection.query(
        `SELECT DISTINCT cale_page FROM calendar WHERE cale_finished_size = '${cale_finished_size_chk}' 
        order by CAST(cale_page as SIGNED) ASC
        `
      );
      const [cale_paper]: any = await connection.query(
        `SELECT DISTINCT cale_paper FROM calendar WHERE cale_finished_size = '${cale_finished_size_chk}' AND cale_page = '${cale_page_chk}' 
        order by cale_paper ASC
        `
      );
      const [cale_printing]: any = await connection.query(
        `SELECT DISTINCT cale_printing FROM calendar WHERE cale_finished_size = '${cale_finished_size_chk}' AND cale_page = '${cale_page_chk}' 
        AND cale_paper = '${cale_paper_chk}' order by cale_printing asc
        `
      );
      const [cale_stand]: any = await connection.query(
        `SELECT DISTINCT cale_stand FROM calendar WHERE cale_finished_size = '${cale_finished_size_chk}' AND cale_page = '${cale_page_chk}' 
        AND cale_paper = '${cale_paper_chk}' AND cale_printing = '${cale_printing_chk}' order by cale_stand asc
        `
      );
      const [cale_binding]: any = await connection.query(
        `SELECT DISTINCT cale_binding FROM calendar WHERE cale_finished_size = '${cale_finished_size_chk}' AND cale_page = '${cale_page_chk}' 
        AND cale_paper = '${cale_paper_chk}' AND cale_printing = '${cale_printing_chk}' AND cale_stand = '${cale_stand_chk}'
        order by cale_binding ASC
        `
      );
      const [cale_o_ring_color]: any = await connection.query(
        `SELECT DISTINCT cale_o_ring_color FROM calendar WHERE cale_finished_size = '${cale_finished_size_chk}' AND cale_page = '${cale_page_chk}' 
        AND cale_paper = '${cale_paper_chk}' AND cale_printing = '${cale_printing_chk}' AND cale_stand = '${cale_stand_chk} '
        AND cale_binding = '${cale_binding_chk}' order by cale_o_ring_color asc
        `
      );
      res.status(200).json({
        status: "success",
        cale_page: cale_page,
        cale_paper: cale_paper,
        cale_printing: cale_printing,
        cale_stand: cale_stand,
        cale_binding: cale_binding,
        cale_o_ring_color: cale_o_ring_color,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Calendar Add
router.put(
  "/api/front_all_api/addCalendar",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        FinishedSize,
        Page,
        Paper,
        PrintingColor,
        Stand,
        Binding,
        OringColor,
        PrintingVolume,
        // fullname,
        // companyname,
        // tel,
        // emailF,
      } = fields;

      type Employee = {
        cale_volume: string;
      };

      const cale: Employee = {
        cale_volume: "",
      };

      if (PrintingVolume == "100") {
        cale.cale_volume = "cale_100";
      } else if (PrintingVolume == "200") {
        cale.cale_volume = "cale_200";
      } else if (PrintingVolume == "300") {
        cale.cale_volume = "cale_300";
      } else if (PrintingVolume == "400") {
        cale.cale_volume = "cale_400";
      } else if (PrintingVolume == "500") {
        cale.cale_volume = "cale_500";
      }
      // chk data
      const [check_data]: any = await connection.query(
        "SELECT " +
        cale.cale_volume +
        " as data_volume FROM calendar WHERE cale_finished_size = ? AND cale_page = ? AND cale_paper = ? AND cale_printing = ? AND cale_stand = ? AND cale_binding = ? AND cale_o_ring_color = ? ",
        [FinishedSize, Page, Paper, PrintingColor, Stand, Binding, OringColor]
      );
      // max_id
      const [check_id]: any = await connection.query(
        "SELECT MAX(sals_cale_id) + 1 as new_sals_cale_id FROM sales_calendar"
      );
      const new_sals_cale_id =
        check_id[0].new_sals_cale_id == null ? 1 : check_id[0].new_sals_cale_id;

      if (check_data.length > 0) {
        // sals_cale_fullname , sals_cale_company_name , sals_cale_tel , sals_cale_email ,
        // ?,?,?,?,
        await connection.query(
          "INSERT INTO sales_calendar (sals_cale_doc_type , sals_cale_printing_type , " +
          " sals_cale_amount , sals_cale_quotation_request , sals_cale_finished_size , sals_cale_page , sals_cale_paper , sals_cale_printing , sals_cale_stand , " +
          " sals_cale_binding , sals_cale_o_ring_color , sals_cale_printing_volume ) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            // fullname,
            // companyname,
            // tel,
            // emailF,
            "Calendar",
            "Calendar",
            check_data[0].data_volume,
            "No",
            FinishedSize,
            Page,
            Paper,
            PrintingColor,
            Stand,
            Binding,
            OringColor,
            PrintingVolume,
          ]
        );

        // insert sales_summary
        await connection.query(
          "INSERT INTO sales_summary (sals_doc_type , sals_printing_type , sals_amount , sals_quotation_request , sals_send_quotation , sals_ref_id )" +
          " VALUES (?,?,?,?,?,?)",
          [
            "Calendar",
            "Calendar",
            check_data[0].data_volume,
            "No",
            "Send",
            new_sals_cale_id
          ]
        );

        res
          .status(200)
          .json({ status: "success", new_sals_cale_id: new_sals_cale_id });
      } else {
        res.status(200).json({ status: "error" });
      }
    });
  }
);

// Calendar Update
router.put(
  "/api/front_all_api/updateCalendar",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fullname, companyname, tel, emailF, eId } = fields;

      await connection.query(
        "UPDATE sales_calendar set sals_cale_fullname = ? , sals_cale_company_name = ? , sals_cale_tel = ? , sals_cale_email = ? WHERE sals_cale_id = ? ",
        [fullname, companyname, tel, emailF, eId]
      );

      // update sales_summary calendar
      await connection.query(
        "UPDATE sales_summary set sals_fullname = ? , sals_company_name = ? , sals_tel = ? , sals_email = ? WHERE sals_ref_id = ? AND sals_printing_type = ? ",
        [fullname, companyname, tel, emailF, eId, 'Calendar']
      );

      res.status(200).json({ status: "success", new_sals_cale_id: eId });
    });
  }
);

// Calendar Request
router.get(
  "/api/front_all_api/listsCalendar",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { sals_cale_id } = req.query;
    // console.log(sals_cale_id)
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_calendar WHERE sals_cale_id = ${sals_cale_id}`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Calendar Email
router.post(
  "/api/front_all_api/sendmailCalendar",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { Sals_cale_id } = fields;

      try {
        const [response]: any = await connection.query(
          `SELECT * FROM sales_calendar WHERE sals_cale_id = ${Sals_cale_id}`
        );

        // Update Quotation Request
        connection.query(
          `Update sales_calendar set sals_cale_quotation_request = 'Yes' WHERE sals_cale_id = ${Sals_cale_id}`
        );

        // Update sales_summary Quotation Request
        connection.query(
          `Update sales_summary set sals_quotation_request = 'Yes' WHERE sals_ref_id = ${Sals_cale_id} AND sals_printing_type = 'Calendar' `
        );

        // Email
        // const to = response[0].sals_cale_email; // ใช้ mail info@itp.co.th
        // const to = ["apiwat.p@itp.co.th", "yoshics6@gmail.com"];
        // const to = ["yoshics6@gmail.com", "tarntip.m@itp.co.th", "sirorat.b@itp.co.th"];
        const to = ["info@itp.co.th"];
        const subject = "Printing quotation request";

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
        const DataHtml = `Dear Sales manager,
        <br/>
        The following user is interested in our service
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Name – Surname</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_fullname}</td>
          </tr>
          <tr>
            <td> &emsp; Company name</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_company_name}</td>
          </tr>
            <tr>
            <td> &emsp; Phone number</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_tel}</td>
          </tr>
            <tr>
            <td> &emsp; E-mail address</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_email}</td>
          </tr>
        </table>
        <br/>
        Quotation Details
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Document type</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_doc_type}</td>
          </tr>
          <tr>
            <td> &emsp; Printing Type</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_printing_type}</td>
          </tr>
          <tr>
            <td> &emsp; Finished Size</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_finished_size}</td>
          </tr>
            <tr>
            <td> &emsp; Page</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_page}</td>
          </tr>
            <tr>
            <td> &emsp; Paper</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_paper}</td>
          </tr>
          <tr>
            <td> &emsp; Printing color</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_printing}</td>
          </tr>
          <tr>
          <td> &emsp; Stand</td>
          <td width="80%">: &ensp; ${response[0].sals_cale_stand}</td>
          </tr>
          <tr>
            <td> &emsp; Binding</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_binding}</td>
          </tr>
          <tr>
            <td> &emsp; O ring Color</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_o_ring_color}</td>
          </tr>
            <tr>
            <td> &emsp; Printing volume</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_printing_volume.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
            <tr>
            <td> &emsp; Unit price</td>
            <td width="80%">: &ensp; ${response[0].sals_cale_amount.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
        </table>
        <br/>
        Please contact client shortly.`;

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

        res.status(200).json({ status: "success" });
      } catch {
        res.status(200).json({ status: "error", message: "Invalid Token" });
      }
    });
  }
);

//////////////////////////////////////////////////////////////////////////// End Calendar ////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// Front Paper Bag //////////////////////////////////////////////////////////////////////////////
// Get SelectBox
router.get(
  "/api/front_all_api/paperbaglist",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [papb_finished_size]: any = await connection.query(
        `SELECT DISTINCT papb_finished_size FROM paper_bag order by papb_finished_size asc`
      );
      res.status(200).json({
        status: "success",
        papb_finished_size: papb_finished_size,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Get SelectBox Filter
router.get(
  "/api/front_all_api/paperbaglistfilter",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { papb_finished_size_chk } = req.query;
    // const { papb_page_chk } = req.query;
    const { papb_paper_chk } = req.query;
    const { papb_printing_chk } = req.query;
    const { papb_coating_chk } = req.query;

    try {
      // const [papb_page]: any = await connection.query(
      //   `SELECT DISTINCT papb_page FROM paper_bag WHERE papb_finished_size = '${papb_finished_size_chk}' order by papb_page `
      // );
      // const [papb_paper]: any = await connection.query(
      //   `SELECT DISTINCT papb_paper FROM paper_bag WHERE papb_finished_size = '${papb_finished_size_chk}' AND papb_page = '${papb_page_chk}' order by papb_paper `
      // );
      const [papb_paper]: any = await connection.query(
        `SELECT DISTINCT papb_paper FROM paper_bag WHERE papb_finished_size = '${papb_finished_size_chk}' 
        order by papb_paper ASC
        `
      );
      const [papb_printing]: any = await connection.query(
        `SELECT DISTINCT papb_printing FROM paper_bag WHERE papb_finished_size = '${papb_finished_size_chk}'  
        AND papb_paper = '${papb_paper_chk}' order by papb_printing asc
        `
      ); // AND papb_page = '${papb_page_chk}'
      const [papb_coating]: any = await connection.query(
        `SELECT DISTINCT papb_coating FROM paper_bag WHERE papb_finished_size = '${papb_finished_size_chk}'
        AND papb_paper = '${papb_paper_chk}' AND papb_printing = '${papb_printing_chk}' order by papb_coating asc
        `
      ); // AND papb_page = '${papb_page_chk}' 
      const [papb_binding]: any = await connection.query(
        `SELECT DISTINCT papb_binding FROM paper_bag WHERE papb_finished_size = '${papb_finished_size_chk}'  
        AND papb_paper = '${papb_paper_chk}' AND papb_printing = '${papb_printing_chk}' AND papb_coating = '${papb_coating_chk}' 
        order by papb_binding ASC
        `
      ); // AND papb_page = '${papb_page_chk}'
      res.status(200).json({
        status: "success",
        // papb_page: papb_page,
        papb_paper: papb_paper,
        papb_printing: papb_printing,
        papb_coating: papb_coating,
        papb_binding: papb_binding,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Paper Bag Add
router.put(
  "/api/front_all_api/addPaperBag",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        FinishedSize,
        // Page,
        Paper,
        PrintingColor,
        Coating,
        Binding,
        PrintingVolume,
        // fullname,
        // companyname,
        // tel,
        // emailF,
      } = fields;

      type Employee = {
        papb_volume: string;
      };

      const papb: Employee = {
        papb_volume: "",
      };

      if (PrintingVolume == "100") {
        papb.papb_volume = "papb_100";
      } else if (PrintingVolume == "200") {
        papb.papb_volume = "papb_200";
      } else if (PrintingVolume == "300") {
        papb.papb_volume = "papb_300";
      } else if (PrintingVolume == "400") {
        papb.papb_volume = "papb_400";
      } else if (PrintingVolume == "500") {
        papb.papb_volume = "papb_500";
      }
      // chk data
      const [check_data]: any = await connection.query(
        "SELECT " +
        papb.papb_volume +
        " as data_volume FROM paper_bag WHERE papb_finished_size = ? AND papb_page = ? AND papb_paper = ? AND papb_printing = ? AND papb_coating = ? AND papb_binding = ?",
        [FinishedSize, 1, Paper, PrintingColor, Coating, Binding]
      );
      // max_id
      const [check_id]: any = await connection.query(
        "SELECT MAX(sals_papb_id) + 1 as new_sals_papb_id FROM sales_paper_bag"
      );
      const new_sals_papb_id =
        check_id[0].new_sals_papb_id == null ? 1 : check_id[0].new_sals_papb_id;

      if (check_data.length > 0) {
        // sals_papb_fullname , sals_papb_company_name , sals_papb_tel , sals_papb_email ,
        // ?,?,?,?,
        await connection.query(
          "INSERT INTO sales_paper_bag (sals_papb_doc_type , sals_papb_printing_type , " +
          " sals_papb_amount , sals_papb_quotation_request , sals_papb_finished_size , sals_papb_page , sals_papb_paper , sals_papb_printing , sals_papb_coating , " +
          " sals_papb_binding , sals_papb_printing_volume ) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?,?)",
          [
            // fullname,
            // companyname,
            // tel,
            // emailF,
            "Paper Bag",
            "Paper Bag",
            check_data[0].data_volume,
            "No",
            FinishedSize,
            1, // Page,
            Paper,
            PrintingColor,
            Coating,
            Binding,
            PrintingVolume,
          ]
        );

        // insert sales_summary
        await connection.query(
          "INSERT INTO sales_summary (sals_doc_type , sals_printing_type , sals_amount , sals_quotation_request , sals_send_quotation , sals_ref_id )" +
          " VALUES (?,?,?,?,?,?)",
          [
            "Paper Bag",
            "Paper Bag",
            check_data[0].data_volume,
            "No",
            "Send",
            new_sals_papb_id
          ]
        );

        res
          .status(200)
          .json({ status: "success", new_sals_papb_id: new_sals_papb_id });
      } else {
        res.status(200).json({ status: "error" });
      }
    });
  }
);

// Paper Bag Update
router.put(
  "/api/front_all_api/updatePaperBag",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fullname, companyname, tel, emailF, eId } = fields;

      await connection.query(
        "UPDATE sales_paper_bag set sals_papb_fullname = ? , sals_papb_company_name = ? , sals_papb_tel = ? , sals_papb_email = ? WHERE sals_papb_id = ? ",
        [fullname, companyname, tel, emailF, eId]
      );

      // update sales_summary paper bag
      await connection.query(
        "UPDATE sales_summary set sals_fullname = ? , sals_company_name = ? , sals_tel = ? , sals_email = ? WHERE sals_ref_id = ? AND sals_printing_type = ? ",
        [fullname, companyname, tel, emailF, eId, 'Paper Bag']
      );

      res.status(200).json({ status: "success", new_sals_papb_id: eId });
    });
  }
);

// Paper Bag Request
router.get(
  "/api/front_all_api/listsPaperBag",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { sals_papb_id } = req.query;
    // console.log(sals_papb_id)
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_paper_bag WHERE sals_papb_id = ${sals_papb_id}`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Paper Bag Email
router.post(
  "/api/front_all_api/sendmailPaperBag",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { Sals_papb_id } = fields;

      try {
        const [response]: any = await connection.query(
          `SELECT * FROM sales_paper_bag WHERE sals_papb_id = ${Sals_papb_id}`
        );

        // Update Quotation Request
        connection.query(
          `Update sales_paper_bag set sals_papb_quotation_request = 'Yes' WHERE sals_papb_id = ${Sals_papb_id}`
        );

        // Update sales_summary Quotation Request
        connection.query(
          `Update sales_summary set sals_quotation_request = 'Yes' WHERE sals_ref_id = ${Sals_papb_id} AND sals_printing_type = 'Paper Bag' `
        );

        // Email
        // const to = response[0].sals_papb_email; // ใช้ mail info@itp.co.th
        // const to = ["apiwat.p@itp.co.th", "yoshics6@gmail.com"];
        // const to = ["yoshics6@gmail.com", "tarntip.m@itp.co.th", "sirorat.b@itp.co.th"];
        const to = ["info@itp.co.th"];
        const subject = "Printing quotation request";

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
        const DataHtml = `Dear Sales manager,
        <br/>
        The following user is interested in our service
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Name – Surname</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_fullname}</td>
          </tr>
          <tr>
            <td> &emsp; Company name</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_company_name}</td>
          </tr>
            <tr>
            <td> &emsp; Phone number</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_tel}</td>
          </tr>
            <tr>
            <td> &emsp; E-mail address</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_email}</td>
          </tr>
        </table>
        <br/>
        Quotation Details
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Document type</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_doc_type}</td>
          </tr>
          <tr>
            <td> &emsp; Printing Type</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_printing_type}</td>
          </tr>
          <tr>
            <td> &emsp; Finished Size</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_finished_size}</td>
          </tr>
          <tr>
            <td> &emsp; Paper</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_paper}</td>
          </tr>
          <tr>
            <td> &emsp; Printing color</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_printing}</td>
          </tr>
          <tr>
          <td> &emsp; Coating</td>
          <td width="80%">: &ensp; ${response[0].sals_papb_coating}</td>
          </tr>
          <tr>
            <td> &emsp; Binding</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_binding}</td>
          </tr>
            <tr>
            <td> &emsp; Printing volume</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_printing_volume.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
            <tr>
            <td> &emsp; Unit price</td>
            <td width="80%">: &ensp; ${response[0].sals_papb_amount.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
        </table>
        <br/>
        Please contact client shortly.`;

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

        res.status(200).json({ status: "success" });
      } catch {
        res.status(200).json({ status: "error", message: "Invalid Token" });
      }
    });
  }
);

//////////////////////////////////////////////////////////////////////////// End Paper Bag ////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// Front Plastic File ////////////////////////////////////////////////////////////////////////////
// Get SelectBox
router.get(
  "/api/front_all_api/plasticfilelist",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [plas_finished_size]: any = await connection.query(
        `SELECT DISTINCT plas_finished_size FROM plastic_file order by plas_finished_size asc`
      );
      res.status(200).json({
        status: "success",
        plas_finished_size: plas_finished_size,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Get SelectBox Filter
router.get(
  "/api/front_all_api/plasticfilelistfilter",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { plas_finished_size_chk } = req.query;
    // const { plas_page_chk } = req.query;
    const { plas_paper_chk } = req.query;
    const { plas_printing_chk } = req.query;

    try {
      // const [plas_page]: any = await connection.query(
      //   `SELECT DISTINCT plas_page FROM plastic_file WHERE plas_finished_size = '${plas_finished_size_chk}' `
      // );
      // const [plas_paper]: any = await connection.query(
      //   `SELECT DISTINCT plas_paper FROM plastic_file WHERE plas_finished_size = '${plas_finished_size_chk}' AND plas_page = '${plas_page_chk}' `
      // );
      const [plas_paper]: any = await connection.query(
        `SELECT DISTINCT plas_paper FROM plastic_file WHERE plas_finished_size = '${plas_finished_size_chk}' order by plas_paper asc `
      );
      const [plas_printing]: any = await connection.query(
        `SELECT DISTINCT plas_printing FROM plastic_file WHERE plas_finished_size = '${plas_finished_size_chk}'  
        AND plas_paper = '${plas_paper_chk}' order by plas_printing asc
        `
      ); // AND plas_page = '${plas_page_chk}'
      const [plas_binding]: any = await connection.query(
        `SELECT DISTINCT plas_binding FROM plastic_file WHERE plas_finished_size = '${plas_finished_size_chk}' 
        AND plas_paper = '${plas_paper_chk}' AND plas_printing = '${plas_printing_chk}' order by plas_binding asc
        `
      ); // AND plas_page = '${plas_page_chk}' 
      res.status(200).json({
        status: "success",
        // plas_page: plas_page,
        plas_paper: plas_paper,
        plas_printing: plas_printing,
        plas_binding: plas_binding,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Plastic File Add
router.put(
  "/api/front_all_api/addPlasticFile",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        FinishedSize,
        // Page,
        Paper,
        PrintingColor,
        Binding,
        PrintingVolume,
        // fullname,
        // companyname,
        // tel,
        // emailF,
      } = fields;

      type Employee = {
        plas_volume: string;
      };

      const plas: Employee = {
        plas_volume: "",
      };

      if (PrintingVolume == "1000") {
        plas.plas_volume = "plas_1000";
      } else if (PrintingVolume == "2000") {
        plas.plas_volume = "plas_2000";
      } else if (PrintingVolume == "3000") {
        plas.plas_volume = "plas_3000";
      } else if (PrintingVolume == "4000") {
        plas.plas_volume = "plas_4000";
      } else if (PrintingVolume == "5000") {
        plas.plas_volume = "plas_5000";
      }
      // chk data
      const [check_data]: any = await connection.query(
        "SELECT " +
        plas.plas_volume +
        " as data_volume FROM plastic_file WHERE plas_finished_size = ? AND plas_page = ? AND plas_paper = ? AND plas_printing = ? AND plas_binding = ?",
        [FinishedSize, 1, Paper, PrintingColor, Binding]
      );
      // max_id
      const [check_id]: any = await connection.query(
        "SELECT MAX(sals_plas_id) + 1 as new_sals_plas_id FROM sales_plastic_file"
      );
      const new_sals_plas_id =
        check_id[0].new_sals_plas_id == null ? 1 : check_id[0].new_sals_plas_id;

      if (check_data.length > 0) {
        // sals_plas_fullname , sals_plas_company_name , sals_plas_tel , sals_plas_email ,
        // ?,?,?,?,
        await connection.query(
          "INSERT INTO sales_plastic_file (sals_plas_doc_type , sals_plas_printing_type , " +
          " sals_plas_amount , sals_plas_quotation_request , sals_plas_finished_size , sals_plas_page , sals_plas_paper , sals_plas_printing , sals_plas_binding , " +
          " sals_plas_printing_volume ) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?)",
          [
            // fullname,
            // companyname,
            // tel,
            // emailF,
            "Plastic File",
            "Plastic File",
            check_data[0].data_volume,
            "No",
            FinishedSize,
            1, // Page,
            Paper,
            PrintingColor,
            Binding,
            PrintingVolume,
          ]
        );

        // insert sales_summary
        await connection.query(
          "INSERT INTO sales_summary (sals_doc_type , sals_printing_type , sals_amount , sals_quotation_request , sals_send_quotation , sals_ref_id )" +
          " VALUES (?,?,?,?,?,?)",
          [
            "Plastic File",
            "Plastic File",
            check_data[0].data_volume,
            "No",
            "Send",
            new_sals_plas_id
          ]
        );

        res
          .status(200)
          .json({ status: "success", new_sals_plas_id: new_sals_plas_id });
      } else {
        res.status(200).json({ status: "error" });
      }
    });
  }
);

// Plastic File Update
router.put(
  "/api/front_all_api/updatePlasticFile",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fullname, companyname, tel, emailF, eId } = fields;

      await connection.query(
        "UPDATE sales_plastic_file set sals_plas_fullname = ? , sals_plas_company_name = ? , sals_plas_tel = ? , sals_plas_email = ? WHERE sals_plas_id = ? ",
        [fullname, companyname, tel, emailF, eId]
      );

      // update sales_summary plastic file
      await connection.query(
        "UPDATE sales_summary set sals_fullname = ? , sals_company_name = ? , sals_tel = ? , sals_email = ? WHERE sals_ref_id = ? AND sals_printing_type = ? ",
        [fullname, companyname, tel, emailF, eId, 'Plastic File']
      );

      res.status(200).json({ status: "success", new_sals_plas_id: eId });
    });
  }
);

// Plastic File Request
router.get(
  "/api/front_all_api/listsPlasticFile",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { sals_plas_id } = req.query;
    // console.log(sals_plas_id)
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_plastic_file WHERE sals_plas_id = ${sals_plas_id}`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Plastic File Email
router.post(
  "/api/front_all_api/sendmailPlasticFile",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { Sals_plas_id } = fields;

      try {
        const [response]: any = await connection.query(
          `SELECT * FROM sales_plastic_file WHERE sals_plas_id = ${Sals_plas_id}`
        );

        // Update Quotation Request
        connection.query(
          `Update sales_plastic_file set sals_plas_quotation_request = 'Yes' WHERE sals_plas_id = ${Sals_plas_id}`
        );

        // Update sales_summary Quotation Request
        connection.query(
          `Update sales_summary set sals_quotation_request = 'Yes' WHERE sals_ref_id = ${Sals_plas_id} AND sals_printing_type = 'Plastic File' `
        );

        // Email
        // const to = response[0].sals_plas_email; // ใช้ mail info@itp.co.th
        // const to = ["apiwat.p@itp.co.th", "yoshics6@gmail.com"];
        // const to = ["yoshics6@gmail.com", "tarntip.m@itp.co.th", "sirorat.b@itp.co.th"];
        const to = ["info@itp.co.th"];
        const subject = "Printing quotation request";

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
        const DataHtml = `Dear Sales manager,
        <br/>
        The following user is interested in our service
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Name – Surname</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_fullname}</td>
          </tr>
          <tr>
            <td> &emsp; Company name</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_company_name}</td>
          </tr>
            <tr>
            <td> &emsp; Phone number</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_tel}</td>
          </tr>
            <tr>
            <td> &emsp; E-mail address</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_email}</td>
          </tr>
        </table>
        <br/>
        Quotation Details
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Document type</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_doc_type}</td>
          </tr>
          <tr>
            <td> &emsp; Printing Type</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_printing_type}</td>
          </tr>
          <tr>
            <td> &emsp; Finished Size</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_finished_size}</td>
          </tr>
            <tr>
            <td> &emsp; Paper</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_paper}</td>
          </tr>
          <tr>
            <td> &emsp; Printing color</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_printing}</td>
          </tr>
          <tr>
            <td> &emsp; Binding</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_binding}</td>
          </tr>
            <tr>
            <td> &emsp; Printing volume</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_printing_volume.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
            <tr>
            <td> &emsp; Unit price</td>
            <td width="80%">: &ensp; ${response[0].sals_plas_amount.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
        </table>
        <br/>
        Please contact client shortly.`;

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

        res.status(200).json({ status: "success" });
      } catch {
        res.status(200).json({ status: "error", message: "Invalid Token" });
      }
    });
  }
);

//////////////////////////////////////////////////////////////////////////// End Plastic File /////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// Front Envelope ////////////////////////////////////////////////////////////////////////////
// Get SelectBox
router.get(
  "/api/front_all_api/envelopelist",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const [enve_finished_size]: any = await connection.query(
        `SELECT DISTINCT enve_finished_size FROM envelope order by enve_finished_size asc `
      );
      res.status(200).json({
        status: "success",
        enve_finished_size: enve_finished_size,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Get SelectBox Filter
router.get(
  "/api/front_all_api/envelopelistfilter",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { enve_finished_size_chk } = req.query;
    const { enve_page_chk } = req.query;
    const { enve_paper_chk } = req.query;
    const { enve_printing_chk } = req.query;

    try {
      const [enve_page]: any = await connection.query(
        `SELECT DISTINCT enve_page FROM envelope WHERE enve_finished_size = '${enve_finished_size_chk}' order by cast(enve_page as unsigned) `
      );
      const [enve_paper]: any = await connection.query(
        `SELECT DISTINCT enve_paper FROM envelope WHERE enve_finished_size = '${enve_finished_size_chk}' AND enve_page = '${enve_page_chk}' order by enve_paper asc `
      );
      const [enve_printing]: any = await connection.query(
        `SELECT DISTINCT enve_printing FROM envelope WHERE enve_finished_size = '${enve_finished_size_chk}' AND enve_page = '${enve_page_chk}' 
        AND enve_paper = '${enve_paper_chk}' order by enve_printing asc
        `
      );
      const [enve_coating]: any = await connection.query(
        `SELECT DISTINCT enve_coating FROM envelope WHERE enve_finished_size = '${enve_finished_size_chk}' AND enve_page = '${enve_page_chk}' 
        AND enve_paper = '${enve_paper_chk}' AND enve_printing = '${enve_printing_chk}' order by enve_coating asc
        `
      );
      res.status(200).json({
        status: "success",
        enve_page: enve_page,
        enve_paper: enve_paper,
        enve_printing: enve_printing,
        enve_coating: enve_coating,
      });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Envelope Add
router.put(
  "/api/front_all_api/addEnvelope",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const {
        FinishedSize,
        Page,
        Paper,
        PrintingColor,
        Coating,
        PrintingVolume,
        // fullname,
        // companyname,
        // tel,
        // emailF,
      } = fields;

      type Employee = {
        enve_volume: string;
      };

      const enve: Employee = {
        enve_volume: "",
      };

      if (PrintingVolume == "1000") {
        enve.enve_volume = "enve_1000";
      } else if (PrintingVolume == "2000") {
        enve.enve_volume = "enve_2000";
      } else if (PrintingVolume == "3000") {
        enve.enve_volume = "enve_3000";
      } else if (PrintingVolume == "4000") {
        enve.enve_volume = "enve_4000";
      } else if (PrintingVolume == "5000") {
        enve.enve_volume = "enve_5000";
      }
      // chk data
      const [check_data]: any = await connection.query(
        "SELECT " +
        enve.enve_volume +
        " as data_volume FROM envelope WHERE enve_finished_size = ? AND enve_page = ? AND enve_paper = ? AND enve_printing = ? AND enve_coating = ?",
        [FinishedSize, Page, Paper, PrintingColor, Coating]
      );
      // max_id
      const [check_id]: any = await connection.query(
        "SELECT MAX(sals_enve_id) + 1 as new_sals_enve_id FROM sales_envelope"
      );
      const new_sals_enve_id =
        check_id[0].new_sals_enve_id == null ? 1 : check_id[0].new_sals_enve_id;

      if (check_data.length > 0) {
        // sals_enve_fullname , sals_enve_company_name , sals_enve_tel , sals_enve_email ,
        // ?,?,?,?,
        await connection.query(
          "INSERT INTO sales_envelope (sals_enve_doc_type , sals_enve_printing_type , " +
          " sals_enve_amount , sals_enve_quotation_request , sals_enve_finished_size , sals_enve_page , sals_enve_paper , sals_enve_printing , sals_enve_coating , " +
          " sals_enve_printing_volume ) " +
          " VALUES (?,?,?,?,?,?,?,?,?,?)",
          [
            // fullname,
            // companyname,
            // tel,
            // emailF,
            "Envelope",
            "Envelope",
            check_data[0].data_volume,
            "No",
            FinishedSize,
            Page,
            Paper,
            PrintingColor,
            Coating,
            PrintingVolume,
          ]
        );

        // insert sales_summary
        await connection.query(
          "INSERT INTO sales_summary (sals_doc_type , sals_printing_type , sals_amount , sals_quotation_request , sals_send_quotation , sals_ref_id )" +
          " VALUES (?,?,?,?,?,?)",
          [
            "Envelope",
            "Envelope",
            check_data[0].data_volume,
            "No",
            "Send",
            new_sals_enve_id
          ]
        );

        res
          .status(200)
          .json({ status: "success", new_sals_enve_id: new_sals_enve_id });
      } else {
        res.status(200).json({ status: "error" });
      }
    });
  }
);

// Envelope Update
router.put(
  "/api/front_all_api/updateEnvelope",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fullname, companyname, tel, emailF, eId } = fields;

      await connection.query(
        "UPDATE sales_envelope set sals_enve_fullname = ? , sals_enve_company_name = ? , sals_enve_tel = ? , sals_enve_email = ? WHERE sals_enve_id = ? ",
        [fullname, companyname, tel, emailF, eId]
      );

      // update sales_summary envelope
      await connection.query(
        "UPDATE sales_summary set sals_fullname = ? , sals_company_name = ? , sals_tel = ? , sals_email = ? WHERE sals_ref_id = ? AND sals_printing_type = ? ",
        [fullname, companyname, tel, emailF, eId, 'Envelope']
      );

      res.status(200).json({ status: "success", new_sals_enve_id: eId });
    });
  }
);

// Envelope Request
router.get(
  "/api/front_all_api/listsEnvelope",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { sals_enve_id } = req.query;
    // console.log(sals_enve_id)
    try {
      const [response]: any = await connection.query(
        `SELECT * FROM sales_envelope WHERE sals_enve_id = ${sals_enve_id}`
      );
      res.status(200).json({ status: "success", data: response });
    } catch {
      res.status(200).json({ status: "error", message: "Invalid Token" });
    }
  }
);

// Envelope Email
router.post(
  "/api/front_all_api/sendmailEnvelope",
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { Sals_enve_id } = fields;

      try {
        const [response]: any = await connection.query(
          `SELECT * FROM sales_envelope WHERE sals_enve_id = ${Sals_enve_id}`
        );

        // Update Quotation Request
        connection.query(
          `Update sales_envelope set sals_enve_quotation_request = 'Yes' WHERE sals_enve_id = ${Sals_enve_id}`
        );

        // Update sales_summary Quotation Request
        connection.query(
          `Update sales_summary set sals_quotation_request = 'Yes' WHERE sals_ref_id = ${Sals_enve_id} AND sals_printing_type = 'Envelope' `
        );

        // Email
        // const to = response[0].sals_enve_email; // ใช้ mail info@itp.co.th
        // const to = ["apiwat.p@itp.co.th", "yoshics6@gmail.com"];
        // const to = ["yoshics6@gmail.com", "tarntip.m@itp.co.th", "sirorat.b@itp.co.th"];
        const to = ["info@itp.co.th"];
        const subject = "Printing quotation request";

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
        const DataHtml = `Dear Sales manager,
        <br/>
        The following user is interested in our service
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Name – Surname</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_fullname}</td>
          </tr>
          <tr>
            <td> &emsp; Company name</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_company_name}</td>
          </tr>
            <tr>
            <td> &emsp; Phone number</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_tel}</td>
          </tr>
            <tr>
            <td> &emsp; E-mail address</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_email}</td>
          </tr>
        </table>
        <br/>
        Quotation Details
        <br/><br/>
        <table style="width:100%">
          <tr>
            <td> &emsp; Document type</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_doc_type}</td>
          </tr>
          <tr>
            <td> &emsp; Printing Type</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_printing_type}</td>
          </tr>
          <tr>
            <td> &emsp; Finished Size</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_finished_size}</td>
          </tr>
            <tr>
            <td> &emsp; Page</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_page}</td>
          </tr>
            <tr>
            <td> &emsp; Paper</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_paper}</td>
          </tr>
          <tr>
            <td> &emsp; Printing color</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_printing}</td>
          </tr>
          <tr>
            <td> &emsp; Coating</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_coating}</td>
          </tr>
            <tr>
            <td> &emsp; Printing volume</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_printing_volume.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
            <tr>
            <td> &emsp; Unit price</td>
            <td width="80%">: &ensp; ${response[0].sals_enve_amount.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )}</td>
          </tr>
        </table>
        <br/>
        Please contact client shortly.`;

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

        res.status(200).json({ status: "success" });
      } catch {
        res.status(200).json({ status: "error", message: "Invalid Token" });
      }
    });
  }
);

//////////////////////////////////////////////////////////////////////////// End Front Envelope ////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// Front Contact ////////////////////////////////////////////////////////////////////////////////
// Contact Request
router.put(
  "/api/front_all_api/addContact",
  async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { fullname, companyname, tel, emailF, detail } = fields;

      await connection.query(
        "INSERT INTO contact (contact_fullname , contact_company_name , contact_phone_number , contact_email , contact_detail) " +
        " VALUES (?,?,?,?,?)",
        [fullname, companyname, tel, emailF, detail]
      );

      // Email
      // const to = emailF; // ใช้ mail info@itp.co.th
      // const to = ["yoshics6@gmail.com"];
      // const to = ["yoshics6@gmail.com", "tarntip.m@itp.co.th", "sirorat.b@itp.co.th"];
      const to = ["info@itp.co.th"];
      const subject = "Printing quotation request";

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
      // const DataHtml = `Dear Sales manager,
      // <br/>
      // The following user is interested in our service
      // <br/><br/>
      // <table style="width:100%">
      //   <tr>
      //     <td> &emsp; Name – Surname</td>
      //     <td width="80%">: &ensp; ${fullname}</td>
      //   </tr>
      //   <tr>
      //     <td> &emsp; Company name</td>
      //     <td width="80%">: &ensp; ${companyname}</td>
      //   </tr>
      //     <tr>
      //     <td> &emsp; Phone number</td>
      //     <td width="80%">: &ensp; ${tel}</td>
      //   </tr>
      //     <tr>
      //     <td> &emsp; E-mail address</td>
      //     <td width="80%">: &ensp; ${emailF}</td>
      //   </tr>
      // </table>
      // <br/>
      // Quotation Details
      // <table style="width:100%">
      //   <tr>
      //     <td width="1%"></td>
      //     <td width="50%">${detail}</td>
      //     <td width="50%"></td>
      //   </tr>
      // </table>
      // <br/>
      // Please contact client shortly.`;

      const DataHtml = `Dear Sales manage\n The following user is interested in our service\n\n Name – Surname : ${fullname} \n\n Company name : ${companyname} \n\n Phone number : ${tel} \n\n E-mail address : ${emailF} \n\n Quotation Details\n${detail} \n\nPlease contact client shortly.`;

      const mailData = {
        from: from,
        to: to,
        subject: subject,
        text: DataHtml,
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

      res.status(200).json({ status: "success" });
    });
  }
);

//////////////////////////////////////////////////////////////////////////// End Contact //////////////////////////////////////////////////////////////////////////////////

export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
});
