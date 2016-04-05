/**
 * Created by Chas on 4/3/16.
 */
if(Meteor.isServer){
    Meteor.methods({
        'userCreate': function(user){
            Accounts.createUser({
                username: user.username,
                email:user.email,
                password:user.password,
                profile:{
                    name:user.profile.actualName
                }
            });
        }
    });
}