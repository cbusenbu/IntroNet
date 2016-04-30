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
                totalTime: event.totalTime,
                breakLength: event.breakLength,
                attendees:[],
                preference:[]
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
        }
    })
}
