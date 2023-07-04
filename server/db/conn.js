const mongoose = require("mongoose");


const DB = "mongodb+srv://tnsukesh16:sukesh2516@userdata.jgeoqpf.mongodb.net/IamNeoTalentCenter?retryWrites=true&w=majority";


mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("Dataaa")).catch((err)=>console.log("error"+err.message))