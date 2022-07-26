import React, { useEffect, useState } from 'react'
import VacCard from './VacCard'

export default function Vacations() {
  const [vacArr, setVacArr] = useState([])
  const [update, setUpdate] = useState(false)
  const [currentVacId, setCurrentVacId] = useState(1)
  
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:1000/vacations')
      const data = await res.json()
      setVacArr(data)

      if (data !== undefined) {

        const removedVac = data.find(vac => vac.id == currentVacId)
        const sortedVacArr = data.filter(vac => vac.id != currentVacId)
        sortedVacArr.unshift(removedVac)
        setVacArr(sortedVacArr)
      }
      


    })()
  }, [update, currentVacId])



  return (
    <div>
      {
        // vacArr ? vacArr.map(vac => <VacCard key={vac.id} setUpdate={setUpdate} vac={vac} setCurrentVacId={setCurrentVacId}  />): <></>
        vacArr.map(vac => {
         if (vac!==undefined) {
          return  <VacCard key={vac.id} setUpdate={setUpdate} vac={vac} setCurrentVacId={setCurrentVacId}/>
         }
         })
      }
    </div>
  )
}
