/**
 * Created by Chas on 4/6/16.
 */
ApplicationController= RouteController.extend({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'

});

Router.configure({
    controller: 'ApplicationController'
});

Router.route('/', function () {
    this.render('home');
});

Router.route('/allSchedules/:_id',{
    subscriptions: function(){
        return Meteor.subscribe('eventById',this.params._id);
    },
    action: function() {
        if(this.ready()) {
            this.render('allSchedules');
        }else{
            this.render('loadings');
        }
    }
});

Router.route('/eventDetails/:_id',{
    subscriptions: function(){
        return Meteor.subscribe('eventById',this.params._id);
    },
    action: function(){
        if(this.ready()){
            this.render('eventDetails');
        }else{
            this.render('loading');
        }
    }
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

Router.route('/eventRegistrationMany/:_id',{
    subscriptions: function() {
        return Meteor.subscribe('eventById',this.params._id);
    },
    action:function(){
        if(this.ready()){
            this.render('eventRegistrationMany');
        }else{
            this.render('loading');
        }
    }
});

Router.route('/eventRegistrationOne/:_id',{
    subscriptions: function() {
        return Meteor.subscribe('eventById',this.params._id);
    },
    action:function(){
        if(this.ready()){
            var eventObject = Events.find().fetch();
            var timerCount = eventObject[0].activityLength *60;
            Session.set('thisEventTime',timerCount);
            this.render('eventRegistrationOne');
        }else{
            this.render('loading');
        }
    },
    data:function(){
        Session.set('eventRegOneID',this.params._id);
    }
});

Router.route('/eventsAttending', {
    path: '/eventsAttending',
    template: 'eventsAttending',
    subscriptions: function() {
        Meteor.subscribe('eventsByAttendee');
    },

    action:function(){
        if(this.ready()){
            this.render();
        }else{
            this.render('loading');
        }
    }
});

Router.route( 'eventsOwned', {
    path: '/eventsOwned',
    template: 'eventsOwned',
    subscriptions: function() {
        return Meteor.subscribe('eventsByOwner');
    },

    action:function(){
        if(this.ready()){
            this.render();
        }else{
            this.render('loading');
        }
    }
});

Router.route('/home', function (){
    this.render('home');
});

Router.route('/joinEvent', function () {
    this.render('joinEvent')
});

Router.route('/login', function (){
    this.render('loginUserTemplate');
    this.layout('blankLayout');
});

Router.route('/manageAttendees/:_id',{
    subscriptions: function() {
        return Meteor.subscribe('eventAttendees',this.params._id);
    },
    action: function(){
        if(this.ready)
            this.render('manageAttendees');
        else
            this.render('loading');
    }
});

Router.route('/myPreferences/:_id',{
    subscriptions: function() {
        return Meteor.subscribe('eventById',this.params._id);
    },
    action: function() {
        if(this.ready())
            this.render('myPreferences');
        else
            this.render('loading');
    }
});

Router.route('/mySchedule/:_id',{
    subscriptions: function() {
        return Meteor.subscribe('eventById',this.params._id);
    },
    action: function() {
        if (this.ready())
            this.render('mySchedule');
        else
            this.render('loading');
    }
});

Router.route('/newEvent', function (){
    this.render('newEvent');
});

Router.route('/newOneToManyEvent', function(){
    this.render('newOneToManyEvent')
});

Router.route('/newOneToOneEvent', function(){
    Session.set("preferenceSettings",[]);
    this.render('newOneToOneEvent')
});

Router.route('/onetoManyScheduler', function(){
    this.render('OnetoManyScheduler')
});

Router.route('/onetoOneScheduler', function(){
    this.render('OnetoOneScheduler')
});

Router.route('/register', function(){
    this.render('registerUser');
    this.layout('blankLayout');
});

Router.route('/stopWatch/:_id',{
    subscriptions: function() {
        return Meteor.subscribe('eventById',this.params._id);
    },
    action: function(){
        var timerEvent = Events.find().fetch();
        var timerCount = timerEvent.activityLength * 60;
        Session.set('thisEventTime', timerCount);

        if(this.ready) {

            this.render('stopWatch');
        }
        else
            this.render('loading');
    }
    
});

Router.route('/userProfile', function (){
    this.render('userProfile');
});

Router.route('/viewEventAttendees/:_id',{
    subscriptions: function() {
        return Meteor.subscribe('eventAttendees',this.params._id);
    },
    action: function(){
        if(this.ready)
            this.render('viewEventAttendees');
        else
            this.render('loading');
    }
});