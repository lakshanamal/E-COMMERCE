import React,{useState,useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged,setIsLogged]=useState(false)
    const [isAdmin,setIsAdmin]=useState(false)

    useEffect(()=>{
        if(token){
            const getUser=async ()=>{
                try {
                    const res=await axios.get('/user/infor',{
                        headers: {Authorization:token}
                    })
                    console.log(res)
                } catch (error) {
                    alert(error.response.data.msg)
                }
            }
            getUser
        }
    },[token])
    return {

    }
}

export default UserAPI
