// controllers/client/cart.controller.ts
import { Request, Response } from "express";
import PickedPartner from "../../models/pickedPartner.model";
import Partner from "../../models/partner.model";

// [GET] /cart/
export const index = async (req: Request, res: Response) => {
  // Lấy danh sách các partner đã ghép đôi
  const pickedPartners = await PickedPartner.findAll({
    include: [
      {
        model: Partner,
        as: 'partner'
      }
    ]
  });

  res.render("pages/cart/index", {
    pageTitle: "Partner đã chọn",
    pickedPartners: pickedPartners
  });
};

// [POST] /cart/add-to-pair
export const addToPair = async (req: Request, res: Response) => {
  const { pickID, partnerID } = req.body;

  console.log("Received data:", { pickID, partnerID }); // Thêm log để kiểm tra dữ liệu

  try {
    const result = await PickedPartner.create({
      pickID,
      partnerID
    });

    console.log("Insert result:", result); // Thêm log kết quả insert

    res.status(200).send({ message: "Đã thêm partner vào danh sách ghép đôi thành công" });
  } catch (error: any) {
    console.error("Error adding partner to pair list:", error);
    res.status(500).send({ message: "Lỗi khi thêm partner vào danh sách ghép đôi", error: error.message });
  }
};
