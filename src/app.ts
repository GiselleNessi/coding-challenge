import express from "express";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

import { loadApiEndpoints } from "./controllers/api";

type Influencers = {
    instaName: string;
    name: string;
    categoryOne: string;
    categoryTwo: string;
    followers: number;
    country: string;
    engagement: number;
    avg: number;
  };
  
  (() => {
    const csvFilePath = path.resolve(__dirname, 'instagram_influencers.csv');
  
    const headers = ['instaName', 'name', 'categoryOne', 'categoryTwo', 'followers', 'country', 'engagement', 'avg'];
  
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  
    parse(fileContent, {
      delimiter: ',',
      columns: headers,
    }, (error: any, result: Influencers[]) => {
      if (error) {
        console.error(error);
      }
  
      console.log("Result", result);
    });
  })();

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;

