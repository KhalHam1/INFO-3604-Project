
//import puppeteer from 'puppeteer';

const puppeteerJestConfig = require("../../puppeteer-jest-config");


describe('Scheduler App', () => {
 
  beforeEach( async() => {
    
    
    await page.goto(puppeteerJestConfig.globals.URL, {waitUntil: 'domcontentloaded'});
    
  });

  it('should display welcome message', async() => {
    //await page.goto('http://localhost:4200', {waitUntil: 'domcontentloaded'});
    let title = await page.title()
    console.log( "Page Title", title)
    return expect(title).toEqual('Scheduler App');
  } );

  afterEach( () => async () => {
    return await browser.close();
  });
});
