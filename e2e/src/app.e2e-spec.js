
//import puppeteer from 'puppeteer';

const puppeteerJestConfig = require("../../puppeteer-jest-config");


describe('Scheduler App', () => {
 
  beforeEach( async() => {
    
    
    await page.goto(puppeteerJestConfig.globals.URL, {waitUntil: 'domcontentloaded'});
    
  });

  it('should have app title of "Scheduler App"', async() => {
    //await page.goto('http://localhost:4200', {waitUntil: 'domcontentloaded'});
    
    let title = await page.title()
    console.log( "Page Title", title)
    return expect(title).toEqual('Scheduler App');
  } );

  describe('Login Page Testcases', ()=>{
    it('1.0 should attempt to login  with invalid credentials and remain on login page', async()=>{
      //await page.goto(puppeteerJestConfig.globals.URL , {waitUntil: "load"})
      let firstURL = await page.url()
      console.log('Initial url: ', firstURL)
      //check if url is http://localhost:4200/login
      

      let passwordClass = '.loginContainer > form > .login-fields > ' + 'input#password'
      let emailClass = '.loginContainer > form > .login-fields > ' + 'input#email'

      await page.waitForSelector('.form_header')
      const h1Handle = await page.$('.form_header');
      const html = await page.evaluate(h1Handle => h1Handle.innerHTML, h1Handle);
      
      expect(html).toBe("Semester Coursework Scheduler");
      
      await page.waitForSelector('#email')
      await page.click('#email')
      await page.keyboard.type('test@gmail.com')
      const emailHandle = await page.$('#email');
      const email = await page.evaluate(emailHandle => emailHandle.value, emailHandle);
      
      expect(email).toBe('test@gmail.com')

      //Get password htmlElement & type password on click
      await page.waitForSelector('#password')
      await page.click('#password')
      await page.keyboard.type('test')
      const passwordHandle = await page.$('#password');
      const password = await page.evaluate(emailHandle => emailHandle.value, passwordHandle);
      
      expect(password).toBe('test')

      await page.waitForSelector('#login-button')
      await page.click('#login-button')

      //get toast message
      // await page.waitForSelector('div > div > .ng-star-inserted > .hot-toast-bar-base-container > .hot-toast-bar-base')
      // const toastElement = await page.$('div > div > .ng-star-inserted > .hot-toast-bar-base-container > .hot-toast-bar-base ');
      // const toastText = await page.evaluate(toastElement => toastElement.innerHTML, toastElement);
      
      // toastElement.dispose()
      // expect(toastText).toBe('error')

      //check if the currentnURL is the same as the first
      expect( page.url() ).toBe( firstURL + 'login')
      
      
    })

    it('1.1 should attempt to login  with valid credentials and and should navigate to "views/calendar"', async()=>{
      //await page.goto(puppeteerJestConfig.globals.URL , {waitUntil: "load"})
      let firstURL = await page.url()
      console.log('Initial url: ', firstURL)
      //check if url is http://localhost:4200/login
      

      let passwordClass = '.loginContainer > form > .login-fields > ' + 'input#password'
      let emailClass = '.loginContainer > form > .login-fields > ' + 'input#email'

      await page.waitForSelector('.form_header')
      const h1Handle = await page.$('.form_header');
      const html = await page.evaluate(h1Handle => h1Handle.innerHTML, h1Handle);
      
      expect(html).toBe("Semester Coursework Scheduler");
      
      await page.waitForSelector('#email')
      await page.click('#email')
      await page.keyboard.type('test@gmail.com')
      const emailHandle = await page.$('#email');
      const email = await page.evaluate(emailHandle => emailHandle.value, emailHandle);
      
      expect(email).toBe('test@gmail.com')

      //Get password htmlElement & type password on click
      await page.waitForSelector('#password')
      await page.click('#password')
      await page.keyboard.type('password')
      const passwordHandle = await page.$('#password');
      const password = await page.evaluate(emailHandle => emailHandle.value, passwordHandle);
      
      expect(password).toBe('password')

      await page.waitForSelector('#login-button')
      await page.click('#login-button')

      //get toast message
      // await page.waitForSelector('div > div > .ng-star-inserted > .hot-toast-bar-base-container > .hot-toast-bar-base')
      // const toastElement = await page.$('div > div > .ng-star-inserted > .hot-toast-bar-base-container > .hot-toast-bar-base ');
      // const toastText = await page.evaluate(toastElement => toastElement.innerHTML, toastElement);
      
      // toastElement.dispose()
      // expect(toastText).toBe('error')

      //check if the currentnURL is the same as the first

      await page.waitForNavigation()
      expect( page.url() ).toBe( puppeteerJestConfig.globals.URL + 'views/calendar')
      
      
    })


    
  })

  afterEach( () => async () => {
    return await browser.close();
  });
});
