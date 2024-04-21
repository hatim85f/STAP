import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Pressable,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import * as XLSX from "sheetjs-style";

import { years } from "../../components/helpers/years";
import DropPicker from "../../components/DropPicker";
import { TouchableOpacity } from "react-native";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import numberWithComa from "../../components/helpers/numberWithComa";

import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import TabBarNavigator from "../../components/tabBar/TabBarNavigator";
import MenuButton from "../../components/webComponents/menu/MenuButton";

import * as authActions from "../../store/auth/authActions";
import * as targetActions from "../../store/target/targetActions";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native";
import Loader from "../../components/Loader";

const IndividualTargetScreen = (props) => {
  const { teamTarget, businessTargets } = useSelector((state) => state.target);
  const { user } = useSelector((state) => state.auth);

  const [selectedYear, setSelectedYear] = useState(2024);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (selectedYear) {
      setIsLoading(true);
      if (user.userType === "Employee") {
        dispatch(targetActions.getPersonalTarget(selectedYear));
      } else {
        dispatch(targetActions.getTeamTarget(selectedYear));
      }
      dispatch(targetActions.businessTargets(selectedYear)).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, selectedYear]);

  // =====================================================DOWNLOADING TARGET TO EXCEL==============================================

  const downloadToExcel = () => {
    try {
      const teamTargetData = teamTarget.flatMap((item) => {
        return item.target.productsTarget.flatMap((product) => {
          return product.target.map((target) => {
            return {
              monthName: target.monthName,
              targetValue: target.targetValue,
              targetUnits: target.targetUnits,
              productId: product.productId,
              productNickName: product.productNickName,
            };
          });
        });
      });

      const teamValues = teamTargetData.reduce((acc, curr) => {
        const found = acc.find(
          (x) =>
            x.monthName === curr.monthName && x.productId === curr.productId
        );

        if (!found) {
          acc.push({
            monthName: curr.monthName,
            productId: curr.productId,
            targetValue: curr.targetValue,
            targetUnits: curr.targetUnits,
            productNickName: curr.productNickName,
          });
        } else {
          found.targetValue += curr.targetValue;
          found.targetUnits += curr.targetUnits;
        }

        return acc;
      }, []);

      const finalTeamTarget = {
        userName: "Total Team",
        target: {
          productsTarget: teamValues.reduce((acc, curr) => {
            const found = acc.find((x) => x.productId === curr.productId);

            if (!found) {
              acc.push({
                productId: curr.productId,
                productNickName: curr.productNickName,
                totalUnits: curr.targetUnits,
                totalValue: curr.targetValue,
                target: [
                  {
                    monthName: curr.monthName,
                    targetValue: curr.targetValue,
                    targetUnits: curr.targetUnits,
                  },
                ],
              });
            } else {
              found.target.push({
                monthName: curr.monthName,
                targetValue: curr.targetValue,
                targetUnits: curr.targetUnits,
              });
              found.totalUnits += curr.targetUnits;
              found.totalValue += curr.targetValue;
            }

            return acc;
          }, []),
        },
      };
      teamTarget.push(finalTeamTarget);
      const workbook = XLSX.utils.book_new();

      // Iterate through each user in the array
      teamTarget.forEach((user) => {
        const { userName, target } = user;
        const { productsTarget } = target;

        const monthsNames = productsTarget.map((t) =>
          t.target.map((x) => {
            return {
              monthName: x.monthName,
            };
          })
        );

        const flatMonths = monthsNames.flat(); // Flatten the array of months

        // Get unique month names
        const uniqueMonths = [...new Set(flatMonths.map((x) => x.monthName))];

        let totalMonths = ["SN", "Product Name", "CIF"];
        uniqueMonths.forEach((month) => {
          totalMonths.push(month, ".", ".", ".", ".");
        });

        totalMonths.push("Total", ".", ".", ".", ".");

        const loopNumber = totalMonths?.length / 5;

        // create A2 cells
        let totalMonthsCells = [];
        for (let i = 0; i < loopNumber - 1; i++) {
          totalMonthsCells.push([
            "Target",
            "Target Value",
            "Sales",
            "Sales Value",
            "Ach",
          ]);
        }

        const worksheet = XLSX.utils.json_to_sheet([], {
          header: totalMonths,
        });

        const neededData = totalMonthsCells.flat(1);

        // push needed data as a second row after the header starting from D2
        XLSX.utils.sheet_add_aoa(worksheet, [neededData], {
          header: totalMonths,
          skipHeader: true,
          origin: "D2",
        });

        const products = productsTarget.map((product, index) => {
          return [index + 1, product.productNickName, product.costPrice];
        });

        XLSX.utils.sheet_add_aoa(worksheet, products, {
          header: totalMonths,
          skipHeader: true,
          origin: "A3",
        });

        const productsTargetDetails = productsTarget.map((product) => {
          return product.target.map((target) => {
            return [
              parseInt(target.targetUnits),
              parseInt(target.targetValue),
              0,
              0,
              0,
            ];
          });
        });

        productsTargetDetails.map((product, index) => {});

        productsTargetDetails.forEach((product, index) => {
          const totalProcuct = [
            ...product,
            [
              productsTarget[index].totalUnits,
              productsTarget[index].totalValue,
              0,
              0,
              0,
            ],
          ];
          XLSX.utils.sheet_add_aoa(worksheet, [totalProcuct.flat(1)], {
            header: totalMonths,
            skipHeader: true,
            origin: `D${index + 3}`,
          });
        });

        const totalTarget = ["Total", ".", "."];

        const targets = productsTarget.map((a) => a.target).flat(1);

        const totalTargetValue = targets.reduce((acc, curr) => {
          const found = acc.find((x) => x.montName === curr.monthName);

          if (!found) {
            acc.push({
              montName: curr.monthName,
              targetValue: curr.targetValue,
            });
          } else {
            found.targetValue += curr.targetValue;
          }

          return acc;
        }, []);

        const totalOfTotal = totalTargetValue
          .map((x) => x.targetValue)
          .reduce((a, b) => a + b, 0);
        const finalTotal = totalTargetValue.map((x) => [
          ".",
          x.targetValue,
          ".",
          0,
          0,
        ]);
        totalTarget.push(...finalTotal.flat(1), ".", totalOfTotal);

        XLSX.utils.sheet_add_aoa(worksheet, [totalTarget], {
          header: totalMonths,
          skipHeader: true,
          origin: `A${productsTarget.length + 3}`,
        });

        // Add the worksheet to the workbook with the username as the sheet name
        XLSX.utils.book_append_sheet(workbook, worksheet, userName);

        // console.log(productsTarget);
      });

      // Save the workbook to a file
      XLSX.writeFile(workbook, `${selectedYear} Team Target.xlsx`);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  if (isLoading) {
    return <Loader loadingMessage="Loading Target  ..." center />;
  }

  if (!selectedYear || teamTarget?.length === 0) {
    return (
      <View style={styles.container}>
        <MenuButton navigation={props.navigation} />
        <View style={styles.dropContainer}>
          <DropPicker
            list={years}
            placeholder="Select Year"
            valueSelected={(value) => setSelectedYear(value)}
            showingValue={selectedYear}
            isOpened={(value) => setIsOpened(value)}
          />
        </View>
        <TabBarNavigator route="individual-target" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <TouchableOpacity onPress={downloadToExcel} style={styles.downloadBtn}>
        <Entypo
          name="download"
          size={globalWidth("3%")}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <View style={styles.dropContainer}>
        <DropPicker
          list={years}
          placeholder="Select Year"
          dropContainerStyle={{ width: globalWidth("40%") }}
          valueSelected={(value) => setSelectedYear(value)}
          showingValue={selectedYear}
          isOpened={(value) => setIsOpened(value)}
        />
      </View>

      {!isOpened && (
        <View style={styles.detailsContainer}>
          {businessTargets && businessTargets.length > 0 && (
            <View style={styles.businessRow}>
              {businessTargets.map((item, index) => {
                return (
                  <Pressable
                    style={styles.businessContainer}
                    key={index}
                    onPress={() => {
                      window.location.href = `/target/business-target/${item._id}/${selectedYear}/${item.targetValue}`;
                    }}
                  >
                    <Image
                      source={{ uri: item.businessLogo }}
                      style={styles.avatarStyle}
                    />
                    <Text style={styles.businessName}>{item.businessName}</Text>
                    <Text style={styles.businessValue}>
                      {numberWithComa(+item.targetValue)} {item.currencySymbol}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
          <FlatList
            data={teamTarget}
            scrollEnabled={true}
            scrollEventThrottle={16}
            keyExtractor={(item) => item._id}
            style={{ maxHeight: globalHeight("35%") }}
            showsVerticalScrollIndicator={false}
            numColumns={4}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    (window.location.href = `/team/member-target-data/${index}/${selectedYear}`)
                  }
                  style={styles.itemContainer}
                >
                  <View style={styles.avatarContainer}>
                    <Image
                      rounded
                      source={{
                        uri: item.profilePicture
                          ? item.profilePicture
                          : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg",
                      }}
                      style={[styles.avatarStyle]}
                    />
                  </View>
                  <Card style={styles.card}>
                    <Text style={styles.name}>{item.userName}</Text>
                    <Text style={styles.name}>{item.userType}</Text>
                    {item.target && (
                      <Text style={styles.value}>
                        {numberWithComa(+item.target.totalValue)}{" "}
                        {item.target.currencySymbol}
                      </Text>
                    )}
                    {!item.target && (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ActivityIndicator
                          size="small"
                          color={Colors.primary}
                        />

                        <Text style={styles.note}>getting target...</Text>
                      </View>
                    )}
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <View style={{ height: 100 }} />
      <TabBarNavigator route="individual-target" flex={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll",
  },
  dropContainer: {
    width: globalWidth("75.5%"),
    flex: 1,
    alignSelf: "center",
    marginBottom: 15,
  },
  detailsContainer: {
    alignItems: "center",
  },
  businessRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: globalHeight("2%"),
    marginTop: globalHeight("10%"),
  },
  businessContainer: {
    width: globalWidth("30%"),
    justifyContent: "center",
    alignItems: "center",
  },
  avatarStyle: {
    height: globalHeight("10%"),
    width: globalHeight("10%"),
    borderRadius: globalHeight("5%"),
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  businessName: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: globalHeight("2%"),
    marginTop: globalHeight("1%"),
  },
  businessValue: {
    fontFamily: "numbers",
    fontSize: globalHeight("2%"),
    marginTop: globalHeight("1%"),
  },
  itemContainer: {
    width: globalWidth("15%"),
    marginLeft: globalWidth("1%"),
    marginRight: globalWidth("1%"),
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: 1.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    minHeight: globalHeight("20%"),
    marginBottom: globalHeight("2%"),
  },
  avatarContainer: {
    marginBottom: -globalHeight("2%"),
    zIndex: 100,
    backgroundColor: "white",
    height: globalHeight("10%"),
    width: globalHeight("10%"),
    borderRadius: globalHeight("5%"),
  },
  name: {
    fontFamily: "Courier",
    fontSize: globalHeight("2%"),
    color: Colors.font,
    marginTop: globalHeight("1%"),
  },
  value: {
    fontFamily: "numbers",
    fontSize: globalHeight("2%"),
    color: Colors.primary,
    marginTop: globalHeight("1%"),
  },
  downloadBtn: {
    cursor: "pointer",
    zIndex: 1000,
    width: globalWidth("3%"),
    marginLeft: globalWidth("2%"),
  },
});

export default IndividualTargetScreen;
