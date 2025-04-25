import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { Rutas } from "./routes";  // Import the router configuration
import { ContactsProvider } from './hooks/ContactsProvider';


const Main = () => {
    return (
        <React.StrictMode>  
            {/* Provide global state to all components */}
            <ContactsProvider> 
                <Rutas/>
            </ContactsProvider>
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
