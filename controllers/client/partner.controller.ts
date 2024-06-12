import { Request, Response } from "express";
import Partner from "../../models/partner.model";
import sequelize from "../../config/database"; // Import sequelize
import { QueryTypes } from "sequelize"; // Import QueryTypes

// Định nghĩa kiểu cho đối tượng PartnerDetail
interface PartnerDetail {
  id: number;
  title: string;
  code: string;
  images?: string; // Thuộc tính images là optional
  information: string;
  status: string;
  position: number;
  slug: string;
  deleted: boolean;
  deletedAt?: Date;
  image?: string; // Thêm thuộc tính image
}

//[GET] /partners/slugCategory
export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;

  const partners = await sequelize.query(`
    SELECT partners.*
    FROM partners
    JOIN partners_categories ON partners.id = partners_categories.partner_id
    JOIN categories ON partners_categories.category_id = categories.id
    WHERE 
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND partners.deleted = false
      AND partners.status = 'active'
  `, {
    type: QueryTypes.SELECT // Định nghĩa kiểu truy vấn
  }); // Truy vấn từ DB

  (partners as PartnerDetail[]).forEach(item => {
    if (item.images) {
      const images = JSON.parse(item.images); // Chuyển ảnh từ JSON sang array
      item.image = images[0]; // Thêm thuộc tính image
    }
  });

  console.log(partners);
  res.render("pages/partners/index.pug", {
    pageTitle: "Danh sách partners",
    partners: partners
  });
}

//[GET] /partners/detail/:slugPartner
export const detail = async (req: Request, res: Response) => {
  const slugPartner = req.params.slugPartner;

  const partnerDetail = await Partner.findOne({
    where: {
      slug: slugPartner,
      deleted: false,
      status: "active"
    },
    raw: true
  });

  if (partnerDetail) {
    const partnerDetailTyped = partnerDetail as unknown as PartnerDetail; // Chuyển đổi kiểu
    if (partnerDetailTyped.images) {
      partnerDetailTyped.images = JSON.parse(partnerDetailTyped.images); // Chuyển ảnh từ JSON về array
    }

    console.log(partnerDetailTyped);
    res.render("pages/partners/detail", {
      pageTitle: "Chi tiết partner",
      partnerDetail: partnerDetailTyped
    });
  } else {
    res.status(404).send("Partner not found");
  }
}
