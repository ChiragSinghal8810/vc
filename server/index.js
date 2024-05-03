const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on(`room:join`, (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    socket.to(socket.id).emit(`room:join`, data);
    // io.to(room).emit("user:joined", { email, id: socket.id });
    // socket.join(room);
    // io.to(socket.id).emit("room:join", data);
  });
});