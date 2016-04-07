/**
 * Created by Chas on 4/6/16.
 */
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
    this.render('loginUserTemplate');
    this.layout('blankLayout');

});
Router.route('/register', function(){
    this.render('registerUser');
    this.layout('blankLayout');
});
Router.route('/', function () {
    Router.render('pageOne');
});

Router.route('/userProfile', function (){
    this.render('userProfile');
});

Router.route('/eventRegistrationOne', function (){
    this.render('eventRegistrationOne');
});

Router.route('/newEvent', function (){
    this.render('newEvent');
});

Router.route('/newOneToOneEvent', function(){
<<<<<<< HEAD
   this.render('newOneToOneEvent');
});

Router.route('/newOneToManyEvent', function(){
   this.render('newOneToManyEvent');
});
=======
    this.render('newOneToOneEvent')
});

Router.route('/newOneToManyEvent', function(){
    this.render('newOneToManyEvent')
});
>>>>>>> 06aef5e5ce0f33c7bed0c93dca123285eb5e88f3
