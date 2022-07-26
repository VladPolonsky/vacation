import React, { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Textfield from '@material-ui/core/TextField'
import 'fontsource-roboto'
export default function Register() {

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [lname, setLname] = useState("")

  const navigate = useNavigate()
  const handleClick = async () => {
    const res = await fetch('http://localhost:1000/users/register', {
      method: "post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, lname, username, password }),
      credentials: 'include'

    })
    const data = await res.json()
    if (data.err) {
      alert(data.err)
    } else {
      navigate('/login')
    }
    console.log(data)
  }
  return (
    <div className="register">
      <h1>Register</h1>
      <br />
      first name  <Textfield size='small' variant='outlined' type="text" onChange={e => setName(e.target.value)} />
      <br />
      <br />
      last name <Textfield size='small' variant='outlined' type="text" onChange={e => setLname(e.target.value)} />
      <br />
      <br />
      username <Textfield size='small' variant='outlined' type="text" onChange={e => setUserName(e.target.value)} />
      <br />
      <br />
      password <Textfield size='small' variant='outlined' type="password" onChange={e => setPassword(e.target.value)} />
      <br />
      <br />
      <Button variant='contained' color='primary'   size='small' onClick={handleClick}>Register</Button>
      <br/>
      <span>Already have an account? <Link to="/login">login now</Link> </span>
    </div>
  )
}
