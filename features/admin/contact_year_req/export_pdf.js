import jsPDF from "jspdf";
function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

// var todays = new Date();
// var dd = String(todays.getDate()).padStart(2, "0");
// var mm = String(todays.getMonth() + 1).padStart(2, "0");
// var yyyy = todays.getFullYear();

// let h = addZero(todays.getHours());
// let m = addZero(todays.getMinutes());
// let s = addZero(todays.getSeconds());

// var dates = yyyy+mm+dd+'_'+h+m+s+'_ITP ASIA Co Ltd';

const exportPDFPublic = async (rows) => {

  const myArray = rows.rows[0].contact_date.split(" ");

  const myArrayUse = myArray[0].split("-")
  const date_use = myArrayUse[0]+myArrayUse[1]+myArrayUse[2];

  const myArrayUseTime = myArray[1].split(":")
  const time_use = myArrayUseTime[0]+myArrayUseTime[1]+myArrayUseTime[2];

  const dates = date_use+'_'+time_use+'_'+rows.rows[0].contact_company_name;
  
  var doc = new jsPDF("p", "pt");

  doc.setFont("DB Heavent");
  doc.setFontSize(20);
  doc.text(250, 35, "Contact us");

  doc.setFont("DB Heavent");
  doc.setFontSize(13);

  doc.text(30, 70, "Date");
  doc.text(125, 70, ":");
  doc.text(140, 70, rows.rows[0].contact_date);
  doc.text(30, 100, "Name - Surname");
  doc.text(125, 100, ":");
  doc.text(140, 100, rows.rows[0].contact_fullname);
  doc.text(30, 130, "Company Name");
  doc.text(125, 130, ":");
  doc.text(140, 130, rows.rows[0].contact_company_name);
  doc.text(30, 160, "Phone no.");
  doc.text(125, 160, ":");
  doc.text(140, 160, rows.rows[0].contact_phone_number);
  doc.text(30, 190, "E-mail");
  doc.text(125, 190, ":");
  doc.text(140, 190, rows.rows[0].contact_email);
  doc.text(30, 220, "Quotation Details");
  doc.text(125, 220, ":");
  doc.text(140, 220, rows.rows[0].contact_detail, { maxWidth: 400 });

  doc.save(dates+".pdf");
  // doc.output("dataurlnewwindow");
};

export default exportPDFPublic;
