
var home=require("../Pages/home.page.js")
var testData=require("../TestData/data.json")
describe('POM and TestData',()=>{
    it('Test case 2 - Login to the website with POM & DATA',()=>{
        browser.get("https://cybertek-reservation-qa.herokuapp.com/");

        home.email.sendKeys(testData.email);
        home.password.sendKeys(testData.password);
        home.signinButton.click();
        browser.sleep(2000);
        expect(home.title.getText()).toEqual("VA");
        browser.sleep(2000);


   
    })
})