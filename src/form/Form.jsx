import {useContext, useRef} from "react";
import {validateEmail, validatePassword} from "../helper/validation";
import './Form.css';
import Input from "../components/input/Input.jsx";
import FormContext from "../providers/FormContext.jsx";

export default function Form(){
    const { formData, setFormData, formError, setFormError} = useContext(FormContext);

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
        if (!formData.email) {
            setFormError(prevState => ({
                ...prevState,
                email: 'email is empty!'
            }));
        }

        if (!formData.password) {
            setFormError(prevState => ({
                ...prevState,
                password: 'password is empty!'
            }));
        }

        else {
            handleValidation();
            if (formError.email) {
                emailRef.current.focus();
            } else if (formError.password) {
                passwordRef.current.focus();
            }
        }
        console.log('Submit', formData);
    }

    const handleValidation = () => {
        if (!validateEmail(formData.email)) {
            emailRef.current.toggleValidity();
            emailRef.current.shake();
            setFormError({...formError, email: 'not a valid email!'});
        }
        if (formData.password && !validatePassword(formData.password)) {
            passwordRef.current.toggleValidity();
            passwordRef.current.shake();
            setFormError({...formError, password: 'not a valid password!'});
        }
    }

    return(
        <form onSubmit={handleSubmit} noValidate>
            <h1>Form app</h1>
            <div className='email-container'>
                <label htmlFor='email' className='ml-2'>email</label>
                <Input
                    type='email'
                    name='email'
                    id='email'
                    ref={emailRef}
                    handleInput={handleInput}
                    handleValidation={handleValidation}
                    className='ml-2'
                />
                <p className='form-err pl-4 h-2 ml-1'>{formError.email}</p>
            </div>
            <div className='password-container'>
                <label htmlFor='password'>password</label>
                <Input
                    type='password'
                    name='password'
                    id='password'
                    ref={passwordRef}
                    handleInput={handleInput}
                    handleValidation={handleValidation}
                    className='ml-2'
                />
                <p className='form-err pl-6 h-2 ml-1'>{formError.password}</p>
            </div>
            <input type='submit' value='Submit'/>
        </form>
    )
};