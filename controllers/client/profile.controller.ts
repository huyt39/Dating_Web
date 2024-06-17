import { Request, Response } from "express";
import User from "../../models/user.model";

// [GET] /profile
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

// [POST] /profile/edit
export const edit = async (req: Request, res: Response) => {
  const userId = (req.session as any).user.UserID;
  const { name, email, dateOfBirth, gender, major } = req.body;

  try {
    // Kiểm tra và chuyển đổi ngày tháng
    const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;

    await User.update(
      {
        Name: name,
        Email: email,
        DateOfBirth: formattedDateOfBirth,
        Gender: gender,
        Major: major,
      },
      { where: { UserID: userId } }
    );

    // Cập nhật session user
    const updatedUser = await User.findByPk(userId);
    (req.session as any).user = updatedUser;

    res.redirect("/profile");
  } catch (error) {
    console.error("Cập nhật thông tin cá nhân thất bại:", error);
    res.render("pages/profile/index", {
      pageTitle: "Thông tin cá nhân",
      error: "Cập nhật thông tin cá nhân thất bại, vui lòng thử lại.",
      user: (req.session as any).user,
    });
  }
};
