/**
 * Created by Chas on 4/29/16.
 */
Template.eventDetails.helpers({
    eventObject: function(){
        return Events.find();
    }
});
