const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

async function runTest() {
  // Configuración para usar Firefox
  let options = new firefox.Options();
  // options.headless() // Descomenta para modo headless

  let driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();

  try {
    console.log('Abriendo Google...');
    await driver.get('https://www.google.com');

    // Espera que el título contenga 'Google'
    await driver.wait(until.titleContains('Google'), 5000);

    console.log('Navegando a Bing...');
    await driver.get('https://www.bing.com');

    await driver.wait(until.titleContains('Bing'), 5000);

    console.log('Prueba completada.');

  } finally {
    // Cierra el navegador
    await driver.quit();
  }
}

runTest().catch(console.error);
