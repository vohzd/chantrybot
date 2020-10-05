const express                             = require("express");
const router                              = express.Router();

const axios                               = require("axios");

const { errorHandler }                    = require("../helpers/errorHandler.js");

const cheerio                             = require("cheerio");

const { spawn }                           = require("child_process");

const turndown                            = require("turndown");
const fs                                  = require("fs");
const path                                = require('path');
const util                                = require("util");

const getDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const base = path.resolve();
const dataPath = `${base}/data`;
const headlessBrowser = "https://splash.apps.epitrade.io"

async function createMD(html, number){
  if (!html) return ;
  const converter = new turndown();
  const md = converter.turndown(html);
  fs.writeFileSync(`${dataPath}/${number}.md`, md)
}

async function doShit(number){

  let num = ("000" + number).substr(-3 ,3);

  try {
    const { data } = await axios.get(`${headlessBrowser}/render.html?url=http://www.scpwiki.com/scp-${num}`);

      console.log("DATA LOADED");
      console.log(data);
    const $ = cheerio.load(data);

    console.log($);
    /*
      $(".licensebox22").remove();
      $(".page-rate-widget-box").remove();
      $(".footer-wikiwalk-nav").remove();*/
    const inner = $("#page-content").html();

    //const inner = $.html();
    createMD(inner, number);
  }
  catch (e){ return errorHandler(res, e) }
}

for (i = 0; i <= 5001; i++){
  doShit(i);
}

/*
router.get("/scrape/html" , async (req, res) => {
  doShit();
  return res.send({
    succes: true
  })
});
*/
module.exports = router;
