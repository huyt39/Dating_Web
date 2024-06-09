
import { Express } from "express";
import { partnerRoutes } from "./partner.route";
import { categoryRoutes } from "./category.route";
import { cartRoutes } from "./cart.route";
import { homeRoutes } from "./home.route";


const clientRoutes=(app: Express): void => {
    app.use(`/partners`, partnerRoutes);
    app.use(`/categories`, categoryRoutes);
    app.use(`/cart`, cartRoutes );
    app.use(`/`, homeRoutes);
};
export default clientRoutes;
