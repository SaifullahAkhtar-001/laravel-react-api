import { useEffect } from "react"
import useAuthContext from "../context/AuthContext"

function Home() {
  const { user, getUser } = useAuthContext();


  return (
    <div className='max-w-6xl mx-auto'>
      {user && <div>{user?.name}</div>}
    </div>
  )
}

export default Home
