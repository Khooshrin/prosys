import { useState } from "react"
import { useProfLogin } from "../hooks/useProfLogin"

// email, password, name, dept, chamber, researchInterest, websites, hod

const ProfLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useProfLogin()

    const handleSubmit = async (e) => {
        e.preventDefault() // prevents default refresh of page

        await login(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Faculty Login</h3>
            <label>Email</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default ProfLogin