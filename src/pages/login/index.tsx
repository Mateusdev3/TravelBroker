import { signInWithEmailAndPassword} from "firebase/auth/web-extension"
import { auth } from "../../services/firebase/firebaseConection"
import { useNavigate } from "react-router"
import { useContext, useState} from "react"
import { Input } from "../../components/input/index "
import {toast} from "react-toastify"
import logo from "../../../public/trvelbroker.png"
import { MainContext } from "../../contexts/mainContext"
import { Container } from "../../components/container"

export function Login() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {setSigned} = useContext(MainContext)

    async function handleSignIn() {
        
        await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
           setSigned(true)
           navigate("/")
           toast.success("Usuário logado com sucesso" )
           
        }).catch(()=>{
            toast.error("Usuário ou senha inválidos ")
           setSigned(false)
        })
        
    }
    return (
        <Container>
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <div className="flex items-center md:w-150 md:h-75 lg:w-200 lg:h-100 justify-center flex-col bg-gray-100 shadow-md gap-2 rounded-lg">
             <img className="w-80 max- mb-4" src={logo} alt="mainicon" />


                <Input
                    name="Email"
                    type="email"
                    placeholder="Insira seu email..."
                    value={email}
                    change={(e) => setEmail(e.target.value)}
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Insira sua senha..."
                    value={password}
                    change={(e) => setPassword(e.target.value)}
                />

                <button className="bg-purple-700 rounded-lg w-6/12 h-9 text-white font-medium text-lg hover:scale-105 duration-400 cursor-pointer"
                onClick={handleSignIn}> Entrar </button>
            </div>
        </div>
        </Container>
    )
}
