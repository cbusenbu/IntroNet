/**
 * Created by Chas on 4/6/16.
 */
Template.newOneToManyEvent.events({
    'click #calcThirdParam': function(event){
        event.preventDefault();
        var activityCount = document.getElementById('actvtyCount').value;
        var activityLength = document.getElementById('actvtyLength').value;
        var breakLength = document.getElementById('breakLength').value;
        var totalTime = document.getElementById('totalTime').value;

        if(breakLength==''){
            console.log('break length cannot be empty')
            document.getElementById('minParticipants').textContent = '';
        }
        else if(activityCount!='' && activityLength!=''){
            totalTime = (Number(activityLength) + Number(breakLength)) * activityCount - breakLength;
            document.getElementById('totalTime').value = totalTime;
            document.getElementById('minParticipants').textContent = activityCount + " presenters, " + activityCount + " viewers";
        }
        else if(activityCount!='' && totalTime!=''){
            activityLength = Math.floor((Number(totalTime) + Number(breakLength)) / activityCount - breakLength);
            totalTime = (Number(activityLength) + Number(breakLength)) * activityCount - breakLength;
            document.getElementById('actvtyLength').value = activityLength;
            document.getElementById('totalTime').value = totalTime;
            document.getElementById('minParticipants').textContent = activityCount + " presenters, " + activityCount + " viewers";
        }
        else if(activityLength!='' && totalTime!=''){
            activityCount = Math.floor((Number(totalTime) + Number(breakLength))/(Number(activityLength) + Number(breakLength)));
            totalTime = (Number(activityLength) + Number(breakLength)) * activityCount - breakLength;
            document.getElementById('actvtyCount').value = activityCount;
            document.getElementById('totalTime').value = totalTime;
            document.getElementById('minParticipants').textContent = activityCount + " presenters, " + activityCount + " viewers";
        }
        else{
            document.getElementById('minParticipants').textContent = '';
        }
    },

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