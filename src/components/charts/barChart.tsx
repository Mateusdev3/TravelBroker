import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { MainContext } from "../../contexts/mainContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const BarChart: React.FC = () => {
    const {month, select, lines} = useContext(MainContext)

 if(select !== "CHART") {
  const data = {
    labels: [
      lines[0]?.rowCode || "",
      lines[1]?.rowCode || "",
      lines[2]?.rowCode || "",
      lines[3]?.rowCode || "",
      lines[4]?.rowCode || "",
      lines[5]?.rowCode || "",
      lines[6]?.rowCode || "",
      lines[7]?.rowCode || "",
      lines[8]?.rowCode || "",
      lines[9]?.rowCode || "",
    ],
    datasets: [
      {
        label: "Volume",
        data: [Number(lines[0]?.amount), Number(lines[1]?.amount), Number(lines[2]?.amount), Number(lines[3]?.amount), Number(lines[4]?.amount), Number(lines[5]?.amount),
      Number(lines[6]?.amount), Number(lines[7]?.amount), Number(lines[8]?.amount), Number(lines[9]?.amount)],
        backgroundColor: "rgba(130,0,219 , 0.2)",
        borderColor: "rgba(130,0,219, 1)",
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      }
    },
  };
  return <Bar data={data} options={options} />;
 } 
 
 const data = {
    labels: [
      month[0]?.datetext || "",
      month[1]?.datetext || "",
      month[2]?.datetext || "",
      month[3]?.datetext || "",
      month[4]?.datetext || "",
      month[5]?.datetext || "",
      month[6]?.datetext || "",
      month[7]?.datetext || "",
      month[8]?.datetext || "",
      month[9]?.datetext || "",
      month[10]?.datetext|| "",
      month[11]?.datetext|| "",
     
    ],
    datasets: [
      {
        label: "Volume",
         data: [Number(month[0]?.amount), Number(month[1]?.amount), Number(month[2]?.amount), Number(month[3]?.amount), Number(month[4]?.amount),
          Number(month[5]?.amount), Number(month[6]?.amount), Number(month[7]?.amount), Number(month[8]?.amount), Number(month[9]?.amount),
          Number(month[10]?.amount), Number(month[11]?.amount)],
        backgroundColor: "rgba(130,0,219 , 0.2)",
        borderColor: "rgba(130,0,219, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      }
    },
  };

  return <Bar data={data} options={options} />;
}



export default BarChart;
