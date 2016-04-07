/**
 * Created by Chas on 4/6/16.
 */
Template.loginUserTemplate.events({
    'submit form' (event, template){
        event.preventDefault();

        let eventObject = {

            eventName: template.find("[name = 'eventName']").value,
            eventLocation: template.find("[name = 'eventLocation']").value,
            startDate: template.find("[name = 'startDate']").value,
            endDate: template.find("[name = 'endDate']").value,
            activityCount: template.find("[name = 'activityCount']").value,
            activityLength: template.find("[name = 'activityLength']").value,
            totalTime: template.find("[name = 'totalTime']").value,
            breakLength: template.find("[name = 'breakLength']").value,
            minParticipants: template.find("[name = 'minParticipants']").value,
            sessionCount: template.find("[name = 'sessionCount']").value

        };


    }
});