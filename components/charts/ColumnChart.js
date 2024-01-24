import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Chart from "react-apexcharts";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const ColumnChart = (props) => {
  const { target, sales } = props;

  const options = {
    series: [
      {
        name: "Servings",
        data: [500, 1500],
      },
    ],
    annotations: {
      points: [
        {
          x: "Achievement",
          seriesIndex: 0,
          label: {
            borderColor: "#775DD0",
            offsetY: 0,
            style: {
              color: "#fff",
              background: "#775DD0",
            },
            text: "Bananas are good",
          },
        },
      ],
    },
    chart: {
      height: 150,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "10%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },

    grid: {
      row: {
        colors: ["#fff", "#f2f2f2"],
      },
    },
    xaxis: {
      labels: {
        rotate: -45,
      },
      categories: ["Target", "Sales"],
      tickPlacement: "on",
    },
    yaxis: {
      title: {
        text: "Servings",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  };

  return (
    <View style={styles.container}>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        width={globalWidth("24%")}
        height={globalHeight("15%")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
});

export const ColumnChartOptions = (navData) => {
  return {
    headerTitle: "ColumnChart",
  };
};

export default ColumnChart;
