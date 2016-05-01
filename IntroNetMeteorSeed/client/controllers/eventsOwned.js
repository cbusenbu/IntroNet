/**
 * Created by Chas on 4/26/16.
 */
Template.eventsOwned.helpers({
    eventsOfOwner: function(){
        return Events.find();
    },
    goToEventDetails: function(eventId){
        
    }

});
Template.eventsOwned.events({

    'click #delete' : function(event,template){
        Meteor.call('removeEvent',this.id);
    }
})




