import { Request, Response } from "express";

//[GET] /home/
export const index = async(req:Request, res: Response) => {
    res.render("client/pages/signUp/index", {
        pageTitle: "Trang đăng ký"
    });
}