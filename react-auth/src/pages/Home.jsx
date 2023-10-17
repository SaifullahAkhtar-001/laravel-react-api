import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";

function Home() {
  const { user, getUser, isLogin } = useAuthContext();

    useEffect(() => {
      if (isLogin && !user) {
        getUser();
      }
    }, []);

  return (
    <div className="max-w-6xl mx-auto">{user?.name}</div>
  );
}

export default Home;
