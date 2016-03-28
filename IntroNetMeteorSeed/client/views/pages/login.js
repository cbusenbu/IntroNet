/**
 * Created by Chas on 3/27/16.
 */
Template.login.events({
    'submit form': function(template,event){
        event.preventDefault();
        let user={
            email: template.find("[name = 'userEmail']").value,
            password: template.find("[name = 'userPassword']").value

        }
        Meteor.loginWithPassword(user.email, user.password);
        Router.go('/pageOne')
    }
});