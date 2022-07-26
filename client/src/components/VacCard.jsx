import { Button } from '@material-ui/core'
import React from 'react'


export default function VacCard({ setUpdate, vac, setCurrentVacId }) {
    const handleClick = async (e) => {
        let type = "down"
        if (e.target.checked == true) {
            type = "up"
        }
        const res = await fetch(`http://localhost:1000/vacations/follow`, {
            method: "put",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ vac_id: vac.id, user_id: localStorage.id, type: type }),
            credentials: 'include'

        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        } else {
            setUpdate(upd => !upd)
            if (type === "up") {

                setCurrentVacId(vac.id)
            }
        }
        console.log(data)
    }


    const removeClick = async (e) => {
        const res = await fetch(`http://localhost:1000/vacations/delete`, {
            method: "delete",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ vac_id: vac.id }),
            credentials: 'include'

        })
        if (res.status == 400) {
            alert('oops')

        } else if (res.status == 500) {
            alert('something wrong')
        } else {
            setUpdate(changed => !changed)
            alert('vacation deleted')
        }
    }


    return (

        <div className='vac'>

            {
                localStorage.role === '1' ?
                    <>
                        <Button variant='contained' color='secondary' size='small' onClick={(e) => removeClick(e)}>X</Button>
                        <h1> {vac.dest}</h1>
                        <p>{vac.descrip}</p>
                        <div className="date">
                            <p className='start'>{vac.start_date}</p>
                            <p className='end'>{vac.end_date}</p>

                        </div>
                        <h2>{vac.price}$</h2>
                        <label class="switch">
                            <input type="checkbox" onClick={(e) => handleClick(e)} />
                            <span class="slider round"></span>
                        </label>
                        <h3>followers: {vac.follow}</h3>
                        <img src={vac.img} alt="pic" />
                    </>
                    :
                    <>
                        
                        <h1> {vac.dest}</h1>
                        <p>{vac.descrip}</p>
                        <div className="date">
                            <p className='start'>{vac.start_date}</p>
                            <p className='end'>{vac.end_date}</p>

                        </div>
                        <h2>{vac.price}$</h2>
                        <label class="switch">
                            <input type="checkbox" onClick={(e) => handleClick(e)} />
                            <span class="slider round"></span>
                        </label>
                        <h3>followers: {vac.follow}</h3>
                        <img src={vac.img} alt="pic" />
                    </>

            }

            
        </div>


    )
}
