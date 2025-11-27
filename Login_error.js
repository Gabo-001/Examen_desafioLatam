const { Builder, By, until } = require('selenium-webdriver');

(async function openPortal() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.saucedemo.com/');

    
    await driver.findElement(By.id('user-name')).sendKeys('standard_user1');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    let errorElement = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[1]/div/div/form/div[3]/h3'))
    let errorText = await errorElement.getText();
        let expectedText = "Epic sadface: Username and password do not match any user in this service";
    if(errorText === expectedText) {
      console.log("Mensaje de error validado correctamente.");
    } else {
      console.log("Mensaje de error inesperado: ", errorText);
    }

    console.log (expectedText);

  } finally {
    await driver.quit(); // cerrar navegador si quieres
  }
})();
