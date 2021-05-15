import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { joinRoom } from "../../service/chatSevice";

const JoinChat = () => {
  const history  = useHistory();
  const [name, setName] = useState("");
  const [roomId, setRoom] = useState("");

  /**
   * Function to submit Form
   * @param event mouse click event
   */
  const submitForm = async(event: FormEvent) => {
    event.preventDefault();
    const res = await joinRoom(roomId);
    console.log(res);
    if(res){
        history.push(`/chat?name=${name}&room=${res.data.name}&roomId=${res.data.roomId}`);
    }
  };

  return (
    <div className="h-screen bg-gray-600 flex flex-col justify-center items-center">
      <div className="container xl:w-1/3 md:w-2/3 w:1/2 px-20 text-center text-lg p-16 text-white shadow-md hover:shadow-lg bg-gray-500 rounded-md">
        <h1 className="text-2xl font-bold p-8 pt-0">Join Chat</h1>
        <div>
          <form onSubmit={(e: FormEvent) => submitForm(e)}>
            <input
              onChange={(event: FormEvent<HTMLInputElement>) =>
                setName(event.currentTarget.value)
              }
              className="border text-black rounded-md w-full  border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent p-2"
              placeholder="User Name"
              type="text"
              name="name"
              id="name"
            />
            <input
              onChange={(event: FormEvent<HTMLInputElement>) =>
                setRoom(event.currentTarget.value)
              }
              className="border text-black rounded-md w-full  border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent p-2 mt-3"
              placeholder="Room Id"
              type="text"
              name="room"
              id="room"
            />
            <input
              className="p-2 bg-gray-600 hover:bg-gray-700 cursor-pointer  mt-5 w-full rounded-md text-xl"
              type="submit"
              value="Join"
            />
          </form>
        </div>
      </div>
      <button onClick={()=>history.push('/create')} className="p-2 py-4 xl:w-1/3 md:w-2/3 w:1/2 bg-gray-500 text-white hover:bg-gray-700 cursor-pointer  mt-5 w-full rounded-md text-xl" type="submit">Create Chat Room</button>
    </div>
  );
};

export default JoinChat;
