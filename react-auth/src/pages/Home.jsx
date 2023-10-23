import { useEffect } from "react";
import { ContactsTable } from "../components/Index";
import useAuthContext from "../context/AuthContext";

function Home() {
  const { user, getUser, loading } = useAuthContext();

  useEffect(() => {
    if (loading && !user) {
      getUser();
    }
  }, [loading]);
  const handleUser = () => {
    getContacts();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-4xl font-semibold py-16">Hi, {user?.name}</div>
      <ContactsTable/>      
    </div>
  );
}

export default Home;
