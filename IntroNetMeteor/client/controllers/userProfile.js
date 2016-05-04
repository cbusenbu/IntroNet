/**
 * Created by Chas on 4/24/16.
 */
Template.userProfile.events({
    'submit form' (event, template){
        event.preventDefault();
        let userUpdate = {
            actualName: template.find("[name = 'name']").value,
            biography: template.find("[name = 'biography']").value,
            iceBreakers: template.find("[name = 'iceBreakers']").value,
            //emailReminders: template.find("[name = 'okayToEmail']").value,
        }
        console.log("before update call");
        Meteor.call('updateFromUserProfile',userUpdate);
        console.log("after update call");


    }
})