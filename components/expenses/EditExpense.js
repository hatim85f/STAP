import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as expensesActions from "../../store/expenses/expensesActions";
import * as businessActions from "../../store/business/businessActions";

import DropWithButton from "../DropWithButton";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";

const EditExpense = (props) => {
  const { busiessesDetails } = useSelector((state) => state.business);

  const {
    showModal,
    changeLoading,
    changeLoadingMessage,
    selectedExpense,
    closeEdit,
  } = props;

  const [amount, setAmount] = useState(selectedExpense.amount);
  const [category, setCategory] = useState(selectedExpense.category);
  const [categoryOtherText, setCategoryOtherText] = useState(
    selectedExpense.categoryOtherText
  );
  const [businessSelected, setBusinessSelected] = useState("");
  const [businessList, setBusinessList] = useState([]);
  const [description, setDescription] = useState(selectedExpense.description);
  const [recurringDay, setRecurringDay] = useState(
    selectedExpense.recurringDay
  );
  const [dueIn, setDueIn] = useState(selectedExpense.dueIn);
  const [categoryList, setCategoryList] = useState([
    { label: "Rent", value: "Rent" },
    { label: "Utilities", value: "Utilities" },
    { label: "Salaries", value: "Salaries" },
    { label: "Insurance", value: "Insurance" },
    { label: "Other", value: "Other" },
  ]);
  const [categoryIsOpened, setCategoryIsOpened] = useState(false);
  const [recurringType, setRecurringType] = useState("");
  const [source, setSource] = useState("");

  const dispatch = useDispatch();

  const submitEdit = () => {
    changeLoading(true);
    changeLoadingMessage("Editing Expense");
    dispatch(
      expensesActions.editFixedExpenses(
        selectedExpense.expenseId,
        selectedExpense.currency,
        amount,
        category,
        categoryOtherText,
        description,
        recurringDay,
        dueIn,
        businessSelected,
        source,
        recurringType
      )
    ).then(() => {
      changeLoading(false);
      closeEdit();
    });
  };

  const recurringList = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Quarterly", value: "Quarterly" },
    { label: "Yearly", value: "Yearly" },
  ];

  const sourceList = [
    { label: "Out Source", value: "Out Source" },
    { label: "Sales", value: "Sales" },
    { label: "Credit Card", value: "Credit Card" },
    { label: "Cash", value: "Cash" },
  ];

  useEffect(() => {
    dispatch(businessActions.getBusinessesDetails());
  }, [dispatch]);

  useEffect(() => {
    const businessList = busiessesDetails.map((business) => {
      return {
        label: business.businessName,
        value: business._id,
      };
    });

    setBusinessList(businessList);
  }, [busiessesDetails]);

  return (
    <Modal visible={showModal} animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity
          onPress={closeEdit}
          style={{ alignSelf: "flex-end", marginRight: 10, marginTop: 10 }}
        >
          <FontAwesome name="window-close" size={24} color={Colors.font} />
        </TouchableOpacity>
        <View style={styles.topRow}>
          <View style={{ width: "48%", flex: 1 }}>
            <DropWithButton
              list={categoryList}
              buttonTitle="Category"
              getSelection={(data) => setCategory(data)}
              rounded
              margin={globalWidth("0.5%")}
              isOpened={(data) => setCategoryIsOpened(data)}
              width={globalWidth("13%")}
            />
          </View>
          <View style={{ width: "48%" }}>
            <DropWithButton
              list={businessList}
              buttonTitle="Business"
              getSelection={(data) => setBusinessSelected(data)}
              isOpened={(data) => setCategoryIsOpened(data)}
              rounded
              margin={globalWidth("0.5%")}
              width={globalWidth("13%")}
            />
          </View>
        </View>
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {category === "Other" && (
            <Input
              label="Other Category"
              labelStyle={styles.inputLabel}
              style={styles.input}
              containerStyle={styles.inputContainer}
              onChangeText={(text) => setCategoryOtherText(text)}
              defaultValue={otherCategoryText}
            />
          )}
          <Input
            label={`Amount (${selectedExpense.currency})`}
            labelStyle={styles.inputLabel}
            style={styles.input}
            containerStyle={styles.inputContainer}
            onChangeText={(text) => setAmount(text)}
            defaultValue={amount}
          />
          <Input
            label="Description"
            labelStyle={styles.inputLabel}
            style={styles.input}
            containerStyle={styles.inputContainer}
            onChangeText={(text) => setDescription(text)}
            defaultValue={description}
          />
          <Input
            label="Recurring Day"
            labelStyle={styles.inputLabel}
            style={styles.input}
            containerStyle={styles.inputContainer}
            onChangeText={(text) => setRecurringDay(text)}
            defaultValue={recurringDay}
          />
          <Input
            label="Due In"
            labelStyle={styles.inputLabel}
            style={styles.input}
            containerStyle={styles.inputContainer}
            onChangeText={(text) => setDueIn(text)}
            defaultValue={moment(dueIn).format("DD/MM/YYYY")}
            placeholder="DD/MM/YYYY"
          />
          <View style={styles.topRow}>
            <View style={{ width: "48%", flex: 1 }}>
              <DropWithButton
                list={recurringList}
                buttonTitle="Recuring Type"
                getSelection={(data) => setRecurringType(data)}
                rounded
                margin={globalWidth("0.5%")}
                isOpened={(data) => setCategoryIsOpened(data)}
                width={globalWidth("13%")}
              />
            </View>
            <View style={{ width: "48%" }}>
              <DropWithButton
                list={sourceList}
                buttonTitle="Fund Source"
                getSelection={(data) => setSource(data)}
                isOpened={(data) => setCategoryIsOpened(data)}
                rounded
                margin={globalWidth("0.5%")}
                width={globalWidth("13%")}
              />
            </View>
          </View>
          <Button
            title="Submit"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            onPress={submitEdit}
            disabled={
              amount === "" ||
              category === "" ||
              businessSelected === "" ||
              description === "" ||
              recurringDay === "" ||
              dueIn === ""
            }
            disabledStyle={styles.disabledButton}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: globalWidth("50%"),
    backgroundColor: Colors.haizyColor,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: Colors.primary,
    borderWidth: 1.5,
    maxHeight: globalHeight("70%"),
    marginTop: globalHeight("15%"),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "flex-start",
    alignSelf: "center",
  },
  inputContainer: {
    width: globalWidth("40%"),
    marginTop: globalHeight("2%"),
  },
  input: {
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1%"),
    color: Colors.font,
  },
  descriptionContainer: {
    marginTop: globalHeight("2%"),
  },
  label: {
    fontSize: globalWidth("1%"),
    color: Colors.font,
    fontFamily: "HelveticaNeue",
    marginBottom: globalHeight("1%"),
  },
  buttonTitle: {
    fontFamily: "HelveticaNeue",
    color: "white",
    fontSize: globalWidth("1%"),
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
});

export const EditExpenseOptions = (navData) => {
  return {
    headerTitle: "EditExpense",
  };
};

export default EditExpense;
