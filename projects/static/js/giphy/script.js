// Search when pressed on go
function go() {
    var input = document.querySelector('input').value;
    pushToDOM(input);
}

// Search when pressed Enter
var input = document.querySelector('input').addEventListener('keyup', (e) => {
    var input = document.querySelector('input').value;

    if (e.which === 13) {
        pushToDOM(input);
    }
})

// Get images from GIPHY through API

// API key for our use (generated specifically to this account)
var apiKey = '&api_key=ql0MZqkfEmUpACXeFKv94jkOXz5X9wUU';
var searchUrl = 'https://api.giphy.com/v1/gifs/search?q='

input = 'funny cat'
// var GiphyAJAXCall = new XMLHttpRequest();
// GiphyAJAXCall.open('GET', (searchUrl + input + apiKey));
// GiphyAJAXCall.send(); 

// GiphyAJAXCall.addEventListener('load',(e)=>{
//     var data = e.target.response;
//     pushToDOM(data);
// });
// Display the results
function pushToDOM(input) {

    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open('GET', (searchUrl + input + apiKey));
    GiphyAJAXCall.send();

    // var data;

    GiphyAJAXCall.addEventListener('load', (e) => {
        var data = e.target.response;
        // pushToDOM(data);
        var response = JSON.parse(data);
        var imageData = response.data;

        imageData.forEach((image)=>{
            var imageUrl = image.images.fixed_height.url;
            var container = document.querySelector('.js-container');
            container.innerHTML += "<img src=" + imageUrl + "\" class=\"container-image\">";
        })      
    });
}