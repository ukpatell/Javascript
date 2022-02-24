// #1 - Age in Days

function ageInDays(){
        currentYear = new Date().getFullYear();             // Returns the current year
        var birthYear = prompt("What year were you born?"); // Input
        if(birthYear <= 0 || birthYear > currentYear){
                reset();
            }
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
function resetImage(){
    document.getElementById("flex-animal-gen").innerHTML = ''
}
function generateAnimal(){
    var image = document.createElement('img');
    var div = document.getElementById("flex-animal-gen")
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif"
    div.appendChild(image);

}