import { Request, Response } from "express";
import User from "../../models/user.model";

//[GET] /logIn
export const index = (req: Request, res: Response) => {
  res.render("pages/logIn/index", {
    pageTitle: "Trang đăng nhập",
  });
};

//[POST] /logIn
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });

  if (user) {
    (req.session as any).user = user;  // Tạm thời sử dụng `as any` để bỏ qua lỗi TypeScript
    res.redirect('/');
  } else {
    res.render("pages/logIn/index", {
      pageTitle: "Trang đăng nhập",
      error: "Email hoặc mật khẩu không đúng",
    });
  }
};

//[GET] /logIn/logout
export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('sid');
    res.redirect('/');
  });
};
