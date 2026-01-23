import { format } from "date-fns"
import BarChart from "../../components/charts/barChart"
import { Container } from "../../components/container"
import { useContext } from "react"
import { MainContext } from "../../contexts/mainContext"


export function Home() {
  
  const { select, setSelect } = useContext(MainContext)

  return (
    <Container>
      <div className="w-full h-11/12 flex flex-col gap-10 items-center">
        <h1 className="text-2xl font-medium">{select === "CHART" ?  `Saídas automáticas corrigidas durante os meses de ${format(new Date, "yyyy")}` : "Correções realizadas em linhas monitoradas"}</h1>
        <div className="w-full h-10/12 flex justify-center items-center flex-col gap-20 bg-white rounded-md shadow-md  " >
          <div className="w-9/12 flex items-center justify-center h-9/12 flex-col">
            <div className="flex w-full justify-end">
              <select name="Filtro" id="i" value={select} onChange={(e) => setSelect(e.target.value)} className="w-1/12 ml-200 " >
                  <option value={"LINES"}>Linhas</option>
                   <option value={"CHART"}>Total</option>
              </select>
            </div>

            <BarChart />
          </div>
        </div>

      </div>

    </Container>



  )
}
