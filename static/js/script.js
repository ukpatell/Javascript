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

// #1 - Resets the Age
function reset(){
    document.getElementById('ageInDays').remove();
}

// #2 - Resets the Images
function resetImage(){
    document.getElementById("flex-animal-gen").innerHTML = ''
}

// #2 - Cat Images Generator
function generateAnimal(){
    var image = document.createElement('img');
    var div = document.getElementById("flex-animal-gen")
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif"
    div.appendChild(image);
}

// #3 - Rock, Paper, Scissors
function rpsGame(choice){
    userChoice = choice.id;
    botChoice = botChoiceFunc();
    result = winCalculation(userChoice, botChoice);
    message = finalMessage(result);
    finalFront(userChoice,botChoice,message);
}

// #3 - Bot Choice Randomizer
function botChoiceFunc(){
    return ['rock','paper','scissors'][Math.floor(Math.random() * 3)]
}

// #3 - Winner Calculation
function winCalculation(human,robot){
    let rpsCalculator = {
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }
    var userScore = rpsCalculator[human][robot];
    var botScore = rpsCalculator[robot][human];

    return [userScore,botScore];
}

// #3 - Final Decision User vs Computer
function finalMessage([humanScore,robotScore]){
    if(humanScore === 0){
        return {'message': 'You Lost!','color': 'red'};
    }else if(humanScore === 0.5){
        return {'message': '  Tie!  ', 'color': 'orange'};
    }else{
        return {'message': 'You Won!', 'color': 'green'};
    }
}

// #3 - Final Front
function finalFront(userImage,botImage,message) {
    // Stores the Images that we only need
    var imageStore ={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    // Remove the Original Scene
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var userDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    // There's an extra quote in here....
    userDiv.innerHTML = "<img src='" + imageStore[userImage] + "' height=150 width=150 style= 'box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + message['color'] +"; font-size: 50px; padding:30px; '>" + message['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imageStore[botImage] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(194,35,67,1);'>";
    
    document.getElementById('flex-box-rps-div').appendChild(userDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}
