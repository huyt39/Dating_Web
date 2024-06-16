import { Request, Response, NextFunction } from "express";

export const extendSession = (req: Request, res: Response, next: NextFunction) => {
  const session = req.session as any; // Ép kiểu tạm thời để tránh lỗi TypeScript
  session.returnTo = session.returnTo || '';
  session.user = session.user || null;
  next();
};
