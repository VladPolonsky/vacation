import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Textfield from '@material-ui/core/TextField'
import 'fontsource-roboto'

export default function Login() {
  
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  

  const navigate = useNavigate()
  const handleClick = async () => {
    const res = await fetch('http://localhost:1000/users/login', {
      method: "post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'

    })
    const data = await res.json()
    if (data.err) {
      alert(data.err)
    } else {
      localStorage.username = data.user.username
      localStorage.role = data.user.role
      localStorage.id = data.user.id
      navigate('/vacations')
    }
    console.log(data)
  }
  return (
    <div className="login">
      <h1 >Login</h1>
      <br />
      username <Textfield size='small' variant='outlined' type="text" onChange={e => setUserName(e.target.value)} />
      <br />
      <br />
      password <Textfield size='small' variant='outlined' type="password" onChange={e => setPassword(e.target.value)} />
      <br />
      <div className="loginbtn">
      <br />
      <Button  variant='contained' color='primary' size='small' onClick={handleClick}>Login</Button>
      <br/>
      <br />
      <span> Don't have an account yet? <Link to="/register">Register now</Link> </span>

      </div>
    </div>
  )

}
