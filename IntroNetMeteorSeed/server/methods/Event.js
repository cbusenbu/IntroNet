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

            var eventDetailsURL ="eventDetails/"+tempId;
            var eventAttendeesURL = "manageAttendees/"+tempId;
            var schedulesURL = "eventSchedules/"+tempId;
            var eventTimerURL = "stopWatch/"+tempId;
            Events.update({_id:tempId}, {$addToSet: {"eventDetailsURL": eventDetailsURL}});
            Events.update({_id:tempId},{$addToSet: {"eventAttendeesURL": eventAttendeesURL}});
            Events.update({_id: tempId}, {$addToSet: {"schedulesURL": schedulesURL}});
            Events.update({_id: tempId}, {$addToSet: {"eventTimerURL": eventTimerURL}});
            
            return tempId;
            

        },
        'addEventToOwner': function(userID,eventID){
            Meteor.users.update({_id: userID}, {$addToSet: { "profile.eventsOwned" : eventID}});
        },

        'modifyEvent': function(eventID, changes){
            Events.update(eventID, changes);
        },

        'getEventsByOwner': function(ownerID){
            var eventsOwned = Events.find({creatorID: ownerID}).fetch();
            return eventsOwned;


        },

        'getEventById': function(eventID){

            var eventToReturn = Events.findOne({_id: eventID});
            return eventToReturn;
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
