/**
 * Created by Chas on 3/27/16.
 */
Template.loginUserTemplate.events({
    'submit form' (event, template){
        event.preventDefault();

        let user = {

            email: template.find("[name = 'userEmail']").value,
            password: template.find("[name = 'userPassword']").value

        };

        Meteor.loginWithPassword(user.email,user.password);
        if (Meteor.user()){
            Router.go('pageOne')
        }

    }
});