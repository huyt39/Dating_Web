import { Request, Response } from "express";
import Category from "../../models/category.model";

//[GET] /categories
export const index = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  });

  res.render("pages/categories/index", { // Đảm bảo đường dẫn chính xác
    pageTitle: "Danh mục partner",
    categories: categories
  });
};
