import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { months } from "../../components/helpers/months";
import { years } from "../../components/helpers/years";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import Colors from "../../constants/Colors";
import moment from "moment";

import DropWithButton from "../../components/DropWithButton";
import WebAlert from "../../components/webAlert/WebAlert";

import * as expensesActions from "../../store/expenses/expensesActions";
import VariableList from "../../components/expenses/VariableList";
import ExpensesTotalRow from "../../components/expenses/ExpensesTotalRow";
import ExpensesOverView from "./ExpensesOverView";

const ManageVariableExpenses = (props) => {
  const { variableExpenses } = useSelector((state) => state.expenses);

  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [expensesLoading, setExpensesLoading] = useState(false);
  const [arrangedExpenses, setArrangedExpenses] = useState([]);

  const dispatch = useDispatch();

  // =================================================GETTTING VARIABLE EXPENSES=================================================

  const getExpenses = () => {
    setExpensesLoading(true);
    dispatch(expensesActions.getVariableExpenses(month, year)).then(() => {
      setExpensesLoading(false);
    });
  };

  // ===============================================ARRANGING EXPENSES=========================================================

  useEffect(() => {
    if (variableExpenses.length > 0) {
      const arrangedExpenses =
        variableExpenses &&
        variableExpenses[0].variableExpenses.reduce((acc, data) => {
          const found = acc.find((a) => a.category === data.category);

          if (!found) {
            acc.push({
              category: data.category,
              amount: data.amount,
              currency: data.currency,
              receiptAmount: data.receiptAmount,
              receiptCurrency: data.receiptCurrency,
            });
          } else {
            found.amount += data.amount;
            found.receiptAmount += data.receiptAmount;
          }

          return acc;
        }, []);
      setArrangedExpenses(arrangedExpenses);
    }
  }, [variableExpenses]);

  console.log(variableExpenses);

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
            totalValue={variableExpenses[0].totalAmount}
            expenses={arrangedExpenses}
            getSelectedCategory={(data) => console.log(data)}
          />
          <VariableList
            totalExpenses={variableExpenses[0].totalAmount}
            variableExpenses={variableExpenses[0].variableExpenses}
            variableArranged={arrangedExpenses}
          />
        </>
      )}
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

export default ManageVariableExpenses;
