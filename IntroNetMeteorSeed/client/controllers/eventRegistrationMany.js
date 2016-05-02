Template.eventRegistrationMany.helpers({
    eventObject : function(){
        return Events.find();
    }
});

Template.eventRegistrationMany.events({
    'submit #signUp': function(event,template){
        var eventObj = Events.find().fetch()[0];

        Meteor.call('isAttendee',eventObj._id, function(error,result){
            if(result){
                Router.go('eventsAttending');
            }else{
                Meteor.call('addAttendeeToEvent',eventObj);
                Meteor.call('addEventToAttendee',eventObj);
                var registration = {
                    attendeeId: Meteor.userId(),
                    registrationTime : new Date(),
                    arrivalDate:Document.getElementById("lateArrivalDay").value,
                    arrivalHour:Document.getElementById("lateArrivalHour").value,
                    arrivalMinutes:Document.getElementById("lateArriveMin").value,
                    departureDate:Document.getElementById("earlyDepartureDay").value,
                    departureHour:Document.getElementById("earlyDepartureHour").value,
                    departureMinute:Document.getElementById("earlyDepartureMin").value,
                    preferences:[]
                }

                //(preferences not collected here for one-to-many events)
            }
        });
    }
});