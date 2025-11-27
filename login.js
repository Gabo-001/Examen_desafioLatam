const { Builder, By, until } = require('selenium-webdriver');

(async function openPortal() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.saucedemo.com/');

    
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    // Esperar que algún elemento se cargue tras login
    // await driver.wait(until.elementLocated(By.id('elemento_post_login')), 10000);

  } finally {
    // await driver.quit(); // cerrar navegador si quieres
  }
})();
