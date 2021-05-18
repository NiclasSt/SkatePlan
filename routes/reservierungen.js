const { json } = require('express')
const express = require('express')
const router = express.Router()
const Reservierung = require('../models/reservierung')

//GET, alle Reservierungen
router.get('/' , async (req,res) => {
    let searchOptions = {}
    if(req.query.slot !=null && req.query.slot !== '') {
        searchOptions.slot = req.query.slot
    }
    try {
        const reservierungen = await Reservierung.find(searchOptions)
        res.render('reservierungen/index', {
            reservierungen: reservierungen ,
             searchOptions: req.query
        })
    } catch (err) { 
        res.redirect('/')

    }
    
})

//Neue Reservierung FORM
router.get('/new', (req,res) => {
    res.render('reservierungen/new', {reservierung: new Reservierung() })
})

//CREATE, eine Reservierung
router.post('/' , async (req,res) => {
    const reservierung = new Reservierung({
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        slot: req.body.slot,  
    })
    
    try {
        const newReservierung = await reservierung.save()
        res.redirect('reservierungen')
    } catch {
        res.render('reservierungen/new', {
            reservierung: reservierung,
            errorMessage: 'Fehler bei erstellung der Reservierung '
        })

    }
    
})

/*
//GET, eine Rerservierung
router.get('/:id' , getReservierung, (req,res) => {
    res.send(res.reservierung)
        
})

//UPTADE, eine Reservierung
router.patch('/:id' , getReservierung, async (req,res)  => {
    if(req.body.name != null) {
        res.reservierung.name = req.body.name
    }
    if(req.body.email != null) {
        res.reservierung.email = req.body.email
    }
    if(req.body.tel != null) {
        res.reservierung.tel = req.body.tel
    }
    if(req.body.slot != null) {
        res.reservierung.slot = req.body.slot
    }
    try {
        const updatedReservierung = await res.reservierung.save()
        res.json(updatedReservierung)
    } catch (err) {
        res.status(400).json({message: err.mesage})
    }
    
})
//DELETE, eine Reservierung
router.delete('/:id' , getReservierung, async (req,res) => {
    try{
        await res.reservierung.remove()
        res.json({ mesage: 'Reservierung entfernt'})
    } catch (err) {
        res.status(500),json({ message: err.message})
    }
    
    
})

async function getReservierung(req, res, next) {
    let reservierung
    try{
        reservierung = await Reservierung.findById(req.params.id) 
        if(reservierung == null) {
            return res.status(404).json({message: 'Keine Reservierung vorhanden'})
        }

    } catch (err) {
        return res.status(500).json({message: err.mesage})

    }

    res.reservierung = reservierung
    next()
}
*/
module.exports = router