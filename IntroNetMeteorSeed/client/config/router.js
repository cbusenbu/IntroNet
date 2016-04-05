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

//<<<<<<< HEAD
//=======
//Router.route('/newOneToOneEvent', function(){
//    this.render('newOneToOneEvent');
//});

//Router.route('/newOneToManyEvent', function(){
 //   this.render('newOneToManyEvent');
//});
//>>>>>>> d3d27cac042f4b96c336a3a5d0bf527c7ff9c293
//