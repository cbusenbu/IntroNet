/**
 * Created by Chas on 4/2/16.
 */
Events = new Mongo.collection('Events');

Tacos.allow({
    insert(){
        return false;
    },
    update(){
        return false;  
    },
    remove(){
        return false;
    }
});

Tacos.deny({
    insert(){
        return true;
    },
    update(){
        
    }
})