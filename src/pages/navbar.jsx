import React from 'react';
import { ICONSLOGO, LUPA, USER, ZVANOK } from '../image';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';

function Navbar(props) {
    let navigate = useNavigate()

    function LogOut() {
        if (window.confirm("The data will be deleted")) {
            signOut(auth).then((res) => {
                toast.success('SUCCESSFUL LOG OUT');
                (navigate('/'))
                const del = doc(db, 'users', localStorage.getItem('uid'))
                deleteDoc(del)
                localStorage.setItem('username', '')
                localStorage.setItem('uid', '')
            }).catch((err) => {
                toast.error("error logging out")
            })




        } else {
            toast.error('Data Was Not Deleted')
        }

    }


    return (
        <div className="w-full h-[75px]  mx-auto flex items-center justify-between ">
            <div className='flex items-center justify-center gap-7'>
                <div onClick={() => navigate('/')} className='flex items-center justify-center align-baseline cursor-pointer gap-3'>
                    <img src={ICONSLOGO} alt="ICONS" />
                    <p className='minMobil:text-[15px]  tablet:text-[20px] font-mulish font-bold '><span className='text-btn'>Books</span> List</p>
                </div>
                <label className='flex minMobil:hidden tablet:flex items-center justify-center  cursor-pointer bg-whiteText rounded-md'>
                    <img src={LUPA} alt="LUPA" />
                    <input type="text" className="w-[270px] h-[35px] px-3 placeholder:text-[15px] outline-none bg-whiteText focus:bg-white font-mulish font-bold " placeholder='Search for any training you want ' />
                </label>
            </div>
            <div className='flex items-center w-[50%]  justify-end gap-5'>
                <img  className='cursor-pointer minMobil:hidden tablet:block' src={ZVANOK} alt="ZVANOK" />
                <div className='w-12 h-10 rounded-[50%] rounded-user'>
                    <img onClick={() => LogOut()} src={USER} className='user cursor-pointer' alt="" />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Navbar;