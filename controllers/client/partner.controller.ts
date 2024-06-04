import { Request, Response } from "express";
import Partner from "../../models/partner.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";
import { parse } from "path";
//[GET] /partners/slugCategory
export const index = async (req: Request, res: Response)=>{
    const slugCategory=req.params.slugCategory;
    
    const partners= await sequelize.query(`
    SELECT partners.*
    FROM partners
    JOIN partners_categories ON partners.id=partners_categories.partner_id
    JOIN categories ON partners_categories.category_id=categories.id
    WHERE 
        categories.slug='${slugCategory}'
        AND categories.deleted=false
        AND categories.status='active'
        AND partners.deleted=false
        AND partners.status='active'
    `,{
        type: QueryTypes.SELECT //dinh nghia kieu truy van
    }); //truy van tu db
    partners.forEach(item => {
        if(item["images"]){
            const images=JSON.parse(item["images"]); //chuyen anh tu json sang array
            item["image"] = images[0];
        }
        
    })
    console.log(partners);
    res.render("client/pages/partners/index.pug", {
        pageTitle: "Danh sách partners",
        partners: partners
    });
}
//[GET] /partners/detail/:slugPartner
export const detail = async (req: Request, res: Response)=>{
    const slugPartner=req.params.slugPartner;
   
    const partnerDetail=await Partner.findOne({
        where:{
            slug: slugPartner,
            deleted: false,
            status: "active"
        },
        raw: true
    });

    if(partnerDetail["images"]){
        partnerDetail["images"]=JSON.parse(partnerDetail["images"]); //chuyen anh tu json ve array
    }

    res.render("client/pages/partners/detail", {
        pageTitle: "Chi tiết partner",
        partnerDetail: partnerDetail

    });
}