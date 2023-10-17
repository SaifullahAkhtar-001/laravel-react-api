<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models;
use Illuminate\Http\Request;


class ContactController extends Controller
{
    public function contacts()
    {
        $contacts = Contact::all();
        return response()->json(
            [
                'contact' => $contacts,
                'massage' => 'Contacts',
                'code' => 200,
            ]
        );
    }

    public function getContact($id){
        $contact = Contact::find($id);
        return response()->json($contact);
    }

    public function updateContact($id, Request $request){
        $contact = Contact::where('id',$id)->first();
        $contact->name  = $request->name;
        $contact->email  = $request->email;
        $contact->designation  = $request->designation;
        $contact->contact_no  = $request->contact_no;
        $contact->save();
        return response()->json([
            'message' => 'Contact updated Successfully',
            'code' => '200'
        ]);
    }

    public function saveContact(Request $request)
    {
        $contact = new Contact();
        $contact->name  = $request->name;
        $contact->email  = $request->email;
        $contact->designation  = $request->designation;
        $contact->contact_no  = $request->contact_no;
        $contact->save();
        return response()->json([
            'message' => 'Contact created Successfully',
            'code' => '200'
        ]);
    }

    public function deleteContact($id)
    {  
        $contact = Contact::find($id);
        if($contact){
            $contact->delete();
            return response()->json([
                'message' => "The Contact with $id is deleted",
                'code' => '200'
            ]);
        }
        else{
            return response()->json([
                'message' => "The Contact not found ",
                'code' => '400'
            ]);
        }
    }

}
