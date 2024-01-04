import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../Loader";
import Colors from "../../../constants/Colors";

import { globalHeight, globalWidth } from "../../../constants/globalWidth";
import { months } from "../../helpers/months";
import { years } from "../../helpers/years";

import * as businessActions from "../../../store/business/businessActions";
import * as authActions from "../../../store/auth/authActions";
import * as teamActions from "../../../store/team/teamActions";

import moment from "moment";
import DateAndYearPicker from "../teamSales/DateAndYearPicker";

const IndividualMonthly = (props) => {
  const { team } = useSelector((state) => state.team);

  // ==============================================MANAGEMENT OF STATE====================================================

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(
    moment(new Date()).format("YYYY")
  );
  const [teamData, setTeamData] = useState([]);

  // =============================================GETTING USER BACK=====================================================
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

  // =================================================GETTING TEAM MEMBERS=================================================

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Loading Data...");
    dispatch(businessActions.getUserBusiness()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  // ===========================================SETTING MONTH NUMBER=======================================================

  useEffect(() => {
    if (selectedMonth) {
      const monthIndex = months.findIndex((month) => month === selectedMonth);
      setMonthNumber(monthIndex + 1);
    }
  }, [selectedMonth, months]);

  useEffect(() => {
    if (team && team.length > 0) {
      const teamData = team.map((t) => t.teamMembers).flat(1);
      setTeamData(teamData);
    }
  }, [team]);

  // ===========================================GETTING SALES DATA=========================================================

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Loading Sales Data...");
    dispatch(
      teamActions.getFullTeamAchievement(monthNumber, selectedYear)
    ).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, monthNumber, selectedYear]);

  console.log(teamData);

  // =========================================================RETURN JSX=============================================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateRow}>
        <DateAndYearPicker
          getMonth={(month) => setSelectedMonth(month)}
          getYear={(year) => setSelectedYear(year)}
          getIsOpened={(opened) => setIsOpened(opened)}
          month={selectedMonth}
          year={selectedYear}
        />
      </View>
      <View style={styles.teamRow}>
        {!isOpened &&
          team &&
          team.length > 0 &&
          teamData.map((member, index) => {
            return (
              <TouchableOpacity style={styles.teamContainer} key={index}>
                <Image
                  source={{ uri: member.profilePicture }}
                  style={styles.image}
                />
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{member.userName} </Text>
                  <Text style={styles.designation}> {member.designation} </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
      <Text>
        Then here will show in the boxes every one sales vs target and
        achievement{" "}
      </Text>
      <Text>
        {" "}
        When the user presses to individual he can see his own details{" "}
      </Text>
      <Text>Manager will see all the team and so the admin</Text>
      <Text>
        But normal user will see his own sales only while he can see the team in
        the team section but his own team only
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  teamRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  teamContainer: {
    width: "20%",
    backgroundColor: Colors.lightBG,
    borderRadius: 10,
    marginVertical: globalHeight("1%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: globalWidth("3%"),
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: globalWidth("2%"),
  },
  image: {
    width: globalWidth("5%"),
    height: globalWidth("5%"),
    borderRadius: globalWidth("2.5%"),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  nameContainer: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1.25%"),
    color: Colors.font,
    fontStyle: "italic",
    textAlign: "center",
  },
  designation: {
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1%"),
    color: Colors.primary,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: globalHeight("0.5%"),
  },
});

export const IndividualMonthlyOptions = (navData) => {
  return {
    headerTitle: "IndividualMonthly",
  };
};

export default IndividualMonthly;
