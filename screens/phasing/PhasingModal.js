import React, { useState, useEffect } from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { iconSizes } from "../../constants/sizes";
import * as Progress from "react-native-progress";
import { isTablet } from "../../constants/device";
import { months } from "../../components/helpers/months";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import Card from "../../components/Card";
import * as phasingActions from "../../store/target/targetActions";
import Loader from "../../components/Loader";
import CustomInput from "../../components/appComponents/Input/Input";
import { Alert } from "react-native";

const PhasingModal = (props) => {
  const { open, closeModal } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phasingName, setPhasingName] = useState("");
  const [phasing, setPhasing] = useState([
    {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    },
  ]);

  const updatePhasing = (month, value) => {
    setPhasing((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          [month]: value ? parseFloat(value) / 100 : 0,
        };
      });
    });
  };

  const dispatch = useDispatch();

  const savePhasing = () => {
    if (phasingName === "") {
      Alert.alert("Error", "Please enter phasing name");
      return;
    } else if (progress > 100) {
      Alert.alert(
        "Error",
        "Phasing can't be more than 100%, if you wish to make something different please contact us"
      );
      return;
    }
    setIsLoading(true);
    dispatch(phasingActions.addPhasing(phasing, phasingName)).then(() => {
      setIsLoading(false);
      setPhasingName("");
      setPhasing([
        {
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
        },
      ]);
      setProgress(0);
      closeModal();
    });
  };

  useEffect(() => {
    const items = phasing[0];

    const total = Object.values(items).reduce((a, b) => a + b, 0);

    setProgress(parseFloat(total * 100).toFixed(2));
  }, [phasing]);

  return (
    <Modal visible={open} animationType="slide" style={{ padding: 15 }}>
      <View style={styles.container}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size={"large"} color={Colors.primary} />
            <Text style={styles.header}>Saving Phasing Details</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                setPhasing([
                  {
                    January: 0,
                    February: 0,
                    March: 0,
                    April: 0,
                    May: 0,
                    June: 0,
                    July: 0,
                    August: 0,
                    September: 0,
                    October: 0,
                    November: 0,
                    December: 0,
                  },
                ]);
                setProgress(0);
                setPhasingName("");
                closeModal();
              }}
              style={styles.closeContainer}
            >
              <AntDesign
                name="closesquare"
                size={iconSizes()}
                color={Colors.font}
              />
            </TouchableOpacity>

            <Text style={styles.header}>Set Your Phasing Details </Text>
            <Text style={styles.header}>
              Details will be saved in your account and you could use it with
              any of your bunsiess{" "}
            </Text>
            <ScrollView
              scrollEnabled
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ height: globalHeight("5%") }}></View>
              <CustomInput
                label="Phasing Name"
                placeholder="Seasonal, My team X, 2024 phasing, etc"
                onChangeText={(value) => setPhasingName(value)}
                value={phasingName}
              />
              <View>
                <Progress.Bar
                  progress={parseFloat(progress / 100)}
                  width={globalWidth("80%")}
                  height={globalHeight("1.5%")}
                  color={Colors.primary}
                  style={{
                    borderRadius: 50,
                    borderWidth: 0,
                    marginTop: globalHeight("1.5%"),
                    alignSelf: "center",
                    marginTop: globalHeight("5%"),
                  }}
                />
                <Text style={styles.progressText}>{progress}%</Text>
              </View>

              <View style={styles.phasingContainer}>
                {months.map((month) => {
                  return (
                    <Card style={styles.monthContainer}>
                      <Input
                        keyboardType="numeric"
                        onChangeText={(value) => updatePhasing(month, value)}
                        style={styles.input}
                        value={phasing[month]}
                        placeholder="0%"
                        placeholderTextColor="#888"
                        label={month}
                        labelStyle={styles.label}
                        inputMode="numeric"
                      />
                    </Card>
                  );
                })}
              </View>

              <Button
                title="Save"
                onPress={savePhasing}
                buttonStyle={styles.button}
                titleStyle={styles.title}
              />
            </ScrollView>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: globalHeight("90%"),
    width: globalWidth("90%"),
    backgroundColor: Colors.haizyColor,
    alignSelf: "center",
    marginTop: globalHeight("5%"),
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    padding: 15,
  },
  closeContainer: {
    width: "25%",
    alignSelf: "flex-end",
    paddingHorizontal: 15,
    alignItems: "flex-end",
  },
  progressText: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: globalWidth("1.25%"),
    color: Colors.font,
    marginTop: globalHeight("2%"),
  },

  header: {
    textAlign: "center",
    color: Colors.font,
    fontFamily: "headers",
    marginTop: 5,
    fontSize: globalWidth("1.25%"),
  },
  phasingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: globalHeight("5%"),
  },
  monthContainer: {
    width: globalWidth("13%"),
    marginVertical: globalHeight("1%"),
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: globalHeight("1%"),
  },
  label: {
    color: Colors.font,
    fontSize: globalWidth("1.1%"),
    fontFamily: "headers",
    textAlign: "center",
  },
  input: {
    textAlign: "center",
    fontFamily: "headers",
    color: Colors.primary,
    width: globalWidth("11%"),
    fontSize: globalWidth("1.1%"),
  },
  button: {
    backgroundColor: Colors.primary,
    width: isTablet() ? globalWidth("25%") : globalWidth("40%"),
    alignSelf: "center",
    borderRadius: 10,
    marginTop: globalHeight("2%"),
    marginBottom: globalHeight("2%"),
  },
  titleStyle: {
    fontFamily: "headers",
    fontSize: globalWidth("1.1%"),
  },
});

export const PhasingModalOptions = (navData) => {
  return {
    headerTitle: "PhasingModal",
  };
};

export default PhasingModal;
