import { Card, CardBody, Avatar } from "@heroui/react";
import Image from "next/image";
import NewUser from "./NewUser";

export default function Chat({ content, own, type, name }) {
  const isAI = name === "AI"; 

  return (
    <Card
      className={`w-fit max-w-[80%] ${
        isAI
          ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg border border-blue-400"
          : own
          ? "bg-black border border-gray-900 text-white"
          : "bg-gray-400 text-black"
      } ${own ? "ml-auto" : "mr-auto"} ${type === "user" && "mx-auto"}`}
    >
      <CardBody className="flex flex-row gap-3 items-start p-4">
        {/* Avatar */}
        {!own && (
          <Avatar
          name={isAI ? "AI" : name?.slice(0, 1).toUpperCase()}
          className={`w-8 h-8 text-white ${isAI ? "bg-red-400" : "bg-blue-500"}`}
        />        
        )}

        <div className="flex flex-col">
          {/* Name (for non-AI messages) */}
          {!isAI && !own && <span className="text-sm font-semibold mb-1">
    {name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase()}
  </span>}

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
            <a href={content} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">
              {content}
            </a>
          )}

          {/* Image Message */}
          {type === "image" && (
            <Image alt="image message" src={content || "/placeholder.svg"} width={400} height={300} objectFit="contain" />
          )}
        </div>
      </CardBody>
    </Card>
  );
}