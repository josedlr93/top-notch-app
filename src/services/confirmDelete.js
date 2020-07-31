import { Alert } from "react-native";

export default function confirmDelete(item, confirm) {
 return Alert.alert(
    `Delete: ${item}`,
    "Are you sure?",
    [
      {
        text: "Cancel", style: "cancel"
      },
      {
        text: "OK", onPress: () => confirm()
      }
    ],
    { cancelable: false }
  );
}