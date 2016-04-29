/**
 * Created by Chas on 4/8/16.
 */
function isValidForm(){
    console.log("Validation stage reached")
    return true;
};

Template.newOneToOneEvent.events({
    'click #addPreference': function(event){
        event.preventDefault();
        console.log("preference button-click registered");
        let name = document.getElementById("newPrefName").value;
        let options = document.getElementById("newPrefOptions").value;
        let type = "";
        if (document.getElementById('likeMe').checked)
            type = "(Un)Like Me";
        else
            type = "Detailed";
        let tableText = document.getElementById('preferenceList').innerHTML;
        tableText += "<tr>";
        tableText += "<td>" + name + "</td>";
        tableText += "<td>" + options + "</td>";
        tableText += "<td>" + type + "</td>";
        tableText += "</tr>";
        document.getElementById('preferenceList').innerHTML =tableText;
        document.getElementById("newPrefName").value = "";
        document.getElementById("newPrefOptions").value = "";
        $('#modal-form').modal('hide');
    },

    'click #setSessionCount': function(event){
        event.preventDefault();
        var sessionCount = document.getElementById('sessionCount').value;
        //console.log(sessionCount + " Sessions noted.");
        let innerHTMLString = "<tr><th>Session Number:</th><th>Session Start:</th><th>Number of Activities:</th></tr>"
        for(i = 1; i <= sessionCount; i++){
            innerHTMLString += "<tr>";
            innerHTMLString += "<td>" + i + "</td>";
            innerHTMLString += '<td><input type="date" id="sess' +i + 'Start"></td></td>';
            innerHTMLString += '<td><input type="number" min="0" id="sess'+i+'Count"></td>';
            innerHTMLString += "</tr>";
        }
        document.getElementById('sessionPicker').innerHTML = innerHTMLString;
    },

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
            document.getElementById('minParticipants').textContent = Number(activityCount) + 2 - (activityCount % 2);
        }
        else if(activityCount!='' && totalTime!=''){
            activityLength = Math.floor((Number(totalTime) + Number(breakLength)) / activityCount - breakLength);
            totalTime = (Number(activityLength) + Number(breakLength)) * activityCount - breakLength;
            document.getElementById('actvtyLength').value = activityLength;
            document.getElementById('totalTime').value = totalTime;
            document.getElementById('minParticipants').textContent = Number(activityCount) + 2 - (activityCount % 2);
        }
        else if(activityLength!='' && totalTime!=''){
            activityCount = Math.floor((Number(totalTime) + Number(breakLength))/(Number(activityLength) + Number(breakLength)));
            totalTime = (Number(activityLength) + Number(breakLength)) * activityCount - breakLength;
            document.getElementById('actvtyCount').value = activityCount;
            document.getElementById('totalTime').value = totalTime;
            document.getElementById('minParticipants').textContent = Number(activityCount) + 2 - (activityCount % 2);
        }
        else{
            document.getElementById('minParticipants').textContent = '';
        }
    },

    'submit form' (event, template){
        event.preventDefault();

        if(isValidForm()){

            let eventObject = {
                creatorID: Meteor.userId(),
                createdAt: new Date(),
                oneToOne: true,
                oneToMany: false,
                eventName: template.find("[name = 'eventName']").value,
                eventLocation: template.find("[name = 'eventLocation']").value,
                startDate: template.find("[name = 'startDate']").value,
                endDate: template.find("[name = 'endDate']").value,
                activityCount: template.find("[name = 'activityCount']").value,
                activityLength: template.find("[name = 'activityLength']").value,
                totalTime: template.find("[name = 'totalTime']").value,
                breakLength: template.find("[name = 'breakLength']").value


            };

            Meteor.call('insertEvent', eventObject, function (error, result) {
                Meteor.call('addEventToOwner', Meteor.userId(), result)
            });
            console.log('insert noted')
        }

    }

});