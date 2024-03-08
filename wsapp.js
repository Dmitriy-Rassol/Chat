var WebSocketServer = require("websocket").server;
let connections = [];
let actions = {};
let messages = [];

function send(connection, type, payload) {
  connection.sendUTF(JSON.stringify({ type, payload }));
}

function sendAll(type, payload) {
  for (let connection of connections)
    connection.sendUTF(JSON.stringify({ type, payload }));
}

actions["SEND_MESSAGE"] = (connection, payload) => {
  messages.push(payload);
  send(connection, "OK", true);
};

actions["GET_MESSAGES"] = (connection, payload) => {
  send(connection, "REC_MESSAGES", messages);
};

actions["BROADCAST"] = (connection, payload) => {
  sendAll("BROADCAST", payload);
};



module.exports = function (httpServer) {
  const wsServer = new WebSocketServer({
    httpServer,
  });

  wsServer.on("request", function (request) {
    const connection = request.accept();
    console.log(new Date() + " Connection accepted.");
    connections.push(connection);
    connection.on("message", function (message) {
      if (message.type !== "utf8") return;
      try {
        let data = JSON.parse(message.utf8Data);
        console.log("Received Message: " + data);
        const func = actions[data.type];
        if (func) func(connection, data.payload);
      } catch (e) {
        console.error(e);
      }
    });
    connection.on("close", function (reasonCode, description) {
      connections = connections.filter((_) => _ != connection);
      console.log(
        new Date() + " Peer " + connection.remoteAddress + " disconnected."
      );
    });
  });
};
