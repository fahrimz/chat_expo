import { TChat } from "@/constants/types";
import { Text, View } from "./Themed";

export type ChatBubbleProps = TChat & {
  position?: "left" | "right";
};

export default function ChatBubble({
  message,
  username,
  createdAt,
  position = "left",
}: ChatBubbleProps) {
  return (
    <View
      style={{
        padding: 12,
        borderRadius: 12,
        backgroundColor: "rgba(0,0,0,0.05)",
        alignSelf: position === "left" ? "flex-start" : "flex-end",
        gap: 4,
        maxWidth: "80%",
        borderBottomRightRadius: position === "right" ? 0 : 12,
        borderBottomLeftRadius: position === "left" ? 0 : 12,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: position === "right" ? "skyblue" : "black",
        }}
      >
        {username}
      </Text>
      <Text>{message}</Text>
      <Text
        style={{
          fontSize: 10,
          color: "rgba(0, 0, 0, 0.4)",
          textAlign: "right",
          marginTop: 8,
        }}
      >
        {new Date(createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
}
