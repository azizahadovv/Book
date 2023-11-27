import React from 'react';
import { NOTFOUND } from '../image';

function PageNoteFound(props) {
    return (
        <div className=' w-full h-full flex items-center justify-center '>
           <img src={NOTFOUND} alt="" />
        </div>
    );
}

export default PageNoteFound;