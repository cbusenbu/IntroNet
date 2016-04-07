/**
 * Created by Chas on 4/6/16.
 */
/**
if(Meteor.isServer){
    Events = new Mongo.Collection('events');
    Meteor.methods({
        'insertEvent': function(event){
            Events.insert({
                creator: event.creator,

            })

        }
    })
}
**/