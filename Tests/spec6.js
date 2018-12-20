//Pages
var home        = require("../Pages/home.page.js");
var self        = require("../Pages/self.page.js");
var topNav      = require("../Pages/topNavigation.page.js");

//DB Connection
var pgp                 = require('pg-promise')(/*options*/);
var connectionString    = require("../TestData/dbConnection.js");
var queries             = require("../TestData/queries.js");

 var EC=protractor.ExpectedConditions;

describe('Login with DB Connection', () => {
    

    var db = pgp(connectionString);
    var arr=[];
    var username = '';
    var pass = '';

    it('Test Case 6- Backend Testing multiple users login information check', () => {
        
        //Fetch the data from database

        db.any(queries.q3)
        .then(function(result){
            arr=result;
            console.log(arr.length);
            //console.log(result.length);
           // username = result[1].email;
            //console.log(username);
           // pass = result[1].firstname.toLowerCase()+result[1].lastname.toLowerCase();
            //console.log(pass);

        }).catch(function(error){
            console.log(error);
        }).then(function(){
            //All UI automation Code
            arr.forEach(function(elementAsRow){
                username=elementAsRow.email
                pass=elementAsRow.firstname.toLowerCase()+elementAsRow.lastname.toLowerCase()

                browser.get("https://cybertek-reservation-qa5.herokuapp.com/");
                home.email.sendKeys(username);
                home.password.sendKeys(pass);
                home.signinButton.click();
                browser.wait(EC.presenceOf(home.title),6000);

                browser.actions().mouseMove(topNav.my).perform();
                browser.wait(EC.visibilityOf(topNav.self),3000);
                topNav.self.click();
                browser.wait(EC.presenceOf(self.updatePass),3000);

                expect(self.dataOnTable.get(0).getText()).toEqual(elementAsRow.firstname+" "+elementAsRow.lastname)
                expect(self.dataOnTable.get(1).getText()).toEqual(elementAsRow.role)
                expect(self.dataOnTable.get(2).getText()).toEqual(elementAsRow.teamname)
                expect(self.dataOnTable.get(3).getText()).toEqual("#"+elementAsRow.batchnumber)
                expect(self.dataOnTable.get(4).getText()).toEqual(elementAsRow.location)


                browser.actions().mouseMove(topNav.my).perform();
                browser.wait(EC.visibilityOf(topNav.signOut),3000);
                topNav.signOut.click();
            })

        })
    });
});