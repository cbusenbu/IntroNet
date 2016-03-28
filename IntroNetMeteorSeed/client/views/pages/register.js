/**
 * Created by Chas on 3/26/16.
 */
Template.registerUser.events({
    'submit form' (event, template){
        event.preventDefault();

        let user = {
                email: template.find("[name = 'userEmail']").value,
                password: template.find("[name = 'userPassword']").value
        };

        Accounts.createUser({
            email:user.email,
            password:user.password
        });
        console.log("You made it to after createNewUser")

    }
});