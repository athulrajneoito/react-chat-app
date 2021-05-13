import Axios from 'axios';
import {baseURL} from '../configs'


export const createChat = async(name:string,room:string)=>{
   const res = await Axios.post(`${baseURL}/create`,{name,room});
}