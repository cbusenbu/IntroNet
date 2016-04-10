/**
 * Created by Chas on 4/6/16.
 */

if(Meteor.isServer){
    Meteor.methods({
        'insertEvent': function(event){
            Events.insert({
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
                breakLength: event.breakLength
            });

        }
    })
}
