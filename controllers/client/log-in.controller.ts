// log-in.controller.ts
import { Request, Response } from "express";
import User from "../../models/user.model";
import bcrypt from 'bcrypt';

//[GET] /logIn
export const index = (req: Request, res: Response) => {
  const session = req.session as any;
  if (session) {
    session.returnTo = req.headers.referer || '/';
  }
  res.render("pages/logIn/index", {
    pageTitle: "Trang đăng nhập",
  });
};

//[POST] /logIn
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { Email: email } });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.get('Password') as string); // So sánh mật khẩu đã mã hóa
    if (isMatch) {
      const session = req.session as any;
      session.user = user;
      res.redirect('/categories'); // Chuyển hướng người dùng đến trang danh mục
    } else {
      res.render("pages/logIn/index", {
        pageTitle: "Trang đăng nhập",
        error: "Email hoặc mật khẩu không đúng",
      });
    }
  } else {
    res.render("pages/logIn/index", {
      pageTitle: "Trang đăng nhập",
      error: "Email hoặc mật khẩu không đúng",
    });
  }
};

//[GET] /logIn/logout
export const logout = (req: Request, res: Response) => {
  const session = req.session as any;
  session.destroy((err: any) => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('sid');
    res.redirect('/');
  });
};