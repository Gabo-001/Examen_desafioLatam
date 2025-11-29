const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

  const rutaArchivo = path.join(__dirname, 'data', 'fixture', 'Usuarios.json');
  const datosJSON = ft.readFileSync(rutaArchivo, 'utf8');
  const usuarios = JSON.parse(datosJSON);


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
    await driver.findElement(By.id('user-name')).sendKeys(usuarios.bueno.nombre);
    await driver.findElement(By.id('password')).sendKeys(usuarios.bueno.nombre);
    await driver.findElement(By.id('login-button')).click();

    //Setting Validaoion Login
    let tituloEsperado = "Products";
    let Titulo_obtenido = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div[2]/span'))
    let Text_tittle = await Titulo_obtenido.getText();
    //Cierre Setting Validacion Login

    const screenshotPath1 = `./screenshots/test_Login_${Date.now()}.png`;
    await driver.takeScreenshot().then(data => {
      fs.mkdirSync('./screenshots', { recursive: true });
      fs.writeFileSync(screenshotPath1, data, 'base64');
    });

    await driver.findElement(By.id('react-burger-menu-btn')).click();
    // Setting Validacion Menu Hamburguesa
    let menu1 = await driver.findElement(By.css('#inventory_sidebar_link'));
    let text_menu1 = await menu1.getText();

    let menu2 = await driver.findElement(By.css('#about_sidebar_link'));
    let text_menu2 = await menu2.getText();

    let menu3 = await driver.findElement(By.css('#logout_sidebar_link'));
    let text_menu3 = await menu3.getText();

    let menu4 = await driver.findElement(By.css('#reset_sidebar_link'));
    let text_menu4 = await menu4.getText();
    await new Promise(resolve => setTimeout(resolve, 3000))
    // Cierre Setting Validacion Menu Hamburguesa

    const screenshotPath = `./screenshots/test_sidebar_${Date.now()}.png`;
    await driver.takeScreenshot().then(data => {
      fs.mkdirSync('./screenshots', { recursive: true });
      fs.writeFileSync(screenshotPath, data, 'base64');
    });

    //Validacion Login
    if(Text_tittle === tituloEsperado) {
      agregarResultado('Login Pagina Principal', 'PASSED', `Texto: "${Text_tittle}"`, screenshotPath);
    } else {
      agregarResultado('Login Pagina Principal', 'FAILED', `Texto encontrado: "${Text_tittle}"`, screenshotPath);
    }

    //Validacion Menu Hamburguesa
    if (text_menu1 === "All Items") {
      agregarResultado('Validar Sidebar All Items', 'PASSED', `Texto: "${text_menu1}"`, screenshotPath);
    } else {
      agregarResultado('Validar Sidebar All Items', 'FAILED', `Texto encontrado: "${text_menu1}"`, screenshotPath);
    }
    if (text_menu2 === "About") {
      agregarResultado('Validar Sidebar About', 'PASSED', `Texto: "${text_menu2}"`, screenshotPath);
    } else {
      agregarResultado('Validar Sidebar About', 'FAILED', `Texto encontrado: "${text_menu2}"`, screenshotPath);
    }
     if (text_menu3 === "Logout") {
      agregarResultado('Validar Sidebar Logout', 'PASSED', `Texto: "${text_menu3}"`, screenshotPath);
    } else {
      agregarResultado('Validar Sidebar Logout', 'FAILED', `Texto encontrado: "${text_menu3}"`, screenshotPath);
    }
     if (text_menu4 === "Reset App State") {
      agregarResultado('Validar Sidebar Reset App State', 'PASSED', `Texto: "${text_menu4}"`, screenshotPath);
    } else {
      agregarResultado('Validar Sidebar Reset App State', 'FAILED', `Texto encontrado: "${text_menu4}"`, screenshotPath);
    }
  } catch (err) {
    agregarResultado('Prueba general', 'FAILED', err.message);
  } finally {
    await driver.quit();
    generarReporteHTML();
  }
})();
