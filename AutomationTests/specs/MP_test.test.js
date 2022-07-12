const webdriver = require('selenium-webdriver');
const { until, By, Key } = require('selenium-webdriver');

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};
describe('Meal Planner App test', () => {
  const testUrl = 'http://127.0.0.1:3333/'

  beforeAll(async () => {
    jest.setTimeout(20000)
    driver = new webdriver.Builder().forBrowser('chrome').build();
    await driver.get(testUrl);
    await driver.manage().window().maximize();
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 15000);

  test('Logging in to Meal Planner app', async () => {

    const Verifyheader = await getElementByXpath(driver, '//*[@alt="MealPlanner"]');
    await Verifyheader.isDisplayed();
    const EnterUserName = await getElementByXpath(driver, '//*[@placeholder="user name"]');
    await EnterUserName.sendKeys("admin@example.com");
    const EnterPassword = await getElementByXpath(driver, '//*[@placeholder="password"]');
    await EnterPassword.sendKeys("ba7c51282320843");
    const ClickLogin = await getElementByXpath(driver, '//*[@id="root"]/div/main/section/button');
    await ClickLogin.click();

    expect(ClickLogin).toBeTruthy()
  });

  test('Create Meal Plan', async () => {

    const clickCreateNewMealPlan = await getElementByXpath(driver, '//*[@id="root"]/div/div/div[1]/button');
    await clickCreateNewMealPlan.click();

    const CreateNewMealPlanDialogueIsDispalyed = await getElementByXpath(driver, "/html/body/div[4]/div[3]/div");
    await CreateNewMealPlanDialogueIsDispalyed.isDisplayed();

    const enterMealPlanNameInEnglish = await getElementByXpath(driver, '//*[@id="nameEn"]');
    await enterMealPlanNameInEnglish.sendKeys("Test Keto Meal Plan");
    const enterMealPlanNameInFrench = await getElementByXpath(driver, '//*[@id="nameFr"]');
    await enterMealPlanNameInFrench.sendKeys("Testez le plan de repas Keto");

    const enterMealDescriptionInEnglish = await getElementByXpath(driver, '//*[@id="descriptionEn"]');
    await enterMealDescriptionInEnglish.sendKeys("eggs, meats, dairy, and low carb vegetables");
    const enterMealDescriptionInFrench = await getElementByXpath(driver, '//*[@id="descriptionFr"]');
    await enterMealDescriptionInFrench.sendKeys("œufs, viandes, produits laitiers et légumes à faible teneur en glucides");

    const clickCreateButton = await getElementByXpath(driver, "/html/body/div[4]/div[3]/div/div[2]/button[1]");
    await clickCreateButton.click();

    const newmealplanIsDisplayed = await getElementByXpath(driver, '//*[text()="Test Keto Meal Plan"]');
    await newmealplanIsDisplayed.isDisplayed();
    expect(newmealplanIsDisplayed).toBeTruthy()
  });

  test('Cancel Creating Meal Plan', async () => {

    const clickCreateNewMealPlan = await getElementByXpath(driver, '//*[@id="root"]/div/div/div[1]/button');
    await clickCreateNewMealPlan.click();

    const CreateNewMealPlanDialogueIsDispalyed = await getElementByXpath(driver, "/html/body/div[4]/div[3]/div");
    await CreateNewMealPlanDialogueIsDispalyed.isDisplayed();

    const enterMealPlanNameInEnglish = await getElementByXpath(driver, '//*[@id="nameEn"]');
    await enterMealPlanNameInEnglish.sendKeys("Vegan Meal Plan");
    const enterMealPlanNameInFrench = await getElementByXpath(driver, '//*[@id="nameFr"]');
    await enterMealPlanNameInFrench.sendKeys("plan de repas végétalien");

    const enterMealDescriptionInEnglish = await getElementByXpath(driver, '//*[@id="descriptionEn"]');
    await enterMealDescriptionInEnglish.sendKeys("an eating plan that eliminates all animal products");
    const enterMealDescriptionInFrench = await getElementByXpath(driver, '//*[@id="descriptionFr"]');
    await enterMealDescriptionInFrench.sendKeys("un régime alimentaire qui élimine tous les produits d'origine animale");

    const clickCancelButton = await getElementByXpath(driver, "/html/body/div[4]/div[3]/div/div[2]/button[2]");
    await clickCancelButton.click();

    expect(clickCancelButton).not.toBeTruthy()
  });
})