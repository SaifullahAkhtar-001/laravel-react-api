import useContactContext from "../context/ContactContext";
import React, { useEffect, useState } from "react";

function Form(props) {
  const { createContact, errors, contact, editContact, getContact } = useContactContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(()=>{
    getContact(props.id)
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    if(props.task === "add"){
      createContact({ name, email, designation, phone });
    }
    else{
      editContact(props.id, { name, email, designation, phone })
    }
  };

  return (
    <div className="max-w-6xl mt-12 m-auto text-left">
      <p className="text-4xl font-bold text-blue-600 mb-4">{props.title}</p>
      <form onSubmit={handleSubmit} noValidate>
        {errors && (
          <div className="border-[1px] mb-4 rounded-xl border-red-600 p-4">
            <ul className="list-decimal px-4">
              {errors.map((error, index) => (
                <li key={index} className="text-red-600 text-sm">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={contact.name ||''}
            onChange={(e) => setName(e.currentTarget.value)}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={contact.email  ||''}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email Address
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={contact.designation  ||''}
            onChange={(e) => setDesignation(e.currentTarget.value)}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Designation
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={contact.contact_no  ||''}
            onChange={(e) => setPhone(e.currentTarget.value)}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Phone Number
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
