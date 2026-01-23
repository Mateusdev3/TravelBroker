import { Link } from "react-router"
import {signOut} from "firebase/auth/web-extension"
import { useContext } from "react"
import { MainContext } from "../../contexts/mainContext"
import logo from "../../../public/trvelbroker.png"
import { MdOutlineWifiOff } from "react-icons/md";
import { IoIosWifi } from "react-icons/io";
import { useNavigate } from "react-router"
import { auth } from "../../services/firebase/firebaseConection"


export function Header() {
    const navigate = useNavigate()
    const {ping} = useContext(MainContext)

    function handleOut(){
        navigate("/login")
        signOut(auth)
    }
    return (
        <div className="w-full bg-white shadow-md rounded-md h-12 flex items-center justify-center ">

            <header className=" w-full px-4 flex justify-between items-center max-w-11/12">
                <Link to="/">
                    <img className="max-w-50" src={logo} alt="logotransfacil" />
                </Link>
            
                <div className="flex gap-4 font-medium text-lg">
                    <Link className="transition duration-300 hover:text-orange-500 " to="/"> Home </Link>
                    <Link className="transition duration-300 hover:text-orange-500 " to="/corretor"> Correções </Link>
                    <Link className="transition duration-300 hover:text-orange-500 " to="/cadastros"> Cadastros </Link>
                    <button className="transition duration-300 hover:text-orange-500 " onClick={handleOut}> Sair </button>
                     
                </div>
            </header>
            <div className="relative group inline-block">
            {ping == false? <MdOutlineWifiOff className=" animate-pulse" size={30} color="red"/> : <IoIosWifi size={30} color="green"/> }
               <span className="absolute  left-1/4 -translate-x-1/2 mb-2
                   w-max rounded bg-gray-800 px-2 py-1 text-sm text-white
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                     Status da API
                </span>
            </div>
            
            
        </div>
        
    )
}
