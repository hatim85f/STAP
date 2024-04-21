import React, { useState, useEffect, Fragment } from "react";
import { View, Text, StyleSheet, Modal, Image } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as businessActions from "../../store/business/businessActions";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import moment from "moment/moment";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import TableComp from "../../components/TableComp";
import numberWithComa from "../../components/helpers/numberWithComa";
import Colors from "../../constants/Colors";
import { Row, Table } from "react-native-table-component";

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

const PrintingComp = (props) => {
  const {
    tableDetails,
    totalValue,
    showPrint,
    orderNumber,
    client,
    tableHead,
    addVAT,
    cancelPrint,
  } = props;

  const { busiessesDetails } = useSelector((state) => state.business);

  const [selectedPrinter, setSelectedPrinter] = useState();
  const [actualValue, setActualValue] = useState(0);
  const [vatValue, setVatValue] = useState(0);

  // =======================================================CALCULATING VAT VALUE=================================================

  useEffect(() => {
    if (addVAT) {
      const actualValue = totalValue / 1.05;
      const vatValue = totalValue - actualValue;

      setActualValue(actualValue);
      setVatValue(vatValue);
    } else {
      setActualValue(totalValue);
      setVatValue(0);
    }
  }, [addVAT]);

  //   ====================================================RPINTING FUNCTIONS====================================================

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  //   ================================================GETTING BUSINESS DETAILS================================================

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(businessActions.getBusinessesDetails());
  }, [dispatch]);

  const widthArr = [
    globalWidth("2.5%"),
    globalWidth("10%"),
    globalWidth("6%"),
    globalWidth("6%"),
    globalWidth("6%"),
    globalWidth("6%"),
    globalWidth("6.5%"),
  ];

  return (
    <Modal visible={showPrint} animationType="slide">
      {busiessesDetails && busiessesDetails.length > 0 && (
        <div style={{ overflow: "scroll" }}>
          <View style={styles.topRow}>
            <View style={styles.leftTop}>
              <Text style={styles.header}>Invoice</Text>
              <Text style={styles.title}>
                Order Number <Text style={styles.value}> {orderNumber} </Text>{" "}
              </Text>
              <Text style={styles.title}>
                {" "}
                Date of issue{" "}
                <Text style={styles.value}>
                  {" "}
                  {moment(new Date()).format("MMMM Do, YYYY")}{" "}
                </Text>{" "}
              </Text>
            </View>
            <View style={styles.rightTop}>
              <img
                src={busiessesDetails[0].businessLogo}
                alt="logo"
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.middleRow}>
            <View style={styles.middleView}>
              <Text style={[styles.header, { fontSize: globalWidth("1.2%") }]}>
                {" "}
                {busiessesDetails[0].businessName}{" "}
              </Text>
            </View>
            <View style={styles.middleView}>
              <Text style={[styles.header, { fontSize: globalWidth("1.2%") }]}>
                {" "}
                Bill to{" "}
              </Text>
              <Text style={styles.title}> {client.clientName} </Text>
              <Text style={styles.title}> {client.address} </Text>

              <Text style={styles.title}> {client.contactPerson.phone} </Text>
              <Text style={styles.title}> {client.contactPerson.email} </Text>
            </View>
            <View style={styles.middleView}>
              <Text style={[styles.header, { fontSize: globalWidth("1.2%") }]}>
                Ship to
              </Text>
              <Text style={styles.title}> {client.clientName} </Text>
              <Text style={styles.title}> {client.address} </Text>
              <Text style={styles.title}> {client.contactPerson.phone} </Text>
            </View>
          </View>
          <View style={[styles.noteContainer]}>
            <Text style={[styles.value, { textAlign: "center" }]}>
              All items as per the discussed and has been revised by the
              customer and accepted the changes and ready to pay
            </Text>
          </View>
          <View style={styles.tableContainer}>
            <TableComp
              widthArr={widthArr}
              tableHead={tableHead}
              data={tableDetails}
              showTotal
              totalData={[
                "",
                "Total",
                "",
                "",
                "",
                "",
                numberWithComa(totalValue?.toFixed(0)),
              ]}
            />
          </View>
          {actualValue && vatValue && (
            <View style={styles.calculations}>
              <Table
                style={{ width: globalWidth("40%"), alignSelf: "center" }}
                borderStyle={{ borderWidth: 0 }}
              >
                <Row
                  data={["Description", "Value"]}
                  style={{ height: globalHeight("5%") }}
                  textStyle={{
                    textAlign: "center",
                    fontSize: globalWidth("1%"),
                  }}
                />
                <Row
                  data={[
                    "Value",
                    numberWithComa(parseFloat(actualValue).toFixed(0)),
                  ]}
                  style={{ height: globalHeight("5%") }}
                  textStyle={{
                    textAlign: "center",
                    fontSize: globalWidth("1%"),
                    marginTop: globalHeight("2%"),
                  }}
                />
                <Row
                  data={[
                    "VAT",
                    numberWithComa(parseFloat(vatValue).toFixed(0)),
                  ]}
                  style={{ height: globalHeight("5%") }}
                  textStyle={{
                    textAlign: "center",
                    fontSize: globalWidth("1%"),
                    marginTop: globalHeight("2%"),
                  }}
                />
                <Row
                  data={[
                    "Total",
                    numberWithComa(parseFloat(totalValue).toFixed(0)),
                  ]}
                  style={{
                    height: globalHeight("5%"),
                    borderTopColor: "back",
                    borderTopWidth: 1.2,
                  }}
                  textStyle={{
                    textAlign: "center",
                    fontSize: globalWidth("1%"),
                    marginTop: globalHeight("2%"),
                  }}
                />
              </Table>
            </View>
          )}
        </div>
      )}
      <View style={styles.buttonRow}>
        <Button
          onPress={printToFile}
          title="Print"
          buttonStyle={styles.button}
          titleStyle={styles.title}
        />
        <Button
          onPress={cancelPrint}
          title="Cancel"
          buttonStyle={styles.button}
          titleStyle={styles.title}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 8,
    alignSelf: "flex-start",
    backgroundColor: "red",
  },
  topRow: {
    flexDirection: "row",
    width: "98%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: globalWidth("2%"),
    fontWeight: "bold",
    fontFamily: "Helvetica Neue",
    marginBottom: globalHeight("2%"),
  },
  title: {
    fontSize: globalWidth("1%"),
    fontFamily: "open-sans-bold",
    fontStyle: "italic",
    textAlign: "left",
  },
  value: {
    fontSize: globalWidth("1%"),
    fontFamily: "open-sans",
  },
  logo: {
    width: globalWidth("7.5%"),
    height: globalWidth("7.5%"),
    alignSelf: "flex-end",
  },
  leftTop: {
    width: "50%",
  },
  rightTop: {
    alignItems: "flex-end",
    width: "50%",
  },
  middleRow: {
    width: "98%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: globalHeight("4%"),
  },
  middleView: {
    width: "33%",
    alignItems: "flex-start",
    height: "100%",
  },
  smallLogo: {
    width: globalWidth("4%"),
    height: globalWidth("4%"),
  },
  tableContainer: {
    width: "98%",
    alignSelf: "center",
    marginTop: globalHeight("2%"),
  },
  noteContainer: {
    width: "98%",
    alignSelf: "center",
    marginTop: globalHeight("2%"),
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: globalHeight("2%"),
    width: globalWidth("18%"),
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: globalWidth("1%"),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: globalWidth("40%"),
    alignSelf: "center",
    marginTop: globalHeight("2%"),
  },
  calculations: {
    width: "60%",
    alignSelf: "center",
    marginTop: globalHeight("2%"),
  },
});

export const PrintingCompOptions = (navData) => {
  return {
    headerTitle: "PrintingComp",
  };
};

export default PrintingComp;
