import { Animated, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Separator from "@/components/Separator";
import ChatInput from "@/components/ChatInput";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TChat, TUser } from "@/constants/types";
import ChatHistory from "@/components/ChatHistory";

export default function TabOneScreen() {
  const showNotice = useRef(new Animated.Value(1)).current;
  const noticeY = showNotice.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 0],
  });

  const flatListRef = useRef<Animated.FlatList>(null);
  const users: TUser[] = [
    { userId: "user1", username: "Alice" },
    { userId: "user2", username: "Bob" },
    { userId: "user3", username: "Charlie" },
    { userId: "user4", username: "Diana" },
    { userId: "user5", username: "Eve" },
    { userId: "user6", username: "Frank" },
    { userId: "user7", username: "Grace" },
    { userId: "user8", username: "Henry" },
    { userId: "user9", username: "Ivy" },
    { userId: "user10", username: "Jack" },
  ];

  const currentUser = users[users.length - 2];

  const [history, setHistory] = useState<TChat[]>([
    {
      message: "Hey everyone! How's it going?",
      createdAt: "2021-08-029T12:00:00Z",
      ...users[0],
    },
    {
      message: "I'm new here, nice to meet you all!",
      createdAt: "2021-09-01T12:04:00Z",
      ...users[1],
    },
    {
      message: "Has anyone tried the new coffee shop downtown?",
      createdAt: "2021-09-01T12:07:00Z",
      ...users[2],
    },
    {
      message: "The weather is beautiful today!",
      createdAt: "2021-09-01T12:20:00Z",
      ...users[3],
    },
    {
      message: "Anyone here into photography?",
      createdAt: "2021-09-01T12:21:00Z",
      ...users[4],
    },
    {
      message: "Just finished reading an amazing book",
      createdAt: "2021-09-01T12:31:00Z",
      ...users[5],
    },
    {
      message: "Hello from Seattle!",
      createdAt: "2021-09-01T12:35:00Z",
      ...users[6],
    },
    {
      message: "What's everyone's plans for the weekend?",
      createdAt: "2021-09-01T12:45:00Z",
      ...users[7],
    },
    {
      message: "This chat app looks pretty cool",
      createdAt: "2021-09-01T12:46:00Z",
      ...users[8],
    },
    {
      message:
        "Does anyone have good movie recommendations? I'm bored. Also, I like action movies. Thanks! Oh, and I'm allergic to cats.",
      createdAt: "2021-09-01T12:48:00Z",
      ...users[9],
    },
    {
      message: "No answer? really??",
      createdAt: "2021-09-02T12:58:00Z",
      ...users[0],
    },
  ]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          gap: 16,
          transform: [{ translateY: noticeY }],
          opacity: showNotice,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 24,
          backgroundColor: "white",
          zIndex: 1,
          height: 120,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>Public Chat</Text>
          <Ionicons
            name="close-circle"
            size={24}
            color="black"
            onPress={() =>
              Animated.spring(showNotice, {
                toValue: 0,
                useNativeDriver: true,
              }).start()
            }
          />
        </View>
        <Text>
          Hi there! you can chat with random people here. Just input and submit,
          and keep it respectful please!
        </Text>

        <Separator color="skyblue" />
      </Animated.View>

      <ChatHistory
        ref={flatListRef}
        currentUserId={currentUser.userId}
        history={history}
        style={{
          paddingBottom: showNotice.interpolate({
            // we set paddingBottom instead of paddingTop because the flatlist is inverted
            inputRange: [0, 1],
            outputRange: [0, 120],
          }),
        }}
      />

      <ChatInput
        onSubmit={(message) => {
          const newMessage: TChat = {
            message,
            createdAt: new Date().toISOString(),
            ...currentUser,
          };
          setHistory((prev) => [...prev, newMessage]);
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
