let screen = document.querySelector('#screen');
buttons = document.querySelectorAll('div.calculator button')
let screenValue = '';

for(item of buttons) {
    item.addEventListener('click',(e) =>{
        buttonText = e.target.innerText;
        if(buttonText=='X'){
            buttonText = '*';
            screenValue += buttonText;
            screen.value = buttonText;
        }
        else if(buttonText=='C'){
            screenValue = "";
            screen.value = '';
        }
        else if(buttonText=='='){
            try{
                screen.value = eval(screenValue);
            }
            catch(e){
                screen.value = 'ERROR'
            }            
        }
        else{
            screenValue += buttonText;
            screen.value = screenValue;
        }
    })
}
