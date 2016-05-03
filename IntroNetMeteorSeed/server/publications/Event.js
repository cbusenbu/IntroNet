/**
 * Created by Chas on 4/28/16.
 */
if(Meteor.isServer){
    Meteor.publish('eventsByOwner', function(){
        var currentUserID = this.userId;
        eventsOwned = Events.find({creatorID: currentUserID});

        if(eventsOwned){
            return eventsOwned
        }

        return this.ready();
    });

    Meteor.publish('eventsByAttendee',function(){
        var currentUserID = this.userId;
        eventsAttending = Events.find({attendees: { $in: [currentUserID]}});

        if(eventsAttending)
            return eventsAttending;

        return this.ready();
    });

    Meteor.publish('eventById', function(event_id){
        eventSpecific = Events.find({_id: event_id});


        if(eventSpecific){
            return eventSpecific;
        }
        return this.ready();
    });

    Meteor.publish('eventAttendees', function(event_id){
      usersAttending = Meteor.users.find({});
    });
    
}