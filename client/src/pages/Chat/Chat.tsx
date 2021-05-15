import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import queryString, { ParsedQuery } from "query-string";
import io from "socket.io-client";
import { ENDPOINT } from "../../configs";
import Header from "../../components/Header/Header";
import MessagesList from "../../components/Messages/MessagesList";
import { getMessages } from "../../service/chatSevice";
import "./chat.css";

let socket: any;
const Chat = () => {
  const messagesEndRef = useRef<any>(null);
  interface searchParam {
    name: string;
    room: string;
  }

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const [messageList, setMessageList] = useState<any>([]);

  const location = useLocation();

  useEffect(() => {
    const { name, room, roomId }: any = queryString.parse(location.search);
    socket = io(ENDPOINT);
    async function getAllMessages() {
      const msg = await getMessages(room);
      console.log(msg.data.messages);
      setMessages((messages: any) => [...messages, ...msg.data.messages]);
    }
    setName(name);
    setRoom(room);
    setRoomId(roomId);
    socket.emit("join", name, room, roomId, () => {});
    getAllMessages();
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message: any) => {
      setMessages((messages: any) => [...messages, message]);
      scrollToBottom();
    });
  }, []);

  const sendMessage = (event: any) => {
    // event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, name,roomId, () => {
        setMessage("");
      });
    }
  };
  const scrollToBottom = () => {
    //@ts-nocheck
    // console.log("scroll");
    const height = messagesEndRef.current.offsetHeight;
    // messagesEndRef.current.scrollTop = height;
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    // messagesEndRef.current?.scrollTop({
    //   top: height,
    //   behavior: 'smooth'
    // });
  };
  return (
    <>
      <div className="h-screen bg-gray-600 flex flex-col justify-center items-center">
        <div className="container xl:w-2/3 md:w-2/3 w:1/2 h-screen my-4 mb-text-lg p-2 text-white shadow-md hover:shadow-lg bg-gray-500 rounded-md flex flex-col justify-between">
          <Header heading={room}></Header>
          <div className="bg-gray-400 h-full flex flex-col justify-between message-container">
            <div className="p-2" ref={messagesEndRef}>
              <MessagesList messages={messages} user={name}></MessagesList>
            </div>
          </div>
          <div className="flex sticky bottom-0 bg-gray-400">
            <input
              type="text"
              name="message"
              placeholder="Type something"
              className="w-full text-black border rounded-md m-2 border-transparent focus:outline-none   focus:border-transparent p-2"
              onKeyUp={(e: any) => (e.key === "Enter" ? sendMessage(e) : "")}
              value={message}
              onChange={(event: any) => {
                setMessage(event.target.value);
              }}
            />
            <button
              className="p-2 m-2  bg-green-500 text-white hover:bg-green-700 cursor-pointer rounded-md text-xl"
              onClick={(event: any) => sendMessage(event)}
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
