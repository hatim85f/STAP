import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as membershipActions from "../../store/membership/MembershipActions";
import PricingCard from "../../components/pricing/PricingCard";

import MenuButton from "../../components/webComponents/menu/MenuButton";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import UpgradePricing from "../../components/pricing/UpgradePricing";

const UpgradeDetails = (props) => {
  const { packages } = useSelector((state) => state.membership);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (packages.length === 0) {
      setIsLoading(true);
      dispatch(membershipActions.getPackages()).then(() => {
        setIsLoading(false);
      });
    }
  }, [packages, dispatch]);

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <ScrollView
        scrollEnabled={true}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView scrollEnabled scrollEventThrottle={16} horizontal>
          {packages.map((item, index) => {
            return (
              <UpgradePricing
                key={index}
                navigation={props.navigation}
                pricingPackage={item}
                isUpgrade={true}
                oldPackageId={props.route.params.packageId}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "scroll",
  },
  header: {},
});

export default UpgradeDetails;
