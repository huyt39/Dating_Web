// session-extender.ts
import { Request, Response, NextFunction } from "express";

export const extendSession = (req: Request, res: Response, next: NextFunction) => {
  const session = req.session as any;
  if (session.user) {
    res.locals.user = session.user;
  } else {
    res.locals.user = null;
  }
  next();
};
