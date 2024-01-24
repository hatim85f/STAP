import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const PieChart = (props) => {
  const { series, labels } = props;

  const colors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#6666FF",
    "#99FF99",
    "#B34D4D",
    "#FF6666",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
  ];

  const options = {
    series,
    labels,
    colors: colors.slice(0, series.length),
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Chart
        options={options}
        series={options.series}
        type="pie"
        width={globalWidth("25%")}
        height={globalHeight("18%")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const PieChartOptions = (navData) => {
  return {
    headerTitle: "PieChart",
  };
};

export default PieChart;
