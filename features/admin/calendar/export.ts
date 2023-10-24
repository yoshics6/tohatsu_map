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
  ];
  const row: any = ws.addRow([
    "No",
    "Type",
    "Finished Size",
    "Page",
    "Paper",
    "Printing color",
    "Stand",
    "Binding",
    "O ring Color",
    "100",
    "200",
    "300",
    "400",
    "500",
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
        item.cale_type,
        item.cale_finished_size,
        item.cale_page,
        item.cale_paper,
        item.cale_printing,
        item.cale_stand,
        item.cale_binding,
        item.cale_o_ring_color,
        item.cale_100.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.cale_200.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.cale_300.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.cale_400.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.cale_500.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      ]);
      content.height = 20;
    })
  );

  ws.eachRow(function (row) {
    row.alignment = { vertical: "middle", horizontal: "center" };
  });
  const buf = await wb.xlsx.writeBuffer();
  await saveAs(new Blob([buf]), "Calendar.xlsx");
}
