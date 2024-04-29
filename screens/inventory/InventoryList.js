import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import { Row, Rows, Table } from "react-native-table-component";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import numberWithComa from "../../components/helpers/numberWithComa";
import moment from "moment";
import { ScrollView } from "react-native";

const InventoryList = (props) => {
  const { inventory } = props;

  const [inventoryData, setInventoryData] = useState([]);

  const header = [
    "Image",
    "Name",
    "Opening",
    "Purchased",
    "Purchase Date",
    "Purchase Value",
    "Total Purchase",
    "Sold",
    "Sales Value",
    "Total Sold",
    "Closing",
  ];

  const widthArr = [
    globalWidth("10%"),
    globalWidth("22%"),
    globalWidth("7%"),
    globalWidth("7%"),
    globalWidth("10%"),
    globalWidth("7%"),
    globalWidth("7%"),
    globalWidth("7%"),
    globalWidth("7%"),
    globalWidth("7%"),
    globalWidth("7%"),
  ];

  const itemsColors = [
    "#ff0055",
    "#0099ff",
    "#ffaa00",
    "#00ff55",
    "#ff00aa",
    "#00ffaa",
    "#ffaa55",
    "#55ffaa",
    "#aa55ff",
    "#aaff55",
    "#55aaff",
    "#aaffaa",
  ];

  useEffect(() => {
    const inventoryData = inventory.map((a) => a.products).flat();

    setInventoryData(inventoryData);
  }, [inventory]);

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {" "}
        <Table borderStyle={{ borderWidth: 2, borderColor: "#fff" }}>
          <Row
            data={header}
            style={styles.header}
            textStyle={styles.headerText}
            widthArr={widthArr}
          />
          {inventoryData.map((item, index) => {
            return (
              <Row
                data={[
                  <View style={styles.imageRow}>
                    <View
                      style={{
                        height: "100%",
                        width: "2.5%",
                        backgroundColor: itemsColors[index % 12],
                      }}
                    />
                    <View
                      style={{
                        width: "97.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={styles.image}
                        source={{ uri: item.productImage }}
                      />
                    </View>
                  </View>,
                  item.productName,
                  numberWithComa(item.previousStocks),
                  numberWithComa(item.purchasedQuantity),
                  moment(item.purchaseDate).format("DD/MM/YYYY") ===
                  "Invalid date"
                    ? "N/A"
                    : moment(item.purchaseDate).format("DD/MM/YYYY"),
                  numberWithComa(item.totalValue) + " " + item.currencySymbol,
                  numberWithComa(item.totalQuantity),
                  numberWithComa(item.soldQuantity),
                  numberWithComa(item.salesValue) + " " + item.currencySymbol,
                  numberWithComa(item.soldQuantityWithBonus),
                  numberWithComa(item.quantity),
                ]}
                widthArr={widthArr}
                style={[
                  styles.row,
                  index % 2 && { backgroundColor: Colors.lightBG },
                ]}
                textStyle={styles.text}
              />
            );
          })}
        </Table>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "98%",
    alignSelf: "center",
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    height: globalHeight("4%"),
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: globalWidth("1%"),
  },
  row: {
    height: globalHeight("7%"),
  },
  image: {
    width: globalWidth("3%"),
    height: globalWidth("3%"),
    borderRadius: globalWidth("1.5%"),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  text: {
    textAlign: "center",
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1%"),
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const InventoryListOptions = (navData) => {
  return {
    headerTitle: "InventoryList",
  };
};

export default InventoryList;
