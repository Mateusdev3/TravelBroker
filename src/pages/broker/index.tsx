import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import { Container } from "../../components/container";
import { FaCloudUploadAlt } from "react-icons/fa";
import { addSeconds, differenceInMinutes, differenceInSeconds, format, isAfter, parse } from "date-fns"
import { useContext } from "react";
import { MainContext } from "../../contexts/mainContext";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { toast } from "react-toastify"
import { db } from "../../services/firebase/firebaseConection";
import { apiSetTravel, apiTravel } from "../../services/api/api";

interface RowProps {
  date: string;
  row: string;
  tnumber: string;
  cnumber: string;
  hour: number;
  opnumber: string;
  correcthour: string;
  datecomplete: string
}
interface TacomApiProps {
  code: string;
  line: string;
  sense: string;
  initialhour: string;
  endhour: string;
  equipment: string;
  vehicle: string;
  outPcManual?: string;
  outPcAuto: string;
}
interface ApiResponse {
  id: string;
  equipamento: {
    numeroSerie: string;
  };
  fimViagem: string;
  inicioViagem: string;
  linha: {
    descricao: string;
    tarifaAntt: string;
  };
  saidaPcAutomatica: string;
  saidaPcManual?: string;
  sentido: string;
  veiculo: {
    numero: string;
  };
  sensorAceleracao: boolean;
  sensorEmbreagem: boolean;
  statusAcelerometro: boolean;
  statusPosChave: boolean;
}
interface LinesDb {
  rowCode: string;
  rowLine: string;

}

interface Monitored {
  rowCode: string;
  rowLine: string;
  amount: number;

}
export function Broker() {
  const [rows, setRows] = useState<RowProps[]>(localStorage.getItem("brokerdata") ? JSON.parse(localStorage.getItem("brokerdata") as string) : []);
  const [filesup, setFilesup] = useState(localStorage.getItem("filesup"));
  const [tacomresponse, setTacomresponse] = useState<TacomApiProps[]>(localStorage.getItem("tacomresponse") ? JSON.parse(localStorage.getItem("tacomresponse") as string) : [])
  const [isvalidate, setIsvalidate] = useState<string[]>(localStorage.getItem("brokervalidation") ? JSON.parse(localStorage.getItem("brokervalidation") as string) : []);
  const [tablevalid, setTablevalid] = useState<boolean>(localStorage.getItem("tablevalid") ? JSON.parse(localStorage.getItem("tablevalid") as string) : false);
  const [manualexit, setManualexit] = useState<Date[]>(localStorage.getItem("manualexit") ? JSON.parse(localStorage.getItem("manualexit") as string) : []);
  const [newouts, setNewouts] = useState<string[]>(localStorage.getItem("newout") ? JSON.parse(localStorage.getItem("newout") as string) : [])
  const { setLoading, token } = useContext(MainContext)
  const [isaply, setIsaply] = useState(localStorage.getItem("isaply") ? JSON.parse(localStorage.getItem("isaply") as string) : false)
  const [hourSend, setHourSend] = useState<string[]>(localStorage.getItem("hourstosend") ? JSON.parse(localStorage.getItem("hourstosend") as string) : [])
  const [prohibile, setProhibile] = useState<LinesDb[]>(localStorage.getItem("prohibilerows") ? JSON.parse(localStorage.getItem("prohibilerows") as string) : []);
  const [monitored, setMonitored] = useState<Monitored[]>(localStorage.getItem("monitoredLines") ? JSON.parse(localStorage.getItem("monitoredLines") as string) : [])

  useEffect(() => {
    async function handleGetLinesDb() {
      const docRef = collection(db, "PROHIBILE_ROWS")
      await getDocs(docRef)
        .then((snapshot) => {
          let lisRowsP = [] as LinesDb[]
          snapshot.forEach((doc) => {
            lisRowsP.push({
              rowCode: doc.data().rowCode,
              rowLine: doc.data().rowLine
            })
            setProhibile(lisRowsP)
            localStorage.setItem("prohibilerows", JSON.stringify(lisRowsP));
          })
        })
    }

    async function getMonitoredLines() {
      const docRef = collection(db, "MONITORED_LINES")
      await getDocs(docRef)
        .then((snapshot) => {
          let listMonitored = [] as Monitored[]
          snapshot.forEach((doc) => {
            listMonitored.push({
              rowCode: doc.data()?.rowCode,
              rowLine: doc.data()?.rowLine,
              amount: doc.data()?.amount
            })
            setMonitored(listMonitored)
            localStorage.setItem("monitoredLines", JSON.stringify(listMonitored))
          })
        })
    }

    handleGetLinesDb()
    getMonitoredLines()
  }, [])

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    console.log("%cPlanilha subiu", "color: #00FF00")
    if (!file) {
      toast.error("Erro na planilha")
      return;
    }
    try {
      const data = await readXlsxFile(file);
      const [, ...content] = data
      const formated: RowProps[] = content.map((row) => ({
        date: row[0] as string,
        row: row[1] as string,
        tnumber: row[2] as string,
        hour: parseHours(row[3] as number).getTime(),
        cnumber: row[4] as string,
        opnumber: row[5] as string,
        correcthour: format(parseHours(row[6] as number).getTime(), "HH:mm:ss"),
        datecomplete: handleDateFormat(row[0] as string, format(parseHours(row[6] as number).getTime(), "HH:mm:ss"))
      }));
      setRows(formated);
      setFilesup("true");
      localStorage.setItem("filesup", "true");
      localStorage.setItem("brokerdata", JSON.stringify(formated));
      toast.success("Planilha carregada com sucesso!")

    } catch (err) {
      console.log("Erro na planilha" + err)
      toast.error("Planilha inválida!")
      return;
    }
  }
  function parseHours(excelHour: number): Date {
    const data = new Date()
    const totalSecons = Math.round(excelHour * 24 * 60 * 60);
    data.setHours(0, 0, 0, 0);
    data.setSeconds(totalSecons)
    return data;
  }
  function handleDateFormat(date: string, hour: string): string {
    return `${date} ${hour}`;
  }
  async function handleValidate() {
    setLoading(true);
    console.log(token)
    try {
      const requests = rows.map(r =>
        apiTravel.get(`viagem?id=${r.tnumber}`)
          .then(res => res.data)
          .catch(() => ({ erro: true }))
      );
      const results = await Promise.all(requests);
      console.log(results)
      const exits: Date[] = [];
      const resultados: string[] = [];
      const response: ApiResponse[] = [];

      for (let i = 0; i < results.length; i++) {
        const r = results[i];
        if (r.erro) {
          console.log("%cCodigo da viagem invalido:%c " + rows[i].tnumber, "color: red;", "color: white")
          resultados.push("ERRO");
          response.push({
            id: rows[i].tnumber,
            equipamento: { numeroSerie: "" },
            fimViagem: "",
            inicioViagem: "",
            linha: { descricao: "", tarifaAntt: "" },
            saidaPcAutomatica: "Error",
            saidaPcManual: "Error",
            sentido: "",
            veiculo: { numero: "" },
            sensorAceleracao: false,
            sensorEmbreagem: false,
            statusAcelerometro: false,
            statusPosChave: false
          });
          exits.push(new Date());
          continue;
        }
        if (r.saidaPcManual === undefined) {
          console.log("%cViagem sem saida manual: " + rows[i].tnumber, "color: red")
          resultados.push("ERRO");
          response.push({
            id: rows[i].tnumber,
            equipamento: { numeroSerie: "" },
            fimViagem: "",
            inicioViagem: "",
            linha: { descricao: "", tarifaAntt: "" },
            saidaPcAutomatica: "Error",
            sentido: "",
            veiculo: { numero: "" },
            sensorAceleracao: false,
            sensorEmbreagem: false,
            statusAcelerometro: false,
            statusPosChave: false
          });
          exits.push(new Date());
          continue;
        }
        if (prohibile[i]?.rowLine.includes(r.linha.descricao)) {
          resultados.push("PROB");
          response.push({
            id: rows[i].tnumber,
            equipamento: { numeroSerie: "" },
            fimViagem: "",
            inicioViagem: "",
            linha: { descricao: "", tarifaAntt: "" },
            saidaPcAutomatica: "LINHA PROIBIDA",
            saidaPcManual: "LINHA PROIBIDA",
            sentido: "",
            veiculo: { numero: "" },
            sensorAceleracao: false,
            sensorEmbreagem: false,
            statusAcelerometro: false,
            statusPosChave: false
          });
          exits.push(r.saidaPcManual);
          continue;
        }

        const dt = parse(rows[i].datecomplete, "dd/MM/yyyy HH:mm:ss", new Date());
        const da = parse(r.saidaPcManual, "dd/MM/yyyy HH:mm:ss", new Date());
        const dtini = parse(r.inicioViagem, "dd/MM/yyyy HH:mm:ss", new Date());
        console.log(dtini)
        console.log("%cSaida manual:%c" + r.saidaPcManual + "%c" + " Viagem: " + "%c" + r.id, "color: #00FF00 ; font-weight: bold", "color: white", "color: #00FF00", "color: white")
        exits.push(da);
        response.push(r);
        const monthdb = format(da, "MM-yyyy");
        const datedb = format(da, "dd-MM");
        const docRef = doc(db, "MCO", monthdb, datedb, "info");
        const valido = isAfter(dt, da) && differenceInSeconds(dt, da) >= 10 || differenceInMinutes(da, dtini) >= 20
        resultados.push(valido.toString());
        const snapshot = await getDoc(docRef);
       


        if (snapshot.exists()) {
          const format = `${snapshot.data()?.dateClosed} ${snapshot.data()?.hourSeach}`;
          const fullDateClosed = parse(format, "dd/MM/yyyy HH:mm:ss", new Date());
          if (isAfter(new Date(), fullDateClosed)) {
            resultados[i] = "PROCESSED";
          }
        }
      }
      console.log("Respostas api: ", response)
      const apiformated: TacomApiProps[] = response.map((line) => ({
        code: line.id,
        line: line.linha.descricao,
        sense: line.sentido,
        initialhour: line.inicioViagem,
        endhour: line.fimViagem,
        equipment: line.equipamento.numeroSerie,
        vehicle: line.veiculo.numero,
        outPcManual: line.saidaPcManual,
        outPcAuto: line.saidaPcAutomatica
      }));
      setTacomresponse(apiformated);
      setIsvalidate(resultados);
      if (resultados.includes("PROCESSED")) {
        toast.error("Uma ou mais viagens já foram processadas pela Sumob")
      }
      if (resultados.includes("false")) {
        toast.warn("Um ou mais horários solicitados são invalidos")
      }
      localStorage.setItem("tacomresponse", JSON.stringify(apiformated));
      localStorage.setItem("tablevalid", "true");
      localStorage.setItem("manualexit", JSON.stringify(exits));
      localStorage.setItem("brokervalidation", JSON.stringify(resultados));
      setTablevalid(true);
    } catch (err) {
      console.log("Erro geral:", err);
    }
    setLoading(false);
  }
  function handleClearStorage() {
    localStorage.removeItem("isaply")
    localStorage.removeItem("newout");
    localStorage.removeItem("brokerdata");
    localStorage.removeItem("tacomresponse");
    localStorage.removeItem("tablevalid");
    localStorage.removeItem("brokervalidation");
    localStorage.removeItem("filesup");
    localStorage.removeItem("manualexit")
    localStorage.removeItem("hourstosend")
    setRows([]);
    setIsvalidate([]);
    setFilesup("");
    setManualexit([]);
    setTacomresponse([]);
    setTablevalid(false);
    setNewouts([]);
    setIsaply(false);
  }
  async function getNewTravels() {
    try {

      const requests = rows.map(r =>
        apiTravel.get(`viagem?id=${r.tnumber}`)
          .then(res => res.data)
          .catch(() => "ERRO")
      );
      const results = await Promise.all(requests);
      const formated = results.map(r =>
        r === "ERRO" ? "ERRO NA VIAGEM" : r.saidaPcAutomatica
      );
      localStorage.setItem("newout", JSON.stringify(formated));
      setNewouts(formated);
      if (formated.includes("ERRO NA VIAGEM")) {
        toast.error("Instabilidade na api detectada! caso o erro persista realize apenas 20 correções por vez")
      }
    } catch (error) {
      console.log(error)
      return
    }
  }
  async function handleSetTravels() {
    setLoading(true)
    const date = format(new Date, "MM-yyyy")
    const datetext = format(new Date, "MMM")
    const docRef = doc(db, "CHART", date)
    const snapshot = await getDoc(docRef)
    const previousAmount = snapshot.exists() ? Number(snapshot.data().amount || 0) : 0
    const fullLength = rows.length + previousAmount
    await setDoc(docRef, {
      datetext: datetext,
      datedb: date,
      amount: fullLength
    }, { merge: true }
    )
    try {

      const tempHours: string[] = [];


      await Promise.all(

        manualexit.map(async (e, i) => {
          try {
            const manualdate: Date = e;
            let hourToSend = "";

            if (isvalidate[i] === "PROB") {
              console.log("%cLinha Proibida não corrigida", "color: red")
              return;
            }

            if (isvalidate[i] === "true") {
              hourToSend = rows[i].datecomplete;
              console.log("%cHora solicitada pela operadora aplicada:%c " + hourToSend + rows[i].tnumber, "color: #00FF00; font-weight: bold", "color: white")
            }
            else {
              const autoDate = addSeconds(manualdate, 10);
              hourToSend = format(autoDate, "dd/MM/yyyy HH:mm:ss");
              console.log("%cHora gerada pelo sistema aplicada:%c " + hourToSend + rows[i].tnumber, "color: #FFD700; font-weight: bold", "color: white")
            }
            tempHours.push(hourToSend)

            console.log("%c" + hourSend, "color: #00FFFF")
            const response = await apiSetTravel.put("/setviagem", {
              id: rows[i].tnumber,
              date: hourToSend,
            }
            ).then(res => res.data)
            tempHours.push(hourToSend)

            const monitoredLine = monitored.find(m => m.rowLine === tacomresponse[i].line)
      if (monitoredLine) {
        const lineDocRef = doc(db, "MONITORED_LINES", monitoredLine.rowCode)
        const snapshot = await getDoc(lineDocRef)
        const amount = snapshot.data()?.amount + 1;


        await setDoc(lineDocRef, {
          amount: amount,
          rowLine: monitoredLine.rowLine,
          rowCode: monitoredLine.rowCode
        }, { merge: true })

      }
      console.log("%cResposta" + response, "color: #00ff")
      if (response !== true) {
        throw new Error("Erro na api setviagem, possivel hora inválida")
      }
    } catch (err) {
      console.log("%cErro na viagem:%c " + rows[i].tnumber, "color: red; font-weight: bold;", "color: white;"
      );
      console.log(err);
    }
  }));
  setHourSend(tempHours)
  localStorage.setItem("hourstosend", JSON.stringify(tempHours))
  await getNewTravels()
  setIsaply(true)
  localStorage.setItem("isaply", "true")
  setLoading(false)
} catch (err) {
  console.log("Erro loop geral", err)
} finally {
  setLoading(false)
}
  }
return (
  <Container>
    {filesup && !isaply && <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">Validação de viagens</h1>}
    <div className="flex flex-col items-center justify-center h-full gap-6 p-6 bg-gray-50 rounded-lg mb-20 shadow-md max-h-9/12">
      {!filesup && <h1 className="text-2xl font-semibold text-gray-800 text-center"> Insira a planilha contendo as correções a serem realizadas</h1>}
      {!filesup && (
        <>
          <label
            className="flex flex-col items-center justify-center w-full max-w-2xl border-2 border-dashed border-gray-400 rounded-2xl bg-white hover:border-purple-700 transition-all duration-300 p-10 shadow-md cursor-pointer">
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
              onChange={handleFileChange}
            />
          </label>
        </>
      )}
      {rows.length > 0 && !isaply && (
        <div className="overflow-x-auto w-full max-w-5xl mx-auto rounded-xl shadow-lg border border-gray-200 max-h-8/12">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className=" bg-purple-700 text-white uppercase text-sm font-semibold">
              <tr>
                <th className="px-4 py-3 text-center">Indice</th>
                <th className="px-4 py-3 text-center">Data</th>
                <th className="px-4 py-3 text-center">Linha</th>
                <th className="px-4 py-3 text-center">Código</th>
                <th className="px-4 py-3 text-center">Hora Início</th>
                <th className="px-4 py-3 text-center">Veículo</th>
                <th className="px-4 py-3 text-center">Operadora</th>
                <th className="px-4 py-3 text-center">Hora Correta</th>
                <th className="px-4 py-3 text-center">Avaliação</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className={`text-center border-b border-gray-200 transition-colors hover:bg-purple-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className={`px-4 py-2 font-medium ${isvalidate[i] === "ERRO" ? "text-red-500" : "text-green-500"}`}>{i + 2}</td>
                  <td className="px-4 py-2">{r.date.toString()}</td>
                  <td className="px-4 py-2">{r.row}</td>
                  <td className="px-4 py-2">{r.tnumber}</td>
                  <td className="px-4 py-2">{format(r.hour, "HH:mm:ss")}</td>
                  <td className="px-4 py-2">{r.cnumber}</td>
                  <td className="px-4 py-2">{r.opnumber}</td>
                  <td className="px-4 py-2">{r.correcthour}</td>
                  <td className={`px-4 py-2  font-medium ${isvalidate[i] === "true" ? "text-green-600" : isvalidate[i] === "false" ? "text-orange-500" : "text-red-600"}`}>
                    {isvalidate[i] === "true" && "OK"}
                    {isvalidate[i] === "false" && "HORA INVÁLIDA"}
                    {isvalidate[i] === "ERRO" && "ERRO API"}
                    {isvalidate[i] === "PROCESSED" && "PROCESSADA SUMOB"}
                    {isvalidate[i] === "PROB" && "PROIBIDA"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isaply && <h1 className="text-2xl font-medium">Correções realizadas com sucesso</h1>}
      {isaply && (
        <div className="w-full h-10/12 overflow-x-auto bg-white flex rounded-lg items-center flex-col gap-10">

          <table className="w-full">
            <thead>
              <tr className="bg-purple-700  text-white uppercase text-sm font-semibold ">
                <th className="px-4 py-3 text-center">Índice</th>
                <th className="px-4 py-3 text-center">Código</th>
                <th className="px-4 py-3 text-center">Linha</th>
                <th className="px-4 py-3 text-center">Saida Automatica(antiga)</th>
                <th className="px-4 py-3 text-center">Saida Manual</th>
                <th className="px-4 py-3 text-center">Saida Automatica(Aplicada)</th>
              </tr>
            </thead>
            <tbody >
              {tacomresponse.map((r, i) => (
                <tr key={i} className={`text-center font-medium border-b border-gray-200 transition-colors hover:bg-purple-200 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className={`px-4 py-2 ${isvalidate[i] === "ERRO" ? "text-red-500 font-bold" : "text-green-600"}`}>{i + 2}</td>
                  <td className="px-4 py-2">{r.code}</td>
                  <td className="px-4 py-2">{rows[i].row}</td>
                  <td className="px-4 py-2">{r.outPcAuto}</td>
                  <td className="px-4 py-2 text-amber-500">{r.outPcManual}</td>
                  <td className={`px-4 py-2 ${newouts[i] !== hourSend[i] ? "text-red-500 font-bold" : "text-green-600"}`}>{newouts[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {filesup && (
        <div className="flex gap-4">
          {!tablevalid && <button onClick={handleValidate}
            className="font-medium text-white bg-orange-400 min-w-50 h-9 text-lg rounded-md hover:scale-105 transition-transform duration-150 cursor-pointer">Validar</button>}

          {!isaply && <button onClick={handleClearStorage}
            className="font-medium text-white bg-red-600 min-w-50 h-9 text-lg rounded-md hover:scale-105 transition-transform duration-150 cursor-pointer">Excluir</button>}

          {isaply && <button onClick={handleClearStorage}
            className="font-medium text-white bg-green-600 min-w-50 h-9 text-lg rounded-md hover:scale-105 transition-transform duration-150 cursor-pointer">Concluir</button>}

          {tablevalid && !isaply && <button onClick={handleSetTravels}
            className="font-medium text-white bg-purple-600 min-w-50 h-9 text-lg rounded-md hover:scale-105 transition-transform duration-150 cursor-pointer ">Aplicar </button>
          }
        </div>
      )}
    </div>
  </Container>
);
}
