const router=require("express").Router();
const {User} =require('../models');
const multer = require("multer");
const fs = require("fs");
const bcrypt=require("bcryptjs");


const profilestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null,new Date().toISOString().split(":")[0] + file.originalname);
  },
});
const profileupload = multer({ storage: profilestorage });

router.post("/insert", profileupload.single("image"),async (req, res) => {
    console.log(req.body);
 
     const salt=await bcrypt.genSalt(10);
     const hashedPassword= await bcrypt.hash(req.body.user_password,salt);

    await User.create({
      user_name:req.body.user_name,
      user_email:req.body.user_email,
      user_password:hashedPassword,
      total_orders:req.body.total_orders,
      user_image:req.file.filename
    }).then(data => {
        res.send(data);
    }).catch((err)=>{
        //  if(err) console.log(err);
         return res.status(400).send('email already exists..');
    })
});



router.get("/image/:id",async (req, res) => {
  const id = req.params.id;
  await User.findByPk(id).then(data => {
      res.send(data.user_image);
  }).catch((err)=>{
       if(err) console.log(err);
  })
});


router.get("/details", async (req, res) => {
    await User.findAll().then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
         if(err) console.log(err);
    })
});


router.get("/details/:id", async (req, res) => {
    const id = req.params.id;
    await User.findByPk(id)
    .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
    })
    .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
    });
});


router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    console.log("USER ID= ",id);
    console.log(req.body);
    await User.update(req.body, {
        where: { id: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "User data was updated successfully."
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});


router.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    await User.destroy({where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
});


module.exports=router;