/**
 * Created by dxl71 on 4/7/2016.
 */
var countdown = new ReactiveCountdown(300);
//TODO:Make sure this countdown is dynamic based on event1

countdown.start(function(){

});
/*
Template.clock.onCreated(function(){
    var timerEvent = Events.find().fetch();
    var timerCount = timerEvent.activityLength * 60;

    countdown = new ReactiveCountdown(timerCount);
})
*/
Template.clock.helpers({
    time: function(){
        //return countdown.get();
        return Math.floor(countdown.get()/60) +":"+ countdown.get() %60;
    }
});
Template.clock.events({
    'click #reset' : function(){

        countdown.stop();
        countdown.start();
    },
    'click #stop': function(){
        countdown.stop();
        
    }
})