import React from 'react';
import { FaPlus } from 'react-icons/fa'
function SearchBtn({ modalVisible, setModalVisible }) {
    return (
        <div>
            <div className='flex items-center justify-between gap-3'>
                <p className='font-mulish minMobil:text-[22px] tablet:text-[36px] font-bold text-white flex items-center justify-center flex-wrap align-baseline gap-2'>You’ve got <span className='text-btn'>7 book</span></p>
                <div className='flex items-center justify-center gap-5'>
                    <input type="text" placeholder='Enter your name' className='max-w-[350px] minMobil:hidden tablet:block  h-10 py-3 px-4 outline-none border rounded-[6px]' />
                    <button onClick={()=>setModalVisible(true)} className='flex items-center justify-center gap-3 bg-btn py-2 px-2 tablet:w-[170px] text-white rounded-[4px]'><FaPlus className='minMobil:hidden tablet:block'/> Create a book</button>
                </div>
            </div>
            <p className='text-white minMobil:text-[18px] tablet:text-[20px] font-mulish px-1'>Your task today</p>
        </div>
    );
}

export default SearchBtn;