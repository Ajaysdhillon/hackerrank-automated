const puppeteer = require("puppeteer");

let browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});

browserOpen.then(function (browserObj) {
  let browserOpenPromise = browserObj.newPage();
  return browserOpenPromise;
});
