
const express = require('express')
const router = express.Router()
const { connect } = require('../database.js') 
const db = connect()

const HAMSTERS = 'hamsters'

//GET /winners -> top 5 winners

router.get('/', async(req, res) => { 
    let array = await getTopWinners()
    res.send(array)
})


const getTopWinners = async() => {
	const hamstersRef = db.collection(HAMSTERS)
	const hamstersSnapshot = await hamstersRef.get()
	if( hamstersSnapshot.empty ) {
		return false
	}

	const array = []
	await hamstersSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})

	array.sort((a, b) => b.wins - a.wins)
    return array.slice(0, 5);
}


module.exports = router