import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Chart from "react-apexcharts";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const LineChart = (props) => {
  const { details, name, yaxisName, xaxisName } = props;

  const [data, setData] = useState([]);
  useEffect(() => {
    const items = details[0];

    const data = Object.entries(items).map(([key, value]) => {
      const scaledValue = value * 100;
      const scaledValueString = scaledValue.toFixed(1);

      const isInteger = scaledValueString.endsWith(".0");

      return {
        x: key.substring(0, 3),
        y: isInteger ? scaledValue.toFixed(0) : scaledValue.toFixed(1),
      };
    });

    setData(data);
  }, [details]);

  var options = {
    series: [
      {
        name,
        data: data.map((item) => `${item.y}%`),
      },
    ],
    chart: {
      height: globalHeight("20%"),
      type: "line",
      dropShadow: {
        enabled: true,
        color: Colors.haizyColor,
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [Colors.font, "#545454"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: name,
      align: "center",
    },
    grid: {
      borderColor: Colors.primary,
      row: {
        colors: [Colors.haizyColor, "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: data.map((item) => item.x),
      title: {
        text: xaxisName,
      },
    },
    yaxis: {
      title: {
        text: yaxisName,
      },
      min: 1,
      max: 25,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -20,
      offsetX: -5,
    },
  };

  return (
    <View>
      <div>
        <Chart
          options={options}
          series={options.series}
          type="line"
          width={globalWidth("60%")}
          height={globalHeight("30%")}
        />
      </div>
    </View>
  );
};

export default LineChart;
