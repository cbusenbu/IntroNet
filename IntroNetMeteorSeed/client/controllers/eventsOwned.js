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
Template.eventsOwned.events({

    'click #delete' : function(event,template){
        console.log("we got there");
        console.log(this._id);
        Meteor.call('removeEvent',this.id);
    }
})




