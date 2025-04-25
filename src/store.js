export const initialContacts=()=>{

 
  return{
    contacts: []
  }
}

export function contactsReducer(state, action = {}) {
  switch(action.type){
    case 'INIT_CONTACTS':
      return {...state, contacts: action.payload};
    case 'ADD_CONTACT':
      return {...state, contacts: [...state.contacts, action.payload]};
    case 'DELETE_CONTACT':
      const id = action.payload;
      return {...state, contacts: state.contacts.filter( (item) => item.id != id)}
    case 'UPDATE_CONTACT':
      const updatedContact= action.payload;
      return{...state, contacts: state.contacts.map( (item) => item.id == updatedContact.id ? updatedContact : item)}

    default:
      return state
  }
     
}
