import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import * as XLSX from "sheetjs-style";

const ExcelIcons = (props) => {
  const { upload, download, header, sheetName, templateName, secondData } =
    props;

  const addFormulas = (worksheet, data) => {
    // Add formulas to columns D, G, and H
    for (let rowIndex = 1; rowIndex <= data.length; rowIndex++) {
      const productCellRef = XLSX.utils.encode_cell({ c: 0, r: rowIndex });
      const formulaD = `VLOOKUP(${productCellRef},Data!A:D,2,FALSE)`;
      worksheet[`D${rowIndex + 1}`] = { t: "n", f: formulaD }; // +1 because header is in the first row

      const formulaG = `VLOOKUP(${productCellRef},Data!A:D,3,FALSE)`;
      worksheet[`G${rowIndex + 1}`] = { t: "n", f: formulaG };

      const formulaH = `VLOOKUP(${productCellRef},Data!A:D,4,FALSE)`;
      worksheet[`H${rowIndex + 1}`] = { t: "n", f: formulaH };
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={upload} style={styles.button}>
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
    borderColor: Colors.font,
    padding: globalWidth("0.25%"),
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
