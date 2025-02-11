import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Socket.io server is healthy!");
});

// MARK: Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("A new user connected", socket.id);

  socket.on("message", async (message) => {
    // Broadcast the original message to all users
    socket.broadcast.emit("new_message", message);

    if (message.type === "text" && message.content.startsWith("@ai")) {
      const aiQuery = message.content.replace("@ai", "").trim(); // Remove "@ai"

      if (!aiQuery) return; // Ignore empty AI requests

      try {
        const response = await fetch("https://api.wakati.tech/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: aiQuery, // Fixed replacement
          }),
        });

        const data = await response.json();

        const newMessage = {
          ...message,
          content: data.res.response || "AI response unavailable.",
          name: "AI",
          id: "AI",
        };

        io.emit("new_message", newMessage); // Send AI response to all clients
      } catch (error) {
        console.error("AI API Error:", error);
      }
    }
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("user_typing", data);
  });

  socket.on("user", (data) => {
    socket.broadcast.emit("new_user", data);
  });
});

server.listen(8080, () => {
  console.log("Server listening on PORT: 8080");
});
