import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

const ManageVariableExpenses = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ManageVariableExpenses Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export default ManageVariableExpenses;
