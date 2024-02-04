import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Row, Table } from "react-native-table-component";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { globalHeight, globalWidth } from "../constants/globalWidth";

const FinalTableComp = (props) => {
  const { widthArr, tableHead, data, showTotal, totalData } = props;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: globalHeight("2%"),
      }}
    >
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
        {data.map((rowData, index) => {
          return (
            <Row
              key={index}
              data={rowData}
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
        {showTotal && (
          <Row
            data={totalData}
            style={[styles.head, { backgroundColor: Colors.haizyColor }]}
            textStyle={styles.text}
            widthArr={widthArr}
          />
        )}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
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

export const FinalTableCompOptions = (navData) => {
  return {
    headerTitle: "FinalTableComp",
  };
};

export default FinalTableComp;
