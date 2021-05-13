import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import queryString, { ParsedQuery } from "query-string";
import io from "socket.io-client";
import { ENDPOINT } from "../../configs";

let socket: any;
const Chat = () => {
  interface searchParam {
    name: string;
    room: string;
  }

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const location = useLocation();

  useEffect(() => {
    const { name, room }: any = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", name, room, (data: any) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message: any) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event: any) => {
    // event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };
  console.log(message, messages);

  return (
    <div>
      <input
        type="text"
        name="message"
        value={message}
        onChange={(event: any) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={(event: any) => sendMessage(event)} type="submit">
        Send
      </button>
    </div>
  );
};

export default Chat;
