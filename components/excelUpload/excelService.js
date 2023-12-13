// excelService.js
import * as XLSX from "xlsx";

export const readExcel = async (fileUri) => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const data = reader.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to array of objects
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 2 });

        resolve(excelData);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsBinaryString(blob);
    });
  } catch (error) {
    throw error;
  }
};
