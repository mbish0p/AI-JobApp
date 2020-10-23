import React, { useState } from 'react'

const Login = () => {

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repetedPassword, setRepetedPassword] = useState('')
    const [repetedPasswordError, setRepetedPasswordError] = useState('')
    const [generalError, setgGeneralError] = useState('')

    const handleErrors = () => {
        if (password !== repetedPassword) {
            setPasswordError('Password and repet password need to be the same')
            setRepetedPasswordError('Password and repet password need to be the same')
        }
        else {
            setPasswordError('')
            setRepetedPasswordError('')
        }
        if (!name) {
            setNameError('Name need to be provided')
        }
        else {
            setNameError('')
        }
        if (!email) {
            setEmailError('Email need to be provided')
        }
        else {
            setEmailError('')
        }
        if (!password) {
            setPasswordError('Password need to be provided')
        }
        else {
            setPasswordError('')
        }
        if (!repetedPassword) {
            setRepetedPasswordError('Repeat password need to be provided')
        }
        else {
            setRepetedPasswordError('')
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        handleErrors()

        console.log(name, surname, email, password)
    }

    return (
        <div>
            <form>
                <p>Login</p>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                {nameError ? <p>{nameError}</p> : undefined}
                <input placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError ? <p>{emailError}</p> : undefined}
                <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                {passwordError ? <p>{passwordError}</p> : undefined}
                <input placeholder="Repeat password" value={repetedPassword} onChange={(e) => setRepetedPassword(e.target.value)} type="password" />
                {repetedPasswordError ? <p>{repetedPasswordError}</p> : undefined}
            </form>
            {generalError ? <p>{generalError}</p> : undefined}

            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login