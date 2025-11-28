const { Builder, By, until } = require('selenium-webdriver');

(async function openPortal() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://www.saucedemo.com/');

    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

     await driver.findElement(By.id('react-burger-menu-btn')).click();

    
    // Seleccionamos el link de sidebar por su clase o selector adecuado
    let menu1 = await driver.findElement(By.css('#inventory_sidebar_link'));
    let text_menu1 = await menu1.getText();
    let menu2 = await driver.findElement(By.css('#about_sidebar_link'));
    let text_menu2 = await menu2.getText();
    let menu3 = await driver.findElement(By.css('#logout_sidebar_link'));
    let text_menu3 = await menu3.getText();
    let menu4 = await driver.findElement(By.css('#reset_sidebar_link'));
    let text_menu4 = await menu4.getText();
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Validamos que el texto del link sea el esperado, por ejemplo "All Items"
    if (text_menu1 === "All Items" && text_menu2 === "About"  && text_menu3 === "Logout" && text_menu4 === "Reset App State") {
      console.log("Validacion de Credenciales correctas. Menu_burger.js");
      console.log("✅ Sidebar link contine todas las opciones esperadas:", text_menu1, "," ,  text_menu2, "," ,text_menu3, "," ,text_menu4);
    } else {
      console.log("Validacion de Credenciales correctas. Menu_burger.js");
      console.error("❌ al menos una de las opciones del Sidebar link no coincide.");
      console.log("Encontrado:", text_menu1, ":All Items, " ,  text_menu2, ":About, " ,text_menu3, ":Logout, " ,text_menu4,":Reset App State");
    }

  } finally {
    await driver.quit();
  }
})();
