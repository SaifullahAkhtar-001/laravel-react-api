import { Link } from "react-router-dom";
import useContactContext from "../context/ContactContext";

function ContactsTable() {
  
  const { contacts,deleteContact } = useContactContext();


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Designation
            </th>
            <th scope="col" className="px-6 py-3">
              Contact No.
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            contacts.map((contact) => (
              <tr
                key={contact.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {contact.id}
                </th>
                <td className="px-6 py-4">
                  <Link to={`/contact/${contact.id}`}>{contact.name}</Link>
                </td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.designation}</td>
                <td className="px-6 py-4">{contact.contact_no}</td>
                <td className="flex gap-4 px-6 py-4">
                  <Link to={`/update_contact/${contact.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <a
                    onClick={()=>deleteContact(contact.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactsTable;
