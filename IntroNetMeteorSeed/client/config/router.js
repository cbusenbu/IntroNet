/**
 * Created by Chas on 4/6/16.
 */
Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});


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
    this.render('newOneToOneEvent')
});

Router.route('/newOneToManyEvent', function(){
    this.render('newOneToManyEvent')
});

Router.route('/eventSignUp', function(){
    this.render('eventSignUp')
});

Router.route('/stopWatch', function(){
    this.render('stopWatch')
});

Router.route('/viewEventAttendees', function(){
    this.render('viewEventAttendees')
});

Router.route('/vipSettingList', function(){
    this.render('vipSettingList')
});