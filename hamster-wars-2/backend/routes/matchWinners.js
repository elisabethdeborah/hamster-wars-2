

const express = require('express')
const router = express.Router()
const { connect } = require('../database.js') 
const db = connect()

const MATCHES = 'matches'
const HAMSTERS = 'hamsters'

//GET /matchWinners/:id
// Array med matchobjekt för alla matcher, som hamstern med id har vunnit. 
//Statuskod 404 om id inte matchar en hamster som vunnit någon match. 



router.get('/:id', async(req, res) => { 
    let hasWonMatches = await getWinnersMatches(req.params.id)
    if (hasWonMatches) {
        res.status(200).send(hasWonMatches) 
    } else {
        res.sendStatus(404)
    }
})


const getWinnersMatches = async(id) => {

    let allMatchesArray = []
    //all matches
    const matchesRef = db.collection(MATCHES)
    const hamserRef = db.collection(HAMSTERS).doc(id)
    const matchesSnapshot = await matchesRef.get()
	if( matchesSnapshot.empty ) {
		return false
	}
    const hamsterSnapshot = await hamserRef.get()
	if( hamsterSnapshot.empty ) {
		return false
	}
    
    //find matches from spec hamster
    await matchesSnapshot.forEach(async docRef => {
		const data = await docRef.data()
        if (data.winnerId === hamsterSnapshot.id) {
             allMatchesArray.push(data)
        }
	})
    if ( allMatchesArray.length > 0 ) {
        return allMatchesArray
    } else {
        return false
    }
}


module.exports = router