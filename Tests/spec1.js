describe("UI/Frontend Testing",()=>{
    it('should Login',()=>{
        browser.get('https://cybertek-reservation-qa.herokuapp.com/')
        element(by.name('email')).sendKeys('efewtrell8c@craigslist.org')
        browser.sleep(1000)
        element(by.name('password')).sendKeys('jamesmay')
        element(by.css('.control>button')).click()
        browser.sleep(1000)
        expect($('.title').getText()).toEqual('VA')
        browser.sleep(1000)
      //  expect(browser.getCurrentUrl()).toEqual('https://cybertek-reservation-qa.herokuapp.com/map')
    });

    })
