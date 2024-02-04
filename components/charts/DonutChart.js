import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const DonutChart = (props) => {
  const { salesValue, targetValue, changed } = props;

  const ach = (salesValue / targetValue) * 100;
  const remainingTarget = targetValue - salesValue;

  const colors = changed ? ["#32a4a8", "#ff0055"] : [Colors.primary, "#a89232"];

  const options = {
    series: [salesValue, remainingTarget],
    labels: ["Sales", "Remaining Target"],
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return parseFloat(val).toFixed(0) + "%";
      },
    },
    colors: colors,
    plotOptions: {
      pie: {
        size: globalWidth("30%"),
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: "#ff0055",
              offsetY: -10,
            },
            value: {
              show: false,
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              color: Colors.primary,
              offsetY: 16,
              formatter: function (val) {
                return parseFloat(val).toFixed(0) + "%";
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: "Achievement",
              color: "#373d3f",
              formatter: function () {
                return parseFloat(ach).toFixed(0) + "%";
              },
            },
          },
        },
      },
    },
  };

  return (
    <View style={styles.container}>
      <Chart
        options={options}
        series={options.series}
        type="donut"
        width={globalWidth("30%")}
        height={globalHeight("20%")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {},
});

export const DonutChartOptions = (navData) => {
  return {
    headerTitle: "DonutChart",
  };
};

export default DonutChart;
