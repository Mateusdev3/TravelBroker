import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { Input } from "../../components/input/index ";
import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConection";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { MainContext } from "../../contexts/mainContext";

export function ProhibiteLines() {
    const [rows, setRows] = useState("")
    const [rowscode, setRowscode] = useState("")
    const [rowsget, setRowsget] = useState<RowsProps[]>([])
    const [isclick, setIsclick] = useState(false)
    const {setLoading} = useContext(MainContext)


    interface RowsProps {
        rowscode: string;
        rowLine: string;
    }
    useEffect(() => {
        function handleGetRows() {
            setLoading(true)
            const docsRefs = collection(db, "PROHIBILE_ROWS")
            getDocs(docsRefs)
                .then((snapshot) => {
                    let listrows = [] as RowsProps[]
                    snapshot.forEach(doc => {
                        listrows.push({
                            rowscode: doc.data().rowCode,
                            rowLine: doc.data().rowLine
                        })
                        
                        setRowsget(listrows)
                        
                    })
                })
                 setLoading(false)
        }
        handleGetRows()
       
    }, [isclick, rows])

    async function handleSetRow() {
        const docRef = doc(db, "PROHIBILE_ROWS", rowscode)
        

        await setDoc(docRef, {
            rowCode: rowscode,
            rowLine: rows
        })
            .then(() => { toast.success("Linha Inserida!") 
                setIsclick(false)
             })
            .catch(() => { toast.error("Erro ao inserir linha!") })
    }
   async function handleDelete(r: RowsProps){
       const docRef = doc(db, "PROHIBILE_ROWS", r.rowscode)
       await deleteDoc(docRef)
       .then(() => {toast.success("Linha deletada com sucesso!")})
       .catch(() => {toast.error("Erro ao deletar")})
       setRowsget(rowsget.filter((rdata) => rdata.rowscode !== r.rowscode ))
       
    }
    return (
        <Container>
            <div className="w-full h-full flex flex-col ">
                <h1 className="text-center text-2xl font-medium p-5 ">Linhas que não devem ser corrigidas</h1>
                <div className="min-w-9/12 min-h-9/12 bg-white rounded-lg shadow-md flex items-center gap-1 flex-col justify-center py-10 ">


                    <main className="w-10/12 h-98 overflow-y-auto rounded-md">
                        <table className="w-full border-collapse ">
                            <thead className="bg-purple-700 w-full h-8 ">
                                <tr className="bg-purple-700  text-white uppercase text-xm font-semibold ">
                                    <th className="px-4 py-2">CÓDIGO  </th>
                                    <th className="px-4 ">DESCRIÇÃO </th>
                                    <th className="px-4 ">EXCLUIR</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="text-black">
                                {rowsget.map((r, i) => (
                                    <tr key={i} className={`text-center font-medium border-b border-gray-200 transition-colors hover:bg-purple-200 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                        <td className="px-4 py-2">{r.rowscode}</td>
                                        <td className="px-4 py-2">{r.rowLine}</td>
                                        <td className="px-4 py-2"><button onClick={() => {handleDelete(r)}} className="transition transform hover:text-red-600"><FaTrash /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>

                    {!isclick && <button onClick={() => {setIsclick(true)}}
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

                          <button onClick={() => {setIsclick(false)}}
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