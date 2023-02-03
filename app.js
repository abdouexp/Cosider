const express = require('express');
const path = require('path');
const { check, validationResult } = require('express-validator')
const bcrypt=require('bcryptjs')
const passport=require('passport')
const session=require('express-session')
const flash=require('connect-flash')


const { sequelize, User, Post, demande, listedemande, commande, listecommande, paiement, reception, listereception, remise } = require('./models');

const app = express()
const router=express()
router.use(express.json())
app.use(express.json())

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(flash());
//session middlware 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
//passport init
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


let ver,ver1,ver2;
let ver5,ver7,ver6,khtek,zebi;
//view engine
//load view engine

app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug' );
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));



//public  folder directory
app.use(express.static(path.join(__dirname, 'assets')));
//ensurelogedin
function ensurelogedin(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    req.flash('error','Please log in');
    res.redirect('/login');
  }
}

//ensure traiteur
function ensuretraiteur(req,res,next){
  if(req.isAuthenticated()&& req.user.role=='assistant de suivie'){
    return next();
  }
  else {
    res.render('erreur403');
  }
};
function ensureverificateur(req,res,next){
  if(req.isAuthenticated()&& req.user.role=='verificateur'){
    return next();
  }
  else {
    res.render('erreur403');
  }
};

//routes 



app.post('/users', async(req, res) => {
  const { name, email, role, username, password } = req.body
  console.log(req.body.password);
  try{
    const user = await User.create({ name, username, email, password, role })
    bcrypt.genSalt(10,function (err,salt){
     bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        }

        user.password = hash;
        user.save(function (err) {
          if (err) {
            console.log(err);
            return;
          }
        });

      });
     
    });
    

    return res.redirect('/login')
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    ver5=users;
    return res.json(users);
    
   
    
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.get('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({
      where: { uuid },
      include: 'posts',
    })

    return res.json(user)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.delete('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({ where: { uuid } })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.put('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  const { name, email, role } = req.body
  try {
    const user = await User.findOne({ where: { uuid } })

    user.name = name
    user.email = email
    user.role = role

    await user.save()

    return res.json(user)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})



app.post('/demande', async(req, res) => {
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

app.get('/demande', async (req, res) => {
  try {
    const Demande = await demande.findAll()
    ver7= Demande
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

app.post('/listedemande', async (req, res) => {
  // const { userUuid, body } = req.body
  const { num, désignation, unitémesure, quantitédem, quantitéliv, observation } = req.body

  try{
    const Demande = await demande.findOne({ where: { uuid: ver }})

    const Listedemande = await listedemande.create({ num, désignation, unitémesure, quantitédem, quantitéliv, observation, demandeId: Demande.id })
    console.log(req.body);

    return res.json(Listedemande)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
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

app.post('/commande', async (req, res) => {
  const commandedata= { uuid, date, dateliv, fournisseur, lieu, conditions, ...items } = req.body;
console.log(commandedata);
  try {
    const Demande = await demande.findOne({ where: { uuid } });
    if (!Demande) {
      return res.status(400).json({ error: 'Demande not found' });
    }

  try{
    const Demande = await demande.findOne({ where: { uuid }})

    const Commande = await commande.create({ date, dateliv, fournisseur, lieu, conditions, demandeId: Demande.id })

    const Listecommande1 = description ? await listecommande.create({ item, description, unitémesure, quantité, prixunit, prixtot, commandeId: Commande.id }) : null
    item=item2, description=description2, unitémesure=unitémesure2, quantité=quantité2, prixunit=prixunit2, prixtot=prixtot2
    const Listecommande2 = description ? await listecommande.create({ item, description, unitémesure, quantité, prixunit, prixtot, commandeId: Commande.id }) : null
    item=item3, description=description3, unitémesure=unitémesure3, quantité=quantité3, prixunit=prixunit3, prixtot=prixtot3
    const Listecommande3 = description ? await listecommande.create({ item, description, unitémesure, quantité, prixunit, prixtot, commandeId: Commande.id }) : null
    item=item4, description=description4, unitémesure=unitémesure4, quantité=quantité4, prixunit=prixunit4, prixtot=prixtot4
    const Listecommande4 = description ? await listecommande.create({ item, description, unitémesure, quantité, prixunit, prixtot, commandeId: Commande.id }) : null
    item=item5, description=description5, unitémesure=unitémesure5, quantité=quantité5, prixunit=prixunit5, prixtot=prixtot5
    const Listecommande5 = description ? await listecommande.create({ item, description, unitémesure, quantité, prixunit, prixtot, commandeId: Commande.id }) : null

    return res.json(Commande,
      Listecommande1,
      Listecommande2,
      Listecommande3,
      Listecommande4,
      Listecommande5)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/commande', async (req, res) => {
  try {
    const Commande = await commande.findAll()

    return res.json(Commande)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.get('/commande/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const Commande = await commande.findOne({
      where: { uuid },
      include: 'listecommande',
    })

    return res.json(Commande)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})
//===============================================================================================================//
app.get('/demandevalider/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  console.log(uuid)
  try {
    const Demande = await demande.findOne({ where: { uuid } })

    Demande.etat = 'encours'

    await Demande.save()

    return res.redirect('/Traiter')
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.get('/demanderefuser/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const Demande = await demande.findOne({ where: { uuid } })

    Demande.etat = 'refusé'

    await Demande.save()

    return res.redirect('/Traiter')
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.get('/demandefinal/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const Demande = await demande.findOne({ where: { uuid } })

    Demande.etat = 'traité'

    await Demande.save()

    return res.redirect('/Traiter')
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.get('/demanderetraiter/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const Demande = await demande.findOne({ where: { uuid } })

    Demande.etat = 'retraité'

    await Demande.save()

    return res.redirect('/verifier')
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.get('/demandefinale/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const Demande = await demande.findOne({ where: { uuid } })

    Demande.etat = 'finalisé'

    await Demande.save()

    return res.redirect('/verifier')
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.post('/demandemodif', async (req, res) => {
  const { uuid1, uuid2, uuid3, uuid4, uuid5, quantitéliv, quantitéliv2, quantitéliv3, quantitéliv4, quantitéliv5 } = req.body
  try {

    const item1 = await listedemande.findOne({ where: { uuid : uuid1 } })
    if (item1!=null) { item1.quantitéliv = quantitéliv
                       await item1.save()
                      }

    const item2 = await listedemande.findOne({ where: { uuid : uuid2 } })
    if (item2!=null) { item2.quantitéliv = quantitéliv2
                       await item2.save()
                      }

    const item3 = await listedemande.findOne({ where: { uuid : uuid3 } })
    if (item3!=null) { item3.quantitéliv = quantitéliv3;
                       await item3.save();
                      }
    
    const item4 = await listedemande.findOne({ where: { uuid : uuid4 } })
    if (item4!=null) { item4.quantitéliv = quantitéliv4
                       await item4.save()
                      }

    const item5 = await listedemande.findOne({ where: { uuid : uuid5 } })
    if (item5!=null) { item5.quantitéliv = quantitéliv5
                       await item5.save()
                      }

    return res.json(quantitéliv)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})
//================================================================================================//


app.post('/listecommande', async (req, res) => {
  // const { userUuid, body } = req.body
  const { item, description, unitémesure, quantité, prixunit, prixtot } = req.body

  try{
    const Commande = await commande.findOne({ where: { uuid: ver1 }})

    const Listecommande = await listecommande.create({ item, description, unitémesure, quantité, prixunit, prixtot, commandeId: Commande.id })

    return res.json(Listecommande)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/listecommande', async (req, res) => {
  try{
    const Listecommande = await listecommande.findAll({ include: 'commande' })

    return res.json(Listecommande)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.post('/paiement', async(req, res) => {
  const { date, etablisseur,  naturedépence, modepaiement, piecejointe, nombenef, adressebenef, libellé, montantchiffre, montantlettre,uuid } = req.body
  console.log(req.body.uuid);
  try{
    const Demande = await demande.findOne({ where: {uuid}})

    const Paiement = await paiement.create({ etablisseur, date, naturedépence, modepaiement, piecejointe, nombenef, adressebenef, libellé, montantchiffre, montantlettre, demandeId: Demande.id })
    
    // .then(result => ver1 = result.uuid);

    return res.redirect('/fcommande/'+uuid)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/paiement', async (req, res) => {
  try {
    const Paiement = await paiement.findAll()

    return res.json(Paiement)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.get('/paiement/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const Paiement = await paiement.findOne({
      where: { uuid },
      // include: 'demande'
    })

    return res.json(Paiement)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.post('/reception', async(req, res) => {
  var { uuid, site, codearticle, numfacture, date, observation,
        num, designation, quantité,
        num2, designation2, quantité2,
        num3, designation3, quantité3,
        num4, designation4, quantité4,
        num5, designation5, quantité5
      } = req.body

  try{
    const Demande = await demande.findOne({ where: { uuid }})

    const Reception = await reception.create({ site, codearticle, numfacture, date, observation, demandeId: Demande.id })

    const Listereception1 = designation ? await listereception.create({ num, designation, quantité, receptionId: Reception.id }) : null
    num=num2, designation=designation2, quantité=quantité2
    const Listereception2 = designation ? await listereception.create({ num, designation, quantité, receptionId: Reception.id }) : null
    num=num3, designation=designation3, quantité=quantité3
    const Listereception3 = designation ? await listereception.create({ num, designation, quantité, receptionId: Reception.id }) : null
    num=num4, designation=designation4, quantité=quantité4
    const Listereception4 = designation ? await listereception.create({ num, designation, quantité, receptionId: Reception.id }) : null
    num=num5, designation=designation5, quantité=quantité5
    const Listereception5 = designation ? await listereception.create({ num, designation, quantité, receptionId: Reception.id }) : null

    return res.json(Reception,
      Listereception1,
      Listereception2,
      Listereception3,
      Listereception4,
      Listereception5)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/reception', async (req, res) => {
  try {
    const Reception = await reception.findAll()

    return res.json(Reception)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.get('/reception/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const Reception = await reception.findOne({
      where: { uuid },
      include: 'listereception',
    })

    return res.json(Reception)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.post('/listereception', async (req, res) => {
  // const { userUuid, body } = req.body
  const { num, designation, quantité } = req.body

  try{
    const Reception = await reception.findOne({ where: { uuid: ver2 }})

    const Listereception = await listereception.create({ num, designation, quantité, receptionId: Reception.id })

    return res.json(Listereception)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/listereception', async (req, res) => {
  try{
    const Listereception = await listereception.findAll({ include: 'reception' })

    return res.json(Listereception)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.post('/remise', async(req, res) => {
  const { date,site, codearticle, numfacture, details,observations, nom, prenom, fonction, date2,uuid } = req.body

  try{
    const Demande = await demande.findOne({ where: {uuid}})

    const Remise = await remise.create({ site, codearticle, numfacture, date, details,observations, nom, prenom, fonction, date2, demandeId: Demande.id })
    
    // .then(result => ver1 = result.uuid);

    return res.json(Remise)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/remise', async (req, res) => {
  try {
    const Remise = await remise.findAll()

    return res.json(Remise)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.get('/remise/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const Remise = await remise.findOne({
      where: { uuid },
      // include: 'demande'
    })

    return res.json(Remise)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong'})
  }
})

app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected!')
})
//flash middlware


//home route
app.get('/',ensurelogedin, async (req, res)=> { 
  const verlen= await demande.findAll({
    where:{nom:req.user.name}
  });
  const verlensuc= await demande.findAll({
    where:{nom:req.user.name, etat:'finalisé'}
  });
  const ver7 = await demande.findAll({
    where:{nom:req.user.name}
  }); 
  res.render('index', {"ver5":req.user,"verlen":verlen,"verlensuc":verlensuc,"ver7":ver7});
});
//demande
app.get('/fdemande',ensurelogedin, function(req, res) { 
  res.render('fdemande',{'ver5':req.user.role})
});
//test
app.get('/test',ensurelogedin, async (req, res) => {
   ver5 = await User.findAll();
   ver7 = await demande.findAll();
   ver6 = await listedemande.findAll({ include: 'demande' })
  res.render('test', {"ver5":ver5,'ver6':ver6,'ver7':ver7});
});;
//bon de commande
app.get('/fcommande/:uuid',ensuretraiteur, function(req, res) { 
  khtek=req.params.uuid;
  res.render('fcommande',{'khtek':khtek})
});
//suivide demande
app.get('/encours',ensurelogedin, async (req, res) => { 
  ver7 = await demande.findAll({
    where:{nom:req.user.name}
  });
  ver6 = await listedemande.findAll();
  res.render('encours',{"ver7":ver7, 'ver6': ver6,"ver5":req.user.role});
});
//suivide demande
app.get('/verifier',ensureverificateur, async(req, res) => { 
  ver7 = await demande.findAll();
  res.render('demandesverifier',{'ver7':ver7,'ver5':req.user.role})
});
app.get('/historique',ensurelogedin, async (req, res) => { 
  ver7 = await demande.findAll({
    where:{nom:req.user.name,
    etat:['finalisé','refusé']}
  });
  ver6 = await listedemande.findAll();
  res.render('historique',{"ver7":ver7, 'ver6': ver6,'ver5':req.user.role});
});
app.get('/Traiter',ensuretraiteur, async (req, res) => { 
  ver7 = await demande.findAll();
  ver1 = await listedemande.findAll();
  res.render('demandetraiter',{'ver7':ver7, "ver1":ver1})
});
app.get('/consultation',ensurelogedin, function(req, res) { 
  res.render('consultation',{'ver5':req.user.role})
});

app.get('/verifier/:uuid', async (req, res) => { 
  khtek = req.params.uuid;
  verif = await demande.findOne( {where : {uuid : khtek} } );
  listedemverif = await listedemande.findAll( {where : {demandeId : verif.id} } );
  comverif = await commande.findOne( {where : {demandeId : verif.id} } );
  listecomverif = comverif ? await listecommande.findAll( {where : {commandeId : comverif.id} } ) : null
  ordreverif = await paiement.findOne( {where : {demandeId : verif.id} } );
  recepverif = await reception.findOne( {where : {demandeId : verif.id} } );
  listerecepverif = recepverif ? await listereception.findAll( {where : {receptionId : recepverif.id} } ) : null
  remiverif = await remise.findOne( {where : {demandeId : verif.id} } );
  res.render('verifier',{'khtek':khtek,'verif':verif, 'listedemverif':listedemverif, 'comverif':comverif, 'listecomverif':listecomverif,
                        'ordreverif':ordreverif, 'recepverif':recepverif, 'listerecepverif':listerecepverif, 'remiverif':remiverif})
});

app.get('/modfier/:uuid',ensuretraiteur, async (req, res) => { 
  khtek = req.params.uuid;
  modif= await demande.findOne( {where : {uuid : khtek} } )
  item1= await listedemande.findOne({where : {demandeId : modif.id, num : '1'} });
  item2= await listedemande.findOne({where : {demandeId : modif.id, num : '2'} });
  item3= await listedemande.findOne({where : {demandeId : modif.id, num : '3'} });
  item4= await listedemande.findOne({where : {demandeId : modif.id, num : '4'} });
  item5= await listedemande.findOne({where : {demandeId : modif.id, num : '5'} });
  uuid1= item1 ? item1.uuid : null
  uuid2= item2 ? item2.uuid : null
  uuid3= item3 ? item3.uuid : null
  uuid4= item4 ? item4.uuid : null
  uuid5= item5 ? item5.uuid : null

  res.render('modifier',{'modif':modif,'item1':item1,'item2':item2,'item3':item3,'item4':item4,'item5':item5, 'uuid1':uuid1, 'uuid2':uuid2, 'uuid3':uuid3, 'uuid4':uuid4, 'uuid5':uuid5})
});

app.get('/register', function(req, res) { 
  res.render('register')
});
app.get('/login', function(req, res) { 
  res.render('auth')
});
app.post('/login',async(req,res) => {
  await passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })(req,res) 
});
app.get('/logout', function(req, res) { 
  req.logout();
  res.redirect('/login')
});

//code ta3 lyes li ma3ndo 7eta m3na


const JWST_SECRET = 'some uper secret...'

 app.get('/forgot', (req, res) => {

    res.render('forgot');
}); 

app.post('/forgotpassword', (req, res) => {
  const { email } = req.body;
  console.log("lh9ni el email hada :", req.body.email);
  
 
  if (email !== User.email) {
    console.log("user non enregistre")
     res.send('User not registered');
     return;
 }
 const secret = JWST_SECRET + User.password

const payload ={
 email: User.email,
 id: User.id,
};
const token = jwt.sign(payload, secret, {expiresIn: '15m'});
const link = 'http://localhost:5000/reset-password/${User.id}/${token}';
console.log(link);
res.send('Password reset link has been sent to your email...');
});

//RESET
app.get('/reset-password/:id/:token', (req, res, next) => {
  const{ id, token} = req.params;

  if(id !== user.id){
   res.send('invalid id...');
   return;
}

const secret = JWST_SECRET + user.password;
try{
   const payload =jwt.verify(token, secret);
   res.render('reset-password', {email: user.email});
}catch(error){
console.log(error.message);
res.send(error.message);
}


});
app.post('/reset-password/:id/:token', (req, res, next) => {
   const { id, token} = req.params;
   const {password, password2} = req.body;
   if(id !== user.id){
       res.send('invalid id...');
       return;
   }

   const secret = JWST_SECRET + user.password;
  try{
    const payload = jwt.verify(token, secret);
     
    user.password = password;
    res.send(user.password);

  }catch(error){
      console.log(error.message);
      res.send(error.message);
  }

});

app.use((req,res,next)=> {
res.status(404);
res.render('404');
}
)

