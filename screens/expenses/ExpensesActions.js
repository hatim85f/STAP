import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Easing,
} from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";

import * as expensesActions from "../../store/expenses/expensesActions";
import * as authActions from "../../store/auth/authActions";
import numberWithComa from "../../components/helpers/numberWithComa";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import moment from "moment";
import UploadImage from "../../components/helpers/UploadImages";

import { FontAwesome5 } from "@expo/vector-icons";

const ExpensesActions = (props) => {
  const { marketingExpenses } = useSelector((state) => state.expenses);
  const { token, user } = useSelector((state) => state.auth);

  const { id, month, year } = props.route.params;

  const [expense, setExpense] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [statusComment, setStatusComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [chaningLoading, setChaningLoading] = useState(false);
  const [receiptURL, setReceiptURL] = useState("");
  const [receiptAmount, setReceiptAmount] = useState(0);
  const [receiptCurrency, setReceiptCurrency] = useState("");
  const [receiptIsLoading, setReceiptIsLoading] = useState(false);
  const [revisionIsLoading, setRevisionIsLoading] = useState(false);
  const [revisionComment, setRevisionComment] = useState("");
  const [enableRevision, setEnableRevision] = useState(false);
  const [closeIsLoading, setCloseIsLoading] = useState(false);
  const [claimIsLoading, setClaimIsLoading] = useState(false);

  const dispatch = useDispatch();

  // ============================================GETTING NEEDED EXPENSE============================================

  useEffect(() => {
    if (token) {
      dispatch(expensesActions.getMarketingExpenses(month, year));
    }
  }, [dispatch, month, year, token]);

  useEffect(() => {
    if (marketingExpenses) {
      const expense = marketingExpenses.find((expense) => expense._id === id);
      setExpense(expense);
      if (expense) {
        setStatus(expense.status);
      }
    }
  }, [marketingExpenses, id]);

  // =======================================GETTING USER BACK=======================================

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        storedUserDetails = window.localStorage.getItem("userDetails");
        const parsedUserDetails = JSON.parse(storedUserDetails);

        console.log(parsedUserDetails, "parsedUserDetails");
        if (parsedUserDetails.user) {
          dispatch(authActions.getUserIn(parsedUserDetails));
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  // ========================================================CHANGING STATUS================================================

  const approveExpense = () => {
    setStatus("Approved");
    setShowComment(true);
  };

  const rejectExpense = () => {
    setStatus("Rejected");
    setShowComment(true);
  };

  const submitStatus = () => {
    setChaningLoading(true);
    dispatch(expensesActions.editStatus(id, status, statusComment));
    dispatch(expensesActions.getMarketingExpenses(month, year)).then(() => {
      const expense = marketingExpenses.find((expense) => expense._id === id);
      setExpense(expense);
      if (expense) {
        setStatus(expense.status);
      }
      setChaningLoading(false);
    });
  };

  // =================================================REVISION STATUS================================================

  const changeRevisionStatus = () => {
    setRevisionIsLoading(true);
    dispatch(
      expensesActions.revisedExpense(id, revisionComment, enableRevision)
    ).then(() => {
      dispatch(expensesActions.getMarketingExpenses(month, year)).then(() => {
        const expense = marketingExpenses.find((expense) => expense._id === id);
        setExpense(expense);
        if (expense) {
          setStatus(expense.status);
        }
        setRevisionIsLoading(false);
      });
    });
  };

  useEffect(() => {
    if (expense.isRevised) {
      setEnableRevision(true);
    }
  }, [expense?.isRevised]);

  const submitClaimedStatus = () => {
    setClaimIsLoading(true);
    dispatch(expensesActions.claimedExpense(id)).then(() => {
      dispatch(expensesActions.getMarketingExpenses(month, year)).then(() => {
        const expense = marketingExpenses.find((expense) => expense._id === id);
        setExpense(expense);
        if (expense) {
          setStatus(expense.status);
        }
        setClaimIsLoading(false);
      });
    });
  };

  const updateReceipt = () => {
    setReceiptIsLoading(true);
    dispatch(
      expensesActions.updateReceipt(
        id,
        receiptURL,
        receiptAmount,
        receiptCurrency
      )
    ).then(() => {
      dispatch(expensesActions.getMarketingExpenses(month, year)).then(() => {
        const expense = marketingExpenses.find((expense) => expense._id === id);
        setExpense(expense);
        if (expense) {
          setStatus(expense.status);
        }
        setReceiptIsLoading(false);
      });
    });
  };

  // =============================================ANIMATING RECEIPT CONTAINER=============================================

  const receiptScale = useRef(new Animated.Value(0)).current;

  const showReceiptContainer = () => {
    Animated.timing(receiptScale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  const hideReceiptContainer = () => {
    Animated.timing(receiptScale, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.circle,
    }).start();
  };

  // =====================================================CLOSE THE CASE=====================================================

  const closeCase = () => {
    setCloseIsLoading(true);
    dispatch(expensesActions.closeCase(id)).then(() => {
      dispatch(expensesActions.getMarketingExpenses(month, year)).then(() => {
        const expense = marketingExpenses.find((expense) => expense._id === id);
        setExpense(expense);
        if (expense) {
          setStatus(expense.status);
        }
        setCloseIsLoading(false);
      });
    });
  };

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      {expense && (
        <View style={styles.mainContainer}>
          <View style={styles.details}>
            <Text style={styles.containerTitle}>Overview</Text>
            <Image
              source={{ uri: expense.businessLogo }}
              style={styles.logo}
              alt="logo"
            />
            <Text style={styles.number}>
              {" "}
              {numberWithComa(+expense.amount)} {expense.currency}{" "}
            </Text>
            <Text style={styles.mainText}> {expense.requestedBy} </Text>
            <Text style={styles.mainText}> {expense.businessName} </Text>
            <Text style={styles.mainText}>
              Requested To : {expense.productName}{" "}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.containerTitle}>Details</Text>
            <Text style={styles.mainText}>
              {" "}
              Requested For :{" "}
              <Text style={styles.number}>{expense.requestedFor} </Text>{" "}
            </Text>
            <Text style={styles.mainText}>
              {" "}
              Requested :{" "}
              <Text style={styles.number}>{expense.kindOfExpense}</Text>{" "}
            </Text>
            <Text style={styles.mainText}>
              {" "}
              Status: <Text style={styles.number}> {status} </Text>{" "}
            </Text>
            <Text style={styles.mainText}>
              {" "}
              Rationale :{" "}
              <Text style={styles.number}> {expense.rationale} </Text>{" "}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.containerTitle}>Dates</Text>
            <Text style={styles.mainText}>
              {" "}
              Submitted In:{" "}
              <Text style={styles.number}>
                {moment(expense.createdAt).format("DD/MM/YYYY")}
              </Text>
            </Text>
            <Text style={styles.mainText}>
              {" "}
              Updated In:{" "}
              <Text style={styles.number}>
                {moment(expense.updatedIn).format("DD/MM/YYYY")}
              </Text>
            </Text>
            <Text style={styles.mainText}>
              {" "}
              Due In:{" "}
              <Text style={styles.number}>
                {moment(expense.dueIn).format("DD/MM/YYYY")}
              </Text>
            </Text>
            <Text style={styles.mainText}>
              {" "}
              Status Changed In:{" "}
              <Text style={styles.number}>
                {moment(expense.statusChangedAt).format("DD/MM/YYYY")}
              </Text>
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.containerTitle}>Revision Details</Text>
            <View style={{ width: "100%", alignItems: "flex-start" }}>
              <CheckBox
                onPress={() => setEnableRevision(!enableRevision)}
                title={
                  expense.isRevised || enableRevision
                    ? `Revised By ${
                        expense.revisedByName
                          ? expense.revisedByName
                          : user.userName
                      } on ${moment(expense.revisedAt).format(
                        "DD/MM/YYYY"
                      )} and ${
                        expense.isRevisionPassed ? "Passed" : "Not Passed"
                      }`
                    : "Not Revised"
                }
                checked={enableRevision}
                checkedColor={Colors.primary}
                uncheckedColor={Colors.haizyColor}
                style={{ alignSelf: "flex-start", width: "100%" }}
              />
            </View>
            <Input
              placeholder="Comment"
              onChangeText={(text) => setRevisionComment(text)}
              value={revisionComment}
              containerStyle={styles.containerInput}
              style={styles.inputStyle}
              label="Add Revision Comment"
              labelStyle={styles.labelStyle}
              onSubmitEditing={changeRevisionStatus}
            />
            {revisionIsLoading ? (
              <View style={styles.button}>
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            ) : (
              <Button
                title="Submit"
                onPress={changeRevisionStatus}
                buttonStyle={styles.button}
                titleStyle={styles.title}
                disabledStyle={{ backgroundColor: Colors.haizyColor }}
              />
            )}
          </View>
          <View style={styles.details}>
            <Text style={styles.containerTitle}>Upload Receipt</Text>
            <View style={{ width: "80%" }}>
              <UploadImage
                imageName={`${expense} for ${expense.requestedFor}`}
                getURL={setReceiptURL}
                subFolder={`${expense.businessName}/${expense.requestedBy}/${expense.amount}`}
                hideTitle
                width={"60%"}
              />
            </View>
            <View
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Input
                value={receiptAmount}
                onChangeText={(text) => setReceiptAmount(text)}
                label="Amount"
                labelStyle={styles.labelStyle}
                containerStyle={{ width: "48%" }}
              />
              <Input
                value={receiptCurrency}
                onChangeText={(text) => setReceiptCurrency(text)}
                label="Currency"
                labelStyle={styles.labelStyle}
                containerStyle={{ width: "48%" }}
              />
            </View>
            {receiptIsLoading ? (
              <View style={styles.button}>
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            ) : (
              <Button
                title="Submit"
                onPress={updateReceipt}
                buttonStyle={styles.button}
                titleStyle={styles.title}
                disabled={
                  !receiptURL || receiptAmount === 0 || !receiptCurrency
                }
                disabledStyle={{ backgroundColor: Colors.haizyColor }}
              />
            )}
          </View>
          <View style={styles.details}>
            <Text style={styles.containerTitle}>Receipt Details</Text>
            {expense.isReceiptSubmitted ? (
              <>
                <Text style={styles.mainText}>
                  {" "}
                  Receipt Amount:{" "}
                  <Text style={styles.number}>
                    {" "}
                    {numberWithComa(+expense.receiptAmount)}{" "}
                    {expense.receiptCurrency}{" "}
                  </Text>{" "}
                </Text>
                <Text style={styles.mainText}>
                  Receipt Submitted on :{" "}
                  <Text style={styles.number}>
                    {moment(expense.receiptSubmittedAt).format("DD/MM/YYYY")}
                  </Text>{" "}
                </Text>
                {expense.receiptImage && (
                  <TouchableOpacity
                    onPress={showReceiptContainer}
                    style={styles.smallRow}
                  >
                    <Text style={[styles.mainText, { width: "30%" }]}>
                      View Receipt
                    </Text>
                    <FontAwesome5
                      name="receipt"
                      size={globalWidth("2%")}
                      color={Colors.appBlue}
                    />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <Text style={styles.mainText}>No Receipt Submitted</Text>
            )}
          </View>
          <View style={styles.details}>
            <Text style={styles.containerTitle}>
              Claim Status / Revision / Comments
            </Text>
            {claimIsLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <CheckBox
                onPress={submitClaimedStatus}
                title={
                  expense.isClaimed
                    ? `Clainmed by ${expense.requestedBy} on ${moment(
                        expense.claimedAt
                      ).format("DD/MM/YYYY")}`
                    : "Submit if Calimed"
                }
                checked={expense.isClaimed}
                checkedColor={Colors.primary}
                uncheckedColor={Colors.haizyColor}
                style={{ alignSelf: "flex-start", width: "100%" }}
              />
            )}
            <CheckBox
              checked={expense.isRevisionPassed}
              title={
                expense.isRevisionPassed
                  ? "Revision Passed"
                  : "Revision Not Passed"
              }
              checkedColor={Colors.primary}
              uncheckedColor={Colors.haizyColor}
              style={{ alignSelf: "flex-start", width: "100%" }}
            />
            {expense.isRevised && (
              <Text style={styles.mainText}>
                {" "}
                Revision Comment :{" "}
                <Text style={styles.number}>
                  {" "}
                  {expense.revisionComment}{" "}
                </Text>{" "}
              </Text>
            )}
            <Text style={styles.mainText}>
              {" "}
              General Comments:{" "}
              <Text style={styles.number}>
                {" "}
                {expense.statusChangeComment}
              </Text>{" "}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.containerTitle}>Actions</Text>
            <View style={styles.actionsRow}>
              <View
                style={{
                  width: "48%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckBox
                  checked={status === "Approved"}
                  onPress={approveExpense}
                  checkedColor={Colors.primary}
                  uncheckedColor={Colors.haizyColor}
                />
                <Text style={styles.number}>
                  {" "}
                  {status === "Approved" ? "Approved" : "Approve"}{" "}
                </Text>
              </View>
              <View
                style={{
                  width: "48%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckBox
                  checked={status === "Rejected"}
                  onPress={rejectExpense}
                  checkedColor={Colors.primary}
                  uncheckedColor={Colors.haizyColor}
                />
                <Text style={styles.number}>
                  {" "}
                  {status === "Rejected" ? "Rejected" : "Reject"}{" "}
                </Text>
              </View>
            </View>
            <Input
              placeholder="Comment"
              onChangeText={(text) => setStatusComment(text)}
              value={statusComment}
              containerStyle={styles.containerInput}
              style={styles.inputStyle}
              label="Add Action Comment"
              labelStyle={styles.labelStyle}
              disabled={!showComment}
              onSubmitEditing={submitStatus}
            />
            {chaningLoading ? (
              <View style={styles.button}>
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            ) : (
              <Button
                title="Submit"
                onPress={submitStatus}
                buttonStyle={styles.button}
                titleStyle={styles.title}
                disabled={!showComment}
                disabledStyle={{ backgroundColor: Colors.haizyColor }}
              />
            )}
          </View>
          <View style={styles.details}>
            <Text style={styles.containerTitle}>Close the Case</Text>
            <Text
              style={[
                styles.mainText,
                { textAlign: "center", fontSize: globalWidth("1.2%") },
              ]}
            >
              {"      "} If the case is closed, it will be considered{" "}
              <Text style={styles.number}>
                Approved, Claimed, And Pass the Revision
              </Text>{" "}
              and you will no longer be able to make any changes to it.
            </Text>
            <Text
              style={[
                styles.mainText,
                { textAlign: "center", fontSize: globalWidth("1.2%") },
              ]}
            >
              {"      "} If receipt is not submitted earlier it will be
              considered as <Text style={styles.number}>Rejected</Text> .
              Otherwise submit receipt first
            </Text>
            {closeIsLoading ? (
              <View style={styles.button}>
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            ) : (
              <Button
                title="Close"
                onPress={closeCase}
                buttonStyle={styles.button}
                titleStyle={styles.title}
              />
            )}
          </View>
        </View>
      )}
      {expense && (
        <Animated.View
          style={[
            styles.receiptContainer,
            {
              transform: [{ scale: receiptScale }],
            },
          ]}
        >
          <Image
            style={styles.receiptImage}
            source={{ uri: expense.receiptImage }}
          />
          <Button
            buttonStyle={styles.button}
            title="Close"
            onPress={hideReceiptContainer}
            titleStyle={styles.title}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: globalHeight("2%"),
    flexWrap: "wrap",
  },
  details: {
    width: "32.5%",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#ccc",
    backgroundColor: Colors.lightBG,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: globalHeight("0.5%"),
    minHeight: globalHeight("25%"),
  },
  logo: {
    width: globalWidth("4%"),
    height: globalWidth("4%"),
    borderRadius: globalWidth("2%"),
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: globalHeight("1%"),
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  number: {
    fontSize: globalWidth("1.05%"),
    fontWeight: "bold",
    fontFamily: "numbers",
    color: Colors.appBlue,
  },
  mainText: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1.05%"),
    color: Colors.font,
    lineHeight: globalHeight("2.5%"),
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    alignSelf: "flex-start",
  },
  labelStyle: {
    marginTop: globalHeight("1%"),
    fontFamily: "robotoRegular",
    color: Colors.font,
  },
  button: {
    backgroundColor: "transparent",
  },
  title: {
    fontFamily: "robotoRegular",
    color: Colors.appBlue,
  },
  containerTitle: {
    fontFamily: "highlight",
    fontSize: globalWidth("1.2%"),
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: globalWidth("1%"),
    width: "100%",
  },
  receiptContainer: {
    backgroundColor: "white",
    width: globalWidth("80%"),
    height: globalHeight("80%"),
    position: "absolute",
    top: globalHeight("5%"),
    left: globalWidth("5%"),
    bottom: globalHeight("5%"),
    zIndex: 100,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  receiptImage: {
    width: "75%",
    height: "75%",
  },
});

export const ExpensesActionsOptions = (navData) => {
  return {
    headerTitle: "ExpensesActions",
  };
};

export default ExpensesActions;
