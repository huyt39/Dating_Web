
import { Express } from "express";
import { partnerRoutes } from "./partner.route";
import { categoryRoutes } from "./category.route";
import { cartRoutes } from "./cart.route";
import { homeRoutes } from "./home.route";
import { signUpRoutes } from "./sign-up";
import { logInRoutes } from "./log-in";


const clientRoutes=(app: Express): void => {
    app.use(`/partners`, partnerRoutes);
    app.use(`/categories`, categoryRoutes);
    app.use(`/cart`, cartRoutes );
    app.use(`/`, homeRoutes);
    app.use(`/logIn`,logInRoutes);
    app.use(`/signUp`,signUpRoutes);
};
export default clientRoutes;
