import { TChat } from "@/constants/types";
import { forwardRef } from "react";
import { Animated, ViewStyle } from "react-native";
import ChatBubble from "./ChatBubble";
import { Text, View } from "./Themed";

const ChatHistory = forwardRef<
  Animated.FlatList,
  {
    currentUserId: string;
    history: TChat[];
    style: ViewStyle;
  }
>(({ currentUserId, history, style }, ref) => {
  const sortedHistory = history.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // fill in the dates, reflecting the chat history. this will fill in the date on index of last occurrence of the date
  const dates = sortedHistory.map((chat, index, array) => {
    if (index === array.length - 1) {
      const date = new Date(chat.createdAt);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    }

    const currentDate = new Date(chat.createdAt);
    const nextDate = new Date(array[index + 1].createdAt);

    return currentDate.toDateString() === nextDate.toDateString()
      ? null
      : currentDate.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
  });

  return (
    <Animated.FlatList
      ref={ref}
      data={sortedHistory}
      inverted
      style={{ flex: 1 }}
      contentContainerStyle={[{ gap: 12 }, style]}
      renderItem={({ item, index }) => (
        <View>
          {dates[index] && (
            <Text style={{ textAlign: "center", paddingVertical: 24 }}>
              {dates[index]}
            </Text>
          )}
          <ChatBubble
            {...item}
            position={item.userId === currentUserId ? "right" : "left"}
          />
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
});

export default ChatHistory;
