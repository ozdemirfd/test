var HomePage=function(){
this.email= element(by.name('email'))
this.password=element(by.name('password'))
this.signinButton= element(by.css('.control>button'))
this.title=$("app-hero-body .title")



}

module.exports=new HomePage()