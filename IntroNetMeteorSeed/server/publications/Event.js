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
    })
}