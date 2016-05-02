Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};

Template.navigation.helpers({
    
    hasEvents: function(){
        var deferred;
        Meteor.call('userHasEvents',function(error,result){
            //console.log(result);
            Session.set('ownsEvents',result);
        });
        return Session.get('ownsEvents');
    },
    
    attendingEvents: function() {
        var deferred;
        Meteor.call('userAttendingEvents',function(error,result){
            Session.set('isAttendingEvents',result);
        })
        return Session.get('isAttendingEvents');
    }
    
});