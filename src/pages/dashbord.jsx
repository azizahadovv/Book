import React, { useEffect, useState } from 'react';
import Navbar from "./navbar";
import SearchBtn from "./searchBtn";
import { ToastContainer, toast } from 'react-toastify';
import Rodal from "rodal";
import 'rodal/lib/rodal.css';
import { FaPen } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Loader from './loader';


function Dashboard(props) {
    const [loader, setloader] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [title, setTitle] = useState();
    const [Author, setAuthor] = useState();
    const [Cover, setCover] = useState();
    const [Published, setPublished] = useState();
    const [Pages, setPages] = useState();
    const [database, setDatabase] = useState([])
    const [newRegisterId, setNewRegisterId] = useState('')
    useEffect(() => {
        getDocumentation()

    }, [])

    function DATANONE() {
        setAuthor('')
        setCover('')
        setPublished('')
        setTitle('')
        setPages('')
    }
    //  get document

    function getDocumentation() {
        setloader(true)
        const userRef = collection(db, 'booksData')
        getDocs(userRef).then((res) => {
            let arr = res.docs.map((res) => {
                return { ...res.data(), id: res.id }
            })
            setDatabase(arr)
            setloader(false)
        }).catch((err) => {
            toast.error("error ")
        });
    }

    //  add documents  

    function onSubmitBtn() {
        setloader(true);
        setModalVisible(false)
        const userRef = collection(db, 'booksData');
        if (title !== '' && Author !== '' && Cover !== '' && Published !== '' && Pages !== '') {
            if (newRegisterId === '') {
                addDoc(userRef, {
                    title: title,
                    Author: Author,
                    Cover: Cover,
                    Published: Published,
                    Pages: Pages
                }).then(() => {
                    setloader(false)
                    toast.success("Book added successfully")
                    DATANONE()
                    getDocumentation()
                }).catch(err => {
                    toast.error('Error adding document: ', err);
                });
            } else {
                // edit part 2
                const update = doc(db, 'booksData', newRegisterId)
                updateDoc(update, {
                    title,
                    Author,
                    Cover,
                    Published,
                    Pages
                }).then((res) => {
                    DATANONE()
                    setloader(false)
                    getDocumentation()
                    setNewRegisterId('')
                })
            }
        } else {
            toast.error('Error')
            setModalVisible(false)
        }
    }
    //  delete items
    function deleteItem(id) {
        setloader(true)
        const delConfig = doc(db, 'booksData', id)
        deleteDoc(delConfig).then((res) => {
            toast.success('SUCCESSFULL')
            getDocumentation()
            setloader(false)
        }).catch((err) => { toast.error(err) })
    }
    //  edit item part 1
    function editItem(item) {
        setNewRegisterId(item.id)
        setTitle(item.title)
        setAuthor(item.Author)
        setCover(item.Cover)
        setPages(item.Pages)
        setPublished(item.Published)
        setModalVisible(true)
    }

    function onClose() {
        setModalVisible(false);
        DATANONE()
    }


    return (

        <div className="minMobil:w-full mobil:max-w-[1280px] py-3 px-7 h-full   mx-auto">
            <Navbar />
            <SearchBtn modalVisible={modalVisible} setModalVisible={setModalVisible} />
            {
                loader ? <Loader /> : <div className="mt-7 w-full max-h-max flex items-start gap-6 flex-wrap minMobil:justify-center laptop:justify-start">
                    {
                        database.map((item) => {
                            return <div key={item.id} className="w-[370px] h-[200px]  relative br-card flex flex-col  justify-between align-baseline cursor-pointer">
                                <p className="text-blackText font-bold text-[17px]">{item.title}</p>
                                <p className="tetx-[14px] font-mulish font-normal leading-[150%]">{item.Cover}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-whiteText tetx-[14px] font-mulish">{item.Author}: <span>{item.Published}-year</span></p>
                                    <p className="flex items-center gap-2 rounded-[8.5px] bg-[#EFE6FD] text-[13px] text-[#9654F4] font-mulish py-1 px-[7px]">{item.Pages} pages</p>
                                </div>
                                <div className='absolute top-2 right-[-15px] flex flex-col gap-1'>
                                    <button onClick={() => editItem(item)} className='btn btn-danger btn-1 bg-[#6200EE]'><FaPen color='fff' /></button>
                                    <button onClick={() => (deleteItem(item.id))} className='btn btn-warning btn-1 bg-[#FF4D4F]'><FaRegTrashCan color='fff' /></button>
                                </div>
                            </div>
                        })
                    }
                </div>
            }




            <Rodal className='Rodal' width={450} height={530} onClose={() => setModalVisible(false)} visible={modalVisible}>
                <p className='font-mulish font-bold text-[20px]'>Create a book</p>
                <div className='flex  justify-between flex-col w-full gap-4'>
                    <label className='TITleStyle'>
                        <p className='TITle'>Title</p>
                        <input value={title} onChange={(e) => (setTitle(e.target.value))} className='inpStyle' type="text" placeholder='Enter your title' />
                    </label>
                    <label className='TITleStyle'>
                        <p className='TITle'>Author</p>
                        <input value={Author} onChange={(e) => (setAuthor(e.target.value))} className='inpStyle' type="text" placeholder='Enter your author' />
                    </label>
                    <label className='TITleStyle'>
                        <p className='TITle'>Cover</p>
                        <input value={Cover} onChange={(e) => (setCover(e.target.value))} className='inpStyle' type="text" placeholder='Enter your cover' />
                    </label>
                    <label className='TITleStyle'>
                        <p className='TITle'>Published</p>
                        <input value={Published} onChange={(e) => (setPublished(e.target.value))} className='inpStyle' type="number" placeholder='Enter your published' />
                    </label>
                    <label className='TITleStyle'>
                        <p className='TITle'>Pages</p>
                        <input value={Pages} onChange={(e) => (setPages(e.target.value))} className='inpStyle' type="number" placeholder='Pages Enter your pages' />

                        <div className='form-btn mt-3'>
                            <button type='button' onClick={() => (onClose())}>Close</button>
                            <button type='button' onClick={() => (onSubmitBtn())}>Submit</button>
                        </div>
                    </label>
                </div>

            </Rodal>


            <ToastContainer />
        </div>
    );
}

export default Dashboard;