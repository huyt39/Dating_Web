const express=require("express");
const router=express.Router();
// router.get("/",(req,res)=>{
//     res.render("client/pages/products/index.pug")
// });
const controller = require("../../controller/client/product.controller.js");
router.get("/",controller.index);
module.exports=router;