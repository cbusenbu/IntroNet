/**
 * Created by Chas on 4/11/16.
 */

Template.eventRegistrationOne.helpers({
    eventObject : function(){
        return Events.find();
    },

    isDetailedPreference: function(prefType){
        if(prefType == "Detailed"){
            return true;
        }else{
            return false;
        }
    }
});

Template.eventRegistrationOne.events({
    'submit #signUp': function(event,template){
        var eventObj = Events.find().fetch()[0];

        Meteor.call('isAttendee',eventObj._id, function(error,result){
            if(result){
                Router.go('eventsAttending');

            }else{
                Meteor.call('addAttendeeToEvent',eventObj);
                Meteor.call('addEventToAttendee',eventObj);
                var registration = {
                    attendeeId: Meteor.userId(),
                    registrationTime : new Date(),
                    arrivalDate:Document.getElementById("lateArrivalDay").value,
                    arrivalHour:Document.getElementById("lateArrivalHour").value,
                    arrivalMinutes:Document.getElementById("lateArriveMin").value,
                    departureDate:Document.getElementById("earlyDepartureDay").value,
                    departureHour:Document.getElementById("earlyDepartureHour").value,
                    departureMinute:Document.getElementById("earlyDepartureMin").value,
                    handicapped:Document.getElementById("handicapped").checked,
                    preferences:[]
                }

                for( i = 0; i< eventObj.preferenceSettings.length;i++){
                    var prefName = eventObj.preferenceSettings[i].prefName;
                    var preference = {
                        prefName: prefName,
                        userCategory:Document.getElementById("userAttribute_"+prefName),
                        preferenceSelections:[]

                    };
                    if(eventObj.preferenceSettings[i].prefType == "Detailed"){
                        for(j=0; j< eventObj.preferenceSettings.prefOptions.length;j++){
                            var prefOpt = eventObj.preferenceSettings.prefOptions[j];
                            var checkboxArray = Document.getElementsByName("pref-"+prefName+"-"+prefOpt);
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
                        };
                    }else{
                        for(j = 0; j< eventObj.preferenceSettings.prefOptions.length; j++){
                            var prefOpt = eventObj.preferenceSettings.prefOptions[j];
                            var checkboxSameArray = Document.getElementsByName("pref-"+prefName+"-same");
                            var checkboxDiffArray = Document.getElementsByName("pref-"+prefName+"-diff");
                            if(prefOpt == prefName){
                                for( element in checkoutSameArray){
                                    if(element.checked){
                                        prefValueSame = element.value;
                                    }
                                }
                                var preferenceSelectSame = {
                                    categoryName: prefOpt,
                                    prefValue:prefValueSame
                                }
                                preference.preferenceSelections.push(preferenceSelectSame);

                            }else{
                                for(element in checkboxDiffArray){
                                    if(element.checked){
                                        prefValueDiff=element.value;
                                    }
                                }
                                var preferenceSelectDiff = {
                                    categoryname: prefOpt,
                                    prefValue:prefValueDiff
                                }
                                preference.preferenceSelections.push(preferenceSelectDiff);
                            }

                        }

                    }
                    Meteor.call('addRegistrationToEvent',eventObj._id,registration);

                    //else

                    
                }
            }
        });
    }
});