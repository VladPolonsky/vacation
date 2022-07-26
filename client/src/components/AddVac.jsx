import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function AddVac() {

  const [descrip, setDescrip] = useState("")
  const [dest, setDest] = useState("")
  const [img, setImg] = useState("")
  const [start_date, setStartDate] = useState("")
  const [end_date, setEndDate] = useState("")
  const [price, setPrice] = useState("")
  const [follow, setFollow] = useState("")

  const navigate = useNavigate()
  const handleClick = async () => {
    const res = await fetch('http://localhost:1000/vacations/add', {
      method: "post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ descrip, dest, img, start_date, end_date, price, follow }),
      credentials: 'include'
    })
    const data = await res.json()
    if (data.err) {
      alert(data.err)
    } else {
      navigate('/vacations')
    }
  }

  return (
    <div className="AddVac">
      <h1>Please add a vacation</h1>
      <br />
      <strong> Destination </strong>  <TextField size='small' placeholder =' E.g Ukraine' variant='outlined' type="text" onChange={e => setDest(e.target.value)} />
      <br />
      <br />
      <strong>Description</strong>  <TextField size='small' placeholder='something about the country' variant='outlined' type="text" onChange={e => setDescrip(e.target.value)} />
      <br />
      <br />
      <strong>Picture</strong>  <TextField  size='small'placeholder='link of the picture' variant='outlined' type="text" onChange={e => setImg(e.target.value)} />
      <br />
      <br />
      <strong>Start Date</strong>  <TextField size='small' placeholder='E.g 11/12/21' variant='outlined' type="text" onChange={e => setStartDate(e.target.value)} />
      <br />
      <br />
      <strong> End Date </strong>  <TextField size='small' placeholder='E.g 11/12/21' variant='outlined' type="text" onChange={e => setEndDate(e.target.value)} />
      <br />
      <br />
      <strong> Price </strong>  <TextField size='small' placeholder='400(just a number)' variant='outlined' type="text" onChange={e => setPrice(e.target.value)} />
      <br />
      <br />
      <strong> Followers</strong>  <TextField size='small' placeholder='12' variant='outlined' type="text" onChange={e => setFollow(e.target.value)} />
      <br />
      <br />
      <Button variant='contained' color='primary' size='small' onClick={handleClick}>Add Vacation</Button>

    </div>
  )
}
