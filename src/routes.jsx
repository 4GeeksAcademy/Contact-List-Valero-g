// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route, BrowserRouter, Routes
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import {AddContact} from "./pages/AddContact.jsx";

export const Rutas = () =>{
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}/>
          <Route path= "/form/:mode/:idContact" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  )

}
