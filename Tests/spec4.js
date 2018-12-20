
//Pages
var home             = require("../Pages/home.page.js");
//var testData      = require("../TestData/data.json");

//DB Connection
var pgp                 = require('pg-promise')(/*options*/);
var connectionString    = require("../TestData/dbConnection.js");
var queries             = require("../TestData/queries.js");

describe('Login with DB Connection', () => {
    
    var db = pgp(connectionString);
    var arr=[];
    var username = '';
    var pass = '';

    it('Test Case 4- Connection String and Queries POM', () => {
        
        //Fetch the data from database

        db.any(queries.q1)
        .then(function(result){
            //console.log(result.length);
            username = result[0].email;
            //console.log(username);
            pass = result[0].firstname.toLowerCase()+result[0].lastname.toLowerCase();
            //console.log(pass);

        }).catch(function(error){
            console.log(error);
        }).then(function(){
            //All UI automation Code

            browser.get("https://cybertek-reservation-qa5.herokuapp.com/");
            home.email.sendKeys(username);
            home.password.sendKeys(pass);
            home.signinButton.click();
            browser.sleep(2000);
            expect(home.title.getText()).toEqual("VA");
            browser.sleep(2000);



        })
    });
});