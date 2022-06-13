const puppeteer = require("puppeteer");

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "zurkubardo@vusra.com";
const password = "931362272";
let browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});

let page;

browserOpen
  .then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
  })
  .then(function () {
    let emailIsEntered = page.type("input[id = 'input-1']", email, {
      delay: 50,
    });
    return emailIsEntered;
  })
  .then(function () {
    let passwordIsEntered = page.type("input[type = 'password']", password, {
      delay: 50,
    });
    return passwordIsEntered;
  })
  .then(function () {
    let loginButtonClicked = page.click(
      'button[data-analytics="LoginPassword"]',
      { delay: 50 }
    );
    return loginButtonClicked;
  })
  .then(function () {
    let clickOnAlgoPromise = waitAndClick(
      '.topic-card a[data-attr1="algorithms"]',
      page
    );
    return clickOnAlgoPromise;
  })
  .then(function () {
    let getToWarmup = waitAndClick('input[value="warmup"]', page);
    return getToWarmup;
  })
  .then(function () {
    let waitfor3Seconds = page.waitFor(3000);
    return waitfor3Seconds;
  })
  .then(function () {
    let allChallengesPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 50 }
    );
    return allChallengesPromise;
  })
  .then(function (questionsArr) {
    console.log("No. of ques", questionsArr.length);
    let questionWillBeSolved = questionSolver(questionsArr[0]);
    return questionWillBeSolved;
  });

function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cPage.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let clickModel = cPage.click(selector);
        return clickModel;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

function questionSolver(question) {
  return new Promise(function (resolve, reject) {
    let questionWillBeClicked = question.click();
    return questionWillBeClicked;
  });
}
