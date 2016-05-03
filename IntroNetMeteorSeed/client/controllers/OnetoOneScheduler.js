Template.OnetoOneScheduler.events({
    'click #Sched1': function(event) {
        event.preventDefault();
        OnetoOneSchedule();
    }
});

function OnetoOneSchedule(){
    var numUsers = 8;
    var numAct = 3;
    var listOfUsers = userList(numUsers);

    var handicap = handicapList();
    var meetings = meetMatrix(numUsers);

    //list for all users and their activities
    var userActivities = [];
    for(i=0; i<numUsers; i++){
        var temp = activities(i, 1, numAct);
        userActivities.push(temp);
    }

    var countAct = numPeopleAct(userActivities, numAct);
    while(countNum(meetings, numAct)==0) {
        var prefList = [];
        for (var i = 0; i < numUsers; i++) {
            var temp = preferences(i, numUsers);
            temp = userPref(i, temp);
            prefList.push(temp);
        }
        prefList = userOrderPref(prefList);
        notMeet(handicap, meetings);
        Schedule(meetings, numAct, 1, prefList, userActivities, countAct);
    }
    printMatrix(meetings);

    addSchedules(meetings, numAct, listOfUsers);
}

//schedule users to meet others
function Schedule(partSched, finalAct, currentAct, prefList, userActivities, numPeopleAct) {
    if (isComplete(numPeopleAct, partSched, finalAct) == true) return true;
    if (numPeopleAct[currentAct - 1] % 2 != 0 && countNum(partSched, currentAct) == 0) {
        partSched = findOddTriple(partSched, currentAct, prefList, userActivities, numPeopleAct);
    }
    var person = nextPerson(partSched, currentAct, userActivities);
    var tempList = prefList[person];
    for (p2 = 1; p2 < Object.keys(tempList).length; p2++) {
        var temp = tempList[p2];
        if (contains(userActivities[temp], currentAct)) {
            if (checkSched(partSched, person, temp, currentAct) == true) {
                partSched = setSched(partSched, person, temp, currentAct);
                if (isComplete(numPeopleAct, partSched, currentAct) == true) currentAct++;
                if (Schedule(partSched, finalAct, currentAct, prefList, userActivities, numPeopleAct))  return true;
                else {
                    partSched = setSched(partSched, person, temp, 0);
                }
            }
        }
    }
    return false;
}

//always find odd triple first
function findOddTriple(partSched, currentAct, prefList, userActivities, numPeopleAct){
    var index1 = 0, index2=0, index3=0;
    var min = 100;
    
    for(i=0; i<partSched.length; i++){
        if(contains(userActivities[i], currentAct)){
            var tempList = prefList[i];
            for(j=1; j<tempList.length; j++){
                var temp1 = tempList[j];
                if(contains(userActivities[temp1], currentAct) && temp1!=i){
                    var temp1List = prefList[temp1];
                    for(k=1; k<temp1List.length; k++){
                        var temp2 = temp1List[k];
                        if(contains(userActivities[temp2], currentAct) && temp2!=i && temp2!=temp1){
                            var temp2List  = prefList[temp2];
                            if(checkSched(partSched, i, temp1, currentAct)==true
                                && checkSched(partSched, i, temp2, currentAct)==true
                                && checkSched(partSched, temp1, temp2, currentAct)==true){
                                var value = tempList[temp1]+tempList[temp2]
                                    +temp1List[i]+temp1List[temp2]
                                    +temp2List[i]+temp2List[temp1];
                                console.log(value);
                                if(value<min){
                                    console.log(tempList+":"+temp1List+":"+temp2List)
                                    console.log(i+","+temp1+","+temp2);
                                    min = value;
                                    index1 = i;
                                    index2 = temp1;
                                    index3 = temp2;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(index1+","+index2+","+index3);
    partSched = setSched(partSched, index1, index2, currentAct);
    partSched = setSched(partSched, index1, index3, currentAct);
    partSched = setSched(partSched, index2, index3, currentAct);
    return partSched;
}

//matrix to hold when two users are meeting
function meetMatrix(length) {
    var temp = [length]
    for(i=0; i<length; i++){
        temp[i] = [length];
    }
    //var temp = [length][length];
    for(i=0;i<length;i++) {
        for(j=0;j<length;j++) {
            if(i==j) temp[i][j] = -1;
            else temp[i][j]=0;
        }
    }
    return temp;
}

//list of number of people at each activity
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

//list of all activities attended by each user
function activityList(numUsers, listOfActivities, userActivites){
    for(i=0; i<numUsers; i++){
        var temp = activities(i, listOfActivities[i][0], listOfActivities[i][1]);
        userActivities.push(i, temp);
    }
    return userActivities;
}

//just a list to simulate if users are handicapped
function handicapList(){
    var temp = [];
    temp.push(0);
    //temp.push(7);
    return temp;
}

//list of what activities a single user will be at
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
        var temp = prefList[i].slice(1, prefList.length+1);
        while(order.length<temp.length){
            var max = -10;
            var index = -10;
            for(k=0; k<temp.length; k++){
                if(!contains(order, k)){
                    if(temp[k]==-1){
                        continue;
                    }
                    else{
                        if(temp[k]>max){
                            max = temp[k];
                            index = k;
                        }
                        else if(temp[k]==max){
                            if(prefList[k][i+1]>prefList[index][i+1]){
                                max = temp[k];
                                index = k;
                            }
                        }
                    }
                }
            }
            order.push(index);
        }
        newPrefList.push(order);
    }
    return newPrefList;
}

//Make it so no two handicap people are matched
function notMeet(handicapList, meetings){
    for(i=0;i<meetings.length;i++){
        if(contains(handicapList, i)){
            for(j=i;j<meetings.length;j++){
                if(contains(handicapList, j) && i!=j){
                    if(i<j) meetings[i][j] = -1;
                    else meetings[j][i] = -1;
                }
            }
        }
    }
}

//pick the next person in line to schedule
function nextPerson(partSched, currentAct, userActivities){
    var j = -1;
    for(n=0; n<partSched.length; n++){
        var len = userActivities[n].length;
        if(contains(userActivities[n].slice(1,len), currentAct)){
            if(inRorC(partSched, n, currentAct)==false){
                j=n;
                n = partSched.length;
            }
        }
    }
    return j;
}

/*set schedule for two people at a certain activity*/
function setSched(schedule, p1, p2, numAct){
    if(p1>p2) schedule[p2][p1] = numAct;
    else schedule[p1][p2] = numAct;
    return schedule;
}

//check to see that 0 is in the matrix at the point of question
function checkSched(schedule, p1, p2, numAct){
    if(p1>p2){
        if(schedule[p2][p1]==0 && inRorC(schedule, p2, numAct)==false) return true;
        else return false;
    }
    else{
        if(schedule[p1][p2]==0 && inRorC(schedule, p2, numAct)==false) return true;
        else return false;
    }
}

/*find if activity number for other person (p2) is in row or column for p2*/
function inRorC(schedule, p2, numAct){
    var check = false;
    var tempList = schedule[p2]; /*row for p2*/
    if(!contains(tempList, numAct)){
        for(i=0; i<p2; i++){
            if(schedule[i][p2]==numAct){
                check=true;
                i = p2;
            }
            else check=false;
        }
    }
    else check=true;
    return check;
}

function isComplete(numPeopleAct, partSchedule, numAct){
    if(numPeopleAct[numAct-1]%2==0){
        if(countNum(partSchedule, numAct)==numPeopleAct[numAct-1]/2) return true;
        else return false;
    }
    else{
        if(countNum(partSchedule, numAct)==(numPeopleAct[numAct-1]-1)/2+2) return true;
        else return false;
    }
}

function countNum(meetings, numAct){
    var temp = 0;
    for(i=0; i<meetings.length; i++){
        for(j=0; j<meetings.length; j++){
            if(meetings[i][j]==numAct) temp++;
        }
    }
    return temp;
}

function contains(arr, val){
    return (arr.indexOf(val) != -1);
}

//random preferences
function preferences(user, numUsers){
    var temp = [];
    for(i=0;i<numUsers;i++){
        if(i==user) temp.push(-1);
        else {
            var k = Math.floor(Math.random() * 6)
            temp.push(k);
        }
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

function userList(numUsers){
    var temp = [];
    for(i=0; i<numUsers; i++){
        temp.push("User "+(i+1));
    }
    return temp;
}

function addSchedules(schedule, numAct, userList){
    var table = document.getElementById("Schedules").innerHTML;;
    for(i=0; i<schedule.length; i++){
        for(j=1; j<numAct+1; j++){
            //var person = i+1;
            var person = userList[i];
            var activity = j;
            //var meeting = findIndex(schedule, i, j)+1;
            var meeting = userList[findIndex(schedule, i, j)];
            table+="<tr><td>"+person+"</td><td>"+activity+"</td><td>"+meeting+"</td></tr>";
        }
        table+="<tr><td>"+" "+"</td><td>"+" "+"</td><td>"+" "+"</td></tr>";
    }
    document.getElementById("Schedules").innerHTML = table;
}

//find index of meetings between a person and others for an activity
function findIndex(schedule, p1, numAct) {
    for (p2 = 0; p2 < schedule.length; p2++) {
        if (p1 > p2) {
            if (schedule[p2][p1] == numAct) return p2;
        }
        else {
            if (schedule[p1][p2] == numAct) return p2;
        }
    }
    return -1;
}