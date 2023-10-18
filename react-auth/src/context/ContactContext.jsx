import { useContext, createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});

  //      get all contacts
  const getContacts = async () => {
    console.log("Started");
    try {
      await axios.get("/api/contacts").then((response) => {
        setContacts(response.data.contact);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContacts();
  }, []);

  //   get the one selected contact with given id
  const getContact = async (id) => {
    console.log("start getting one contact");
    try {
      await axios.get(`/api/get_contact/${id}`).then((response) => {
        setContact(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ContactContext.Provider
      value={{ getContacts, getContact, contacts, contact }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default function useContactContext() {
  return useContext(ContactContext);
}
