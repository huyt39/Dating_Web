import { Request, Response } from "express";

//[GET] /home
export const index = async (req: Request, res: Response) => {
  res.render("pages/home/index", {
    pageTitle: "Trang chủ",
    user: (req.session as any).user || null,  // Tạm thời sử dụng `as any` để bỏ qua lỗi TypeScript
  });
};
