import { Request, Response } from "express";
import User from "../../models/user.model";
import bcrypt from 'bcrypt';

//[GET] /signUp
export const index = async (req: Request, res: Response) => {
  res.render("pages/signUp/index", {
    pageTitle: "Trang đăng ký",
    user: (req.session as any).user || null,
  });
};

//[POST] /signUp
export const register = async (req: Request, res: Response) => {
  const { name, email, major, birthdayMonth, birthdayDay, birthdayYear, gender, password, category } = req.body;
  const files = req.files as Express.Multer.File[];

  if (!files || files.length < 3) {
    return res.render("pages/signUp/index", {
      pageTitle: "Trang đăng ký",
      error: "Bạn phải tải lên đủ 3 ảnh.",
      user: (req.session as any).user || null,
    });
  }

  try {
    const dateOfBirth = new Date(`${birthdayYear}-${birthdayMonth}-${birthdayDay}`);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ghi log dữ liệu nhận được để kiểm tra
    console.log("Received form data:", req.body);
    console.log("Gender value:", gender); // Log giá trị của gender

    const user = await User.create({ 
      Name: name, 
      Email: email, 
      Major: major,
      DateOfBirth: dateOfBirth,
      Gender: gender, // Chuyển đổi giá trị Gender
      Password: hashedPassword,
      Category: category
    });

    (req.session as any).user = user.get({ plain: true });
    res.redirect('/categories');
  } catch (error) {
    console.error("Đăng ký thất bại:", error);
    res.render("pages/signUp/index", {
      pageTitle: "Trang đăng ký",
      error: "Đăng ký thất bại, vui lòng thử lại.",
      user: (req.session as any).user || null,
    });
  }
};
