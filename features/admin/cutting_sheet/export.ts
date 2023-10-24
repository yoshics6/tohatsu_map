import * as Excel from "exceljs";
import { saveAs } from "file-saver";

export default async function saveAsExcel({ rows }: any) {
  const wb = new Excel.Workbook();

  const ws = wb.addWorksheet();

  ws.columns = [
    { width: 5 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 35 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
  ];
  const row: any = ws.addRow([
    "No",
    "Type",
    "Finished Size",
    "Page",
    "Text Paper",
    "Printing color",
    "Coating",
    "500",
    "1,000",
    "2,000",
    "3,000",
    "4,000",
    "5,000",
  ]);
  row.font = {
    bold: true,
  };
  let content: any;

  await Promise.all(
    rows.map(async (item: any, index: any): Promise<any> => {
      const no = index + 1;
      content = ws.addRow([
        no,
        item.cutt_type,
        item.cutt_finished_size,
        item.cutt_page,
        item.cutt_text_paper,
        item.cutt_printing,
        item.cutt_text_coating,
        item.cutt_500.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.cutt_1000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.cutt_2000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.cutt_3000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.cutt_4000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.cutt_5000.toLocaleString(undefined, {maximumFractionDigits:3}),
      ]);
      content.height = 20;
    })
  );

  ws.eachRow(function (row) {
    row.alignment = { vertical: "middle", horizontal: "center" };
  });
  const buf = await wb.xlsx.writeBuffer();
  await saveAs(new Blob([buf]), "Cutting_Sheet.xlsx");
}
