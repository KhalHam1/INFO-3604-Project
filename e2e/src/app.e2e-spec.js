
//import puppeteer from 'puppeteer';

const puppeteerJestConfig = require("../../puppeteer-jest-config");


async function login(){
  if (page.url().includes('login') == false ) return 
  
  //Get email htmlElement & type 'test@gmail.com on click
  await page.waitForSelector('#email')
  await page.click('#email')
  await page.keyboard.type('test@gmail.com')
  
  //Get password htmlElement & type password on click
  await page.waitForSelector('#password')
  await page.click('#password')
  await page.keyboard.type('password')


  await page.waitForSelector('#login-button')
  await page.click('#login-button')
  

}

async function logout(){
  if (page.url().includes('login') == false ) return 

  await page.waitForSelector('#account_icon')
  await page.click('#account_icon')

  await page.waitForSelector('.cdk-overlay-connected-position-bounding-box > #cdk-overlay-4 > #mat-menu-panel-3 > .mat-menu-content > .cdk-focused')
  await page.click('.cdk-overlay-connected-position-bounding-box > #cdk-overlay-4 > #mat-menu-panel-3 > .mat-menu-content > .cdk-focused')
}

describe('Scheduler App', () => {
 
  beforeEach( async() => {
    
    if ( page.isClosed())
      browser.newPage()
    await page.goto(puppeteerJestConfig.globals.URL + 'login', {waitUntil: 'networkidle0'});
    
  });

  it('should have app title of "Scheduler App"', async() => {
    //await page.goto('http://localhost:4200', {waitUntil: 'domcontentloaded'});
    
    let title = await page.title()
    console.log( "Page Title", title)
    return expect(title).toEqual('Scheduler App');
  } );

  describe('Login Page Testcases', ()=>{
    it('1. should attempt to login  with invalid credentials and remain on login page', async()=>{
      //await page.goto(puppeteerJestConfig.globals.URL , {waitUntil: "load"})
      let firstURL = await page.url()
      console.log('Initial url: ', firstURL)
      //check if url is http://localhost:4200/login

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
      expect( page.url() ).toBe( firstURL )
      
      
    })

    it('2. should attempt to login  with valid credentials and and should navigate to "views/calendar" route', async()=>{
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

      //check if the currentnURL is the same as the first

      await page.waitForNavigation()
      expect( page.url() ).toBe( puppeteerJestConfig.globals.URL + 'views/calendar')
      
      
    })


    describe('Calendar Page', ()=>{
      it('3. should Schedule event on calendar page', async()=>{
        //await page.goto(puppeteerJestConfig.globals.URL , {waitUntil: "load"})

        // await login()
        // await page.waitForNavigation()

        // let firstURL = await page.url()
        // console.log('Initial url: ', firstURL)
        // //check if url is http://localhost:4200/login

        // expect(page.url() ).toBe(puppeteerJestConfig.globals.url + 'views/calendar')
  
        // await page.waitForSelector('.form_header')
        // const h1Handle = await page.$('.form_header');
        // const html = await page.evaluate(h1Handle => h1Handle.innerHTML, h1Handle);
        
        // expect(html).toBe("Semester Coursework Scheduler");
        
        // await page.waitForSelector('#email')
        // await page.click('#email')
        // await page.keyboard.type('test@gmail.com')
        // const emailHandle = await page.$('#email');
        // const email = await page.evaluate(emailHandle => emailHandle.value, emailHandle);
        
        // expect(email).toBe('test@gmail.com')
  
        // //Get password htmlElement & type password on click
        // await page.waitForSelector('#password')
        // await page.click('#password')
        // await page.keyboard.type('test')
        // const passwordHandle = await page.$('#password');
        // const password = await page.evaluate(emailHandle => emailHandle.value, passwordHandle);
        
        // expect(password).toBe('test')
  
        // await page.waitForSelector('#login-button')
        // await page.click('#login-button')
  
        
        
        
      })

      it('4. should recieve an event clash on event schedule', async()=>{

      })
  
    })


    describe( 'Course Page', ()=>{
      it('5. should display a list of courses ', async()=>{
        await login()

        let url = await page.url()
        //console.log('Test 5',  url)

        //open side nav
        await page.waitForSelector('#main-nav-bar > .w-100 > #menuButton ')
        await page.click('#main-nav-bar > .w-100 > #menuButton')

        //console.log('Test 5 - check 1')
        //click 'Course' button
        await page.waitForSelector('.mat-nav-list > a:nth-child(4) > .mat-list-item ')
        await page.$eval('.mat-nav-list > a:nth-child(4)', el => el.click() )

        //console.log('Test 5 - check 2')
        //await page.waitForNavigation()
        url = await page.url()
        //console.log('Test 5 - check 3')
        
        //check current page is Course page
        expect( url ).toBe( puppeteerJestConfig.globals.URL + 'views/courses')

        //console.log('Test 5 - check 4')
        //get list of items in course page
        await page.waitForSelector('.side > .mat-selection-list > .mat-list-item:nth-child(1) > .mat-list-item-content > .mat-list-text')
        let courseList = await page.$$('.side > .mat-selection-list > .mat-list-item:nth-child(1) > .mat-list-item-content > .mat-list-text')

        expect(courseList.length).toBeGreaterThan(0)

      })


      it( '6. should be able to Edit course information', async()=>{

        
        await login()
        let url =  page.url()
        //console.log('Test 6',  url)
        
        //open side nav
        //open side nav
        await page.waitForSelector('#main-nav-bar > .w-100 > #menuButton ')
        await page.click('#main-nav-bar > .w-100 > #menuButton')

        //click 'Course' button
        await page.waitForSelector('.mat-nav-list > a:nth-child(4) > .mat-list-item ')
        await page.$eval('.mat-nav-list > a:nth-child(4)', el => el.click() )

        
        url =  page.url()
        //check current page is Course page
        expect( url).toBe( puppeteerJestConfig.globals.URL + 'views/courses')

        //click first item
        await page.waitForSelector('.side > .mat-selection-list > .mat-list-item:nth-child(1) > .mat-list-item-content > .mat-list-text')
        await page.click('.side > .mat-selection-list > .mat-list-item:nth-child(1) ')

        //console.log('CHECK 1')

        //check for course name 
        await page.waitForSelector('.container > main > .ng-star-inserted > tr:nth-child(2) > td')
        let courseNameHTML = await page.$('.container > main > .ng-star-inserted > tr:nth-child(2) > td')
        let courseName = await page.evaluate(courseNameHTML => courseNameHTML.innerHTML , courseNameHTML)

        expect(courseName).toBeDefined()

        //console.log('CHECK 2')
        //click pencil icon to edit
        await page.waitForSelector('.ng-star-inserted > tr > th > .headingIcon > .mat-icon:nth-child(1)')
        await page.click('.ng-star-inserted > tr > th > .headingIcon > .mat-icon:nth-child(1)')


        //wait for modal overlay
        await page.waitForSelector('.cdk-overlay-container')
        await page.click('.cdk-overlay-container')
        

        //check modal title includes updating
        await page.waitForSelector('#mat-dialog-title-1')
        let modalTitleHTML = await page.$( '#mat-dialog-title-1' )
        let modalTitle = await page.evaluate(modalTitleHTML => modalTitleHTML.innerHTML , modalTitleHTML)

        expect(`${modalTitle}`.toLowerCase().includes('updating') ).toBe(true)

        //click input field 'x' icon to clear
        await page.waitForSelector('p:nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-focus-indicator > .mat-button-wrapper > .mat-icon')
        await page.click('p:nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-focus-indicator > .mat-button-wrapper > .mat-icon')

        //change course name
        await page.waitForSelector('input[name="courseName"]')
        await page.click('input[name="courseName"]')
        await page.keyboard.type(courseName + "2")

        //wait for modal action buttons & click
        await page.waitForSelector('.mat-dialog-actions')
        await page.click('.mat-dialog-actions > button:nth-child(1)')

        
        //wait for modal to close and course name reappears
        await page.waitForSelector('.container > main > .ng-star-inserted > tr:nth-child(2) > td')
        let courseName2HTML = await page.$('.container > main > .ng-star-inserted > tr:nth-child(2) > td')
        let courseName2 = await page.evaluate(courseName2HTML => courseName2HTML.innerHTML , courseName2HTML)

        expect(courseName2).toBe(courseName + "2")
      })

    })


    //describe( 'Degree', ()=>{})

    
    })

  afterEach( () => async () => {
    await logout()
    return page.close()
  });

  
  
});
