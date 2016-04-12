/**
 * Created by Chas on 4/11/16.
 */
Template.eventRegistrationOne.rendered = function(){

    console.log(Session.get('currentEventRegistration'));
};

Template.eventRegistrationOne.helpers({
    showEventName: function(){
        return Session.get('currentEventRegistration').name;
    },
    
    showLocation: function(){
        return Session.get('currentEventRegistration').location;
    },

    showStartDate: function(){
        return Session.get('currentEventRegistration').startDate;
    },

    showEndDate: function(){
        return Session.get('currentEventRegistration').endDate;
    }

});