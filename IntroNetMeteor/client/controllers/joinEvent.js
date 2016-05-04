/**
 * Created by Brandon on 4/30/2016.
 */
Template.joinEvent.events({

    'click #joinEv': function (event) {
        event.preventDefault();
        let id = document.getElementById("eventID").value;

        Meteor.call('eventTypeCheck', id, function(error,result){
            if(result == 1){
                Router.go('/eventRegistrationOne/'+id);
            }
            else if( result == 2){
                Router.go('/eventRegistrationMany/'+id);
            }
            else{
                document.getElementById("eventID").value = "";
            }
        })
    },
});