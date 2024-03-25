import {useState} from "react";
import {validateEmail, validatePassword} from "../helper/validation";
import './Form.css';

export default function Form(){
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleInput =(e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        console.log('emailVal', validateEmail(formData.email));
        console.log('passwordVal', validatePassword(formData.password));
        e.preventDefault();
        console.log('Submit', formData);
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
                />
            </div>
            <div className='password-container'>
                <label htmlFor='password'>password</label>
                <input type='password'
                       placeholder='password'
                       id='password'
                       name='password'
                       className='ml-2'
                       onChange={handleInput}
                />
            </div>
            <input type='submit' value='Submit'
                className='mt-2'
            />
        </form>
    )
};