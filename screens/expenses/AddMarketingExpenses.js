import React, { useState, useEffect, Fragment } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as productsActions from "../../store/products/productsActions";
import * as expensesActions from "../../store/expenses/expensesActions";

import BusinessSlection from "../../components/BusinessSelection";
import SideBar from "../../components/SideBar";

import { globalHeight, globalWidth } from "../../constants/globalWidth";

import Colors from "../../constants/Colors";
import DropWithButton from "../../components/DropWithButton";
import Loader from "../../components/Loader";
import moment from "moment";

// these are the aspects expected to be received in the backend response
// businessId,
//     requestedBy,
//     requestAgainst,
//     requestedFor,
//     rationale,
//     amount,
//     currency,
//     dueIn,

const AddMarketingExpenses = (props) => {
  const { products } = useSelector((state) => state.products);
  const { business } = useSelector((state) => state.business);

  const [businessId, setBusinessId] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [listIsOpened, setListIsOpened] = useState(false);
  const [requestAgainst, setRequestAgainst] = useState("");
  const [requestedFor, setRequestedFor] = useState("");
  const [rationale, setRationale] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [dueIn, setDueIn] = useState("");
  const [porductsList, setPorductsList] = useState([]);
  const [productIsOpened, setProductIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [kindOfExpense, setKindOfExpense] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (businessId) {
      dispatch(productsActions.getBusinessProducts(businessId));
    }
  }, [businessId]);

  useEffect(() => {
    if (products) {
      const productsList = products.map((item) => {
        return {
          label: item.productNickName,
          value: item._id,
        };
      });

      setPorductsList(productsList);
    }
  }, [products]);

  useEffect(() => {
    if (businessId) {
      const businesses = business.map((a) => a.business);
      const selectedBusinessData = businesses.find((x) => x._id === businessId);
      setCurrency(selectedBusinessData.currencySymbol);
    }
  }, [businessId, business]);

  const submit = () => {
    setIsLoading(true);
    dispatch(
      expensesActions.addMarketingExpenses(
        businessId,
        requestAgainst,
        requestedFor,
        rationale,
        amount,
        currency,
        dueIn,
        kindOfExpense
      )
    ).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.mainRow}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={{ width: "100%" }}>
            <BusinessSlection
              getBusinessId={setBusinessId}
              getSelectedBusiness={setSelectedBusiness}
              getOpen={setListIsOpened}
            />
          </View>
          {!listIsOpened && (
            <Fragment>
              <DropWithButton
                list={porductsList}
                buttonTitle="Product"
                getSelection={setRequestAgainst}
                rounded
                margin={globalWidth("0.5%")}
                isOpened={(data) => setProductIsOpened(data)}
                width={globalWidth("13%")}
              />
              <Input
                style={styles.input}
                containerStyle={styles.inputContainer}
                label="Requested For"
                value={requestedFor}
                onChangeText={setRequestedFor}
                labelStyle={styles.labelStyle}
              />
              <Input
                style={styles.input}
                containerStyle={styles.inputContainer}
                label="Rationale"
                value={rationale}
                onChangeText={setRationale}
                labelStyle={styles.labelStyle}
              />
              <Input
                style={styles.input}
                containerStyle={styles.inputContainer}
                label={"Amount" + ` (${currency})`}
                value={amount}
                onChangeText={setAmount}
                labelStyle={styles.labelStyle}
              />
              <Input
                style={styles.input}
                containerStyle={styles.inputContainer}
                label="Due In"
                value={dueIn}
                placeholder="DD/MM/YYYY"
                onChangeText={setDueIn}
                labelStyle={styles.labelStyle}
              />
              <Input
                style={styles.input}
                containerStyle={styles.inputContainer}
                label="Kind of Expense"
                value={kindOfExpense}
                onChangeText={setKindOfExpense}
                labelStyle={styles.labelStyle}
              />
              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  title="Submit"
                  onPress={submit}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={styles.buttonStyle}
                  disabled={
                    !businessId ||
                    !requestAgainst ||
                    !requestedFor ||
                    !rationale ||
                    !amount ||
                    !dueIn
                  }
                  disabledStyle={styles.disabledButton}
                />
              )}
            </Fragment>
          )}
        </View>
      </ScrollView>
      <SideBar />
    </View>
  );
};

const styles = StyleSheet.create({
  mainRow: {
    flexDirection: "row",
    flex: 1,
  },
  container: {
    marginHorizontal: globalHeight("8%"),
    width: globalWidth("50%"),
    borderRadius: 10,
    borderColor: Colors.font,
    borderWidth: 1,
    padding: globalWidth("2%"),
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    width: globalWidth("10%"),
    alignSelf: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: globalHeight("2%"),
  },
  disabledButton: {
    borderWidth: 0,
    borderRadius: 0,
  },
  buttonTitle: {
    fontFamily: "HelveticaNeue",
    color: "white",
    fontSize: globalWidth("1%"),
  },
});

export default AddMarketingExpenses;
