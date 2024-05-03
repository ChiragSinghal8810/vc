import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

//   const handleJoinRoom = useCallback(
//     (data) => {
//         console.log("Joining room:", data.room);
//       const { email, room } = data;
//       console.log("Navigating to room:", room);
//       navigate(`/room/${room}`);
//     },
//     [navigate]
//   );

// const handleJoinRoom = useCallback(
//     (data) => {
//       console.log("Socket data:", data); // Log the entire data object
//       const { email, room } = data; // Check if room is properly extracted
//       console.log("Received room:", room); // Check the value of room
//       navigate(`/room/${room}`);
//     },
//     [navigate]
//   );
//   useEffect(() => {
//     socket.on('room:join', handleJoinRoom);
//     return () => {
//       socket.off('room:join', handleJoinRoom);
//     };
//   }, [socket, handleJoinRoom]);



const handleJoinRoom = useCallback(
    (data) => {
      console.log("Socket data:", data); // Log the entire data object
      const { email, room } = data; // Check if room is properly extracted
      console.log("Received room:", room); // Check the value of room
      navigate(`/room/${room}`);
    },
    [navigate]
  );
  
  useEffect(() => {
    console.log("Setting up socket event listener for 'room:join'");
    socket.on("room:join", handleJoinRoom);
  
    return () => {
      console.log("Removing socket event listener for 'room:join'");
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button onClick={handleJoinRoom}>Join</button>
      </form>
    </div>
  );
};

export default Lobby;