import React, { useEffect, useRef, useState } from "react";

const MessagesList = ({ messages, user }: any) => {
  const [messageList, setmessageList] = useState([]);
  const messagesEndRef = useRef<any>(null)
  useEffect(() => {
    setmessageList(messages);
    // scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    
    //@ts-nocheck
    const height =   messagesEndRef.current.offsetHeight;
    console.log(height);
    
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth",block:"end",inline: "nearest" })
  }
  return (
    <div ref={messagesEndRef}>
      {messageList &&
        messageList.map((msg: any, i: any) =>
          msg.type == "admin" ? (
            <p key={i +msg.text} className="text-center text-gray-300">
              {msg.text}
            </p>
          ) : msg.user == user ? (
            <>
              <p
                className="text-right float-right p-2 px-6 rounded-md shadow bg-purple-700 rounded-br-none"
                key={i+ msg.text}
              >
                {msg.text}
              </p>
              <p
                className="text-right float-right text-xs text-gray-300"
                key={i+ msg.user}
              >
                {msg.user}
              </p>
            </>
          ) : (
            <>
              <p
                className="text-left float-left p-2 px-6 rounded-md shadow bg-pink-700 rounded-bl-none"
                key={i + msg.text}
              >
                {msg.text}
              </p>
              <p
                className="text-left float-left text-xs text-gray-300"
                key={i+ msg.user}
              >
                {msg.user}
              </p>
            </>
          )
        )}
    </div>
  );
};

export default MessagesList;
