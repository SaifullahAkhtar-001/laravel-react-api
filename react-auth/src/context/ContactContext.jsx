import { useContext, createContext } from "react";
import axios from "../api/axios";

const ContactContext = createContext({})

export const ContactProvider = ({children}) =>{
    const  getContacts= async() => {
        console.log("Started")
        await axios.get("/api/contacts").then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    return(
        <ContactContext.Provider value={{ getContacts}}>
            {children}
        </ContactContext.Provider>
    );
}

export default function useContactContext(){
    return useContext(ContactContext);
}