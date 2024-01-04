import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

const TeamYTD = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Team YTD Sales as per final and achievement for the the team
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const TeamYTDOptions = (navData) => {
  return {
    headerTitle: "TeamYTD",
  };
};

export default TeamYTD;
