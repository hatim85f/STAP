import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import NativePicker from "../../NativePicker";
import { globalWidth, globalHeight } from "../../../constants/globalWidth";

import { months } from "../../helpers/months";

import * as businessActions from "../../../store/business/businessActions";
import { years } from "../../helpers/years";
import Colors from "../../../constants/Colors";

const NativeContainer = (props) => {
  const { getSelectedMember, getSelectedMonth, getSelectedYear, search } =
    props;

  const { user } = useSelector((state) => state.auth);
  const { team } = useSelector((state) => state.team);

  const [teamList, setTeamList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  //   =================================================SEND DATA=====================================================

  useEffect(() => {
    getSelectedMember(selectedMember);
  }, [selectedMember]);

  useEffect(() => {
    getSelectedMonth(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    getSelectedYear(selectedYear);
  }, [selectedYear]);

  const dispatch = useDispatch();

  // ============================================GET TEAM DATA=====================================================

  useEffect(() => {
    if (user.userType !== "Employee") {
      dispatch(businessActions.getUserBusiness());
    }
  }, [user.userType]);

  useEffect(() => {
    const teamMembers = team.map((a) => a.teamMembers).flat(1);

    const teamList = teamMembers.map((member) => {
      return {
        label: member.userName,
        value: member._id,
      };
    });
    setTeamList(teamList);
  }, [team]);

  useEffect(() => {
    if (user.userType === "Employee") {
      setSelectedMember(user._id);
    }
  }, [user]);

  const changeYear = (item) => {
    setSelectedYear(item);
    window.localStorage.setItem("year", item);
  };

  const changeMonth = (item) => {
    setSelectedMonth(item);
    window.localStorage.setItem("month", item);
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {
          width:
            user.userType !== "Employee"
              ? globalWidth("52%")
              : globalWidth("37%"),
        },
      ]}
    >
      {user.userType !== "Employee" && teamList.length > 0 && (
        <NativePicker
          list={teamList}
          getSelectedItem={(item) => setSelectedMember(item)}
          placeholder="Select Member"
        />
      )}
      <NativePicker
        list={months.map((a) => {
          return {
            label: a,
            value: a,
          };
        })}
        getSelectedItem={(item) => changeMonth(item)}
        placeholder="Select Month"
      />
      <NativePicker
        list={years}
        getSelectedItem={(item) => changeYear(item)}
        placeholder="Select Year"
      />
      <Button
        buttonStyle={styles.button}
        title="Search"
        onPress={search}
        titleStyle={styles.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  button: {
    width: globalWidth("11%"),
    height: globalHeight("6%"),
    marginLeft: globalWidth("1%"),
    backgroundColor: Colors.primary,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1%"),
    color: "white",
  },
});

export const NativeContainerOptions = (navData) => {
  return {
    headerTitle: "NativeContainer",
  };
};

export default NativeContainer;
