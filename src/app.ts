import express from "express";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
const _ = require("lodash"); 

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
      
      //1. Who are the #1 top influencers per category, by followers?
      //group data by category

      // var sam : object =_.groupBy(obj, "categoryOne");
    //  console.log(JSON.stringify(sam))
    var max;
    var name;
    var maxreturn;
    var data = _.mapValues(_.groupBy(obj, "categoryOne"), (x: any[]) => x.map(y => _.omit(y, "categoryOne")));
    // console.log(john)
    for (var d in data) {
      var innerData = data[d];
      for (var k in innerData) {
        var orignalData = innerData[k].followers;
        if(innerData[k].followers.includes('M'))
          innerData[k].followers = Math.round(parseFloat(innerData[k].followers)) + "000000";
        if(innerData[k].followers.includes('K'))
          innerData[k].followers = Math.round(parseFloat(innerData[k].followers)) + "000";
        if (parseFloat(innerData[k].followers) > Math.round(parseFloat(max)) {
          maxreturn = orignalData;
          max = parseFloat(innerData[k].followers);
          name = innerData[k].name
        }
      }
      console.log(maxreturn);
      console.log(max);
      console.log(name);
      maxreturn = "";
      max = "";
      name="";
      console.log("=========")
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

function categoryOne(categoryOne: any, arg1: string): any {
    throw new Error("Function not implemented.");
}

function obj(obj: any, arg1: string): any {
    throw new Error("Function not implemented.");
}

