const express = require('express');
const router=express()
const {User} = require('../models');
router.use(express.json())

//Get All Users
router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll()
      ver5=users;
      return res.json(users);
      
     
      
    } catch(err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong'})
    }
  })
  //Get user by uuid
  router.get('/users/:uuid', async (req, res) => {
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
  //Delete user by UUID
  router.delete('/users/:uuid', async (req, res) => {
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
  //Modify user by UUID
  router.put('/users/:uuid', async (req, res) => {
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
  module.exports=router;