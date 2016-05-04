Template.eventRegistrationMany.helpers({
    eventObject : function(){
        return Events.find();
    }
});

Template.eventRegistrationMany.events({

    'submit form': function(event,template){
        event.preventDefault();
        var eventObj = Events.find().fetch()[0];

        Meteor.call('isAttendee',eventObj._id,function(error,result){
            if(result){
                Session.set('isAttendee',true);
            }else{
                Session.set('isAttendee',false);
            }
        });

        if(!Session.get('isAttendee')){
            Meteor.call('addAttendeeToEvent',eventObj._id);
            Meteor.call('addEventToAttendee',eventObj._id);
            var registration = {
                attendeeId: Meteor.userId(),
                registrationTime : new Date(),
                arrivalDate: document.getElementById("lateArrivalDay").value,
                arrivalHour: document.getElementById("lateArrivalHour").value,
                arrivalMinutes:document.getElementById("lateArrivalMin").value,
                departureDate:document.getElementById("earlyDepartureDay").value,
                departureHour:document.getElementById("earlyDepartureHour").value,
                departureMinute:document.getElementById("earlyDepartureMin").value,
                preferences:[],
                isVIP:false,
            };
            Meteor.call('addRegistrationToEvent',eventObj._id,registration);

            if(document.getElementById("isPresenting").checked) {
                var presentation = {
                    presenter:Meteor.userId(),
                    presenterName:Meteor.user().profile.name,
                    title:document.getElementById("title").value,
                    abstract:document.getElementById("abstract").value
                }
                Meteor.call('addPresentationToEvent', eventObj._id, presentation);
            }
        }
        Router.go('eventsAttending');
    }
});