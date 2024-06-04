
import { Express } from "express";
import { partnerRoutes } from "./partner.route";
import { categoryRoutes } from "./category.route";

const clientRoutes=(app: Express): void => {
    app.use(`/partners`, partnerRoutes);
    app.use(`/categories`, categoryRoutes);
};
export default clientRoutes;
