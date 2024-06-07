import { Request, Response } from "express";

//[GET] /cart/
export const index = async(req:Request, res: Response) => {
    res.render("client/pages/cart/index", {
        pageTitle: "Partner đã chọn"
    });
}