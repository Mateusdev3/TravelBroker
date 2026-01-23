import { FaTrash } from "react-icons/fa"
import { Container } from "../../components/container"
import { useEffect, useState } from "react"
import { Input } from "../../components/input/index "
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConection"
import { toast } from "react-toastify"


export function LinesMonit() {
    const [rows, setRows] = useState("")
    const [rowscode, setRowscode] = useState("")
    const [rowsget, setRowsget] = useState<RowsProps[]>([])
    const [isclick, setIsclick] = useState(false)
    interface RowsProps {
        rowscode: string;
        rowLine: string;
        amount: number;
    }

    useEffect(() => {
       async function handleGetRows(){
            const docRef = collection(db,"MONITORED_LINES")
            await getDocs(docRef)
            .then((snapshot) => {
                let listLines = [] as RowsProps[]
                snapshot.forEach(doc => {
                    listLines.push({
                        rowscode: doc.data().rowCode,
                        rowLine: doc.data().rowLine,
                        amount: 0
                    })
                    setRowsget(listLines)
                })
            })
        }
        handleGetRows()
    }, [rows, isclick])

   async function handleSetRow(){
        const docRef = doc(db, "MONITORED_LINES", rowscode)
        await setDoc(docRef, {
            rowCode: rowscode,
            rowLine: rows,
            amount: 0
        })
        .then(() => {toast.success("Linha inserida com sucesso!") 
            setIsclick(false)})
        .catch(() => {toast.error("Erro ao inserir a linha!")})

       
        }

    async function handleDelete(r: RowsProps) {
        const docRef = doc(db, "MONITORED_LINES", r.rowscode)
        await deleteDoc(docRef)
        .then(() => {toast.success("Linha deletada com sucesso!")})
        .catch(() => {toast.error("Erro ao deletar")})
         setRowsget(rowsget.filter((rdata) => rdata.rowscode !== r.rowscode))
    }
    return (
        <Container>
            <div className="w-full h-full flex flex-col ">
                <h1 className="text-center text-2xl font-medium p-5">Linhas a serem monitoradas</h1>
                <div className="min-w-9/12 min-h-9/12 bg-white rounded-lg shadow-md flex items-center gap-1 flex-col justify-center py-10 ">
                    <main className="w-10/12 h-98 overflow-y-auto rounded-md">
                        <table className="w-full border-collapse ">
                            <thead className="bg-purple-700 w-full">
                                <tr className="bg-purple-700  text-white uppercase text-xm font-semibold">
                                    <th className="px-4 py-2 ">CÓDIGO  </th>
                                    <th className="px-4  ">DESCRIÇÃO </th>
                                    <th className="px-4 ">EXCLUIR</th>
                                </tr>
                            </thead>
                            <tbody className="text-black">
                                {rowsget.map((r, i) => (
                                    <tr key={i} className={`text-center font-medium border-b border-gray-200 transition-colors hover:bg-purple-200 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                        <td className="px-4 py-2">{r.rowscode}</td>
                                        <td className="px-4 py-2">{r.rowLine}</td>
                                        <td className="px-4 py-2"><button onClick={() => { handleDelete(r) }} className="transition transform hover:text-red-600"><FaTrash /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                    {!isclick && <button onClick={() => { setIsclick(true) }}
                        className="font-medium text-white bg-purple-600 min-w-50 h-9 text-lg rounded-md hover:scale-105
                                     transition-transform duration-150 cursor-pointer ">Inserir linha</button>}
                    {isclick && (
                        <div className="w-5/12 flex gap-2 items-center justify-center">
                            <Input placeholder="Codigo da linha" name="linhaco"
                                type="text" value={rowscode} change={(e) => { setRowscode(e.target.value) }} />

                            <Input placeholder="Descrição da linha" name="linha"
                                type="text" value={rows} change={(e) => { setRows(e.target.value) }} />

                            <div className="flex gap-1">
                                <button onClick={handleSetRow}
                                    className="font-medium text-white bg-green-600 min-w-20 h-9 text-sm rounded-md hover:scale-105
                                     transition-transform duration-150 cursor-pointer ">Salvar</button>

                                <button onClick={() => { setIsclick(false) }}
                                    className="font-medium text-white bg-red-600 min-w-20 h-9 text-sm rounded-md hover:scale-105
                                     transition-transform duration-150 cursor-pointer ">Cancelar</button>
                            </div>



                        </div>
                    )}
                </div>


            </div>
        </Container>

    )
}