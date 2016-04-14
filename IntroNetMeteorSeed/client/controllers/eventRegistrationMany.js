/**
 * Created by Chas on 4/14/16.
 */
Template.eventRegistrationMany.rendered = function(){
    console.log(result);
};

Template.eventRegistrationMany.helpers({
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