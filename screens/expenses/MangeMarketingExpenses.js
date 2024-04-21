import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader";

import { months } from "../../components/helpers/months";
import { years } from "../../components/helpers/years";

import * as expensesActions from "../../store/expenses/expensesActions";
import DropWithButton from "../../components/DropWithButton";
import { ActivityIndicator } from "react-native";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import ExpensesOverView from "./ExpensesOverView";
import MarketingChart from "./MarketingChart";
import MarketingList from "./MarketingList";
import PersonalMarketing from "./PersonalMarketing";

const MangeMarketingExpenses = (props) => {
  const { marketingExpenses, previousExpenses } = useSelector(
    (state) => state.expenses
  );

  // =============================================MANAGING STATUS=============================================

  const [isLoading, setIsLoading] = useState(false);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [expensesLoading, setExpensesLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const dispatch = useDispatch();

  // ============================================GETTING MARKETING EXPENSES============================================

  const getExpenses = () => {
    setExpensesLoading(true);
    dispatch(expensesActions.getMarketingExpenses(month, year)).then(() => {
      setExpensesLoading(false);
    });
  };

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

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
      {previousExpenses && marketingExpenses.length > 0 && (
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <ExpensesOverView
            expenses={marketingExpenses}
            previousExpenses={
              previousExpenses.length > 0
                ? previousExpenses[0]
                : [
                    {
                      numberOfClaimedExpenses: 0,
                      numberOfPreviousMonthExpenses: 0,
                      totalAmount: 0,
                    },
                  ]
            }
          />
          <View style={styles.detailsContainer}>
            <View style={styles.rowContainer}>
              <MarketingChart expenses={marketingExpenses} />
              <PersonalMarketing expenses={marketingExpenses} />
            </View>
            <MarketingList
              expenses={marketingExpenses}
              month={month}
              year={year}
            />
          </View>
          <View style={{ height: globalHeight("3%") }} />
        </ScrollView>
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
  detailsContainer: {
    width: "95%",
    alignSelf: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});

export default MangeMarketingExpenses;
