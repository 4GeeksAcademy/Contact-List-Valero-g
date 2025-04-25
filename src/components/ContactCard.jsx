import { Link } from "react-router-dom";
import contactUrl from "../assets/img/contact.png";
import { useContext, useReducer} from "react";
import { contactsReducer,initialContacts } from "../store";
import { ContactContext } from "../hooks/contactsContext";


export const ContactCard = ({cardName = "name", cardAddress = "address", cardPhone = "phone", cardEmail = "email", cardId=0}) => {

    const {state, dispatch}=useContext(ContactContext);




    const deleteContact= ()=> {
        fetch(`https://playground.4geeks.com/contact/agendas/valero/contacts/${cardId}`,
            {
            method: "DELETE"
        }
    )
    .then( (res)=> res.json())
    .then( (data)=>console.log(data))
    .catch( (err)=> console.log(err));
    }
    
    const removeContact = () =>{
        deleteContact();
        dispatch({ type: "DELETE_CONTACT", payload: cardId })
    }

    return (
        <div className="container-fluid p-2 w-75">
            <div className="card m-1 p-2 border border-dark-subtle" style={{maxwidth: "540px"}}>
                <div className="row g-0">
                    <div className="col-md-2">
                        <img src={contactUrl} className= "img-fluid" alt="Contact-Picture"/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body ms-4">
                            <h5 className="card-title text-start">{cardName}</h5>
                            <p className="card-text text-secondary text-start"><i className="fa-solid fa-location-dot"></i> {cardAddress}</p>
                            <p className="card-text text-secondary text-start"><i className="fa-solid fa-phone"></i> {cardPhone}</p>
                            <p className="card-text text-secondary text-start"><i className="fa-solid fa-envelope"></i> {cardEmail}</p>
                        </div>
                    </div>
                    <div className="col-md-4 pe-5">
                        <div className="card-body d-flex justify-content-end">
                            <Link to = {`/form/edit_contact/${cardId}`}><button className = "btn btn-light"><i className="fa-solid fa-pencil"></i></button></Link>
                            <div className="card-title ms-4" onClick={removeContact}><button className = "btn btn-light"><i className="fa-solid fa-trash-can"></i></button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}









