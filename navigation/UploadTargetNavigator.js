import { createStackNavigator } from "@react-navigation/stack";
import UploadTargetScreen from "../screens/uploadTarget/UploadTargetScreen";

const UploadNavigator = createStackNavigator();

export const UploadTargetNavigator = () => {
  return (
    <UploadNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <UploadNavigator.Screen
        name="upload_target"
        component={UploadTargetScreen}
        options={{
          title: "Upload Target",
        }}
      />
    </UploadNavigator.Navigator>
  );
};
