const express = require('express');
const router=express()
router.use(express.json())
const {demande, listedemande} = require('./models');


app.get('/demande', async (req, res) => {
    try {
      const Demande = await demande.findAll()
      return res.json(Demande)
    } catch(err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong'})
    }
  })
  
  app.get('/demande/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const Demande = await demande.findOne({
        where: { uuid },
        include: ['listedemande']
      })
      id=Demande.id
      const Commande = await commande.findOne({
        where: { demandeId : id },
        include: ['listecommande']
      })
      const Paie = await paiement.findOne({
        where: { demandeId : id },
      })
      const Recep = await reception.findOne({
        where: { demandeId : id },
        include: ['listereception']
      })
      const Remi = await remise.findOne({
        where: { demandeId : id },
      })
  
      return res.json({Demande,Commande,Paie,Recep,Remi})
    } catch(err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong'})
    }
  })
  
  app.get('/listedemande', async (req, res) => {
    try{
      const Listedemande = await listedemande.findAll({ include: 'demande' })
      ver6= Listedemande;
      return res.json(Listedemande)
    } catch(err){
      console.log(err)
      return res.status(500).json(err)
    }
  })
  module.exports=router;
  