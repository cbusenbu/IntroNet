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


    }
    
});