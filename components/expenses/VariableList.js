import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../AppLoader";
import Card from "../Card";
import ExpensesDonut from "../charts/ExpensesDonut";
import numberWithComa from "../helpers/numberWithComa";
import Chevron from "../Chevron";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import moment from "moment";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import ImageModal from "./ImageModal";
import WebAlert from "../webAlert/WebAlert";

import * as expensesActions from "../../store/expenses/expensesActions";
import EditVariableExpense from "./EditVariableExpense";

const VariableList = (props) => {
  const { totalExpenses, variableExpenses, variableArranged } = props;

  const [currentIndex, setCurrentIndex] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [editableExpense, setEditableExpense] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptURL, setReceiptURL] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [receiptCurrency, setReceiptCurrency] = useState("");
  const [receiptAmount, setReceiptAmount] = useState("");

  const deleteExpense = (id) => {
    setShowAlert(true);
    setDeletedId(id);
  };

  const dispatch = useDispatch();

  const confrimDelete = () => {
    setIsLoading(true);
    setLoadingMessage("Deleting Expense");
    dispatch(expensesActions.deleteVariableExpenses(deletedId)).then(() => {
      setIsLoading(false);
      setDeletedId(null);
      setShowAlert(false);
    });
  };

  const editExpense = (id) => {
    setShowEdit(true);
    const editableExpense = variableExpenses.find(
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
        data={variableArranged}
        keyExtractor={(item) => item.category}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.mainRow}>
              <View style={{ minWidth: "60%", maxWidth: "60%" }}>
                <Card style={styles.card}>
                  <Text style={styles.number}> {index + 1}) </Text>
                  <Text style={styles.title}> {item.category} </Text>
                  <Text style={styles.number}>
                    {" "}
                    {numberWithComa(item.amount)} {item.currency}{" "}
                  </Text>
                  <Text style={styles.number}>
                    {numberWithComa(item.receiptAmount)} {item.receiptCurrency}
                  </Text>
                  <Chevron
                    open={index === currentIndex}
                    close={currentIndex === null || currentIndex !== index}
                    setIndex={() =>
                      setCurrentIndex(currentIndex === index ? null : index)
                    }
                  />
                </Card>
                {index === currentIndex &&
                  variableExpenses
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
                              Expense Date :{" "}
                              {moment(expense.expenseDate).format("DD/MM/YYYY")}{" "}
                            </Text>
                            <Text style={styles.internalText}>
                              Funded By: {expense.source}
                            </Text>
                            {item.category === "Other" && (
                              <Text style={styles.internalText}>
                                {expense.categoryOtherText}
                              </Text>
                            )}
                            <Text style={styles.internalText}>
                              Receipt Amount{" "}
                              <Text style={styles.internalNumber}>
                                {numberWithComa(item.receiptAmount)}{" "}
                              </Text>{" "}
                              {item.receiptCurrency}{" "}
                            </Text>
                            {expense.isReceiptAvailable && (
                              <Button
                                buttonStyle={styles.showReceiptBtn}
                                title="Show Receipt"
                                onPress={() => {
                                  setShowReceipt(true);
                                  setReceiptURL(expense.receiptImage);
                                  setReceiptDate(expense.receiptDate);
                                  setReceiptAmount(expense.receiptAmount);
                                  setReceiptCurrency(expense.receiptCurrency);
                                }}
                                titleStyle={styles.receiptBtnTitle}
                              />
                            )}
                            <Text style={styles.internalText}>
                              Created By :{" "}
                              <Text style={styles.internalNumber}>
                                {expense.createdBy}{" "}
                              </Text>{" "}
                            </Text>
                            <Text style={styles.internalText}>
                              Submitted on :{" "}
                              <Text style={styles.internalNumber}>
                                {moment(expense.dateOfSubmission).format(
                                  "DD/MM/YYYY"
                                )}{" "}
                              </Text>{" "}
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
              <ExpensesDonut
                expensesValue={item.amount}
                totalValue={totalExpenses}
                changed={index % 2 === 0}
              />
            </View>
          );
        }}
      />
      <ImageModal
        showReceipt={showReceipt}
        closeReceipt={() => setShowReceipt(false)}
        receiptURL={receiptURL}
        receiptDate={receiptDate}
        receiptAmount={receiptAmount}
        receiptCurrency={receiptCurrency}
      />
      <WebAlert
        showAlert={showAlert}
        title="Warning !"
        message="Are you sure you want to delete this expense?"
        onOk={confrimDelete}
        onCancel={() => setShowAlert(false)}
        okText="Yes"
        cancelText="No"
      />
      {showEdit && editableExpense && (
        <EditVariableExpense
          showEdit={showEdit}
          setShowEdit={() => setShowEdit(false)}
          editableExpense={editableExpense}
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
    width: "100%",
  },
  internalView: {
    borderWidth: 1,
    borderRadius: 15,
    padding: globalWidth("1%"),
    flexGrow: 1,
    marginVertical: globalHeight("0.5%"),
    marginTop: globalHeight("1%"),
    marginLeft: globalWidth("1%"),
    width: "70%",
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
    marginLeft: globalWidth("1%"),
  },
  internalText: {
    fontFamily: "Hevletica",
    color: Colors.font,
    fontSize: globalWidth("1%"),
    lineHeight: globalHeight("3.5%"),
    marginLeft: globalWidth("1%"),
  },
  expenseContainer: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    marginTop: globalHeight("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    // marginLeft: 0,
  },
  actionsContainer: {
    justifyContent: "space-around",
    height: "80%",
    alignItems: "center",
    width: "30%",
  },
  showReceiptBtn: {
    backgroundColor: Colors.primary,
    width: "60%",
    alignSelf: "center",
    borderRadius: 15,
  },
  receiptBtnTitle: {
    fontSize: globalWidth("1%"),
    fontFamily: "Hevletica",
    color: "white",
  },
});

export const VariableListOptions = (navData) => {
  return {
    headerTitle: "VariableList",
  };
};

export default VariableList;
