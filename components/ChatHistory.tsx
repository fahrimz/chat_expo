import { TChat } from "@/constants/types";
import { forwardRef } from "react";
import { Animated, ViewStyle } from "react-native";
import ChatBubble from "./ChatBubble";

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

  return (
    <Animated.FlatList
      ref={ref}
      data={sortedHistory}
      inverted
      style={{ flex: 1 }}
      contentContainerStyle={[{ gap: 12 }, style]}
      renderItem={({ item }) => (
        <ChatBubble
          {...item}
          position={item.userId === currentUserId ? "right" : "left"}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
});

export default ChatHistory;
