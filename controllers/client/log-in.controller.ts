import { Request, Response } from "express";

//[GET] /home/
export const index = async(req:Request, res: Response) => {
    res.render("client/pages/logIn/index", {
        pageTitle: "Trang đăng nhập"
    });
}