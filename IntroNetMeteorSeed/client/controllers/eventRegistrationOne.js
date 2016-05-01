/**
 * Created by Chas on 4/11/16.
 */

Template.eventRegistrationOne.helpers({
    eventObject : function(){
        return Events.find();
    },

    isDetailedPreference: function(prefType){
        if(prefType == "Detailed"){
            return true;
        }else{
            return false;
        }
    }
});

Template.eventRegistrationOne.events({
    'submit #signUp': function(event,template){
        var eventObj = Events.find().fetch()[0];

        Meteor.call('isAttendee',eventObj._id, function(error,result){
            if(result){
                Meteor.call('addAttendeeToEvent',eventObj);
                Meteor.call('addEventToAttendee',eventObj)
            }else{
                Router.go('eventsAttending');
            }
        });

        
    }



});