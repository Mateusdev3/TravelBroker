import { useState, useEffect, createContext, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/firebaseConection"
import { toast } from "react-toastify";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase/firebaseConection";
import { apiTravel } from "../services/api/api";


interface AuthProviderData {
    children: ReactNode
}
type MainContextData = {
    ping: boolean;
    signed: boolean;
    loading: boolean;
    select: string;
    month: AmountProps[];
    lines: LinesDb[];
    token: string;
    setSigned: (value: boolean) => void
    setLoading: (value: boolean) => void
     setSelect: (value: string) => void
}
interface AmountProps {
    amount: number;
    datedb: string;
    datetext: string;
}

interface UserProps{
    stsTokenManager:{
        accessToken: string;
    }
}

interface LinesDb {
    rowCode: String;
    rowLine: String;
    amount: String;
}
export const MainContext = createContext({} as MainContextData)
function AuthProvider({ children }: AuthProviderData) {
    const [signed, setSigned] = useState(false)
    const [loading, setLoading] = useState(true)
    const [ping, setPing] = useState(false)
    const [month, setMonth] = useState<AmountProps[]>([])
    const [lines, setLines] = useState<LinesDb[]>([])
    const [select, setSelect] = useState("")
    const [token, setToken] = useState("")

    useEffect(() => {
        getChart()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSigned(true)
                setLoading(false)
                const userData = user.toJSON() as UserProps
                const tokens = userData.stsTokenManager.accessToken
                setToken(tokens)
                checkPing(tokens)
                console.log(tokens)
            } else{
                setSigned(false)
                setLoading(false)
                setToken("")
            }
        })
      

        async function getChart() {
            const docsRefs = collection(db, "CHART")
            await getDocs(docsRefs)
                .then((snapshot) => {
                    let listdocs = [] as AmountProps[]
                    snapshot.forEach(doc => {
                        listdocs.push({
                            amount: doc.data().amount,
                            datedb: doc.data().datedb,
                            datetext: doc.data().datetext
                        })
                    })
                    setMonth(listdocs)
                })}
        getLines()
    }, [select])


      async function getLines() {
                const docRef = collection(db, "MONITORED_LINES")
                await getDocs(docRef)
                .then((snapshot) => {
                    let listLines = [] as LinesDb[]
                    snapshot.forEach(doc => {
                        listLines.push({
                            rowCode: doc.data().rowCode,
                            rowLine: doc.data().rowLine,
                            amount: doc.data().amount
                        })
                    })
                    setLines(listLines)
                })
            }
    async function checkPing(tokens: string) {
        try {
           const response = await apiTravel.get(`viagem?id=${import.meta.env.VITE_TRAVEL_PING_NUMBER}`,{
                headers:{
                    Authorization: `Bearer ${tokens}`    
                }
            }).then(res => res.data)

            if(response.error){
                toast.error("API tacon offline")
                setPing(false)
                return
            }
            setPing(true)
        } catch (error) {
            setPing(false)
        }
    }
    
    return (
        <MainContext.Provider value={{ ping, signed, loading, setSigned, setLoading, month, lines, select, setSelect, token }}>
            {children}
        </MainContext.Provider>
    )
}


export default AuthProvider
