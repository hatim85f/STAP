import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import DropWithButton from "../../components/DropWithButton";
import Loader from "../../components/Loader";

import * as businessActions from "../../store/business/businessActions";
import * as expensesActions from "../../store/expenses/expensesActions";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import SideBar from "../../components/SideBar";
import UploadImage from "../../components/helpers/UploadImages";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

const EditVariableExpense = (props) => {
  const { showEdit, setShowEdit, editableExpense } = props;

  const { busiessesDetails } = useSelector((state) => state.business);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [categoryList, setCategoryList] = useState([
    { label: "Groceries", value: "Groceries" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Transportation", value: "Transportation" },
    { label: "Health", value: "Health" },
    { label: "Other", value: "Other" },
  ]);
  const [categoryIsOpened, setCategoryIsOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    editableExpense.category
  );
  const [otherCategoryText, setOtherCategoryText] = useState(
    editableExpense.categoryOtherText
  );
  const [description, setDescription] = useState(editableExpense.description);
  const [amount, setAmount] = useState(editableExpense.amount);
  const [businessSelected, setBusinessSelected] = useState(
    editableExpense.businessId
  );
  const [businessList, setBusinessList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment(editableExpense.expenseDate).format("DD/MM/YYYY")
  );
  const [businessCurrency, setBusinessCurrency] = useState(
    editableExpense.currency
  );
  const [recurringDay, setRecurringDay] = useState(
    editableExpense.recurringDay
  );
  const [source, setSource] = useState(editableExpense.source);
  const [isReceiptAvailable, setIsReceiptAvailable] = useState(
    editableExpense.isReceiptAvailable
  );
  const [imageUrl, setImageUrl] = useState(editableExpense.receiptURL);
  const [title, setTitle] = useState(editableExpense.title);
  const [receiptAmount, setReceiptAmount] = useState(
    editableExpense.receiptAmount
  );
  const [receiptDate, setReceiptDate] = useState(
    moment(editableExpense.receiptDate).format("DD/MM/YYYY")
  );
  const [receiptCurrency, setReceiptCurrency] = useState(
    editableExpense.receiptCurrency
  );

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
        value: business.businessId,
      };
    });

    setBusinessList(businessList);
  }, [busiessesDetails]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(editableExpense);

  useEffect(() => {
    if (busiessesDetails.length > 0 && businessSelected !== "") {
      const businessCurrency = busiessesDetails.find(
        (business) => business.businessId === businessSelected
      ).currencySymbol;

      setBusinessCurrency(businessCurrency);
    }
  }, [businessSelected, busiessesDetails]);

  const sourceList = [
    { label: "Out Source", value: "Out Source" },
    { label: "Sales", value: "Sales" },
    { label: "Credit Card", value: "Credit Card" },
    { label: "Cash", value: "Cash" },
  ];

  const submit = () => {
    setIsLoading(true);
    setLoadingMessage("Adding variable expenses");
    dispatch(
      expensesActions.editVariableExpenses(
        editableExpense._id,
        businessCurrency,
        businessSelected,
        title,
        amount,
        selectedCategory,
        otherCategoryText,
        description,
        selectedDate,
        isReceiptAvailable,
        imageUrl,
        receiptAmount,
        receiptDate,
        receiptCurrency,
        source
      )
    ).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
      setTitle("");
      setSelectedCategory("");
      setOtherCategoryText("");
      setDescription("");
      setAmount(0);
      setBusinessSelected("");
      setSelectedDate(null);
      setRecurringDay(null);
      setSource("");
      setIsReceiptAvailable(false);
      setImageUrl("");
      setReceiptAmount(0);
      setReceiptDate(moment(new Date()).format("DD/MM/YYYY"));
      setReceiptCurrency("");
      setShowEdit(false);
    });
  };

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  return (
    <Modal visible={showEdit} animationType="slide">
      <TouchableOpacity
        style={{ alignItems: "flex-end", margin: 10 }}
        onPress={() => setShowEdit(false)}
      >
        <AntDesign
          name="closesquare"
          size={globalWidth("2%")}
          color="#ff0055"
        />
      </TouchableOpacity>
      <View style={styles.mainRow}>
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.topRow}>
              <View style={{ width: "30%" }}>
                <DropWithButton
                  list={categoryList}
                  buttonTitle="Category"
                  getSelection={(data) => setSelectedCategory(data)}
                  rounded
                  margin={globalWidth("0.5%")}
                  isOpened={(data) => setCategoryIsOpened(data)}
                  width={globalWidth("11%")}
                />
              </View>
              <View style={{ width: "30%" }}>
                <DropWithButton
                  list={businessList}
                  buttonTitle="Business"
                  getSelection={(data) => setBusinessSelected(data)}
                  isOpened={(data) => setCategoryIsOpened(data)}
                  rounded
                  margin={globalWidth("0.5%")}
                  width={globalWidth("11%")}
                />
              </View>
              <View style={{ width: "30%" }}>
                <DropWithButton
                  list={sourceList}
                  buttonTitle="Fund Source"
                  getSelection={(data) => setSource(data)}
                  isOpened={(data) => setCategoryIsOpened(data)}
                  rounded
                  margin={globalWidth("0.5%")}
                  width={globalWidth("11%")}
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
              label={
                businessCurrency ? `Amount (${businessCurrency})` : "Amount"
              }
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
            <View style={styles.receiptContainer}>
              <Input
                label="Receipt Amount"
                labelStyle={styles.inputLabel}
                style={styles.input}
                containerStyle={styles.inputContainer}
                keyboardType="numeric"
                onChangeText={(text) => setReceiptAmount(text)}
                defaultValue={receiptAmount}
                placeholder={businessCurrency}
              />
              <Input
                label="Receipt Date"
                labelStyle={styles.inputLabel}
                style={styles.input}
                containerStyle={styles.inputContainer}
                keyboardType="numeric"
                onChangeText={(text) => setReceiptDate(text)}
                defaultValue={receiptDate}
                placeholder="DD/MM/YYYY"
              />
              <Input
                label="Receipt Currency"
                labelStyle={styles.inputLabel}
                style={styles.input}
                containerStyle={styles.inputContainer}
                onChangeText={(text) => setReceiptCurrency(text)}
                defaultValue={receiptCurrency}
              />
              <CheckBox
                checked={isReceiptAvailable}
                title="Receipt Available"
                onPress={() => setIsReceiptAvailable(!isReceiptAvailable)}
                checkedColor={Colors.primary}
              />
              {isReceiptAvailable && (
                <View style={styles.receiptData}>
                  <UploadImage
                    imageName={`${businessSelected}`}
                    getURL={(url) => setImageUrl(url)}
                    disabled={!isReceiptAvailable}
                    subFolder={`receipts/${title}/${selectedDate}`}
                    width={globalWidth("35%")}
                  />
                </View>
              )}
            </View>
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
          <View style={{ height: globalHeight("10%") }} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainRow: {
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
    alignSelf: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
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
  receiptData: {
    width: globalWidth("40%"),
  },
});

export default EditVariableExpense;
