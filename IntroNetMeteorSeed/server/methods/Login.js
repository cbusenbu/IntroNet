/**
 * Created by Chas on 4/3/16.
 */
if(Meteor.isServer){
    Meteor.methods({
        'loginUser': function(user){
            Meteor.loginWithPassword(user.email,user.password);
        },

        'logoutUser':function(){
            Meteor.logout();
        }
    });
}