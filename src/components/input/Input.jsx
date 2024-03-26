import React,{useState, useRef, useImperativeHandle, useEffect} from "react";
import './Input.css';

const Input = React.forwardRef(({type, name, id, handleInput,handleValidation},ref) => {
    const [text, setText] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
    const [shake, setShake] = useState(false);
    const localRef = useRef(null);

    const handleTextChange = (e) => {
        const { value } = e.target;
        setText(value);
        handleInput(name, value);
    }

    useEffect(() => {
        setIsInputValid(true);
        setShake(false);
    }, [text]);



    useImperativeHandle(
        ref,
        () => {
           return {
               focus: () => localRef.current.focus(),
               toggleValidity: () => setIsInputValid(false),
               shake: () => setShake(true)
           }
        },
        [],
    );

    return(
        <>
            <input
                type={type}
                name={name}
                id={id}
                ref={localRef}
                value={text}
                onChange={handleTextChange}
                onBlur={handleValidation}
                className={`${!isInputValid ? 'red-border' : ''} 
                    ${shake ? 'shake': ''}
                    ml-2`}
                placeholder={id}
            />
        </>
    )
});

export default Input;