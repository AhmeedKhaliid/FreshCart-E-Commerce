/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'

export let userContext = createContext()

export default function UserContext({children}) {
  const [token, setToken] = useState(null);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null)
  const [userId, setUserId] = useState(null)
  const [phone, setPhone] = useState(null)


    useEffect(() => {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        setname(localStorage.getItem("name"));
        setemail(localStorage.getItem("email"));
        setUserId(localStorage.getItem("Userid"));
        setPhone(localStorage.getItem("phone"));
      }
    },[]);
    

  return <userContext.Provider value = {{token,name,email,userId,phone, setToken,setname,setemail,setUserId,setPhone}}>
      {children}
    </userContext.Provider>
  
}
