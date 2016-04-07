/**
 * Created by Chas on 3/26/16.
 */
Template.registerUser.events({
    'submit form' (event, template){
        event.preventDefault();

        let user = {
                username: template.find("[name = 'userName']").value,
                email: template.find("[name = 'userEmail']").value,
                password: template.find("[name = 'userPassword']").value,
                profile: {
                    actualName: template.find("[name = 'Name']").value
                }
        };

        Meteor.call('userCreate',user);
        console.log("You made it to after createNewUser")

    }
});