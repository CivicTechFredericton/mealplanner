const { Builder, By, Key, util } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('App', () => {
  const testUrl = 'http://mealplan-app-dev.s3-website-us-east-1.amazonaws.com/'

  // let driver

  beforeEach(async () => {
    jest.setTimeout(30000)
   
  })
  //

  it('allows the user to submit the form when filled out properly', async () => {
    const driver = await new Builder().forBrowser('chrome').build();

    //open the application in the browser
    await driver.get(testUrl)


    await driver.findElement(By.xpath('//*[@id="root"]/header/div/div/div[1]/a/img')).isDisplayed()

    //Click on Login
    await driver.findElement(By.xpath('//*[@id="root"]/header/div/div/div[2]/nav/div/a')).click();

    //Validate Admin Login functionality
    await driver.findElement(By.xpath('//*[@id="email"]')).sendKeys("admin@example.com");
    await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys("f051265f3ecbd19");
    await driver.findElement(By.xpath('//*[@id="root"]/main/div[2]/div[2]/div/form/button/span[1]')).click();

   
  //  await driver.quit();
  })

   
})

