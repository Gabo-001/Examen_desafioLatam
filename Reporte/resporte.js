const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

let resultados = [];

function agregarResultado(nombreTest, estado, detalles = '', screenshotPath = '') {
  resultados.push({
    nombre: nombreTest,
    estado: estado,
    timestamp: new Date().toLocaleString(),
    detalles: detalles,
    screenshot: screenshotPath
  });
}

function generarReporteHTML() {
  let html = `
    <html><head><title>Reporte Pruebas</title><style>
    .passed {color: green; font-weight: bold;}
    .failed {color: red; font-weight: bold;}
    table {border-collapse: collapse; width: 100%;}
    th, td {border: 1px solid #ddd; padding: 8px;}
    </style></head><body>
    <h1>Reporte Pruebas Automatizadas</h1><table>
    <tr><th>Test</th><th>Estado</th><th>Tiempo</th><th>Detalle</th><th>Captura</th></tr>`;

  resultados.forEach(r => {
    html += `<tr>
    <td>${r.nombre}</td>
    <td class="${r.estado === 'PASSED' ? 'passed' : 'failed'}">${r.estado}</td>
    <td>${r.timestamp}</td>
    <td>${r.detalles}</td>
    <td>${r.screenshot ? `<img src="${r.screenshot}" width="200">` : 'N/A'}</td>
    </tr>`;
  });

  html += `</table></body></html>`;
  fs.writeFileSync(path.join(__dirname, 'reporte-pruebas.html'), html);
  console.log('Reporte generado: reporte-pruebas.html');
}

(async function openPortal() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    await driver.findElement(By.id('react-burger-menu-btn')).click();

    let menu1 = await driver.findElement(By.css('#inventory_sidebar_link'));
    let text_menu1 = await menu1.getText();
    await new Promise(resolve => setTimeout(resolve, 3000))

    const screenshotPath = `./screenshots/test_sidebar_${Date.now()}.png`;
    await driver.takeScreenshot().then(data => {
      fs.mkdirSync('./screenshots', { recursive: true });
      fs.writeFileSync(screenshotPath, data, 'base64');
    });

    if (text_menu1 === "All Items") {
      agregarResultado('Validar Sidebar All Items', 'PASSED', `Texto: "${text_menu1}"`, screenshotPath);
    } else {
      agregarResultado('Validar Sidebar All Items', 'FAILED', `Texto encontrado: "${text_menu1}"`, screenshotPath);
    }
  } catch (err) {
    agregarResultado('Prueba general', 'FAILED', err.message);
  } finally {
    await driver.quit();
    generarReporteHTML();
  }
})();
