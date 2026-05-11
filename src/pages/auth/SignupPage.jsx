import { useForm } from 'react-hook-form'
import { useNavigate, useOutletContext } from 'react-router'

import { api } from '../../api/api'

import './SignupPage.css'
import { useState } from 'react'

function SignupPage({setUserInfo}) {
    const {register, handleSubmit, formState: {errors, isValid}, watch} = useForm({
        mode: 'onChange'
    })
    const [serverError, setServerError] = useState('')
    const navigate = useNavigate();
    const {setIsAuth} = useOutletContext();


    async function onSubmit(data) {
        const updatedData = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password,
            phone_number: data.phone
        }

        try {
            const response = await api.post('/auth/signup', updatedData)
            const token = response.data.token;
            const user = response.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUserInfo(user);
            setIsAuth(true);
            navigate('/');
            console.log(response);

        } catch (error) {
         console.error(error.response)
         setServerError(error.response.data.error)
        }

    }

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="auth-title">Sign up</h1>

                <div className="auth-row">
                    <input className="auth-input" type="text" placeholder="First name" {...register('firstName', {
                        required: {value: true, message: 'First name is required'},

                    })} />
                    {errors.firstName && <small>{errors.firstName.message}</small>}

                    <input className="auth-input" type="text" placeholder="Last name" {...register('lastName')} />
                </div>

                <input className="auth-input" type="text" placeholder="Email" {...register('email', {
                    required: {value: true, message: 'Email is required'},
                    pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please check that your email is entered correctly.'}
                })} />
                {errors.email && <small>{errors.email.message}</small>}

                <input className="auth-input" type="tel" placeholder="Phone number" {...register('phone', {
                        required: {value: true, message: 'Phone is required'},
                        pattern: {value: /^\+?[1-9]\d{6,14}$/, message: 'Please check that your phone is entered correctly.'}
                })} />
                {errors.phone && <small>{errors.phone.message}</small>}

                <input className="auth-input" type="password" placeholder="Password" {...register('password', {
                        required: {value: true, message: 'Password is required'},
                        pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: "Password must be 6+ characters and include at least one letter, one number."}
                })} />
                {errors.password && <small>{errors.password.message}</small>}


                <input className="auth-input" type="password" placeholder="Confirm password" {...register('confirmPassword', {
                        required: {value: true, message: 'Password confirmation is required'},
                        validate: (value) => value === watch('password') || "The passwords don't match"
                })} />
                {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}

                <p>{serverError}</p>
                <button className={`auth-btn primary ${!isValid ? 'disabled' : ''}`} disabled={!isValid}>Create account</button>
            </form>
        </div>
    )
}

export default SignupPage;