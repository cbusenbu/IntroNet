/**
 * Created by Chas on 4/24/16.
 */
if(Meteor.isServer){
    Meteor.methods({
        'updateFromUserProfile': function(userUpdate) {
            console.log("user update reached");
            if (userUpdate.actualName != "") {
                Meteor.users.update(Meteor.userId(), {$set: {"profile.name": userUpdate.actualName}});
            }
            if (userUpdate.biography != "") {
                Meteor.users.update(Meteor.userId(), {$set: {"profile.biography": userUpdate.biography}});
            }
            if (userUpdate.iceBreakers != "") {
                Meteor.users.update(Meteor.userId(), {$set: {"profile.iceBreakers": userUpdate.iceBreakers}});
            }
        }

    })
}