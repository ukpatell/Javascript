// #1 - Age in Days

function ageInDays(){   
    var birthYear = prompt("What year were you born?"); // Input
    currentYear = new Date().getFullYear();             // Returns the current year
    var age = (currentYear-birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + age + ' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}
