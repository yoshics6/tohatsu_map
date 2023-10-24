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
    { width: 25 },
    { width: 35 },
    { width: 35 },
    { width: 25 },
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
    "Cover",
    "Text",
    "Cover Paper",
    "Text Paper",
    "Printing color",
    "Cover Coating",
    "Text Coating",
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
        item.sadd_type,
        item.sadd_finished_size,
        item.sadd_cover,
        item.sadd_text,
        item.sadd_cover_paper,
        item.sadd_text_paper,
        item.sadd_printing,
        item.sadd_cover_coating,
        item.sadd_text_coating,
        item.sadd_500.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.sadd_1000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.sadd_2000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.sadd_3000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.sadd_4000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.sadd_5000.toLocaleString(undefined, {maximumFractionDigits:3}),
      ]);
      content.height = 20;
    })
  );

  ws.eachRow(function (row) {
    row.alignment = { vertical: "middle", horizontal: "center" };
  });
  const buf = await wb.xlsx.writeBuffer();
  await saveAs(new Blob([buf]), "Saddle_Stitch.xlsx");
}
