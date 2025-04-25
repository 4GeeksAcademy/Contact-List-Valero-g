import React from "react";
import { ContactContext } from "./contactsContext";
import { initialContacts, contactsReducer } from "../store";
import { useReducer } from "react";

 export const ContactsProvider = ({children}) =>{

    const [state, dispatch] = useReducer(contactsReducer, initialContacts());


    return (

        <ContactContext.Provider value = {{state,dispatch}}>
            {children}
        </ContactContext.Provider>
    );
}