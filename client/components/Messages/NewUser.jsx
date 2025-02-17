import { UserRoundPlusIcon } from "lucide-react";

export default function NewUser({ name }) {
  return (
    <p className="flex flex-row bg-none items-center bg-transparent">
      {name} joined the chat.
    </p>
  );
}