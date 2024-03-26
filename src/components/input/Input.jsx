import {useState} from "react";

const Input = ({type, name, id, inputRef, handleInput,handleValidation}) => {
    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        const { value } = e.target;
        setText(value);
        handleInput(name, value);
    }
    return(
        <>
            <input
                type={type}
                name={name}
                id={id}
                ref={inputRef}
                value={text}
                onChange={handleTextChange}
                onBlur={handleValidation}
                className='ml-2'
                placeholder={id}
            />
        </>
    )
}

export default Input;