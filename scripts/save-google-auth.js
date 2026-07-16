const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://accounts.google.com/');
  console.log('Inicia sesión manualmente en la ventana del navegador.');
  console.log('Cuando termines, vuelve a esta terminal y pulsa ENTER para guardar el estado.');
  process.stdin.once('data', async () => {
    await context.storageState({ path: 'auth/google.json' });
    console.log('Estado guardado en auth/google.json');
    await browser.close();
    process.exit(0);
  });
})();
