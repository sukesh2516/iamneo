const express = require("express");
const router = new express.Router();

const multer = require("multer");
const users = require("../model/userSchema");
const moment = require("moment");
// router.get("/",(req,res)=>{
//     res.send("server strte route")
// });


const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },

    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
})

const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)

    }
    else{
        callback(new Error("only image format"))
    }
}
const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})


router.post("/registration",upload.single("photo"),async(req,res)=>{

        const{filename}=req.file;
        const{name}=req.body;                
        const{dob}=req.body;
        if(!name || !filename){
            res.status(401).json({status:401,message:"fill all data"})
        }
        try{
            const date = moment(new Date()).format("YYYY-MM-DD");
            const userdata = new users({
                name:name,
                imgpath:filename,
                dob:dob,
                date:date

            });

            const finaldata = await userdata.save();
            res.status(201).json({status:201,finaldata});
        }
        catch(error){
            res.status(401).json({status:401,error})
        }
});

router.get("/getdata",async(req,res)=>{
    try{
        const getUser = await users.find();
        res.status(201).json({status:201,getUser})
    }
    catch(error){
        res.status(401).json({status:401,error})
    }
})



router.delete("/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteUser = await users.findByIdAndDelete({_id:id});


        res.status(201).json({status:201,deleteUser});
    }
    catch (error){
        res.status(401).json({status:401,error})
    }
})
module.exports=router;