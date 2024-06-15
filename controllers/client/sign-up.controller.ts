import { Request, Response } from "express";
import User from "../../models/user.model";

//[GET] /signUp
export const index = async (req: Request, res: Response) => {
  res.render("pages/signUp/index", {
    pageTitle: "Trang đăng ký",
  });
};

//[POST] /signUp
export const register = async (req: Request, res: Response) => {
  const { name, email, major, birthdayMonth, birthdayDay, birthdayYear, gender, password } = req.body;

  try {
    const dateOfBirth = new Date(`${birthdayYear}-${birthdayMonth}-${birthdayDay}`);
    const user = await User.create({ 
      Name: name, 
      Email: email, 
      Major: major,
      DateOfBirth: dateOfBirth,
      Gender: gender,
      Password: password 
    });
    (req.session as any).user = user;  // Tạm thời sử dụng `as any` để bỏ qua lỗi TypeScript
    res.redirect('/categories'); // Chuyển hướng người dùng đến trang danh mục
  } catch (error) {
    res.render("pages/signUp/index", {
      pageTitle: "Trang đăng ký",
      error: "Đăng ký thất bại, vui lòng thử lại.",
    });
  }
};
