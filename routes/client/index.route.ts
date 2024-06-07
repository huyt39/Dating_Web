
import { Express } from "express";
import { partnerRoutes } from "./partner.route";
import { categoryRoutes } from "./category.route";
import { cartRoutes } from "./cart.route";

const clientRoutes=(app: Express): void => {
    app.use(`/partners`, partnerRoutes);
    app.use(`/categories`, categoryRoutes);
    app.use(`/cart`, cartRoutes );
};
export default clientRoutes;
