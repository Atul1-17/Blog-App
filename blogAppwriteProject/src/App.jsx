import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import {login, logout} from './store/authSlice'
import authService from './appwrite/auth';

function App() {
  const [loding, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=> {
    authService.getCurrentUser()
    .then((userData)=> {
      if (userData) {
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])

 return !loding ? (
  <div className='bg-gray-500'>Hello World</div>
 ) : null
}

export default App
