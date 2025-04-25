import React from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ContactContext } from "../hooks/contactsContext";



export const AddContact = () =>{
    const {mode,idContact} = useParams();
    const navigate = useNavigate();
    const {state,dispatch} = useContext(ContactContext);
    
    const [name, setName] = useState("");
    const [header, setHeader] = useState("Add new Contact");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [currentId, setIdContact] = useState(0);


    

    const getContactById = (idContact) => {
      return state.contacts.find(contact => contact.id === parseInt(idContact));
    };


   
    useEffect( ()=> {
      if (mode =="edit_contact"){
        const contact = getContactById(idContact);
        console.log(contact);
        setHeader("Edit contact")
        setName(contact.name);
        setEmail(contact.email);
        setPhone(contact.phone);
        setAddress(contact.address);
        setIdContact(idContact);
    }


    }, [mode, idContact, state.contacts]);
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
      
    const addContact = (contact) => {
      fetch("https://playground.4geeks.com/contact/agendas/valero/contacts/", 
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
                },
              body: JSON.stringify(contact)
          }
      )
  
      .then( (res)=> {if (res.ok) {
        fetchContacts();
        return res.json()}
    })
      .then( (data)=>console.log(data))
      .catch( (err)=> console.log(err));
  }
  
  const updateContact = (contact) => {
    fetch(`https://playground.4geeks.com/contact/agendas/valero/contacts/${idContact}`, 
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(contact)
        }
    )

    .then( (res)=> {if (res.ok) {
      fetchContacts();
      return res.json()}
    })
    .then( (data)=>console.log(data))
    .catch( (err)=> console.log(err));
}


    const handleSubmit = (e) => {
      e.preventDefault();
      

      const newContact = {
        name,
        email,
        phone,
        address,
        //id:nextId
      };

      const updatedContact = {
        name,
        email,
        phone,
        address,
        id:parseInt(idContact)
      };
      

      
      if (mode == "new_contact") 
        {
          addContact(newContact);
          dispatch({ type: "ADD_CONTACT", payload: newContact })
      } 
      else{
        updateContact(updatedContact);
       dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
      }
  
      // Redirigir a la lista de contactos

      navigate("/");
    
    };


    return(
      <form onSubmit = {handleSubmit}  className = "form-control form-control-lg m-4 w-75">
        <div className="mb-3 p-5">
          <h1 className="text-center">{header}</h1>
          <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
          <input type="text" className="form-control mb-3" id="name" value = {name} onChange={(e) => setName(e.target.value)} placeholder="i.e. John Smith"/>

          <label htmlFor="exampleFormControlInput2" className="form-label">Email address</label>
          <input type="email" className="form-control mb-3" id="email" placeholder="i.e. name@gmail.com" value ={email} onChange= {(e) => setEmail(e.target.value)}/>

          <label htmlFor="exampleFormControlInput3" className="form-label">Phone</label>
          <input type="text" className="form-control mb-3" id="phone" placeholder="i.e. 666 444 555" value = {phone} onChange={(e)=>setPhone(e.target.value)}/>

          <label htmlFor="exampleFormControlInput4" className="form-label">Adress</label>
          <input type="text" className="form-control mb-3" id="address" placeholder="i.e. Gran Via, 1 50005 Barcelona" value = {address} onChange={(e)=>setAddress(e.target.value)}/>
          
          <div className="d-flex flex-column justify-content-center align-items-center">
              <button className = "btn btn-primary m-3 w-75">Save</button>
              <Link to="/">Or get back to contacts</Link>
          </div>
        </div>
      </form>

    );
}



function getMax(arr){
  let maxArray = [];
  if (arr.length === 0) return 0;
  for (let obj of arr){
    maxArray.push(obj.id);
  }
  console.log(maxArray);
  return Math.max(...maxArray);
}


