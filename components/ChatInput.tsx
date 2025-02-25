import { Pressable, TextInput, StyleSheet, Animated } from "react-native";
import { View } from "./Themed";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";

const padding = 18;
const borderRadius = 12;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ChatInput({
  onSubmit,
}: {
  onSubmit: (message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const isDisabled = message.length === 0;
  const isPressing = useRef(new Animated.Value(0)).current;

  const buttonScale = isPressing.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const submit = () => {
    if (isDisabled) {
      return;
    }

    Animated.sequence([
      Animated.timing(isPressing, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(isPressing, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    onSubmit(message);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your message here..."
        value={message}
        onChangeText={setMessage}
      />
      <AnimatedPressable
        disabled={isDisabled}
        onPress={submit}
        style={[
          styles.sendButton,
          { backgroundColor: isDisabled ? "lightgray" : "skyblue" },
          { transform: [{ scale: buttonScale }] },
        ]}
      >
        <Ionicons name="send" size={20} color="white" />
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "skyblue",
    padding,
    borderRadius,
    flex: 1,
  },
  sendButton: {
    padding,
    borderRadius,
  },
});
