const { Builder, By, until } = require('selenium-webdriver');

(async function openPortal() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://www.saucedemo.com/');

    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

     await driver.findElement(By.id('react-burger-menu-btn')).click();
         await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Raelizar Logout
   
    await driver.findElement(By.css('#logout_sidebar_link')).click();
    console.log("Logout exitoso del portal, Logout.js")

  } finally {
    await driver.quit();
  }
})();
