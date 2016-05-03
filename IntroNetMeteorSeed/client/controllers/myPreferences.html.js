/**
 * Created by brand on 5/1/2016.
 */
Template.myPreferences.helpers({
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