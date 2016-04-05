Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});

//
// Example pages routes
//

Router.route('/pageOne', function () {
    this.render('pageOne');
});

Router.route('/pageTwo', function () {
    this.render('pageTwo');
});

Router.route('/login', function (){
    this.render('login')
    this.layout('blankLayout')

});
Router.route('/register', function(){
    this.render('registerUser')
    this.layout('blankLayout')
});


Router.route('/userProfile', function (){
    this.render('userProfile');
});

Router.route('/eventSignUpOne', function (){
    this.render('eventSignUpOne');
});

Router.route('/newEvent', function (){
   this.render('newEvent');
});

