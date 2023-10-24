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
    "Open Size",
    "Fold",
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
        item.fold_type,
        item.fold_finished_size,
        item.fold_open_size,
        item.fold_column,
        item.fold_page,
        item.fold_text_paper,
        item.fold_printing,
        item.fold_text_coating,
        item.fold_500.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.fold_1000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.fold_2000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.fold_3000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.fold_4000.toLocaleString(undefined, {maximumFractionDigits:3}),
        item.fold_5000.toLocaleString(undefined, {maximumFractionDigits:3}),
      ]);
      content.height = 20;
    })
  );

  ws.eachRow(function (row) {
    row.alignment = { vertical: "middle", horizontal: "center" };
  });
  const buf = await wb.xlsx.writeBuffer();
  await saveAs(new Blob([buf]), "Folding.xlsx");
}
