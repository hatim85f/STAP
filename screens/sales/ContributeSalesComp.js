import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpac,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import * as authActions from "../../store/auth/authActions";
import * as businessActions from "../../store/business/businessActions";
import * as salesActions from "../../store/sales/salesActions";
import Loader from "../../components/Loader";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import TableComp from "../../components/TableComp";
import moment from "moment";
import numberWithComa from "../../components/helpers/numberWithComa";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../../constants/Colors";

const ContributeSalesComp = (props) => {
  const { team } = useSelector((state) => state.team);
  const { user } = useSelector((state) => state.auth);

  const { sales, startDate, endDate } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [salesDetails, setSalesDetails] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);

  //   ======================================================GETTING TEAM DETAILS=================================================
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting team details");
    dispatch(businessActions.getUserBusiness()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  //   ======================================================GETTING SALES=================================================

  useEffect(() => {
    if (sales && sales.length > 0) {
      const neededSales = sales[0].salesData;

      const itemSales = neededSales.map((item) => {
        return {
          ...item,
          userName: "",
          user: "",
          businessId: "",
        };
      });

      setSalesDetails(itemSales);
    }
  }, [sales]);

  const widthArr = [
    globalWidth("5%"),
    globalWidth("12%"),
    globalWidth("10%"),
    globalWidth("10%"),
    globalWidth("10%"),
    globalWidth("15%"),
  ];
  const tableHead = ["S/N", "Client", "Date", "Name", "Amount", "Assign To"];

  //   =========================================================CHANGING SALES DATA=================================================

  const changeSalesName = (event, index) => {
    const newSales = [...salesDetails];

    const memberName = event.target.value;
    const teamData = team.map((a) => a.teamMembers).flat(1);

    const selectedMember = teamData.find((a) => a.userName === memberName);

    newSales[index].userName = memberName;
    newSales[index].user = selectedMember._id;
    newSales[index].businessId = selectedMember.businessId;

    console.log(newSales);

    setSalesDetails(newSales);
  };

  const resetUser = (index) => {
    const newSales = [...salesDetails];

    (newSales[index].userName = ""),
      (newSales[index].user = ""),
      (newSales[index].businessId = "");

    setSalesDetails(newSales);
  };

  //   =======================================================SUBMIT SALES UPDATES======================================

  const submitHandler = () => {
    try {
      setIsLoading(true);
      setLoadingMessage("Submitting sales");

      const newSales = salesDetails.reduce((acc, data) => {
        const found = acc.find((a) => a.user === data.user);

        const date = new Date(data.date);

        if (!found) {
          acc.push({
            user: data.user,
            versionName: sales[0].version,
            salesData: [
              {
                product: data.productId,
                quantity: data.quantity,
                price: data.productPrice,
              },
            ],
            startPeriod: new Date(
              date.getFullYear(),
              date.getMonth(),
              1
            ).toISOString(),
            endPeriod: new Date(
              date.getFullYear(),
              date.getMonth() + 1,
              0
            ).toISOString(),
          });
        } else {
          found.salesData.push({
            product: data.productId,
            quantity: data.quantity,
            price: data.productPrice,
          });
        }

        return acc;
      }, []);

      newSales
        .map((a) => {
          dispatch(
            salesActions.addMemberSales(
              a.user,
              a.salesData,
              a.versionName,
              a.startPeriod,
              a.endPeriod
            )
          );
        })
        .then(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  //   ======================================================JSX RETURN=================================================

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {salesDetails && salesDetails.length > 0 && (
          <TableComp
            widthArr={widthArr}
            tableHead={tableHead}
            data={salesDetails.map((sales, index) => {
              return [
                index + 1,
                sales.clientName,
                moment(sales.date).format("DD/MM/YY"),
                sales.productName,
                sales.quantity,

                <View style={styles.namesContainer}>
                  {sales.user ? (
                    <View style={styles.row}>
                      <Text style={styles.memberName}> {sales.userName} </Text>
                      <TouchableOpacity onPress={() => resetUser(index)}>
                        <FontAwesome
                          name="repeat"
                          size={globalWidth("1.5%")}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <select
                      style={styles.memberContainer}
                      onChange={(event) => changeSalesName(event, index)}
                    >
                      <option value="" disabled selected>
                        Select a user
                      </option>
                      {team.map((a, i) =>
                        a.teamMembers.map((item, indx) => (
                          <option
                            key={indx}
                            value={item.userName}
                            style={styles.memberName}
                          >
                            {item.userName}
                          </option>
                        ))
                      )}
                    </select>
                  )}
                </View>,
              ];
            })}
            showTotal
            totalData={[
              "",
              "Total",
              "",
              "",
              "",
              numberWithComa(
                salesDetails.reduce((acc, curr) => acc + curr.itemValue, 0)
              ),
            ]}
          />
        )}
      </ScrollView>
      <Button
        title="Submit"
        buttonStyle={styles.submitButton}
        titleStyle={styles.title}
        onPress={submitHandler}
      />
      <View style={{ height: globalHeight("10%") }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: globalHeight("2%"),
    width: globalWidth("75%"),
  },
  memberContainer: {
    paddingVertical: 5,
    width: "90%",
    height: globalHeight("4%"),
    alignSelf: "center",
    borderRadius: 10,
  },
  memberName: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "Helvetica",
    color: Colors.font,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  submitButton: {
    width: "40%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: globalHeight("2%"),
  },
  title: {
    fontSize: globalWidth("1%"),
    fontFamily: "Helvetica",
  },
});

export const ContributeSalesCompOptions = (navData) => {
  return {
    headerTitle: "ContributeSalesComp",
  };
};

export default ContributeSalesComp;
