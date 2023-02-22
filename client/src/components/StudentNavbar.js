import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { student } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>ProSys-Student</h1>
                </Link>
                <nav>
                    {student && (
                    <div>
                        <span>{student.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    )}
                    {!student && (
                    <div>
                        <Link to='/student/login'>Login</Link>
                        <Link to='/student/signup'>Signup</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar