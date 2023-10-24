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
  ];
  const row: any = ws.addRow([
    "No",
    "Name-Surname",
    "Email",
    "Tel",
    "Username",
    "Level",
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
        item.fullname,
        item.email,
        item.tel,
        item.username,
        item.level,
      ]);
      content.height = 20;
    })
  );

  ws.eachRow(function (row) {
    row.alignment = { vertical: "middle", horizontal: "center" };
  });
  const buf = await wb.xlsx.writeBuffer();
  await saveAs(new Blob([buf]), "Users.xlsx");
}
