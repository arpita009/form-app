import React,{useState} from "react";

const Input = React.forwardRef(({type, name, id, handleInput,handleValidation},ref) => {
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
                ref={ref}
                value={text}
                onChange={handleTextChange}
                onBlur={handleValidation}
                className='ml-2'
                placeholder={id}
            />
        </>
    )
});

export default Input;