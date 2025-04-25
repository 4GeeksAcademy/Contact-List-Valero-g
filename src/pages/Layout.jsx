import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Home } from "./Home"
import { useEffect } from "react"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
     
    useEffect( ()=> getUser(),[]);
    const getUser = () => {
        fetch("https://playground.4geeks.com/contact/agendas/valero")
    
        .then( (res)=> 
                {if (!res.ok)createUser();
                console.log(res);
                return res.json();})
        .then( (data)=> console.log(data))
        .catch( (err)=> console.log(err));
    }

    const createUser = () => {
        fetch("https://playground.4geeks.com/contact/agendas/valero", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify()
            }
        )
    
        .then( (res)=> res.json())
        .then( (data)=>console.log(data))
        .catch( (err)=> console.log(err));
    }



    return (
        <ScrollToTop>
            <Navbar />
            <Home/>
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}