let socket;
const ul = document.getElementById("messages");
const input = document.getElementById("input");
const room = document.getElementById("room");

function addMessage(isSelf, to, message) {
  console.log(message);
  ul.insertAdjacentHTML(
    "beforeend",
    `
      <li class="${
        isSelf ? "right" : "left"
      }"><span>${message}</span><i>${to}</i></li>
    `
  );
}

function join(id) {
  if (!socket) return;
  socket.emit("join", { id});

  axios
    .get("http://localhost/chat/get/" + id)
    .then(function (response) {
        for(const message of response.data) {
          const isSelf = message.userId == socket.id;
          addMessage(
            isSelf,
            id + (isSelf ? '' : '-') + message.userId,
            message.message
          );
        }
    });
}

function send(to, message) {
  if (!socket || !socket.connected) return;
  socket.emit("send", { to, message }, (p) => {
    addMessage(true, to, message);
  });
}

async function start() {
  socket = io("ws://localhost:11001");
  socket.on("message", (payload) => {
    addMessage(
      payload.userId == socket.id,
      payload.to + "-" + payload.userId,
      payload.message
    );
  });

  join('hello');
  join('bye');
  join('new');
}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  send(room.value, input.value);
  input.value = "";
  return false;
  q;
});

start();
