import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import SalesChart from "./SalesChart";

const SalesChartEmployee = (props) => {
  const { userName, performance, showInFull } = props;

  const [text, setText] = useState("");

  useEffect(() => {
    if (performance && performance.length > 0) {
      let text = `${performance[0].startMonth}/${performance[0].year}`;

      if (performance[0].startMonth !== performance[0].endMonth) {
        text = `${performance[0].startMonth} - ${performance[0].endMonth}/${performance[0].year}`;
      }

      setText(text);
    }
  }, [performance]);

  if (performance?.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: showInFull ? "100%" : "72%",
          borderTopRightRadius: showInFull ? 10 : 0,
        },
      ]}
    >
      <Text style={styles.header}> {userName} </Text>
      {performance?.length > 0 && <Text style={styles.note}>Sales {text}</Text>}
      {performance?.length > 0 && (
        <SalesChart
          data={performance[0].performanceData.map((a) =>
            parseFloat(a.salesValue).toFixed(2)
          )}
          categories={performance[0].performanceData.map((a) => {
            const delimiter = /\s+|-/;
            return a.productNickName.split(delimiter);
          })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    borderColor: "black",
    borderWidth: 1,
    padding: globalWidth("0.5%"),
    height: globalHeight("30%"),
    backgroundColor: "#FFFFF3",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 10,
    paddingBottom: 0,
  },
  header: {
    fontSize: globalWidth("1.8% "),
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  note: {
    fontFamily: "open-sans",
    fontSize: globalWidth("1%"),
    textAlign: "left",
    fontStyle: "italic",
  },
});

export default SalesChartEmployee;
