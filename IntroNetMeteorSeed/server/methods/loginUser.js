/**
 * Created by Chas on 4/3/16.
 */
if(Meteor.isServer){
    Meteor.methods({
        'loginUser': function(user,forwardingPage){
            console.log('Made it into loginUser');

            Meteor.loginWithPassword(user.email,user.password);

            if (Meteor.user()){
                Router.render(forwardingPage);
            }
            else{
                Router.render('error');
            }
       
       
        },

        'logoutUser':function(){
            Meteor.logout();
        },
        'logoutAllClients': function(){
            Meteor.logoutOtherClients();
        }
    });
}