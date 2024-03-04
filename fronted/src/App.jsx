import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("/");

function App() {
  const [message, setMessages] = useState("");
  const [chat, setChat] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };

    setChat([...chat, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) => setChat((state) => [...state, message]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">

      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10 w-1/3">

        <h1 className="text-2xl font-bold my-2">Chat App</h1>

        <input
          type="text"
          placeholder="Write your message.."
          onChange={(e) => setMessages(e.target.value)}
          className="border-2 border-zinc-00 p-2 w-full text-black"
        />

        <ul className="h-80 overflow-y-auto">

          {chat.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table rounded-md bg-sky-700 ${
                message.from === "Me" ? "bg-sky-700 " : `bg-black ml-auto`
              }`}
            >
              <span className="text-xs text-slate-300 block">
                {message.from}
              </span>

              <span className="text-md">
                {message.body}
              </span>
            </li>
          ))}

        </ul>

      </form>

    </div>
  );
}

export default App;
