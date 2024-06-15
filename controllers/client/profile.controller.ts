import { Request, Response } from "express";

//[GET] /profile
export const index = async (req: Request, res: Response) => {
  const user = (req.session as any).user;

  if (!user) {
    return res.redirect('/logIn');
  }

  res.render("pages/profile/index", {
    pageTitle: "Thông tin cá nhân",
    user: user,
  });
};
