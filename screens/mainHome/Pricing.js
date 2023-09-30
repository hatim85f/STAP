import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import * as membershipActions from "../../store/membership/MembershipActions";
import PricingCard from "../../components/pricing/PricingCard";
import { ScrollView } from "react-native";
import { isWeb } from "../../constants/device";
import Loader from "../../components/Loader";

const Pricing = (props) => {
  const { packages } = useSelector((state) => state.membership);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(membershipActions.getPackages()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Loader />
        <Text
          style={{ color: Colors.primary, fontFamily: "headers", fontSize: 20 }}
        >
          Loading Packages...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={true} scrollEventThrottle={16} horizontal>
        {packages.map((item, index) => {
          return (
            <PricingCard
              key={index}
              pricingPackage={item}
              navigation={props.navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: isWeb() && "center",
    justifyContent: "center",
    paddingTop: isWeb() && 5,
    overflow: "scroll",
  },
  header: {},
  icon: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const pricingPageOptions = (navData) => {
  return {
    headerTitle: "Pricing",
    headerStyle: {
      backgroundColor: "rgba(135, 0, 243, 0.18)",
      height: 100,
    },
    headerTintColor: Colors.font,
    headerTitleStyle: {
      fontSize: 22,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "headers",
    },

    headerLeft: () => {
      return (
        <Pressable
          onPress={() => {
            navData.navigation.navigate("Login");
          }}
        >
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
        </Pressable>
      );
    },
  };
};

export default Pricing;
