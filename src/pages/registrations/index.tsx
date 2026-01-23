import { Container } from "../../components/container"
import { FaRoadCircleXmark } from "react-icons/fa6";
import { FaRoad } from "react-icons/fa6";
import { IoCalendarSharp } from "react-icons/io5";
import { Link } from "react-router";

export function Registrations() {
    return (
        <Container>
            <div className="w-9/12 h-7/10 flex items-center justify-center flex-col bg-gray-100 m-auto px-4 rounded-lg shadow-md py-4  ">

                <div className=" w-full h-full rounded-lg grid grid-cols-2  items-center justify-center px-10 gap-4 mt-2">
                    <Link to={"/monitorlinhas"}  className="w-full justify-center items-center h-full  rounded-md 
                    bg-purple-700 hover:scale-105 transition-transform duration-300 
                    shadow-md px-4 py-4 flex shadow-black/50 relative ">
                        <span className="z-10 font-semibold text-white drop-shadow-xl  text-xl lg:text-3xl">
                            Inserir linha  monitorada
                        </span>
                        <FaRoad size={200} className="absolute z-0 opacity-15 text-white" />
                    </Link>

                    <Link to={"/bloqueiolinhas"} className="w-full justify-center items-center h-full rounded-md 
                    bg-orange-500 hover:scale-105 transition-transform duration-300 
                    shadow-md px-4 py-4 gap-20 flex shadow-black/50 relative">
                        <span className="z-10 font-semibold text-xl lg:text-3xl text-white drop-shadow-xl">
                            Inserir proibição de linha
                        </span>
                        <FaRoadCircleXmark size={200} className="absolute z-0 opacity-15 text-white" />
                    </Link>
                </div>

                <div className="flex items-top justify-center w-full h-full p-3">

                    <div className="grid grid-cols-1 w-full h-full px-7 ">
                        <Link to={"/mco"} className="w-full justify-center items-center h-full rounded-md 
                    bg-green-700 hover:scale-105 transition-transform duration-300 
                    shadow-md px-4 py-4 gap-20 flex shadow-black/50 relative">
                            <span className="z-10 font-semibold text-xl lg:text-3xl text-white drop-shadow-xl">
                                Inserir calendário MCO
                            </span>
                            <IoCalendarSharp size={200} className="absolute z-0 opacity-15 text-white" />
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    )
}