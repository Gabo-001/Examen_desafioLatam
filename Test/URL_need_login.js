const { Builder, By, until } = require('selenium-webdriver');


(async function openPortal() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.saucedemo.com/inventory.html');
  
    let errorElement = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[1]/div/div/form/div[3]/h3'))
    let errorText = await errorElement.getText();
        let expectedText = "Epic sadface: You can only access '/inventory.html' when you are logged in.";
    if(errorText === expectedText) {
      console.log("Entrar directo a la pagina principal sin hacer login. URL_need_login.js");
      console.log("Mensaje de error validado correctamente.");
    } else {
      console.log("Entrar directo a la pagina principal sin hacer login. URL_need_login.js");
      console.log("Mensaje de error inesperado: ", errorText);
    }
    console.log ("");


  } finally {
    await driver.quit(); // cerrar navegador si quieres
  }
})();
