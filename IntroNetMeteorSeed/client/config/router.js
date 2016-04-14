/**
 * Created by Chas on 4/6/16.
 */
ApplicationController= RouteController.extend({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});


Router.configure({
    controller: 'ApplicationController'

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
    this.render('pageOne');
});

Router.route('/userProfile', function (){
    this.render('userProfile');
});
/*
Router.route('eventRegistration/:_id', function(){

    var eventByID = Meteor.apply('getEventById',this.params._id);
    console.log(eventByID);
    if (event.oneToOne == true){
        this.redirect('eventRegistrationOne/'+this.params._id);
    }else if(event.oneToMany == true){
        this.redirect('eventRegistrationMany/'+this.params._id);
    }
});

*/
Router.route('/eventRegistrationOne/:_id', function (){
    this.render('eventRegistrationOne',{
        data: function(){
            Meteor.call('getEventById',this.params._id,function(error,result){
                if(error){
                    alert('Error');
                }else{
                    Session.set('currentEventRegistration',result);
                }
            });
        }
    });

});

Router.route('/eventRegistrationMany/:_id', function (){
    this.render('eventRegistrationMany',{
        data: function(){
            Meteor.call('getEventById',this.params._id,function(error,result){
                if(error){
                    alert('Error');
                }else{
                    console.log(result);
                    Session.set('currentEventRegistration',result);
                }
            });
        }
    });
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