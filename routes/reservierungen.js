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
        res.redirect(`reservierungen/${reservierung.id}`)
    } catch {
        res.render('reservierungen/new', {
            reservierung: reservierung,
            errorMessage: 'Fehler bei erstellung der Reservierung '
        })
    }
})



//GET, eine Reservierung
router.get('/:id' , async (req,res) => {
    try {
        const reservierung = await Reservierung.findById(req.params.id)
        res.render('reservierungen/show', { reservierung: reservierung})

    } catch {
        res.redirect('/')

    }
    
        
})

//Edit Reservierung FORM
router.get('/:id/edit', async (req, res) => {
    try{
        const reservierung = await Reservierung.findById(req.params.id)
        res.render('reservierungen/edit', {reservierung: reservierung })
    } catch {
        res.redirect('/reservierungen')

    }
    
})

//EDIT, eine Reservierung
router.put('/:id',  async (req,res)  => {
    let reservierung
    try {
        reservierung = await Reservierung.findById(req.params.id)
        reservierung.name = req.body.name
        reservierung.email = req.body.email
        reservierung.tel = req.body.tel
        reservierung.slot = req.body.slot
        
        await reservierung.save()
        res.redirect(`/reservierungen/${reservierung.id}`)
    } catch {
        if(reservierung == null) {
            res.redirect('/')
        } else {
        res.render('reservierungen/edit', {
            reservierung: reservierung,
            errorMessage: 'Fehler bei Aktualisierung der Reservierung '
            })
        }
    }
})


//DELETE, eine Reservierung
router.delete('/:id' , async (req,res) => {
    let reservierung
    try {
        reservierung = await Reservierung.findById(req.params.id)
        await reservierung.remove()
        res.redirect('reservierungen')
    } catch {
        if(reservierung == null) {
            res.redirect('/')
        } else {
            res.redirect(`/reservierung/${reservierung.id}`)
        
        }
    }
})

module.exports = router