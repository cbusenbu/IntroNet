Template.OnetoManyScheduler.events({
    'click #SchedN': function(event) {
        event.preventDefault();
        OnetoManySchedule();
    }
});

function OnetoManySchedule() {
    var numUsers = 8;
    var numAct = 2;
    var numPosters = 4;
    //Max # of users for poster
    var max = 2 * numUsers / numPosters;

    var listOfUsers = userList(numUsers);
    var listOfPosters = posterList(numPosters);

    var meetings = meetMatrix(numUsers, numPosters);

    /*var userActivities = [];
     for(i=0; i<numUsers; i++){
     var temp = activities(i, 1, numAct);
     userActivities.push(temp);
     }
     printMatrix(userActivities);*/
    var userActivities = [];
    for (x = 0; x < numUsers; x++) {
        var temp = activities(x, 1, numAct);
        userActivities.push(temp);
    }
    var countAct = numPeopleAct(userActivities, numAct);
    while (countNum(meetings, numAct) == 0) {
        var prefList = [];
        for (y = 0; y < numUsers; y++) {
            var temp = preferences(y, numPosters);
            temp = userPref(y, temp);
            prefList.push(temp);
        }
        prefList = userOrderPref(prefList);
        Schedule(meetings, numAct, 1, prefList, userActivities, countAct, numUsers, max, numPosters);
    }
    printMatrix(meetings);

    addSchedules(meetings, numAct, listOfUsers, listOfPosters);
}

//schedule users for posters
function Schedule(partSched, finalAct, currentAct, prefList, userActivities, numPeopleAct, numUsers, max, numPosters){
    if(isComplete(numPeopleAct, partSched, finalAct)==true) return true;
    var person = nextPerson(partSched, currentAct, userActivities, numUsers);
    var count = numUsers - person;
    var tempList = prefList[person];
    for(p2=1; p2<Object.keys(tempList).length; p2++){
        var temp = tempList[p2];
        if(numEmptyPosters(partSched, currentAct)>=count) max = 1;
        if(checkSched(partSched, temp, person, currentAct, max)==true){
            partSched = setSched(partSched, temp, person, currentAct);
            if(isComplete(numPeopleAct, partSched, currentAct)==true) currentAct++;
            if(Schedule(partSched, finalAct, currentAct, prefList, userActivities, numPeopleAct, numUsers, max, numPosters))  return true;
            else partSched = setSched(partSched, temp, person, 0);
        }
    }
    return false;
}

//matrix to hold when users and posters: columns are user, rows are posters
function meetMatrix(numUsers, numPosters) {
    var temp = [numPosters]
    for(i=0; i<numPosters; i++){
        temp[i] = [numUsers];
    }
    for(i=0;i<numPosters;i++) {
        for(j=0;j<numUsers;j++) {
            temp[i][j] = 0;
        }
    }
    return temp;
}

//pick the next person in line to schedule
function nextPerson(partSched, currentAct, userActivities, numUsers){
    var j = -1;
    for(n=0; n<numUsers; n++){
        if(contains(userActivities[n],currentAct)){
            if(inC(partSched, n, currentAct)==false){
                j=n;
                n = numUsers;
            }
        }
    }
    return j;
}

//list of number of people for each activity
function numPeopleAct(userActivities, numActivities){
    var temp = [];
    var n=1;
    while(n<numActivities+1){
        var count = 0;
        for(i=0; i<userActivities.length; i++){
            if(contains(userActivities[i], n)) count++;
        }
        temp.push(count);
        n++;
    }
    return temp;
}

//list of what activities user will be at
function activities(user, start, end){
    var temp = [];
    temp.push(user);
    for(i=start; i<end+1; i++){
        temp.push(i);
    }
    return temp;
}

//list of preferences for users
function userPref(user, prefs){
    var temp = [];
    temp.push(user);
    for(i=0; i<prefs.length; i++){
        temp.push(prefs[i]);
    }
    return temp;
}

//list of order for each user on best preferences
function userOrderPref(prefList){
    var newPrefList = [];
    for(i=0; i<prefList.length; i++){
        var order = [];
        order.push(i);
        var temp = prefList[i].slice(1, prefList[i].length);
        while(order.length<temp.length+1){
            var max = -1;
            var index = -1;
            for(k=0; k<temp.length; k++){
                if(!contains(order.slice(1, order.length),k)){
                    if(temp[k]>max){
                        max = temp[k];
                        index = k;
                    }
                }
            }
            order.push(index);
        }
        newPrefList.push(order);
    }
    return newPrefList;
}

//set schedule for two people at a certain activity
function setSched(schedule, poster, person, numAct){
    schedule[poster][person] = numAct;
    return schedule;
}

//check to see that 0 is in the matrix at the point of question
function checkSched(schedule, poster, person, numAct, max){
    if(schedule[poster][person]==0 && inC(schedule, person, numAct)==false
        && checkPoster(max, schedule[poster], numAct)==false) return true;
    else return false;
}

function isComplete(numPeopleAct, partSchedule, numAct){
    if(countNum(partSchedule, numAct)==numPeopleAct[numAct-1]) return true;
    else return false;
}

function countNum(meetings, numAct){
    var temp = 0;
    for(i=0; i<meetings.length; i++){
        for(j=0; j<meetings[i].length; j++){
            if(meetings[i][j]==numAct) temp++;
        }
    }
    return temp;
}

//boolean check so number of users for a poster during a activity does not exceed max value
function checkPoster(max, poster, currentAct){
    var count = 0;
    for(i=0; i<poster.length; i++){
        if(poster[i]==currentAct) count++;
    }
    if(count<max) return false;
    else return true;
}

//number of empty posters
function numEmptyPosters(sched, currentAct){
    var count = 0;
    for(i=0; i<sched.length; i++){
        var tempList = sched[i];
        if(!contains(tempList, currentAct)) count++;
    }
    return count;
}

//check person for current activity
function inC(schedule, p, numAct){
    var check = false;
    for (i = 0; i < schedule.length; i++) {
        if (schedule[i][p] == numAct) {
            check = true;
            i = schedule.length;
        }
        else check = false;
    }
    return check;
}

function contains(arr, val){
    return (arr.indexOf(val) != -1);
}

//random preferences
function preferences(user, numPosters){
    var temp = [];
    for(i=0;i<numPosters;i++){
        var k=Math.floor(Math.random()*6)
        temp.push(k);
    }
    return temp;
}

function printMatrix(list) {
    for (i = 0; i < list.length; i++) {
        var msg = "";
        for (j = 0; j < list[i].length; j++) {
            msg += list[i][j] + " ";
        }
        console.log(msg);
    }
}

function addSchedules(schedule, numAct, userList, posterList){
    var table = document.getElementById("Schedules").innerHTML;
    for(i=0; i<schedule[0].length; i++){
        for(j=1; j<numAct+1; j++){
            //var person = i+1;
            var person = userList[i];
            var activity = j;
            //var meeting = findIndex(schedule, i, j)+1;
            var meeting = posterList[findIndex(schedule, i, j)];
            table+="<tr><td>"+person+"</td><td>"+activity+"</td><td>"+meeting+"</td></tr>";
        }
        table+="<tr><td>"+" "+"</td><td>"+" "+"</td><td>"+" "+"</td></tr>";
    }
    document.getElementById("Schedules").innerHTML = table;
}

//find index of meetings between a person and others for an activity
function findIndex(schedule, p1, numAct) {
    for (p2 = 0; p2 < schedule.length; p2++) {
        if(schedule[p2][p1]==numAct) return p2;
    }
    return -1;
}

function userList(numUsers){
    var temp = [];
    for(i=0; i<numUsers; i++){
        temp.push("User "+(i+1));
    }
    return temp;
}

function posterList(numPosters){
    var temp = [];
    for(i=0; i<numPosters; i++){
        temp.push("Poster "+(i+1));
    }
    return temp;
}