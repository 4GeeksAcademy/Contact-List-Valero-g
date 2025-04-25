import { ContactCard } from "../components/ContactCard.jsx";
import { initialContacts, contactsReducer } from "../store";
import { useContext } from "react";
import { useReducer, useEffect } from "react";
import { ContactContext } from "../hooks/contactsContext.jsx";


export const Home = () => {

  const {state, dispatch} = useContext(ContactContext);



  const fetchContacts =  () => 
	{
        fetch("https://playground.4geeks.com/contact/agendas/valero/contacts")
		.then ( (res) => {
			console.log(res);
			return res.json();}) 
		.then ( (data) => {
			dispatch ({ type: "INIT_CONTACTS", payload: data.contacts });
			console.log(data);
	});
        
    };

	useEffect(() => fetchContacts(), []);

 

	return (
		<div className="text-center mt-5">
			<h1>Lista de contactos</h1>
				{state.contacts.length ==0  ? <h2>No hay ningún contacto aún en la agenda</h2>
				:state.contacts.map( (item, key) => item.name != "" ? <ContactCard key = {key} cardName = {item.name} cardPhone={item.phone} cardAddress={item.address} cardEmail = {item.email} cardId={item.id}/> :<p></p>
				) }
		</div>
	);
}; 