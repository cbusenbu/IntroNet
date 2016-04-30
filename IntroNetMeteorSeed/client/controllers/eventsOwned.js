/**
 * Created by Chas on 4/26/16.
 */
Template.eventsOwned.helpers({
    eventsOfOwner: function(){
        return Events.find();
    },
    removeEvent: function(eventId){
        Meteor.call('removeEvent',eventId);
    },
    goToEventDetails: function(eventId){
        
    }

});




