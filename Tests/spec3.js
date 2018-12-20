//Pages
var home=require("../Pages/home.page.js")
//var testData=require("../TestData/data.json")

//DB Connection

var pgp=require('pg-promise')(/*options*/);
describe('Login & Database connection',()=>{
    var connectionString={
        host:'room-reservation-qa.cxvqfpt4mc2y.us-east-1.rds.amazonaws.com',
        port:5432,
        database:'room_reservation_qa',
        user:'qa_user',
        password:'Cybertek11!',
    }

    var array=[]
    var username='';
    var pass='';
    var db=pgp(connectionString);


    it('should bring data',()=>{
    db.any('select firstname,lastname from users')
    .then(result=>{
            array=result
    }).catch(error=>{
        console.log(error)
    }).then(function(){
        console.log(array)
    })
})


it('test case -3',()=>{
db.any(`SELECT email,firstname,lastname,role FROM users`)
            .then(result=>{
                array=result;
            })
            .catch(error=>{
                console.log(error);
            })
            .then(()=>{
                // All automation code will be here

                console.log(array);
            })

})


it('test case 4',()=>{
    db.any('select firstname,lastname,email from users').then(result=>{
 result.forEach(element => {
     console.log(element.firstname+ "   " +element.lastname+ " / " +element.email)    
        });
    }).catch(error=>{
        console.log(error)
    })
})
it('should display email, first_name,last_name, role and team name',()=>{
  db.any(`SELECT firstname,lastname,email,role,team.name as teamName
  FROM users join team 
  on users.team_id=team.id`).then(result=>{
      result.forEach(element=>{
       console.log(element)
        //   console.log(element.firstname+" " +element.lastname+ " / " +
        //   element.role+ " / " +element.email+ " / " +element.teamname)
      })
  }).catch(error=>{
      console.log(error)
  })

})
fit('test case-5 bring mail adres',()=>{
    db.any(`select firstname,lastname,email from users where email='efewtrell8c@craigslist.org'`)
.then(function(result){
    username=result[0].email;
    pass=result[0].firstname.toLowerCase()+result[0].lastname.toLowerCase();
    //console.log(pass)

}).catch(error=>{
    console.log(error)
}).then(function(){
// All UI automation code
// if do you wanna this one ,close data.jason
    browser.get("https://cybertek-reservation-qa.herokuapp.com/");
    home.email.sendKeys(username);
    home.password.sendKeys(pass);
    home.signinButton.click();
    browser.sleep(2000);
    expect(home.title.getText()).toEqual("VA");
    browser.sleep(2000);
})

})


})