/**
 * Created by Chas on 4/6/16.
 */
Template.newOneToManyEvent.events({
    'submit form' (event, template){
        event.preventDefault();

        let eventObject = {
            _id: new Mongo.ObjectID.valueOf(),
            creatorID: Meteor.userId(),
            createdAt: new Date(),
            oneToOne: false,
            oneToMany: true,
            eventName: template.find("[name = 'eventName']").value,
            eventLocation: template.find("[name = 'eventLocation']").value,
            startDate: template.find("[name = 'startDate']").value,
            endDate: template.find("[name = 'endDate']").value,
            activityCount: template.find("[name = 'activityCount']").value,
            activityLength: template.find("[name = 'activityLength']").value,
            totalTime: template.find("[name = 'totalTime']").value,
            breakLength: template.find("[name = 'breakLength']").value
            

        };

        Meteor.call('insertEvent',eventObject,function(error,result){
            Meteor.call('addEventToOwner', Meteor.userId(),result)
        });
        console.log('insert noted')

    }

});