import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";
import useContactContext from "../context/ContactContext";

function Home() {
  const { user, getUser, isLogin } = useAuthContext();
  const { getContacts } = useContactContext();

  useEffect(() => {
    if (isLogin && !user) {
      getUser();
    }
  }, []);
  const handleUser = () =>{
    getContacts();
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">{user?.name}</div>
      <button onClick={handleUser}>getContacts</button>
    </>
  );
}

export default Home;
