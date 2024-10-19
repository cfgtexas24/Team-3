import '../App.css';
import { useState } from 'react';


export default function TextBox() {
    const [info, setInfo] = useState(''); 

    const handleInfo = (event) => {
        setInfo(event.target.value);
    };

    return (
        <input
            className='textbox'
            type='text'
            value={info}
            onChange={handleInfo}
            placeholder='Enter...'
        />
    );
}
