import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { globalWidth } from "../../constants/globalWidth";
import * as DocumentPicker from "expo-document-picker";
import Colors from "../../constants/Colors";
import * as XLSX from "sheetjs-style";
import { readExcel } from "../excelUpload/excelService";

const ExcelIcons = (props) => {
  const { getData, header, sheetName, templateName, secondData } = props;

  const [uploadedData, setUploadedData] = useState(null);
  const [finalData, setfinalData] = useState([]);

  useEffect(() => {
    finalData && finalData.length > 0 && getData(finalData);
  }, [finalData]);

  const addFormulas = (worksheet, data) => {
    // Add formulas to columns D, G, and H
    for (let rowIndex = 1; rowIndex <= data.length; rowIndex++) {
      const productCellRef = XLSX.utils.encode_cell({ c: 0, r: rowIndex });
      const formulaD = `VLOOKUP(${productCellRef},Data!A:D,2,FALSE)`;
      worksheet[`D${rowIndex + 1}`] = { t: "n", f: formulaD }; // +1 because header is in the first row

      const formulaI = `VLOOKUP(${productCellRef},Data!A:D,3,FALSE)`;
      worksheet[`I${rowIndex + 1}`] = { t: "n", f: formulaI };

      const formulaJ = `VLOOKUP(${productCellRef},Data!A:D,4,FALSE)`;
      worksheet[`J${rowIndex + 1}`] = { t: "n", f: formulaJ };
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([{}], {
      header,
    });

    const dataWorksheet = XLSX.utils.json_to_sheet(secondData, {
      header: ["Product Name", "Product Price", "Business ID", "Product ID"],
    });

    // Set dynamic column widths
    const defaultWidth = 140;
    const columnWidths = header.map(() => ({ wpx: defaultWidth }));

    worksheet["!cols"] = columnWidths;
    dataWorksheet["!cols"] = columnWidths;

    // Style settings for header and data cells
    const style = {
      font: { name: "Bodoni MT Black", sz: 12 },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "87CEEB" } }, // Sky Blue background color
    };

    const dataStyle = {
      font: { name: "Arial", sz: 10 },
      alignment: { horizontal: "center" },
    };

    // Apply styles to each cell in the header
    header.forEach((headerItem, index) => {
      const cellRef = XLSX.utils.encode_cell({ c: index, r: 0 }); // r: 0 means first row
      worksheet[cellRef].s = style;
    });

    // Apply styles to each cell in the header
    secondData.forEach((dataItem, rowIndex) => {
      Object.keys(dataItem).forEach((key, colIndex) => {
        const cellRef = XLSX.utils.encode_cell({
          c: colIndex,
          r: 0,
        });
        dataWorksheet[cellRef].s = style;
      });
    });

    // Apply styles to each cell in the data
    secondData.forEach((dataItem, rowIndex) => {
      Object.keys(dataItem).forEach((key, colIndex) => {
        const cellRef = XLSX.utils.encode_cell({
          c: colIndex,
          r: rowIndex + 1,
        }); // r: 0 means first row
        dataWorksheet[cellRef].s = dataStyle;
      });
    });

    // Add formulas to columns D, G, and H
    addFormulas(worksheet, secondData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName); // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, dataWorksheet, "Data"); // Add the worksheet to the workbook
    XLSX.writeFile(workbook, `${templateName}.xlsx`);
  };

  const readFile = (e) => {
    const promise = new Promise((resolve, reject) => {
      const file = e.target.files[0];

      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];

        const data = XLSX.utils.sheet_to_json(ws, {
          raw: false, // Ensure dates are parsed as date objects
          dateNF: "yyyy-mm-ddTHH:mm:ss.SSSZ", // Specify the expected date format
        });

        // Convert all date strings to ISO format
        const formattedData = data.map((item) => {
          const parsedDate = new Date(item.date);

          return {
            ...item,
            date: isValidDate(parsedDate) ? parsedDate.toISOString() : null,
          };
        });

        function isValidDate(date) {
          return date instanceof Date && !isNaN(date);
        }

        resolve(formattedData);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
      setUploadedData(d);
    });
  };

  useEffect(() => {
    const transformedData =
      uploadedData &&
      uploadedData.length > 0 &&
      uploadedData.map((item) => {
        const {
          "Product Name": productName,
          "Client Name": clientName,
          Quantity: quantity,
          "Product ID": productId,
          Date: date,
          Price: productPrice,
          Status: status,
          Bonus: bonus,
          "Bonus Type": bonusType,
          "Business ID": businessId,
        } = item;

        // Convert the date from numeric representation to JavaScript Date object
        const parsedDate = new Date((date - 25569) * 86400 * 1000);

        return {
          productName,
          clientName,
          quantity,
          productId,
          date: typeof date === "number" ? parsedDate : date,
          productPrice,
          status,
          bonus,
          bonusType,
          businessId,
        };
      });

    setfinalData(transformedData);
  }, [uploadedData]);

  console.log(finalData);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          document.getElementById("sheet").click();
        }}
        style={styles.button}
      >
        <FontAwesome name="upload" size={globalWidth("2.5%")} color="#008000" />
        <Text style={styles.text}>Upload Sales</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={downloadExcel} style={styles.button}>
        <FontAwesome
          name="download"
          size={globalWidth("2.5%")}
          color="#008000"
        />
        <Text style={styles.text}>Download Template</Text>
      </TouchableOpacity>
      <input
        type="file"
        id="sheet"
        onChange={(e) => {
          readFile(e);
        }}
        accept=".csv, .xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        style={{ visibility: "hidden", display: "none" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: globalWidth("30%"),
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#008000",
    padding: globalWidth("0.25%"),
    marginTop: globalWidth("2%"),
  },
  text: {
    textAlign: "center",
    fontFamily: "numbers",
    color: "#008000",
    fontSize: globalWidth("1%"),
    marginTop: globalWidth("0.5%"),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExcelIcons;
