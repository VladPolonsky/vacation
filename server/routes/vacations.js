const SQL = require('../dbconfig')

const router = require('express').Router()

router.get('/',async (req, res) => {
    try {
        const vacations = await SQL('SELECT * FROM vacations ORDER BY follow DESC')
        console.table(vacations)
        res.send(vacations)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

})
router.get('/reports', async (req, res) => {
    try {
        const reports = await SQL('SELECT FROM vacations WHERE dest AND follow')
        
        res.send(reports)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

})
router.put('/follow', async (req, res) => {
    const { user_id, vac_id, type } = req.body

    const option = ["up", "down"]
    if (!user_id || !vac_id || !type || !option.includes(type)) {
        console.log(`user_id${user_id},vac_id${vac_id},type${type}`)
        return res.status(400).send({ err: `missing  info user_id${user_id},vac_id${vac_id},type${type}` })
    }
    try {
        const follow = await SQL(`SELECT 1 FROM users_vacations WHERE users_id = ${user_id} AND vacations_id = ${vac_id}`)
        if (follow[0] && type == "up") {
            return res.status(400).send({ msg: "already follows" })
        }
        if (!follow[0] && type == "down") {
            return res.status(400).send({ msg: "already doesn't follow" })
        }
        if (type == "up") {
            await SQL(`INSERT INTO users_vacations (users_id,vacations_id) VALUES ('${user_id}' , '${vac_id}') `)
            await SQL(`UPDATE vacations SET follow = follow + 1 WHERE id = ${vac_id}`)
            res.status(200).send({ msg: "thank you for following" })

        } else {
            await SQL(`DELETE FROM users_vacations  WHERE users_id = ${user_id} AND vacations_id = ${vac_id} `)
            await SQL(`UPDATE vacations SET follow = follow -1 WHERE id = ${vac_id}`)
            res.status(200).send({ msg: "yakes! unfollowing..." })

        }
    } catch (err) {
        res.status(500).send({ msg: "inside catch" })
    }

})

router.post('/add', async (req, res) => {
    const { descrip, dest, img, start_date, end_date, price, follow } = req.body
    if (!descrip || !dest || !img || !start_date || !end_date || !price || !follow) {
        return res.status(400).send({ err: "missing some info" + JSON.stringify(req.body) })
    }
    try {
        await SQL(`INSERT INTO vacations (descrip,dest,img,start_date,end_date,price,follow) VALUES ('${descrip}','${dest}','${img}','${start_date}','${end_date}','${price}','${follow}')`)
        res.send({ msg: "vacation added" })
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }


})
router.delete('/delete',  async (req, res) => {
    const vac_id  = req.body.vac_id
    if (!vac_id) {
        return res.status(400).send({ err: "missing some info" })
    }
    try {
        await SQL(`DELETE FROM vacations  WHERE id = ${vac_id}`)
        res.send({ msg: "vacation deleted" })
    } catch (err) {console.log(JSON.stringify(vac_id))
        console.log(err);
        res.sendStatus(500)
    }


})


module.exports = router