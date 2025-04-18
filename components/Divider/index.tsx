import ThemeColor from "@/themes/color";
import { View } from "react-native";

export default function Divider() {
  return <View style={{ height: 1, backgroundColor: ThemeColor.divider }} />;
}
