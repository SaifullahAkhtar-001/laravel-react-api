import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [errors, setErrors] = useState();
  const [contactData, setContactData] = useState();
  const navigate = useNavigate();

  //      get all contacts
  const getContacts = async () => {
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
    try {
      await axios.get(`/api/get_contact/${id}`).then((response) => {
        setContact(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // to delete the selected post
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`).then((response) => {
        console.log("deleted");
      });
    } catch (e) {
      console.log(e);
    }
    getContacts();
  };



  // to create new contact
  const createContact= async({ ...data}) =>{

    let errorsArr = []
    if(!data.name){
      errorsArr.push("name can't be empty")
    }
    if(!data.email){
      errorsArr.push("email can't be empty")
    }
    if(!data.designation){
      errorsArr.push("designation can't be empty")
    }
    if(!data.phone){
      errorsArr.push("Phone can't be empty")
    }

    // setting errors
    if(errorsArr.length){
      setErrors(errorsArr)
    }
    // requesting
    if(!errors){

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('designation', data.designation);
      formData.append('contact_no', data.phone);
      try{
        await axios.post("/api/save_contact",formData).then((response)=>{
          getContacts();
          navigate("/")
        })
      }catch(e){
        console.log(e.response.data);
      }
    }

  }



  // to edit contact
  const editContact= async(id,{ ...data}) =>{

    let errorsArr = []
    if(!data.name){
      errorsArr.push("name can't be empty")
    }
    if(!data.email){
      errorsArr.push("email can't be empty")
    }
    if(!data.designation){
      errorsArr.push("designation can't be empty")
    }
    if(!data.phone){
      errorsArr.push("Phone can't be empty")
    }

    // setting errors
    if(errorsArr.length){
      setErrors(errorsArr)
    }
    // requesting
    if(!errors){

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('designation', data.designation);
      formData.append('contact_no', data.phone);
      try{
        await axios.post(`/api/update_contact/${id}`,formData).then((response)=>{
          getContacts();
          navigate("/")
        })
      }catch(e){
        console.log(e.response.data);
      }
    }else{
      console.log("you got an error");
    }

  }
  
  return (
    <ContactContext.Provider
      value={{ getContacts, getContact, deleteContact, createContact, editContact, contacts, contact, errors, contactData }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default function useContactContext() {
  return useContext(ContactContext);
}
