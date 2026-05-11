import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from 'react-router'
import { useState } from "react";

import { api } from '../../api/api'

function LoginPage({setUserInfo}) {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        mode: 'onChange'
    })
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const {setIsAuth} = useOutletContext();

    async function onSuccess(data) {
        try {
            const response = await api.post('/auth/login', data);
            const token = response.data.token;
            const user = response.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUserInfo(user);
            setIsAuth(true);
            navigate('/');
            console.log(response.data);
        } catch (error) {
            console.log(error.response)
            setServerError(error.response.data.error)
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit(onSuccess)}>
                <h1 className="auth-title">Log in</h1>
                
                <input className="auth-input" type="text" placeholder="Email" {...register('email', {
                    required: {value: true, message: 'Email is required'},
                    pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please check that your email is entered correctly.'}
                })} />
                {errors.email && <small>{errors.email.message}</small>}

                <input className="auth-input" type="password" placeholder="Password" {...register('password', {
                        required: {value: true, message: 'Password is required'},
                        pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: "Password must be 6+ characters and include one number."}
                })} />
                {errors.password && <small>{errors.password.message}</small>}

                <p>{serverError}</p>
                <button className={`auth-btn primary ${!isValid ? 'disabled' : ''}`} disabled={!isValid}>Log in</button>
            </form>
        </div>
    )
}

export default LoginPage;