/**
 * Created by Chas on 4/26/16.
 */
Template.eventsOwned.helpers({
    'eventsByOwner': function(){
        return Session.get('eventsOwned');
    }


});