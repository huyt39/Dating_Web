import { Request, Response } from "express";
import Category from "../../models/category.model";

//[GET] /categories/
export const index = async (req: Request, res: Response)=>{
     // SELECT * FROM categories WHERE deleted = false AND status = "active";
     const categories = await Category.findAll({
        where: {
            deleted: false,
            status: "active"
        },
        raw: true  //data tra ra ngan gon
    });

    res.render("client/pages/categories/index.pug", {
        pageTitle: "Danh mục partner",
        categories: categories
    });
}