const { Builder } = require('selenium-webdriver');

const username = 'oauth-Gabriel.e.gonzalez-81807';
const accessKey = '91628844-1e1b-4302-b228-57ba01f96197';

const driver = new Builder()
  .withCapabilities({
    browserName: 'chrome',
    platformName: 'Windows 10',
    browserVersion: 'latest',
    'sauce:options': {
      username: username,
      accessKey: accessKey,
      build: 'Build-001',
      name: 'Mi primer test Sauce Labs',
    }
  })
  .usingServer(`https://${username}:${accessKey}@ondemand.saucelabs.com:443/wd/hub`)
  .build();

async function runTest() {
  try {
    await driver.get('https://www.example.com');
    // Aquí puedes agregar más pasos de prueba
  } finally {
    await driver.quit();
  }
}

runTest();
