/**
 * Created by Chas on 4/30/16.
 */
if(Meteor.isServer){
    Meteor.methods({
        'userCreate': function(user){
            Accounts.createUser({
                username: user.username,
                email:user.email,
                password:user.password,
                profile:{
                    name:user.profile.actualName,
                }
            });
        },

        'updateFromUserProfile': function(userUpdate) {
            if (userUpdate.actualName != "") {
                Meteor.users.update(Meteor.userId(), {$set: {"profile.name": userUpdate.actualName}});
            }
            if (userUpdate.biography != "") {
                Meteor.users.update(Meteor.userId(), {$set: {"profile.biography": userUpdate.biography}});
            }
            if (userUpdate.iceBreakers != "") {
                Meteor.users.update(Meteor.userId(), {$set: {"profile.iceBreakers": userUpdate.iceBreakers}});
            }
        },

        'userHasEvents': function(){
            var userObject = Meteor.user();
            if (userObject.eventsOwned  && (userObject.eventsOwned.length != 0)){
                return true;
            }
            else{
                return false;
            }
        },
        
        'userAttendingEvents': function(){
            var userObject = Meteor.user();
            if (userObject.eventsAttending && (userObject.eventsAttending.length!= 0)){
                return true;
            }else{
                return false;
            }
        }
    });
}