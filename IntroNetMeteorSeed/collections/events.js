/**
 * Created by Chas on 4/2/16.
 */
Events = new Mongo.Collection( 'events' );
/*
Events.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; }
});

Events.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});
    */