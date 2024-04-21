import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { months } from "../../components/helpers/months";
import { years } from "../../components/helpers/years";

import DropWithButton from "../../components/DropWithButton";

import * as expensesActions from "../../store/expenses/expensesActions";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import moment from "moment";

import WebAlert from "../../components/webAlert/WebAlert";
import ExpensesTotalRow from "../../components/expenses/ExpensesTotalRow";
import ExpensesList from "../../components/expenses/ExpensesList";

const ManageFixedExpenses = (props) => {
  const { fixedExpenses } = useSelector((state) => state.expenses);

  const [arrangedExpenses, setArrangedExpenses] = useState([]);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [expensesLoading, setExpensesLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  // ===============================================GETTING EXPENSES===============================================

  const getExpenses = () => {
    if (!month || !year) {
      setIsError(true);
      setErrorMessage("Please select a month and a year");
    } else {
      setExpensesLoading(true);
      dispatch(expensesActions.getFixedExpenses(month, year)).then(() => {
        setExpensesLoading(false);
      });
    }
  };

  console.log(arrangedExpenses);

  // ===============================================ARRANGING EXPENSES=========================================================

  useEffect(() => {
    if (fixedExpenses.length > 0) {
      const arrangedExpenses = fixedExpenses[0].fixedExpenses.reduce(
        (acc, data) => {
          const found = acc.find((a) => a.category === data.category);

          if (!found) {
            acc.push({
              category: data.category,
              amount: data.amount,
              businessId: data.businessId,
              categoryOtherText: data.categoryOtherText,
              createdAt: data.createdAt,
              currency: data.currency,
              description: data.description,
              dueIn: data.dueIn,
              recurringDay: data.recurringDay,
              recurringType: data.recurringType,
              source: data.source,
              title: data.title,
            });
          } else {
            found.amount += data.amount;
          }

          return acc;
        },
        []
      );
      setArrangedExpenses(arrangedExpenses);
    }
  }, [fixedExpenses]);

  // ===============================================RENDERING===============================================

  return (
    <View style={styles.container}>
      <View style={styles.datesRow}>
        <DropWithButton
          list={months.map((a) => {
            return {
              label: a,
              value: a,
            };
          })}
          buttonTitle={month ? month : "Select a Month"}
          getSelection={setMonth}
          width={globalWidth("8%")}
          margin={globalWidth("0.1%")}
          isOpened={(data) => setIsOpened(data)}
          rounded
        />
        <DropWithButton
          list={years}
          buttonTitle={year ? year : "Select a Year"}
          getSelection={setYear}
          width={globalWidth("8%")}
          margin={globalWidth("0.1%")}
          isOpened={(data) => setIsOpened(data)}
          rounded
        />
        {expensesLoading ? (
          <View
            style={[
              styles.buttonStyle,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <ActivityIndicator size="small" color={Colors.font} />
          </View>
        ) : (
          <Button
            title="Get Expenses"
            buttonStyle={styles.buttonStyle}
            onPress={getExpenses}
            titleStyle={styles.buttonTitleStyle}
          />
        )}
      </View>
      {arrangedExpenses.length > 0 && (
        <>
          <ExpensesTotalRow
            totalValue={fixedExpenses[0].totalFixedExpenses}
            expenses={arrangedExpenses.map((a) => {
              return {
                category: a.category,
                amount: a.amount,
                currency: a.currency,
              };
            })}
            getSelectedCategory={setSelectedCategory}
          />
          <ExpensesList
            arrangedExpenses={arrangedExpenses}
            selectedCategory={selectedCategory}
            expenses={fixedExpenses[0].fixedExpenses}
            totalValue={fixedExpenses[0].totalFixedExpenses}
          />
        </>
      )}
      <WebAlert
        message={errorMessage}
        okText="Ok"
        cancelText="No"
        onOk={() => setIsError(false)}
        onCancel={() => setIsError(false)}
        showAlert={isError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datesRow: {
    width: globalWidth("25%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  buttonStyle: {
    backgroundColor: "transparent",
    borderColor: Colors.font,
    borderWidth: 1,
    borderRadius: 10,
    width: globalWidth("8%"),
    height: globalHeight("3.8%"),
    marginLeft: globalWidth("0.1%"),
  },
  buttonTitleStyle: {
    fontFamily: "robotoRegular",
    color: Colors.font,
    fontSize: globalWidth("0.8%"),
    fontStyle: "italic",
  },
});

export default ManageFixedExpenses;
