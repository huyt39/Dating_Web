const express=require("express");
const router = express.Router();
// router.get("/",(req,res)=>{
//     res.render("client/pages/home/index.pug");
// });
const controller=require("../../controller/client/home.controller.js");
router.get("/",controller.index);
module.exports = router;