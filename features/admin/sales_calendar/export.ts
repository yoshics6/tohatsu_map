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
    { width: 30 },
    { width: 30 },
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
    "Page",
    "Paper",
    "Printing Color",
    "Stand",
    "Binding",
    "O ring Color",
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
        item.sals_cale_date,
        item.sals_cale_fullname,
        item.sals_cale_company_name,
        item.sals_cale_tel,
        item.sals_cale_email,
        item.sals_cale_doc_type,
        item.sals_cale_printing_type,
        item.sals_cale_amount.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        }),
        item.sals_cale_quotation_request,
        item.sals_cale_finished_size,
        item.sals_cale_page,
        item.sals_cale_paper,
        item.sals_cale_printing,
        item.sals_cale_stand,
        item.sals_cale_binding,
        item.sals_cale_o_ring_color,
        item.sals_cale_printing_volume.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        }),
        item.sals_cale_quotation_request != 'No' ? item.sals_send_quotation == 'Send' ? 'Wait sending' : item.sals_send_quotation : '-',
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
  await saveAs(new Blob([buf]), "Sales Calendar.xlsx");
}
