import { Application, Request, Response } from "express";

//import Data from "../../src/instagram_influencers.csv";

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send(/* Data */);
  });
};
