import React, { useState, useEffect, Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Rows } from "react-native-table-component";
import Colors from "../constants/Colors";
import { globalHeight, globalWidth } from "../constants/globalWidth";

const TableComp = (props) => {
  const { widthArr, tableHead, data, showTotal, totalData } = props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
        {data &&
          data.map((rowData, index) => {
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
        {/* <Rows
          data={data}
          textStyle={styles.text}
          style={styles.rows}
          widthArr={widthArr}
        /> */}
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

export const TableCompOptions = (navData) => {
  return {
    headerTitle: "TableComp",
  };
};

export default TableComp;
