/**
 * Created by Brandon on 4/30/2016.
 */
Template.joinEvent.events({

    'click #setSessionCount': function (event) {
        event.preventDefault();
        let id = document.getElementById("eventID").value;
        console.log("Attempting to Join Event " + id);
    },
});