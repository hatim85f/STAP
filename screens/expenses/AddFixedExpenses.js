import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DropWithButton from "../../components/DropWithButton";
import Loader from "../../components/Loader";

import * as businessActions from "../../store/business/businessActions";
import * as expensesActions from "../../store/expenses/expensesActions";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import SideBar from "../../components/SideBar";

const AddFixedExpenses = (props) => {
  const { busiessesDetails } = useSelector((state) => state.business);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [categoryList, setCategoryList] = useState([
    { label: "Rent", value: "Rent" },
    { label: "Utilities", value: "Utilities" },
    { label: "Salaries", value: "Salaries" },
    { label: "Insurance", value: "Insurance" },
    { label: "Other", value: "Other" },
  ]);
  const [title, setTitle] = useState("");
  const [categoryIsOpened, setCategoryIsOpened] = useState(false);
  const [businessIsOpened, setBusinessIsOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [otherCategoryText, setOtherCategoryText] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [businessSelected, setBusinessSelected] = useState("");
  const [businessList, setBusinessList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [businessCurrency, setBusinessCurrency] = useState("");
  const [recurringDay, setRecurringDay] = useState(null);
  const [recurringType, setRecurringType] = useState("");
  const [source, setSource] = useState("");

  // =================================================GETTING BUSINESSES DETAILS=================================================

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting businesses details");
    dispatch(businessActions.getBusinessesDetails()).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (busiessesDetails.length > 0 && businessSelected !== "") {
      const businessCurrency = busiessesDetails.find(
        (business) => business._id === businessSelected
      ).currencySymbol;

      setBusinessCurrency(businessCurrency);
    }
  }, [businessSelected, busiessesDetails]);

  const submit = () => {
    setIsLoading(true);
    setLoadingMessage("Adding fixed expenses");
    dispatch(
      expensesActions.addFixedExpenses(
        businessSelected,
        businessCurrency,
        title,
        amount,
        selectedCategory,
        otherCategoryText,
        description,
        recurringDay,
        selectedDate,
        recurringType,
        source
      )
    ).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
      setTitle("");
      setAmount(0);
      setSelectedCategory("");
      setOtherCategoryText("");
      setDescription("");
      setBusinessSelected("");
      setSelectedDate(null);
      setRecurringDay(null);
      setRecurringType("");
      setSource("");
    });
  };

  const recurringList = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Yearly", value: "Yearly" },
  ];

  const sourceList = [
    { label: "Out Source", value: "Out Source" },
    { label: "Sales", value: "Sales" },
    { label: "Credit Card", value: "Credit Card" },
    { label: "Cash", value: "Cash" },
  ];

  // ===========================================================RENDERING==========================================================

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  return (
    <View style={styles.mainRow}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.topRow}>
            <View style={{ width: "48%", flex: 1 }}>
              <DropWithButton
                list={categoryList}
                buttonTitle="Category"
                getSelection={(data) => setSelectedCategory(data)}
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
          <Input
            label="Title"
            labelStyle={styles.inputLabel}
            style={styles.input}
            containerStyle={styles.inputContainer}
            onChangeText={(text) => setTitle(text)}
            defaultValue={title}
          />
          {selectedCategory === "Other" && (
            <Input
              label="Other Category"
              labelStyle={styles.inputLabel}
              style={styles.input}
              containerStyle={styles.inputContainer}
              onChangeText={(text) => setOtherCategoryText(text)}
              defaultValue={otherCategoryText}
            />
          )}
          <View style={styles.descriptionContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="type description here...."
              onChangeText={(text) => setDescription(text)}
              value={description}
              placeholderTextColor={"#ccc"}
            />
          </View>
          <Input
            label={businessCurrency ? `Amount (${businessCurrency})` : "Amount"}
            labelStyle={styles.inputLabel}
            style={styles.input}
            containerStyle={styles.inputContainer}
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text)}
            defaultValue={amount}
            placeholder={businessCurrency}
          />
          <Input
            label="Due In:"
            labelStyle={styles.inputLabel}
            style={styles.input}
            containerStyle={styles.inputContainer}
            keyboardType="numeric"
            onChangeText={(text) => setSelectedDate(text)}
            defaultValue={recurringDay}
            placeholder="DD/MM/YYYY"
          />
          <Input
            label="Recuring Day"
            labelStyle={styles.inputLabel}
            style={styles.input}
            containerStyle={styles.inputContainer}
            keyboardType="numeric"
            onChangeText={(text) => setRecurringDay(text)}
            defaultValue={recurringDay}
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
          {!categoryIsOpened && (
            <Text style={styles.note}>
              Any Source other than sales will not be deducted from profit
            </Text>
          )}
          <Button
            title="Submit"
            onPress={submit}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.buttonStyle}
            disabled={
              selectedCategory === "" ||
              businessSelected === "" ||
              amount === 0 ||
              selectedDate === null
            }
            disabledStyle={styles.disabledButton}
          />
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "flex-start",
  },
  inputContainer: {
    width: globalWidth("40%"),
    marginTop: globalHeight("2%"),
  },
  input: {
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1.2%"),
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
  textArea: {
    width: globalWidth("40%"),
    borderRadius: 10,
    borderColor: Colors.font,
    borderWidth: 1,
    fontSize: globalWidth("1%"),
    padding: globalWidth("1%"),
    color: Colors.font,
    fontFamily: "HelveticaNeue",
  },
  labelStyle: {
    color: Colors.font,
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1.2%"),
  },
  dateRow: {
    width: "85%",
    alignItems: "flex-start",
    marginTop: globalHeight("2%"),
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
  note: {
    textAlign: "center",
    fontSize: globalWidth("1%"),
    color: Colors.font,
    fontFamily: "HelveticaNeue",
    marginTop: globalHeight("1%"),
    fontStyle: "italic",
  },
});

export default AddFixedExpenses;
