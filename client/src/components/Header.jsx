import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'fontsource-roboto'

export default function Header() {
    const navigate = useNavigate()

    const logout = async () => {
        const res = await fetch('http://localhost:1000/users/logout', {
            method: "delete",
            credentials: 'include'

        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        } else {
            localStorage.removeItem('username')
            localStorage.removeItem('role')
            localStorage.removeItem('id')
            navigate('/login')
        }
        console.log(data)
    }
    return (
        <div className='header'>
          
            <Link to="/vacations" className='brand'>
                <h1 id='logo'>VIP Vacations</h1>
            </Link>
            
                {
                    !localStorage.username ?
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                        :
                        <>
                        <p>Hello, {localStorage.username}</p>
                            <button id="logoutbtn" onClick={logout}>Logout</button>
                        </>
                }
                {
                    localStorage.role === '1' ?
                    <>
                            <Link to="/add" color='inherit' >Add Vacation</Link>
                        </>
                        :
                        <>

                        
                        </>

                }
            
            
            
        </div>
    )
}
