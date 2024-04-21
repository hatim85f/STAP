// FileUpload.js
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { readExcel } from "./excelService";

import { Button } from "react-native-elements";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import numberWithComa from "../helpers/numberWithComa";
import TableComp from "../TableComp";
import { ScrollView } from "react-native";

import * as productsActions from "../../store/products/productsActions";
import Loader from "../Loader";
import { Row, Table } from "react-native-table-component";

const FileUpload = (props) => {
  const { userId, businessId } = props;

  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);

  const handleUpload = async (file) => {
    try {
      const data = await readExcel(file.uri);
      const details = data.map((item) => {
        return {
          userId,
          businessId,
          productName: item["Product Name"],
          productNickName: item["Nick Name"],
          costPrice: item["Cost Price (CIF)"],
          sellingPrice: item["Selling Price"],
          retailPrice: item["Retail Price"],
          description: item["Description"],
          imageURL: item["Image URL"],
          minimumDiscount: item["Min Discount"],
          maximumDiscount: item["Max Discount"],
          category: item["Category"],
          productType: item["Product Type"],
          quantity: item["Quantity"],
        };
      });
      setTableData(details);
    } catch (error) {
      console.error("Error reading Excel file:", error);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    // console.log("File picked:", result);
    try {
      if (!result.canceled) {
        // setFile(result.assets[0]);

        await handleUpload(result.assets[0]);
      }
    } catch (err) {
      console.error("Error picking document", err);
    }
  };

  const tableHead = [
    "SN",
    "Product Name",
    "Nick Name",
    "Cost Price (CIF)",
    "Selling Price",
    "Retail Price",
    "Description",
    "Min Discount",
    "Max Discount",
    "Category",
    "Product Type",
    "Quantity",
  ];

  const widthArr = [
    globalWidth("3.9%"),
    globalWidth("15%"),
    globalWidth("11%"),
    globalWidth("5%"),
    globalWidth("5%"),
    globalWidth("5%"),
    globalWidth("20%"),
    globalWidth("5%"),
    globalWidth("5%"),
    globalWidth("8%"),
    globalWidth("7%"),
  ];

  const uploadItems = () => {
    let count = uploadedCount + 1;
    setUploadedCount(count);
  };

  const submit = async () => {
    setIsLoading(true);
    const uploadedPromises = tableData.map(async (item) => {
      try {
        await dispatch(
          productsActions.addProduct(
            businessId,
            item.productName,
            item.productNickName,
            item.productType,
            item.costPrice,
            item.retailPrice,
            item.sellingPrice,
            item.description,
            item.imageURL,
            item.minimumDiscount,
            item.maximumDiscount,
            item.category,
            item.quantity
          )
        );

        await uploadItems();
      } catch (error) {
        console.error("Error uploading item:", error);
      }
      setIsLoading(false);
    });
    await Promise.all(uploadedPromises);

    setTableData([]);
  };

  if (isLoading) {
    return <Loader loadingMessage="Uploading Products" center />;
  }

  console.log(tableData);

  return (
    <div style={styles.container}>
      <Button
        title="Upload File"
        onPress={pickDocument}
        buttonStyle={styles.button}
        titleStyle={styles.title}
      />
      <View style={styles.tableContainer}>
        <ScrollView scrollEnabled scrollEventThrottle={16}>
          {tableData.length > 0 && (
            <Table
              borderStyle={{
                borderWidth: 2,
                borderColor: Colors.primary,
                borderRadius: 10,
              }}
              widthArr={widthArr}
            >
              <Row
                data={tableHead}
                style={[styles.head, { backgroundColor: Colors.haizyColor }]}
                textStyle={styles.text}
                widthArr={widthArr}
              />
              {tableData.map((rowData, index) => {
                return (
                  <Row
                    key={index}
                    data={[
                      index + 1,
                      rowData.productName,
                      rowData.productNickName,
                      numberWithComa(rowData.costPrice),
                      numberWithComa(rowData.sellingPrice),
                      numberWithComa(rowData.retailPrice),
                      rowData.description,
                      rowData.minimumDiscount,
                      rowData.maximumDiscount,
                      rowData.category,
                      rowData.productType,
                      rowData.quantity,
                    ]}
                    style={[
                      styles.rows,
                      {
                        backgroundColor:
                          index % 2 === 0 ? Colors.lightBG : Colors.white,
                      },
                    ]}
                    textStyle={styles.text}
                    widthArr={widthArr}
                  />
                );
              })}
            </Table>
          )}
        </ScrollView>
      </View>
      {uploadedCount > 0 && (
        <View style={styles.messagesContainer}>
          <Text style={styles.message}> Items Uploaded </Text>
          <Button
            buttonStyle={styles.button}
            title="Go to Products"
            onPress={() => (window.location.href = "/products/show-products")}
            titleStyle={styles.title}
          />
        </View>
      )}
      {tableData.length > 0 && uploadedCount === 0 && (
        <Button
          title="Submit"
          onPress={submit}
          buttonStyle={[styles.button, { marginTop: 10 }]}
          titleStyle={styles.title}
        />
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: globalWidth("20%"),
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignSelf: "center",
  },
  title: {
    fontFamily: "headers",
    fontSize: globalWidth("1.1%"),
  },
  image: {
    width: 20,
    // height: 40,
  },
  tableContainer: {
    width: globalWidth("90%"),
    alignSelf: "center",
    marginTop: globalHeight("2%"),
    justifySelf: "center",
  },
  message: {
    fontFamily: "headers",
    fontSize: globalWidth("1.1%"),
    color: Colors.font,
    textAlign: "center",
  },
  messagesContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: globalHeight("2%"),
  },
  rows: {
    justifyContent: "center",
    height: globalHeight("7.5%"),
    overflow: "visible",
    elevation: 10,
    zIndex: 1000,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: globalWidth("0.8%"),
    color: Colors.font,
  },
  head: {
    height: globalHeight("5%"),
    // justifyContent: "center",
  },
});

export default FileUpload;
