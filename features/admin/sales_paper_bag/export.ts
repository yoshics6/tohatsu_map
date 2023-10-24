import * as Excel from "exceljs";
import { saveAs } from "file-saver";

export default async function saveAsExcel({ rows }: any) {
  const wb = new Excel.Workbook();

  const ws = wb.addWorksheet();

  ws.columns = [
    { width: 5 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    // { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
  ];
  const row: any = ws.addRow([
    "No",
    "Date",
    "Name - Surname",
    "Company Name",
    "Phone no.",
    "E-mail",
    "Document Type",
    "Printing Type",
    "Amount (THB)",
    "Quotation Request",
    "Finished Size",
    // "Page",
    "Paper",
    "Printing Color",
    "Coating",
    "Binding",
    "Printing Volume",
    "Quotation Sending",
  ]);
  row.font = {
    bold: true,
  };
  let content: any;

  await Promise.all(
    rows.map(async (item: any, index: any): Promise<any> => {
      const no = index + 1;
      const link_row = index + 2;
      content = ws.addRow([
        no,
        item.sals_papb_date,
        item.sals_papb_fullname,
        item.sals_papb_company_name,
        item.sals_papb_tel,
        item.sals_papb_email,
        item.sals_papb_doc_type,
        item.sals_papb_printing_type,
        item.sals_papb_amount.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        }),
        item.sals_papb_quotation_request,
        item.sals_papb_finished_size,
        // item.sals_papb_page,
        item.sals_papb_paper,
        item.sals_papb_printing,
        item.sals_papb_coating,
        item.sals_papb_binding,
        item.sals_papb_printing_volume.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        }),
        item.sals_papb_quotation_request != 'No' ? item.sals_send_quotation == 'Send' ? 'Wait sending' : item.sals_send_quotation : '-',
      ]);

      // if (item.file != "") {
      //   ws.getCell("L" + link_row).value = {
      //     text: "Download",
      //     hyperlink: item.file,
      //   };
      //   ws.getCell("L" + link_row).font = {
      //     color: { argb: "004e47cc" },
      //     underline: true,
      //   };
      // }

      content.height = 20;
    })
  );

  ws.eachRow(function (row: any, index: any) {
    row.alignment = { vertical: "middle", horizontal: "center" };
  });
  const buf = await wb.xlsx.writeBuffer();
  await saveAs(new Blob([buf]), "Sales Paper Bag.xlsx");
}
