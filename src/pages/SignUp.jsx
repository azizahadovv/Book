import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import React, { Component, useEffect } from 'react';
import { OR } from '../image';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './loader';
import { addDoc, collection, getDocs } from 'firebase/firestore';



function SignUp(props) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setloader] = useState(false)
  const UserLocalStoreg = localStorage.getItem('username')
  const UidLocalStoreg = localStorage.getItem('uid')
  const [doc, setDocument] = useState()

  useEffect(() => {
    getDocumentation()
  }, [])

  function DATANONE() {
    setUsername('')
    setEmail('')
    setPassword('')
  }

  function AuthWithGoogle() {
    signInWithPopup(auth, provider).then((res) => {
      localStorage.setItem('uid', res.user.uid)
      const ref = collection(db, 'users')
      addDoc(ref, {
        username: res.user.displayName,
        email: res.user.email,
        password: '',
        uid: res.user.uid
      }).then((res) => {
        navigate('/dashboard')
      })
    })

  }

  function getDocumentation() {
    const userRef = collection(db, 'booksData')
    getDocs(userRef).then((res) => {
      let arr = res.docs.map((res) => {
        return { ...res.data(), id: res.id }
      })
      setDocument(arr)
    }).catch((err) => {
      toast.error("error ")
    });
  }


  function Register() {
    if (username === UserLocalStoreg && UidLocalStoreg !== "") {
      signInWithEmailAndPassword(auth, email, password).then((res) => {
        navigate('/dashboard')
        toast.success("Successfully signed in");
        DATANONE()
      }).catch((err) => {
        toast.error(err.message);
      })
    } else {
      DATANONE()
      toast.error('username or email error');
    }
  }


  return (
    <>
      {
        loader ? <Loader /> : <div className="w-full h-full flex items-center flex-col justify-center">
          <div className="tablet:w-[500px] minMobil:w-[500px] h-[630px] border rounded-xl py-[40px] px-[30px] bg-background shadow-sm">
            <div className=" w-full h-full box bg-background flex flex-col justify-between font-mulish">
              <h1 className="text-blackText font-bold text-center leading-10 text-[40px] cursor-pointer">Sign in</h1>
              <div className='flex flex-col gap-5 '>
                <button onClick={AuthWithGoogle} className="w-full h-[45px] border flex items-center justify-center gap-4 hover:bg-red-600 hover:text-white"><FcGoogle size={20} />Continue with Google</button>
                <button onClick={() => (toast.error('not yet in business'))} className="w-full h-[45px] border flex items-center justify-center gap-4 hover:bg-blue hover:text-white"><FaFacebook color='blue' size={20} />Continue with Facebook</button>
                <img src={OR} className='mt-3' alt="" />
              </div>
              <div>
                <label>
                  <p className='text-[14px] leading-8 '>Your username</p>
                  <input value={username} onChange={(e) => (setUsername(e.target.value))} type="text" className="inp1 py-3 px-5 placeholder:opacity-60" placeholder='Enter your username' />
                </label>
                <label>
                  <p className=' text-[14px] leading-8 '>Your email</p>
                  <input value={email} onChange={(e) => (setEmail(e.target.value))} type="text" minLength={10} className='inp1 py-3 px-5 placeholder:opacity-60' placeholder='Enter your email' />
                </label>
                <label title='Password must be at least 7 characters long'>
                  <p className='text-[14px] leading-8 '>Password</p>
                  <input minLength={6} value={password} onChange={(e) => (setPassword(e.target.value))} type="password" className='inp1 py-3 px-5 placeholder:opacity-60' placeholder='Enter your username' />
                </label>
              </div>
              <div className='flex items-center justify-center flex-col gap-3 mt-2'>
                <button onClick={Register} className='w-full h-[45px] bg-btn rounded-sm text-white text-[17px]'>Button</button>
                <p className='text-blackText leading-3 text-[14px]'>Already signed up? <span onClick={() => navigate('/sign-up')} className='text-btn cursor-pointer'>Go to sign up.</span></p>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      }
    </>
  );
}

export default SignUp;