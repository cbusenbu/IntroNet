/**
 * Created by Chas on 4/11/16.
 */

Template.eventRegistrationOne.helpers({
    eventObject : function(){
        return Events.find()
    },

    isDetailedPreference: function(prefType) {
        return (prefType == "Detailed")
    }


});

Template.eventRegistrationOne.events({

    'submit form': function(event,template){
        event.preventDefault();
        var eventObj = Events.find().fetch()[0];

        Meteor.call('isAttendee',eventObj._id,function(error,result){
            console.log(result);
            if(result){
                Session.set('isAttendee',true);
            }else{
                Session.set('isAttendee',false);
            }
        });

        if(!Session.get('isAttendee')){
            Meteor.call('addAttendeeToEvent',eventObj._id);
            Meteor.call('addEventToAttendee',eventObj._id);
            var registration = {
                attendeeId: Meteor.userId(),
                registrationTime : new Date(),
                arrivalDate: document.getElementById("lateArrivalDay").value,
                arrivalHour: document.getElementById("lateArrivalHour").value,
                arrivalMinutes:document.getElementById("lateArrivalMin").value,
                departureDate:document.getElementById("earlyDepartureDay").value,
                departureHour:document.getElementById("earlyDepartureHour").value,
                departureMinute:document.getElementById("earlyDepartureMin").value,
                handicapped:document.getElementById("handicapped").checked,
                preferences:[]
            };

            for( i = 0; i< eventObj.preferenceSettings.length;i++){
                var prefName = eventObj.preferenceSettings[i].prefName;
                var preference = {
                    prefName: prefName,
                    userCategory:document.getElementById("userAttribute_"+prefName).value,
                    preferenceSelections:[]

                };
                console.log(preference);
                if(eventObj.preferenceSettings[i].prefType == "Detailed"){
                    for(j=0; j< eventObj.preferenceSettings[i].prefOptions.length;j++){
                        var prefOpt = eventObj.preferenceSettings[i].prefOptions[j];
                        var checkboxArray = document.getElementsByName("pref-"+prefName+"-"+prefOpt);
                        var prefValue = "";
                        for(element in checkboxArray){
                            if(element.checked){
                                prefValue = element.value;
                            }
                        }

                        var preferenceSelect = {
                            categoryName: prefOpt,
                            prefValue:prefValue
                        }
                        preference.preferenceSelections.push(preferenceSelect);
                    }
                }

                else{
                    for(j = 0; j< eventObj.preferenceSettings[i].prefOptions.length; j++){
                        var prefOpt = eventObj.preferenceSettings[i].prefOptions[j];
                        var checkboxSameArray = document.getElementsByName("pref-"+prefName+"-same");
                        var checkboxDiffArray = document.getElementsByName("pref-"+prefName+"-diff");
                        if(prefOpt == prefName){
                            var prefValueSame = '';
                            for( element in checkboxSameArray){
                                if(element.checked){
                                    prefValueSame = element.value;
                                }
                            }
                            var preferenceSelectSame = {
                                categoryName: prefOpt,
                                prefValue:prefValueSame
                            };
                            preference.preferenceSelections.push(preferenceSelectSame);

                        }
                        else{
                            var prefValueDiff = "";
                            for(element in checkboxDiffArray){
                                if(element.checked){
                                    prefValueDiff=element.value;
                                }
                            }
                            var preferenceSelectDiff = {
                                categoryName: prefOpt,
                                prefValue:prefValueDiff
                            };
                            preference.preferenceSelections.push(preferenceSelectDiff);
                        }

                    }


                }
                

                registration.preferences.push(preference);
                console.log("finished");
                console.log(registration);
                console.log(eventObj._id)
                


            }
            Meteor.call('addRegistrationToEvent',eventObj._id,registration);
        }
        Router.go('eventsAttending');
    }
});