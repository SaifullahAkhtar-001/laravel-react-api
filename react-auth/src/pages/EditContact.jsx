import { Form } from "../components/Index";
import { useParams } from "react-router-dom";

function EditContact() {
    const { contactId} = useParams();
  return (
    <div>
        <Form title="Edit Contact" task="edit" id={contactId}/>
    </div>
  )
}

export default EditContact
