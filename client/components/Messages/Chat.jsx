import { Card, CardBody, Avatar, Image } from "@heroui/react";
import NewUser from "./NewUser";

export default function Chat({ content, own, type, name }) {
  const isAI = name === "AI"; // Detect AI messages

  return (
    <Card
      className={`w-fit max-w-[80%] ${
        isAI
          ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg border border-blue-400"
          : "bg-black text-white"
      } ${own && "ml-auto"} ${type === "user" && "mx-auto"}`}
    >
      <CardBody className="flex flex-row gap-3 items-center p-4">
        {/* AI Avatar */}
        {!own && type !== "user" && (
          <Avatar
            name={isAI ? "AI Assistant" : name}
            className={isAI ? "bg-blue-400 text-white" : ""}
          />
        )}

        {/* New User Notification */}
        {type === "user" && <NewUser name={content} />}

        {/* Text Message */}
        {type === "text" && (
          <p className={`text-lg ${isAI ? "italic font-semibold" : ""}`}>
            {content}
          </p>
        )}

        {/* Link Message */}
        {type === "link" && (
          <p className="underline">
            <a href={content} target="_blank" className="text-blue-300">
              {content}
            </a>
          </p>
        )}

        {/* Image Message */}
        {type === "image" && (
          <Image alt="image message" src={content} width={400} />
        )}
      </CardBody>
    </Card>
  );
}
