import { useEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConnection";
import { Navigate } from "react-router-dom";
export default function Private({children}){
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)
    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user)=>{
                if(user){
                    const userData ={
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))
                    setLoading(false);
                    setSigned(true);
                }else{
                    setLoading(false);
                    setSigned(false);
                }
            })
        }
        checkLogin()
    },[]) 

    if(loading){
        return(
            <div>CARREGANDO...</div>
        )
    }

    if(!signed){
        return <Navigate to='/'/>
    }

    return children;
    
}