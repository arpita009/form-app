import {useState, useRef} from "react";
import {validateEmail, validatePassword} from "../helper/validation";
import './Form.css';
import Input from "../components/input/Input.jsx";

export default function Form(){
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const[formError, setFormError] = useState({
        email: '',
        password: ''
    });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleInput =(name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
        clearFormErrors(value, name);
    }

    const clearFormErrors = (value, name) => {
        if (value.trim() !== '' && formError[name]) {
            setFormError({
                ...formError,
                [name]: ''
            });
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email && !formData.password) {
            setFormError({ email: 'email is empty!',
                password: 'password is empty!'
            });
        }
        console.log('Submit', formData);
    }

    const handleValidation = () => {
        if (!validateEmail(formData.email)) {
            emailRef.current.focus();
            setFormError({...formError, email: 'not a valid email!'});
        }
        if (formData.password && !validatePassword(formData.password)) {
            passwordRef.current.focus();
            setFormError({...formError, password: 'not a valid password!'});
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Form app</h1>
            <div className='email-container'>
                <label htmlFor='email' className='ml-2'>email</label>
                <Input
                    type='email'
                    name='email'
                    id='email'
                    inputRef={emailRef}
                    handleInput={handleInput}
                    handleValidation={handleValidation}
                    className='ml-2'
                />
                <p className='form-err pl-4 h-2'>{formError.email}</p>
            </div>
            <div className='password-container'>
                <label htmlFor='password'>password</label>
                <Input
                    type='password'
                    name='password'
                    id='password'
                    inputRef={passwordRef}
                    handleInput={handleInput}
                    handleValidation={handleValidation}
                    className='ml-2'
                />
                <p className='form-err pl-6 h-2'>{formError.password}</p>
            </div>
            <input type='submit' value='Submit'/>
        </form>
    )
};