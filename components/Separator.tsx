import { StyleSheet } from "react-native";
import { View } from "./Themed";

export default function Separator({ color }: { color?: string }) {
  return (
    <View
      style={styles.separator}
      lightColor={color ?? "#eee"}
      darkColor={color ?? "rgba(255,255,255,0.1)"}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    height: 1,
    borderRadius: 12
  },
});
