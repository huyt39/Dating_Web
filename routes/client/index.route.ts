
import { Express } from "express";
import { partnerRoutes } from "./partner.route";
import { categoryRoutes } from "./category.route";
import { cartRoutes } from "./cart.route";
import { homeRoutes } from "./home.route";
import { signUpRoutes } from "./sign-up.route";
import { logInRoutes } from "./log-in.route";
import { profileRoutes } from "./profile.route";


const clientRoutes=(app: Express): void => {
    app.use(`/partners`, partnerRoutes);
    app.use(`/categories`, categoryRoutes);
    app.use(`/cart`, cartRoutes );
    app.use(`/`, homeRoutes);
    app.use(`/logIn`,logInRoutes);
    app.use(`/signUp`,signUpRoutes);
    app.use(`/profile`,profileRoutes);
};
export default clientRoutes;
