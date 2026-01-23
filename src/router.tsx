import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Broker } from "./pages/broker";
import { Registrations } from "./pages/registrations";
import { Login } from "./pages/login";
import { Private } from "./routes/privateRoutes";
import { LinesMonit } from "./pages/linesmonitor";
import { ProhibiteLines } from "./pages/prohibitedlines";
import { McoCalendary } from "./pages/mcocalendary";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path:"/",
        element: <Private> <Home/> </Private>
      },
      {
        path: "/corretor",
        element: <Private> <Broker/> </Private>
      },
      {
        path: "/cadastros",
        element: <Private> <Registrations/> </Private>
      },
      {
        path: "/monitorlinhas",
        element:<Private> <LinesMonit/> </Private>
      },
      {
        path: "/bloqueiolinhas",
        element: <Private> <ProhibiteLines/> </Private>
      },
      {
        path: "/mco",
        element: <Private> <McoCalendary/> </Private>
      }


    ]
  },
  {
    element: <Login/>,
    path: "/login"
  }
])

export {router}