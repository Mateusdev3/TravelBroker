import { FaCloudUploadAlt } from "react-icons/fa";
import { Container } from "../../components/container";
import { useState } from "react";
import { format } from "date-fns";
import readXlsxFile from "read-excel-file";
import {doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConection";
import { useContext } from "react";
import { MainContext } from "../../contexts/mainContext";
import {toast} from "react-toastify"

interface TableProps {
    movement: string;
    date: string;
    hourss: string;
    dateClose: string;
    hourClose: string;
}

export function McoCalendary() {
    const {setLoading} = useContext(MainContext)
    const [table, setTable] = useState<TableProps[]>(localStorage.getItem("table") ? JSON.parse(localStorage.getItem("table") as string) : []);
    const [fileUp, setFileUp] = useState<boolean>(localStorage.getItem("fileup") === "true" ? true : false);

    async function handleReadTable(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const data = await readXlsxFile(file);
        const content = data.slice(6);
        setFileUp(true)
        localStorage.setItem("fileup", "true")
        toast.success("Planilha carregada com sucesso!")

        const formated: TableProps[] = content.map((r) => ({
            movement: excelDateFormat(Number(r[0])),
            date: excelDateFormat(Number(r[1])),
            hourss: format(parseHours(Number(r[2])), "HH:mm:ss"),
            dateClose: excelDateFormat(Number(r[3])),
            hourClose: format(parseHours(Number(r[4])), "HH:mm:ss"),
        }));
        localStorage.setItem("table", JSON.stringify(formated));
        setTable(formated);
    }

    function excelDateFormat(serial: number): string {
        const epoch = new Date(1899, 11, 30);
        const date = new Date(epoch.getTime() + serial * 86400000);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear());

        return `${day}/${month}/${year}`;
    }

    function parseHours(excelHour: number): Date {

        const data = new Date()
        const totalSecons = Math.round(excelHour * 24 * 60 * 60);
        data.setHours(0, 0, 0, 0);
        data.setSeconds(totalSecons)
        return data;

    }
    async function handleSendMco() {
        const month = format(table[0].date, "dd-yyyy").toString()
         setLoading(true)
        try{
            for(const r of table){
            const [day, months] = r.movement.split("/")
            const formated = `${day}-${months}`
           
                setDoc(doc(db, "MCO", month, formated, "info"),{
                    dateMovement: r.movement,
                    dateSeach: r.date,
                    hourSeach: r.hourss,
                    dateClosed: r.dateClose,
                    hourClosed: r.hourClose
                })
            }
            toast.success("MCO Cadastrado com sucesso!")
              setLoading(false)
              handleDelete()
        }catch(err){
                console.log(err)
                toast.error("Erro ao cadastrar")
                setLoading(false)
        }
    }
            
    function handleDelete() {
        setTable([]);
        setFileUp(false);
        localStorage.removeItem("table");
        localStorage.removeItem("fileup");
    }
    return (
        <Container>
            <div className="w-full h-full flex flex-col items-center gap-10 py-10">
                {!fileUp && (
                    <div className="w-full h-full flex flex-col items-center gap-20">
                        <h1 className="text-2xl font-medium mt-10 ">
                            Insira a planilha contendo o calendario MCO
                        </h1>

                        <section
                            className="flex items-center w-10/12 h-9/12 justify-center
                 bg-gray-100 mx-auto flex-col rounded-lg shadow-md"
                        >
                            <label
                                className="flex flex-col items-center justify-center w-full max-w-2xl
                border-2 border-dashed border-gray-400 rounded-2xl bg-white hover:border-purple-700
                transition-all duration-300 p-10 shadow-md cursor-pointer"
                            >
                                <FaCloudUploadAlt
                                    size={120}
                                    className="text-gray-500 hover:text-purple-700 transition duration-300"
                                />
                                <p className="mt-3 font-medium text-gray-600">
                                    Clique ou arraste o arquivo Excel aqui
                                </p>
                                <input
                                    id="file-upload"
                                    className="hidden"
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={handleReadTable}
                                />
                            </label>
                        </section>
                    </div>
                )}
                {fileUp && <h1 className="text-2xl font-medium">Planilha carregada com sucesso!</h1>}
                {fileUp && (
                    <div className="w-11/12 flex justify-center h-8/12 bg-white rounded-lg px-10 gap-10 py-10 flex-col">
                        <div className="overflow-x-auto  w-full h-full rounded-md">
                            <table className="w-full" >
                                <thead className="bg-purple-700 text-white h-12">
                                    <tr >
                                        <th>DATA (MOVIMENTO)</th>
                                        <th>DATA (PROCESSAMENTO)</th>
                                        <th>HORA (PROCESSAMENTO)</th>
                                        <th>DATA (FECHAMENTO)</th>
                                        <th>HORA (FECHAMENTO)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.map((r, i) => (
                                        <tr key={i} className={`text-center border-b border-gray-200 transition-colors hover:bg-purple-200 ${i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}`}>
                                            <td>{r.movement}</td>
                                            <td>{r.date}</td>
                                            <td>{r.hourss}</td>
                                            <td>{r.dateClose}</td>
                                            <td>{r.hourClose}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <div className="flex justify-center w-full gap-10 h-10">
                            <button onClick={handleDelete} className="bg-red-600 min-w-50 h-9 text-white font-medium
                     rounded-md transition-transform hover:scale-105 duration-300 cursor-pointer  ">Excluir
                            </button>
                            <button onClick={handleSendMco} className="bg-purple-700 min-w-50 h-9 text-white font-medium
                     rounded-md transition-transform hover:scale-105 duration-300 cursor-pointer ">Cadastrar MCO</button>
                        </div>

                    </div>
                )}
            </div>
        </Container>
    );
}
