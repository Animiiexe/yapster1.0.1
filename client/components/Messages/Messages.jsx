import { useEffect, useRef } from "react";
import Chat from "./Chat";

export default function Messages({ messages, id }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" }); // Fixed typo in "behavior"
    }
  }, [messages]);

  return (
    <div className="container mx-auto pt-5 min-h-[85vh] max-h-[85vh] overflow-auto overscroll-contain px-3 sm:px-5 py-3 scrollbar-hidden">
      <section className="flex flex-col gap-2">
        {messages.map((message, index) => (
          <Chat
            key={index}
            own={message.user.id === id}
            name={message.user.name}
            type={message.type}
            content={message.content}
          />
        ))}
      </section>

      <div ref={scrollRef} className="h-1"></div>
    </div>
  );
}
