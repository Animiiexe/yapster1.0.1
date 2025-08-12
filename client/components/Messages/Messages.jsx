import { useEffect, useRef } from "react";
import Chat from "./Chat";
import { Users } from "lucide-react";

export default function Messages({ messages, id }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" }); // Fixed typo in "behavior"
    }
  }, [messages]);

  return (
    <div className="container mx-auto pt-5 min-h-[85vh] max-h-[85vh] overflow-auto overscroll-contain px-3 sm:px-5 py-3 scrollbar-hidden">
      {messages.length === 0 ? (

        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No messages yet</h3>
          <p className="text-gray-500 max-w-md">
            Start the conversation by sending a message or sharing an image below.
          </p>
        </div>
      ) : (<section className="flex flex-col gap-2">
        {messages.map((message, index) => (
          <Chat
            key={index}
            own={message.user.id === id}
            name={message.user.name}
            type={message.type}
            content={message.content}
          />
        ))}
      </section>)}

      <div ref={scrollRef} className="h-1"></div>
    </div>
  );
}
