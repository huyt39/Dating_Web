module.exports.index=(req,res)=>{
    res.render("client/pages/products/index.pug");
}

module.exports.detail=(req,res)=>{
    res.send("Trang chi tiết");
}

