import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import React, { useState } from 'react';
import { OR } from '../image';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from '../firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc } from 'firebase/firestore'
import Loader from './loader';


function SignIn(props) {

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [loader, setloader] = useState(false)



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


  function inpOut() {
    setEmail('')
    setUsername('')
    setPassword('')
    setRepeatPassword('')
  }


  function SignInBtn() {
    if (password === repeatPassword && (password.length >= 7)) {
      createUserWithEmailAndPassword(auth, email, password).then((res) => {
        setloader(true)
        const ref = collection(db, 'users')

        addDoc(ref, {
          username,
          email,
          password,
          uid: res.user.uid
        })
          .then((res) => {
            inpOut()
            navigate('/dashboard')
            setloader(true)
          })
          .catch((err) => {
            setloader(false)
          })

        localStorage.setItem('uid', res.user.uid)
        localStorage.setItem('username', username)
      }).catch((err) => {
        toast.error(err.message);
        setloader(false)
        inpOut()
      })
    }
    else {
      toast.error('password and duplicate password are not the same')
    }
  }


  return (<>
    {loader ? <Loader /> : <div className={`w-full h-full ${loader ? 'hidden' : ''} flex items-center justify-center gap-5`}>
      <div className="tablet:w-[500px] minMobil:w-[500px] h-[680px] border rounded-xl py-[40px] px-[30px] bg-background shadow-sm">
        <div className=" w-full h-full box bg-background flex flex-col justify-between gap-3 font-mulish pb-3 ">
          <h1 className="text-blackText font-bold text-center leading-10 text-[40px] cursor-pointer">Sign up</h1>
          <div className='flex flex-col gap-5 '>
            <button onClick={AuthWithGoogle} className="w-full h-[45px] border flex items-center justify-center gap-4 hover:bg-red-600 hover:text-white"><FcGoogle size={20} />Continue with Google</button>
            <button onClick={()=>(toast.error('not yet in business'))} className="w-full h-[45px] border flex items-center justify-center gap-4 hover:bg-blue hover:text-white"><FaFacebook color='blue' size={20} />Continue with Facebook</button>
            <img src={OR} className='mt-3' />
          </div>
          <div>
            <label>
              <p className='text-[14px] leading-8 '>Username</p>
              <input  value={username} onChange={(e) => (setUsername(e.target.value))} type="text" className='inp1 py-3 px-5 placeholder:opacity-60' placeholder='Enter your username' />
            </label>
            <label>
              <p className=' text-[14px] leading-8 '>Email</p>
              <input  value={email} onChange={(e) => (setEmail(e.target.value))} type="text" minLength={10} className='inp1 py-3 px-5 placeholder:opacity-60' placeholder='Enter your email' />
            </label>

            <label title='password must be at least 7 characters long'>
              <p className='text-[14px] leading-8 '>Password</p>
              <input minLength={6} value={password} onChange={(e) => (setPassword(e.target.value))} type="password" className='inp1 py-3 px-5 placeholder:opacity-60' placeholder='Enter your password' />
            </label>
            <label>
              <p className='text-[14px] leading-8 '>Repeat password</p>
              <input minLength={6} value={repeatPassword} onChange={(e) => (setRepeatPassword(e.target.value))} type="password" className='inp1 py-3 px-5 placeholder:opacity-60' placeholder='Enter your password' />
            </label>
          </div>
          <div className='flex items-center justify-center flex-col gap-4 mt-3 '>
            <button onClick={() => SignInBtn()} className='w-full h-[45px] bg-btn rounded-sm text-white text-[17px]'>Button</button>
            <p className='text-blackText leading-3 text-[14px]'>Already signed up? <span onClick={() => (navigate('/'))} className='text-btn cursor-pointer'>Go to sign in.</span></p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
    }
  </>

  );
}

export default SignIn;