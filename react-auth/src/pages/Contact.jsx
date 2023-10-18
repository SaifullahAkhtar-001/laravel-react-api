import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useContactContext from "../context/ContactContext";

function Contact() {
  const { getContact, contact } = useContactContext();
  const { userId } = useParams();
  useEffect(() => {
    getContact(userId);
  }, []);

  return (
  <div className="max-w-6xl mx-auto pt-24">
    <div className="p-24 bg-stone-700 rounded-[2rem]">
        <div className="text-4xl font-light"><span className="text-blue-400 font-medium">ID: </span>{contact.id}</div>
        <div className="text-4xl font-light"><span className="text-blue-400 font-medium">Name: </span>{contact.name}</div>
        <div className="text-4xl font-light"><span className="text-blue-400 font-medium">Email: </span>{contact.email}</div>
        <div className="text-4xl font-light"><span className="text-blue-400 font-medium">Designation: </span>{contact.designation}</div>
        <div className="text-4xl font-light"><span className="text-blue-400 font-medium">Contact No: </span>{contact.contact_no}</div>
    </div>
  </div>
  );
}

export default Contact;
