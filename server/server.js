const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const socketIo = require("socket.io");
const whiteboardService = require("./services/whiteboardService");
const sessionRoutes = require("./routes/sessionRoutes");
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    try {
      let whiteboardData = await whiteboardService.getWhiteboardService(roomId);

      if (whiteboardData) {
        if (typeof whiteboardData === "string") {
          whiteboardData = JSON.parse(whiteboardData);
        }

        socket.emit("whiteboardData", whiteboardData);
      } else {
        socket.emit("whiteboardData", []);
      }
    } catch (error) {
      console.error("Error retrieving whiteboard data:", error.message);
    }
  });

  socket.on("draw", async (data) => {
    const { roomId, x1, y1, x2, y2, color, thickness } = data;
  
    socket.broadcast.to(roomId).emit("draw", data);
  
    try {
      let currentWhiteboardData = await whiteboardService.getWhiteboardService(roomId);
  
      if (!Array.isArray(currentWhiteboardData)) {
        currentWhiteboardData = [];
      }
  
      currentWhiteboardData.push({ x1, y1, x2, y2, color, thickness });
  
      await whiteboardService.saveWhiteboardService(roomId, JSON.stringify(currentWhiteboardData));
    } catch (error) {
      console.error("Error saving whiteboard data:", error.message);
    }
  });
  
  

  socket.on("clear", async (data) => {
    const { roomId } = data;

    socket.broadcast.to(roomId).emit("clear");

    try {
      await whiteboardService.saveWhiteboardService(roomId, JSON.stringify([]));
    } catch (error) {
      console.error("Error clearing whiteboard:", error.message);
    }
  });
  socket.on("erase", async (data) => {
    const { roomId, x1, y1, x2, y2 } = data; // x1, y1: start point of eraser, x2, y2: end point
    console.log("eraser chllll gyi")
    // Emit erase to other users in the same room
    socket.broadcast.to(roomId).emit("erase", data);
  
    try {
      let currentWhiteboardData = await whiteboardService.getWhiteboardService(roomId);
  
      if (!Array.isArray(currentWhiteboardData)) {
        currentWhiteboardData = [];
      }
  
      // Filter out the lines that are within the eraser bounds
      currentWhiteboardData = currentWhiteboardData.filter((line) => {
        // Remove lines if they are inside the eraser bounds
        return !(
          (line.x1 >= x1 && line.x1 <= x2 && line.y1 >= y1 && line.y1 <= y2) ||
          (line.x2 >= x1 && line.x2 <= x2 && line.y2 >= y1 && line.y2 <= y2)
        );
      });
  
      await whiteboardService.saveWhiteboardService(roomId, JSON.stringify(currentWhiteboardData));
    } catch (error) {
      console.error("Error erasing whiteboard data:", error.message);
    }
  });
  

  socket.on("clearWhiteboard", async (data) => {
    const { roomId } = data;

    socket.broadcast.to(roomId).emit("clear");

    try {
      await whiteboardService.clearWhiteboardService(roomId);
    } catch (error) {
      console.error("Error clearing whiteboard:", error.message);
    }
  });
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// API Routes
app.use("/api/session", sessionRoutes);

