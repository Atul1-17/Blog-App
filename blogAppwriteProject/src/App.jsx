import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import {login, logout} from './store/authSlice'
import authService from './appwrite/auth';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [loading, setLoading] = useState(true);
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

 return !loading ? (
  <div className='bg-gray-500 h-screen w-full flex flex-wrap justify-center'>
    <div className=''>
      <Header/>
      <main>
        
      </main>
      <Footer />
    </div>
  </div>
 ) : null
}

export default App