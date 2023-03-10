import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/ConsultaFinancas";

import 'bootswatch/dist/cosmo/bootstrap.css'
import './custom.css'
import 'toastr/build/toastr.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const App = () => {
    return(
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path="/home" element={<Home/>} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    )
}

export default App;
