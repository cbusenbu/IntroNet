/**
 * Created by Chas on 4/6/16.
 */

if(Meteor.isServer){
    Meteor.methods({
        'insertEvent': function(event){
            
            var tempId =  Events.insert({
                creatorID: event.creatorID,
                createdAt: event.createdAt,
                oneToOne:event.oneToOne,
                oneToMany: event.oneToMany,
                name: event.eventName,
                location: event.eventLocation,
                startDate: event.startDate,
                endDate:event.endDate,
                activityCount: event.activityCount,
                activityLength: event.activityLength,
                totalTime: event.totalTime,
                breakLength: event.breakLength,
                attendees:[],
                schedules:[],
                registrations: [],
                preferenceSettings:event.preferenceSettings,
                session: event.sessions,
            });

            
            return tempId;
            

        },
        'addEventToOwner': function(eventID){
            Meteor.users.update({_id: Meteor.userId()}, {$addToSet: { "eventsOwned" : eventID}});
        },

        'addEventToAttendee': function( eventID){
            Meteor.users.update({_id: Meteor.userId()}, {$addToSet: { "eventsAttending": eventID}});
        },
        'addAttendeeToEvent': function(eventID){
            Events.update({_id: eventID}, {$addToSet:{"attendees": Meteor.userId()}});
        },
        'modifyEvent': function(eventID, changes){
            Events.update(eventID, changes);
        },

        'removeEvent': function(eventID){

            var currentEvent = Events.findOne({_id:eventID});
            var creator = currentEvent.creatorID;
            var eventAttendees = currentEvent.attendees

            Meteor.users.update({_id:creator}, {$pull: {eventsOwned : eventID}});

            for( attendee in eventAttendees){
                Meteor.users.update({_id:attendee}, {$pull: {eventsAttending:eventID}})
            };
            Events.remove({_id: eventID});
        },

        'isOwner': function(eventID){
            var event = Events.findOne({_id:eventID});
            return (event.creatorId == Meteor.userID());
        },

        'isAttendee': function(eventID){
            var event = Events.findOne({_id:eventID});
            var attendees = event.attendees;

            for(i=0; i <attendees.length;i++){
                if (attendees[i] == Meteor.userId()){
                    return true;
                }
            }
            return false;
        },
        
        'eventTypeCheck': function(eventID){
            var event= Events.findOne({_id:eventID});
            
            if (event.oneToOne == true){
                return 1;
            }
            else if(event.oneToMany ==true){
                return 2;
            }
            else{
                return 0;
            }
        },

        'addRegistrationToEvent':function(eventID,registrationObj){
            console.log(registrationObj);
            Events.update({_id: eventID},{$addToSet: {"registrations":registrationObj}});
        }
    })
}
