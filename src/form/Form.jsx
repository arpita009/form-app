import {useState} from "react";
import {validateEmail, validatePassword} from "../helper/validation";
import './Form.css';

export default function Form(){
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const[formError, setFormError] = useState({
        email: '',
        password: ''
    });
    const handleInput =(e) => {
        const { name, value } = e.target;
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
            setFormError({...formError, email: 'not a valid email!'});
        }else if (!validatePassword(formData.password)) {
            setFormError({...formError, password: 'not a valid password!'});
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Form app</h1>
            <div className='email-container'>
                <label htmlFor='email' className='ml-2'>email</label>
                <input type='text'
                       placeholder='email'
                       id='email'
                       name='email'
                       className='ml-2'
                       onChange={handleInput}
                       onBlur={handleValidation}
                />
                <p className='form-err pl-4 h-2'>{formError.email}</p>
            </div>
            <div className='password-container'>
                <label htmlFor='password'>password</label>
                <input type='password'
                       placeholder='password'
                       id='password'
                       name='password'
                       className='ml-2'
                       onChange={handleInput}
                       onBlur={handleValidation}
                />
                <p className='form-err pl-6 h-2'>{formError.password}</p>
            </div>
            <input type='submit' value='Submit'/>
        </form>
    )
};