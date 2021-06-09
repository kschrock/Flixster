var currentPage = 1
var objs = []
let tempData = null;

function getRequest(){
// GET Request.
url = 'https://api.themoviedb.org/3/discover/movie?api_key=e0fd5a0f660971376c9527b4a5b7e104&certification_country=US&certification.lte=G&sort_by=popularity.desc&page='+ String(currentPage)
fetch(url)
    // Handle success
    .then(response => response.json())  // convert to json
    //.then(json => objs.push(json))    //push data to list
    .then(function(data) {
        tempData = data;
        objs.push(tempData);
       // console.log(tempData);
        getData(tempData)

    })
    .catch(err => console.log('Request Failed', err)); // Catch errors

}

function getData(data){
    //Title, Poster Image, Votes
    // console.log(data.results[0]);
    title = data.results[0].title;
    //console.log(data.results[0].title);
    vote = data.results[0].vote_count;
    //console.log(data.results[0].vote_count);
    poster_path = data.results[0].poster_path;
    //console.log(data.results[0].poster_path);
    myimage = new Image();
    myimage.src = 'https://image.tmdb.org/t/p/w500/' + poster_path;
    document.getElementById("yo").src = myimage.src
}

function addCard(rowNum) {
   
  }

function seeMoreClick(){
    currentPage +=1 //update page index
    getRequest() //get new data
}

window.onload = function () {
    getRequest()
    
}

