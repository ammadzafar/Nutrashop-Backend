const express = require("express");
var cors = require("cors");
var router = express.Router();
const XLSX = require("xlsx");
const XlsxPopulate = require("xlsx-populate");
var path = require("path");
var multer = require("multer");
const http = require("http");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("my_req_is",req)
    cb(null, __basedir + "/resources/static/assets/uploads/excelToPdf");
  },
  filename: function (req, file, cb) {
    //   var datetimestamp = Date.now();
    cb(null, `ND-Pak-${file.originalname}`);
  },
});

var upload = multer({
  //multer settings
  storage: storage,
});

function validate(req, res, next) {
  if (!req.file || !req.file.mimetype.includes("excel")) {
    return res.send({
      errors: {
        message: "file cant be empty",
      },
    });
  }
  next();
}

async function xlsxFile(file) {
  let downloadedFile = file.originalname;
  const workbook = await XlsxPopulate.fromFileAsync(
    __basedir +
      `/resources/static/assets/uploads/excelToPdf/ND-Pak-${downloadedFile}`
  );

  for (var i = 0; i < workbook.sheets().length; ++i) {
    const sheet1 = workbook.sheet(i);
    const cellF11 = sheet1.cell("F11").value();
    const cellF12 = sheet1.cell("F12").value();
    const cellF13 = sheet1.cell("F13").value();
    const cellF14 = sheet1.cell("F14").value();
    const cellF15 = sheet1.cell("F15").value();
    const cellF16 = sheet1.cell("F16").value();

    // File To be Edit
    const wb = await XlsxPopulate.fromFileAsync(
      __basedir + "/resources/static/assets/uploads/excelFiles/GSD.xlsx"
    );
    const sheet = wb.sheet(0);
    sheet.cell("Q15").value(cellF11);
    sheet.cell("Q16").value(cellF12);
    sheet.cell("Q17").value(cellF13);
    sheet.cell("Q18").value(cellF14);
    sheet.cell("Q19").value(cellF15);
    sheet.cell("Q20").value(cellF16);
    await wb.toFileAsync(
      __basedir +
        `/resources/static/assets/uploads/downloadExcelFile/newGsdExcel-${i}.xlsx`
    );
  }
}

router.post("/", upload.single("file"), function (req, res) {
  xlsxFile(req.file);

  var excelArray = [];
  var count = 0;
  fs.readdir(
    "/var/www/production/api/resources/static/assets/uploads/downloadExcelFile/",
    (err, files) => {
      //	console.log(files);

      var exec = require("child-process-promise").exec;
      files.forEach((file) => {
        var fileExt = file.split(".").pop();
        if (fileExt == "xlsx") {
          console.log(fileExt);

          exec(
            "sudo /usr/bin/soffice --headless --convert-to pdf  /var/www/production/api/resources/static/assets/uploads/downloadExcelFile/" +
              file
          );
        }
      });
    }
  );

  try {
    var exec1 = require("child-process-promise").exec;
    exec1("rm -r /var/www/production/api/output.pdf");
  } catch (error) {
    console.log(error);
  }
  fs.readdir("./", (err, files) => {
    var excelArray = "pdftk";

    files.forEach((file) => {
      var fileExt = file.split(".").pop();
      if (fileExt == "pdf" && file != "output.pdf") {
        //console.log(file);
        excelArray = excelArray + " " + file;
      }
    });

    excelArray = excelArray + "   output   output.pdf";
    var exec = require("child-process-promise").exec;

    exec(excelArray);
    console.log(excelArray);
  });

  var http = require("http");
  var url = require("url");
  return res.json({
    message: "File submitted Successfully ",
    url: "https://" + req.headers.host + "/newGsdExcel.pdf",
  });
});

router.get("/show_file", (req, res) => {
  const filePath = "./output.pdf";
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Could not download file");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="js.pdf"');

    res.send(file);
  });
});

router.get("/see", (req, res) => {
  fs.readdir("./routes/Backend/", (err, files) => {
    console.log(files);
    files.forEach((file) => {
      var fileExt = file.split(".").pop();
      if (fileExt == "pdf") {
        console.log(file);
      }
    });
  });
});

// router.get("/show_file", (req, res) => {
//   // directory path
//   const dir = "./resources/static/assets/uploads/downloadExcelFile/";

//   // list all files inside directory
//   fs.readdir(dir, (err, files) => {
//     if (err) {
//       throw err;
//     }
//     // files object contains all files names
//     files.forEach((single_file) => {
//       // console.log("=====files are=====", single_file);
//       const filePath =
//         `./resources/static/assets/uploads/downloadExcelFile/${single_file}`;
//       fs.readFile(filePath, (err, file) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).send("Could not download file");
//         }

//         res.setHeader("Content-Type", "application/pdf");
//         res.setHeader("Content-Disposition", 'inline; filename="js.pdf"');

//         res.send(file);
//       });
//     });
//   });
// });

module.exports = router;
