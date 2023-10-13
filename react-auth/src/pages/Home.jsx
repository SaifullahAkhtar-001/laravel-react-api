import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";

function Home() {
  const { user, getUser } = useAuthContext();

    useEffect(() => {
      if (!user) {
        getUser();
      }
    }, []);

  return (
    <div className="max-w-6xl mx-auto">{user?.name}</div>
  );
}

export default Home;
