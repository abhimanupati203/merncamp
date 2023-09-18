import {useState, createContext, useEffect} from 'react';
import axios from "axios";
import { useRouter } from 'next/router';

const UserContext = createContext();

const UserProvider = ({children}) => {
const [state, setState] = useState({
   user:{},
   token:""
});
const router = useRouter();
const token = state && state.token ? state.token : '';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;



useEffect(()=>{
setState(JSON.parse(window.localStorage.getItem('auth')));
},[]);



// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    let res = error.response;
    if(res.status ==401 && res.config && !res.config._isRetryRequest){
        setState(null);
        window.localStorage.removeItem('auth');
        router.push("/login");
    }
  });

// Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });


return (<UserContext.Provider value={[state,setState]}>
    {children}
</UserContext.Provider>)
};

export {UserContext, UserProvider};