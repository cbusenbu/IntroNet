/**
 * Created by Chas on 4/11/16.
 */

Template.eventRegistrationOne.helpers({
    eventObject : function(){
        return Events.find();
    }
});