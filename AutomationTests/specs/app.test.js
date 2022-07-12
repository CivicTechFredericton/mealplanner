// const { Builder, By, Key, util, until, WebDriverWait } = require('selenium-webdriver');
// // import org.openqa.selenium.support.ui.WebDriverWait;
// const chrome = require('selenium-webdriver/chrome');

// describe('App', () => {
//   const testUrl = 'http://127.0.0.1:3333/'

//   // let driver

//   beforeEach(async () => {
//     jest.setTimeout(80000)
   
//   })

//   const getElementName = async (driver, name, timeout = 3000) => {
//     const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
//     return await driver.wait(until.elementIsVisible(el), timeout);
//   };

//   test('allows the user to submit the form when filled out properly', async () => {
//     const driver = await new Builder().forBrowser('chrome').build();

//     //open the application in the browser
//     await driver.get(testUrl)

//     driver.manage().window().maximize();

//   //   const header = driver.wait(until.elementLocated(By.xpath('//*[@alt="MealPlanner"]')), 2000);
//   //   header.isDisplayed();
//   //  const username = driver.wait(until.elementLocated(By.xpath("//*[@placeholder='user name']")), 2000);
//   //  username.sendKeys("admin@example.com");
//   //  const password = driver.wait(until.elementLocated(By.xpath("//*[@placeholder='password']")), 5000);
//   //  password.sendKeys("ba7c51282320843");
//   // //  await driver.findElement(By.xpath('//*[@id="mui-2"]')).sendKeys("ba7c51282320843");
//   //   await driver.findElement(By.xpath('//*[@id="root"]/div/main/section/button')).click();

//    // const creatmeal = driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div[1]/button')), 5000);
//     //creatmeal.click();

//     //await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/button')).click();

   
//     await driver.quit();
//   })

   
// })