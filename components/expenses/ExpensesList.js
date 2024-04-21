import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import Chevron from "../Chevron";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import numberWithComa from "../helpers/numberWithComa";
import moment from "moment";
import ExpensesDonut from "../charts/ExpensesDonut";
import Colors from "../../constants/Colors";

import { MaterialIcons, Feather } from "@expo/vector-icons";
import WebAlert from "../webAlert/WebAlert";
import AppLoader from "../AppLoader";

import * as expensesActions from "../../store/expenses/expensesActions";
import EditExpense from "./EditExpense";

const ExpensesList = (props) => {
  const { expenses, selectedCategory, arrangedExpenses, totalValue } = props;

  const [currentIndex, setCurrentIndex] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [editableExpense, setEditableExpense] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const deleteExpense = (id) => {
    setShowAlert(true);
    setDeletedId(id);
  };

  const dispatch = useDispatch();

  const confrimDelete = () => {
    setIsLoading(true);
    setLoadingMessage("Deleting Expense");
    dispatch(expensesActions.deleteFixedExpenses(deletedId)).then(() => {
      setIsLoading(false);
      setDeletedId(null);
      setShowAlert(false);
    });
  };

  const editExpense = (id) => {
    setShowEdit(true);
    const editableExpense = expenses.find(
      (expense) => expense.expenseId === id
    );
    setEditableExpense(editableExpense);
  };

  // ==============================================  RENDERING   ============================================

  if (isLoading) {
    return <AppLoader loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={arrangedExpenses}
        keyExtractor={(item) => item.createdAt}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.mainRow}>
              <View style={{ width: "45%" }}>
                <Card style={styles.card}>
                  <Text style={styles.number}> {index + 1}) </Text>
                  <Text style={styles.title}> {item.category} </Text>
                  <Text style={styles.number}>
                    {" "}
                    {numberWithComa(item.amount)} {item.currency}{" "}
                  </Text>
                  <Chevron
                    open={index === currentIndex}
                    close={currentIndex === null || currentIndex !== index}
                    setIndex={() =>
                      setCurrentIndex(currentIndex === index ? null : index)
                    }
                    nextAnimation={() => mainRef.current}
                  />
                </Card>
                {index === currentIndex && (
                  <View style={styles.internalView}>
                    {expenses
                      .filter((expense) => expense.category === item.category)
                      .map((expense, i) => {
                        return (
                          <View style={styles.expenseContainer} key={i}>
                            <View style={styles.mainDetails}>
                              <Text style={styles.internalNumber}>
                                {" "}
                                {i + 1}){" "}
                              </Text>
                              <Text style={styles.internalText}>
                                {" "}
                                {expense.title}{" "}
                              </Text>
                              <Text style={styles.internalText}>
                                {" "}
                                {numberWithComa(expense.amount)}{" "}
                                {expense.currency}{" "}
                              </Text>
                              <Text style={styles.internalText}>
                                {" "}
                                {expense.description}{" "}
                              </Text>
                              <Text style={styles.internalText}>
                                Due In :{" "}
                                {moment(expense.dueIn).format("DD/MM/YYYY")}{" "}
                              </Text>
                              <Text style={styles.internalText}>
                                Funded By: {expense.source}
                              </Text>
                            </View>
                            <View style={styles.actionsContainer}>
                              <TouchableOpacity
                                onPress={() => editExpense(expense.expenseId)}
                              >
                                <Feather
                                  name="edit"
                                  size={globalWidth("2%")}
                                  color="black"
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => deleteExpense(expense.expenseId)}
                              >
                                <MaterialIcons
                                  name="delete-sweep"
                                  size={globalWidth("2.5%")}
                                  color="#ff0055"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      })}
                  </View>
                )}
              </View>
              <ExpensesDonut
                expensesValue={item.amount}
                totalValue={totalValue}
                changed={index % 2 === 0}
              />
            </View>
          );
        }}
      />
      <WebAlert
        showAlert={showAlert}
        title="Warning"
        message="Are you sure you want to delete this Expense ?"
        cancelText="No"
        onCancel={() => setShowAlert(false)}
        okText="Yes"
        onOk={confrimDelete}
      />
      {editableExpense && (
        <EditExpense
          showModal={showEdit}
          changeLoading={setIsLoading}
          changeLoadingMessage={setLoadingMessage}
          selectedExpense={editableExpense}
          closeEdit={() => {
            setShowEdit(false);
            setEditableExpense(null);
            setIsLoading(false);
            setLoadingMessage("");
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBlockColor: Colors.font,
    borderBottomWidth: 1,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 15,
    padding: globalWidth("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    maxHeight: globalHeight("6%"),
    marginVertical: globalHeight("0.5%"),
    marginTop: globalHeight("1%"),
    marginLeft: globalWidth("1%"),
  },
  internalView: {
    borderWidth: 1,
    borderRadius: 15,
    padding: globalWidth("1%"),
    flexGrow: 1,

    marginVertical: globalHeight("0.5%"),
    marginTop: globalHeight("1%"),
    marginLeft: globalWidth("1%"),
  },
  number: {
    fontFamily: "numbers",
    fontSize: globalWidth("1%"),
    color: Colors.font,
  },
  title: {
    fontFamily: "Hevletica",
    fontSize: globalWidth("1.2%"),
    color: Colors.font,
  },
  internalNumber: {
    fontFamily: "numbers",
    color: Colors.primary,
    fontSize: globalWidth("1%"),
  },
  internalText: {
    fontFamily: "Hevletica",
    color: Colors.font,
    fontSize: globalWidth("1%"),
    lineHeight: globalHeight("3.5%"),
  },
  expenseContainer: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    marginTop: globalHeight("1%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionsContainer: {
    justifyContent: "space-around",
    height: "80%",
    alignItems: "center",
  },
});

export default ExpensesList;
