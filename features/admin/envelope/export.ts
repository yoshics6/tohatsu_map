import * as Excel from "exceljs";
import { saveAs } from "file-saver";

export default async function saveAsExcel({ rows }: any) {
  const wb = new Excel.Workbook();

  const ws = wb.addWorksheet();

  ws.columns = [
    { width: 5 },
    { width: 30 },
    { width: 40 },
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
    "Type",
    "Finished Size",
    "Page",
    "Paper",
    "Printing color",
    "Coating",
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
        item.enve_type,
        item.enve_finished_size,
        item.enve_page,
        item.enve_paper,
        item.enve_printing,
        item.enve_coating,
        item.enve_1000.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.enve_2000.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.enve_3000.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.enve_4000.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.enve_5000.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      ]);
      content.height = 20;
    })
  );

  ws.eachRow(function (row) {
    row.alignment = { vertical: "middle", horizontal: "center" };
  });
  const buf = await wb.xlsx.writeBuffer();
  await saveAs(new Blob([buf]), "Envelope.xlsx");
}
