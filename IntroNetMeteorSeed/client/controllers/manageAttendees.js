/**
 * Created by brand on 5/2/2016.
 */
Template.manageAttendees.helpers({
    attendees : function(){
        return Meteor.users.find({}).fetch();
    }
});