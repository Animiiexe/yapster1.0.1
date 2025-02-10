import { Card, CardBody, Avatar, Image } from "@heroui/react";
import NewUser from "./NewUser";

export default function Chat({ content, own, type, name }) {
  return (
    <Card
      className={`w-fit bg-black text-white ${own && "ml-auto"} ${
        type === "user" && "mx-auto"
      }`}
    >
      <CardBody className="flex flex-row gap-2 items-center">
        {!own && type !== "user" && <Avatar name={name} />}

        {/* New User */}
        {type === "user" && <NewUser name={content} />}

        {/* Text Message */}
        {type === "text" && <p>{content}</p>}

        {/* Link Message */}
        {type === "link" && (
          <p className="underline">
            <a href={content} target="_blank">
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