import { useRef, useState } from "react";
import { Button, Input } from "@heroui/react";
import { ImageUpIcon, SendHorizonalIcon } from "lucide-react";

export default function Inputs({ socket, name, setMessages }) {
  const [input, setInput] = useState("");
  const imageEl = useRef(null);

  const onImageUpload = async (e) => {
    const file = e.target.files[0];

    // BASE 64
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result;

      const msg = {
        type: "image",
        content: base64String,
        user: {
          id: socket.id,
          name: name,
        },
      };

      socket.emit("message", msg);
      setMessages((prevState) => [...prevState, msg]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      imageEl.current.click();
      return;
    }

    const msg = {
      type: input.startsWith("https") ? "link" : "text",
      content: input,
      user: {
        id: socket.id,
        name: name,
      },
    };

    socket.emit("message", msg);
    setMessages((prevState) => [...prevState, msg]);

    setInput("");
  };

  return (
    <form
      className="absolute bottom-0 w-full flex items-center gap-2 px-4 py-2 max-w-6xl left-1/2 -translate-x-1/2 rounded-t-lg"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        value={input}
        placeholder="Enter a message..."
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
        className="flex-grow p-2 rounded-lg text-black"
      />
      
      <input
        type="file"
        name="file"
        accept="image/png, image/webp, image/jpeg"
        ref={imageEl}
        onChange={onImageUpload}
        hidden
      />

      <Button
        type="Submit"
        className="bg-blue-500 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium"
      >
        {input ? <SendHorizonalIcon /> : <ImageUpIcon />}
      </Button>
    </form>
  );
}
