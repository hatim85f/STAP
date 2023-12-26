import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import TabBarNavigator from "../../components/tabBar/TabBarNavigator";
import BusinessSelection from "../../components/BusinessSelection";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import Loader from "../../components/Loader";

import numberWithComa from "../../components/helpers/numberWithComa";

import * as businessActions from "../../store/business/businessActions";
import * as productsActions from "../../store/products/productsActions";
import * as authActions from "../../store/auth/authActions";
import TableComp from "../../components/TableComp";

const IndividualSalesScreen = (props) => {
  const { team } = useSelector((state) => state.team);
  const { products } = useSelector((state) => state.products);

  const [businessId, setBusinessId] = useState(null);
  const [businessSelected, setBusinessSelected] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [teamList, setTeamList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const [totalTeamValue, setTotalTeamValue] = useState(null);
  const [teamCurrency, setTeamCurrency] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [allTeam, setAllTeam] = useState([]);

  const dispatch = useDispatch();

  // ==========================================GETTING USER LOGGED IN BACK IF LOGGED OUT =======================================

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");
        } else {
          storedUserDetails = await AsyncStorage.getItem("userDetails");
        }

        if (storedUserDetails) {
          const parsedUserDetails = JSON.parse(storedUserDetails);

          if (parsedUserDetails.user) {
            dispatch(authActions.getUserIn(parsedUserDetails));
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  // =======================================GETTING TEAM MEMBERS AND PRODUCTS=================================================

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting Team Members");
    dispatch(businessActions.getUserBusiness()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (businessId) {
      const selectedTeam = team.find((item) => item.businessId === businessId);
      setSelectedTeam(selectedTeam.teamMembers);
    }
  }, [businessId]);

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting Products");
    dispatch(productsActions.getBusinessProducts()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, businessId]);

  useEffect(() => {
    if (businessId) {
      const selectedProducts = products.filter(
        (item) => item.businessId === businessId
      );
      setSelectedProducts(selectedProducts);
    }
  }, [businessId]);

  useEffect(() => {
    const totalTeamList = teamList.map((a) => a.salesData).flat(1);
    const values = totalTeamList.map((item) => +item.totalValue);
    const totalTeamValue = values.reduce((a, b) => a + b, 0);
    setTotalTeamValue(totalTeamValue);

    if (products && products.length > 0) {
      const currencySymbol = products && products[0].currencySymbol;
      setTeamCurrency(currencySymbol);
    }
  }, [teamList, products]);

  // ========================================================PREPARE DATA FOR LIST===============================================

  useEffect(() => {
    if (selectedTeam && selectedProducts) {
      const list = [];
      selectedTeam.map((member, index) => {
        list.push({
          _id: member._id,
          userName: member.userName,
          profilePicture: member.profilePicture,
          sn: index + 1,
          salesData: selectedProducts.map((item, index) => {
            return {
              product: item._id,
              salesQuantity: 0,
              price: item.costPrice,
              totalValue: item.salesQuantity
                ? item.salesQuantity
                : 0 * item.costPrice,
              imageURL: item.imageURL,
              productNickName: item.productNickName,
              currencySymbol: item.currencySymbol,
            };
          }),
        });
      });
      setTeamList(list);
    }
  }, [selectedTeam]);

  const changeQuantity = (num, index) => {
    setTeamList((prevTeamList) => {
      const newTeamList = [...prevTeamList];
      const memberIndex = newTeamList.findIndex(
        (member) => member._id === selectedMember
      );

      const newSalesData = [...newTeamList[memberIndex].salesData];
      newSalesData[index].salesQuantity = num;
      newSalesData[index].totalValue = num * newSalesData[index].price;

      newTeamList[memberIndex] = {
        ...newTeamList[memberIndex],
        salesData: newSalesData,
      };

      return newTeamList;
    });
  };
  const widthArr = [
    globalWidth("5%"),
    globalWidth("30%"),
    globalWidth("15%"),
    globalWidth("15%"),
  ];

  const submit = () => {
    setSelectedMember(null);
  };

  //  ========================================================RETURN JSX===================================================================

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      {!selectedMember && (
        <BusinessSelection
          getBusinessId={(id) => setBusinessId(id)}
          getSelectedBusiness={(business) => setBusinessSelected(business)}
        />
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total Sales: {teamCurrency}{" "}
          <Text style={styles.num}>{numberWithComa(+totalTeamValue)}</Text>{" "}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedTeam && selectedTeam.length > 0 && (
          <View style={styles.mainRowItem}>
            <View style={styles.liftContainer}>
              <FlatList
                data={teamList}
                scrollEnabled={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={[
                        styles.memberContainer,
                        {
                          backgroundColor:
                            selectedMember === item._id
                              ? Colors.haizyColor
                              : "white",
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          setSelectedMember(
                            selectedMember === null
                              ? item._id
                              : selectedMember !== item._id
                              ? item._id
                              : null
                          )
                        }
                        style={styles.touchable}
                      >
                        <Image
                          source={{ uri: item.profilePicture }}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                      <Text style={styles.memberName}>{item.userName}</Text>
                      <Text style={styles.itemNumber}>Total Sales</Text>
                      <Text style={styles.itemNumber}>
                        {teamCurrency}{" "}
                        {numberWithComa(
                          item.salesData && item.salesData.length > 0
                            ? item.salesData.reduce(
                                (a, b) => a + b.totalValue,
                                0
                              )
                            : 0
                        )}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.rightContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {teamList && teamList.length > 0 && selectedMember && (
                  <TableComp
                    widthArr={widthArr}
                    tableHead={[
                      <Text style={styles.headerText}>SN</Text>,
                      <Text style={styles.headerText}>Product Name</Text>,
                      <Text style={styles.headerText}> Quantity </Text>,
                      <Text style={styles.headerText}> Total </Text>,
                    ]}
                    data={teamList
                      .find((x) => x._id === selectedMember)
                      .salesData.map((x, indx) => [
                        <Text style={styles.numbers}> {indx + 1} </Text>,
                        <Text style={styles.itemName}>
                          {x.productNickName}
                        </Text>,
                        <Input
                          style={styles.input}
                          containerStyle={styles.containerStyle}
                          onChangeText={(num) => changeQuantity(num, indx)}
                          keyboardType="numeric"
                          placeholder="0"
                          defaultValue={x.salesQuantity.toString()}
                          value={x.salesQuantity.toString()}
                        />,
                        ,
                        <Text style={styles.numbers}>
                          {" "}
                          {numberWithComa(x.totalValue)} {x.currencySymbol}
                        </Text>,
                      ])}
                    showTotal={true}
                    totalData={[
                      "",
                      <Text style={styles.headerText}>Total</Text>,
                      "",
                      <Text style={styles.totalNumbers}>
                        {teamCurrency}{" "}
                        {numberWithComa(
                          teamList && teamList.length > 0
                            ? teamList
                                .find((x) => x._id === selectedMember)
                                .salesData.reduce((a, b) => a + b.totalValue, 0)
                            : 0
                        )}
                      </Text>,
                    ]}
                  />
                )}
              </ScrollView>
              <Button
                buttonStyle={styles.buttonStyle}
                title="Submit"
                onPress={submit}
                titleStyle={styles.titleStyle}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <View style={{ height: globalHeight("10%") }} />
      <TabBarNavigator route="individual-sales" flex={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainRowItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: globalHeight("73%"),
    flex: 1,
  },
  liftContainer: {
    width: globalWidth("15%"),
    height: globalHeight("73%"),
    marginLeft: globalWidth("1%"),
  },
  rightContainer: {
    maxHeight: globalHeight("73%"),
    width: globalWidth("84%"),
    overflow: "scroll",
    backgroundColor: "red",
  },
  memberContainer: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1.8,
    borderColor: Colors.font,
    marginVertical: globalHeight("1%"),
    padding: globalWidth("1%"),
  },
  touchable: {
    width: globalWidth("7.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: globalWidth("6.5%"),
    height: globalWidth("6.5%"),
    borderRadius: globalWidth("3.25%"),
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  rightContainer: {
    width: globalWidth("85%"),
    height: "100%",
  },
  memberName: {
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    color: Colors.primary,
    marginVertical: globalHeight("1%"),
    fontFamily: "Poppins_400Regular",
    fontStyle: "italic",
  },
  itemNumber: {
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    color: Colors.font,
    marginVertical: globalHeight("1%"),
    fontFamily: "Poppins_400Regular",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "flex-start",
    marginVertical: globalHeight("4%"),
  },
  itemName: {
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    color: Colors.font,
    marginVertical: globalHeight("1%"),
    fontFamily: "Poppins_400Regular",
    marginLeft: globalWidth("1.5%"),
  },
  input: {
    width: globalWidth("10%"),
    height: globalHeight("4%"),
    backgroundColor: Colors.lightBG,
    borderRadius: 10,
    borderWidth: 1.4,
    borderColor: Colors.primary,
    marginVertical: globalHeight("1%"),
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    color: Colors.font,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  containerStyle: {
    width: globalWidth("10%"),
    height: globalHeight("5%"),
    marginVertical: globalHeight("1%"),
    alignSelf: "center",
  },
  numbers: {
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    color: Colors.font,
    marginVertical: globalHeight("1%"),
    fontFamily: "numbers",
    textAlign: "center",
  },
  totalNumbers: {
    fontSize: globalWidth("1.2%"),
    fontWeight: "bold",
    color: Colors.font,
    marginVertical: globalHeight("1%"),
    fontFamily: "numbers",
    textAlign: "center",
    fontStyle: "italic",
  },
  headerText: {
    fontSize: globalWidth("1.2%"),
    fontWeight: "bold",
    color: Colors.font,
    marginVertical: globalHeight("1%"),
    fontFamily: "headers",
    textAlign: "center",
  },
  totalContainer: {
    width: "30%",
    height: globalHeight("5%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBG,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginBottom: globalHeight("1%"),
    alignSelf: "center",
    borderRadius: 10,
  },
  totalText: {
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    color: Colors.font,
    fontFamily: "headers",
    textAlign: "center",
  },
  num: {
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    color: Colors.font,
    fontFamily: "numbers",
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    width: "25%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: globalHeight("2.5%"),
  },
  titleStyle: {
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    color: "white",
    fontFamily: "headers",
    textAlign: "center",
  },
});

export default IndividualSalesScreen;
