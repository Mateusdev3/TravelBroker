import { useContext } from "react";
import { MainContext } from "../contexts/mainContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineLoading } from "react-icons/ai";

interface ChildrenProps{
    children: ReactNode;
}

export function Private({children}: ChildrenProps): any{
    const {signed} = useContext(MainContext)
    const {loading} = useContext(MainContext)
   

    if(loading){
        return(
        <div className="w-full h-screen bg-gray-200 opacity-70 absolute top-0  ">
             <div className="flex items-center justify-center w-full h-full absolute opacity-100 z-0">
            <VscLoading size={150} className="absolute animate-spin text-orange-400 z-10 "/> <AiOutlineLoading size={150} className="animate-spin text-purple-600 z-10"/> 
            </div>
        </div> 
        )
    }

    if(!signed){
          return <Navigate to="/login" />;
    }
   
    return children;
}