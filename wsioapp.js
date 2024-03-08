const { Server } = require("socket.io");
const { createClient } = require("redis");

module.exports = function (httpServer) {
  const wsServer = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  let messages = {};
  //room id => [message]

  wsServer.on("connection", (socket) => {
    console.log("a user connected");

    const client = createClient();

    socket.on("join", (msg) => {
      socket.join(msg.id);
    });
    socket.on("leave", (msg) => {
      socket.leave(msg.id);
    });
    socket.on("send", (msg, reply) => {
      messages[msg.room] = messages[msg.room] || [];
      messages[msg.room].push(msg);
      reply("ok");
      socket.to(msg.room).emit("message", msg);
    });
    socket.on("get", (msg, reply) => {
      reply(messages[msg.room] || []);
    });

    socket.on("messageType", (data) => {
      switch (data.type) {
        case "ping":
          socket.emit("message", "pong");
          break;
        case "getDate":
          const currentDate = new Date().toLocaleString();
          socket.emit("message", currentDate);
          break;
        default:
          socket.emit("message", "Unknown message type");
      }
    });

    //  Для добавления Todo
    socket.on("addTodo", async (data) => {
      try {
        await client.rPush("todos", JSON.stringify(data.todo));
        socket.emit("todoAdded", "Todo added successfully");
      } catch (err) {
        console.error(err);
        socket.emit("todoError", "Failed to add todo");
      }
    });

    // Для получения Todo
    socket.on("getTodos", async () => {
      try {
        const todos = await client.lRange("todos", 0, -1);
        const parsedTodos = todos.map((todo) => JSON.parse(todo));
        socket.emit("todos", parsedTodos);
      } catch (err) {
        console.error(err);
        socket.emit("todoError", "Failed to get todos");
      }
    });

    // Для очистки Todo
    socket.on("clearTodos", async () => {
      try {
        await client.del("todos");
        socket.emit("todosCleared", "Todos cleared successfully");
      } catch (err) {
        console.error(err);
        socket.emit("todoError", "Failed to clear todos");
      }
    });

    socket.on("disconnect", () => {
      client.quit();
    });
  });
};
