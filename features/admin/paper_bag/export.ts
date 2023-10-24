import * as Excel from "exceljs";
import { saveAs } from "file-saver";

export default async function saveAsExcel({ rows }: any) {
  const wb = new Excel.Workbook();

  const ws = wb.addWorksheet();

  ws.columns = [
    { width: 5 },
    { width: 30 },
    { width: 30 },
    // { width: 30 },
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
    // "Page",
    "Paper",
    "Printing color",
    "Coating",
    "Binding",
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
        item.papb_type,
        item.papb_finished_size,
        // item.papb_page,
        item.papb_paper,
        item.papb_printing,
        item.papb_coating,
        item.papb_binding,
        item.papb_100.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.papb_200.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.papb_300.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.papb_400.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        item.papb_500.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      ]);
      content.height = 20;
    })
  );

  ws.eachRow(function (row) {
    row.alignment = { vertical: "middle", horizontal: "center" };
  });
  const buf = await wb.xlsx.writeBuffer();
  await saveAs(new Blob([buf]), "Paper Bag.xlsx");
}
