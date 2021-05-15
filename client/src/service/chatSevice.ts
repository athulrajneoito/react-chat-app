import Axios from 'axios';
import { baseURL } from '../configs'


export const createChat = async (name: string, room: string) => {
   const res = await Axios.post(`${baseURL}/createRoom`, { createdBy: name, name: room });
   return res.data;
}
export const getMessages = async (room: string) => {
   const res = await Axios.get(`${baseURL}/getMessages?room=${room}`);
   return res.data;

}

export const joinRoom = async (roomId: string) => {
   try {
      const res = await Axios.post(`${baseURL}/joinRoom`, { roomId });
      return res.data;
   } catch (error) {
         console.error(error);
         
      
   }


}

