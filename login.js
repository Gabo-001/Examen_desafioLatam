const { Builder, By, until } = require('selenium-webdriver');

(async function openPortal() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://www.saucedemo.com/');

    
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
    await new Promise(resolve => setTimeout(resolve, 1000));  // Espera 10 segundos (10000 milisegundos)

    //let tituloActual = driver.getTitle();
    let tituloEsperado = "Products";
    let Titulo_obtenido = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div[2]/span'))
    let Text_tittle = await Titulo_obtenido.getText();
    //Assert.assertEquals(tituloActual, tituloEsperado, "El título no coincide con el esperado");

    if(Text_tittle === tituloEsperado) {
      console.log("Acceso al portal de manera correcta.");
    } else {
      console.log("no pudo acceder al portal", tituloActual,"Error:", Text_tittle);
     
    }

  } finally {
    await driver.quit(); // cerrar navegador si quieres
  }
})();
