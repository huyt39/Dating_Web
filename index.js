const express = require("express"); //nhung express

const app = express(); //khoi tao app dung express
const port = 3000; //khoi tao cong

app.set("views", "./views"); //giao dien
app.set("view engine", "pug");

//router:
app.get("/",(req,res)=>{
    //res.send("Trang chu");
    res.render("client/pages/home/index.pug"); //da mac dinh vao thu muc views nen bat dau bang client
}
);

app.get("/products",(req,res)=>{
    //res.send("Trang danh sach san pham");
    res.render("client/pages/products/index.pug");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}
    ); //chay server