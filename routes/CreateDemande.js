const express = require('express');
const router=express()
router.use(express.json())
const {demande, listedemande} = require('./models');

//create Demande and liste demande
router.post('/demande', async(req, res) => {

    const { date, type, service} = req.body;
    const nom = req.user.name
    const demandeData = { date, type, nom ,service };
  
    try {
      const Demande = await demande.create(demandeData);
      const demandeId = Demande.id;
      ver = Demande.uuid;
  
  const listedemandes = [];
  const listedemandeData = {};
  for (let i = 1; i <= 5; i++) {
    const num = req.body[`num${i}`];
    const désignation = req.body[`désignation${i}`];
    const unitémesure = req.body[`unitémesure${i}`];
    const quantitédem = req.body[`quantitédem${i}`];
    const quantitéliv = req.body[`quantitéliv${i}`];
    const observation = req.body[`observation${i}`];
    if (quantitédem && quantitédem > 0)  {
      listedemandeData[i] = { num, désignation, unitémesure, quantitédem, quantitéliv, observation, demandeId };
    }
  }
  const Listedemande = await listedemande.create(listedemandeData);
  listedemandes.push(Listedemande);
  
  return res.json({ Demande, listedemandes });
  } catch(err) {
  console.log(err);
  return res.status(500).json(err);
  }
  });
module.exports=router;