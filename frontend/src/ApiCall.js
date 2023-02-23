
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export const ApiCall = {
    createUsrs
}

function createUsrs(obj){
    return axios.post(`${process.env.REACT_APP_API_SERVER_PORT}/users`,obj).then(function (response) {
        toast.success(response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
    
    return response.data;
    }).catch((error) => {
    if (error.response != undefined)
       if (error.response.status === 404) {
        toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
      }
      if (error.response.status === 409) {
        toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
      }
    
    });
}
