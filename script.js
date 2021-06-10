var currentPage = 1
var objs = []
let tempData = null;
const movieArea = document.querySelector("#movie-area");
const button = document.getElementById('moreMovies');
const form = document.querySelector("form");
const header = document.getElementById('mainHeading');
const resetButton = document.getElementById('reset');

// function getRequest(){
// // GET Request.
// url = 'https://api.themoviedb.org/3/discover/movie?api_key=e0fd5a0f660971376c9527b4a5b7e104&certification_country=US&certification.lte=G&sort_by=popularity.desc&page='+ String(currentPage)
// fetch(url)
//     // Handle success
//     .then(response => response.json())  // convert to json
//     //.then(json => objs.push(json))    //push data to list
//     .then(function(data) {
//         tempData = data;
//         objs.push(tempData);
//        // console.log(tempData);
//         getData(tempData)

//     })
//     .catch(err => console.log('Request Failed', err)); // Catch errors

// }

async function getRequest2(){
    let apiKey = "api_key=e0fd5a0f660971376c9527b4a5b7e104";
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=e0fd5a0f660971376c9527b4a5b7e104&certification_country=US&certification.lte=G&sort_by=popularity.desc&page='+ String(currentPage);
const response = await fetch(url);
const movies = await response.json();
generateHTML(movies)
}

function generateHTML(movieData) {
    let i = 0;
    let counter = 1
    for(i; i<movieData.results.length; i++){
    let title = movieData.results[i].title;
    let poster_path = movieData.results[i].poster_path;
    let backdrop_path = movieData.results[i].backdrop_path;
    let vote = movieData.results[i].vote_average;
    let info = movieData.results[i].overview;
    let release_Date = movieData.results[i].release_date;
    //console.log(movieData);
    let myimage = new Image();
     myimage.src = 'https://image.tmdb.org/t/p/w500/' + poster_path;

     let backDropImage = new Image();
     backDropImage.src = 'https://image.tmdb.org/t/p/w500/' + backdrop_path;
     
    movieArea.innerHTML += `
        <div class="card mb-4" > 
            <a class="btn btn-success" onclick="exampleOnclick(this,'${title}','${release_Date}','${vote}')">
                <img class="card-img-top img-fluid" src="${myimage.src}" alt="${title}"/>
                <img hidden id="backdrop" class="card-img-top img-fluid" src="${backDropImage.src}" alt="${title}"/>
                <p hidden id="info" > ${info}</p>
            </a>
            <div class="card-body">
                <p class="card-text text-left">&#11088; &nbsp; ${vote}</p>
                <h6 class="card-title">${title}</h6>
            </div>
        </div>
        
    `;
    if(counter%2 == 0){
        movieArea.innerHTML += `
        <div class="w-100 d-none d-sm-block d-md-none"><!-- wrap every 2 on sm--></div>
        `
    }
    if(counter%3 == 0){
        movieArea.innerHTML += `
        <div class="w-100 d-none d-md-block d-lg-none"><!-- wrap every 3 on md--></div>
        `
    }
    if(counter%4 == 0){
        movieArea.innerHTML += `
        <div class="w-100 d-none d-lg-block d-xl-none"><!-- wrap every 4 on lg--></div>
        `
    }
    if(counter%5 == 0){
        movieArea.innerHTML += `
        <div class="w-100 d-none d-xl-block"><!-- wrap every 5 on xl--></div>
        `
    }

    counter += 1 //update index
}
  }

  function exampleOnclick(btn, movieTitle, movieRelease, movieRated) {
    var name = btn.innerHTML;
    var backdrop = btn.querySelector('#backdrop').src;
    let movieString = "| " + movieRelease + " | " + "&#11088; &nbsp;" + movieRated + " |";
    let backDropImage = new Image();
     backDropImage.src = 'https://image.tmdb.org/t/p/w500/' + backdrop;
    var info = btn.querySelector('#info').textContent;
    var exampleModal = getExampleModal();
    // Init the modal if it hasn't been already.
    if (!exampleModal) { exampleModal = initExampleModal(); }
  
    var html =
        '<div class="modal-header">' +
          '<h5 class="modal-title" id="exampleModalLabel">'+ movieTitle + '</h5>' +
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
          '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="modal-content modal-popout-bg">' +
        '<img class="card-img-top img-fluid" src="'+ backDropImage.src+ '" alt="${title}"/>' +
        '</div>' +
        '<p>' +
        movieString + 
        '</p>' +
        info +
        '</div>' +
        '<div class="modal-footer">' +
          '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
        '</div>';
  
    setExampleModalContent(html);
  
    // Show the modal.
    jQuery(exampleModal).modal('show');
  
  }
  
  function getExampleModal() {
    return document.getElementById('exampleModal');
  }
  
  function setExampleModalContent(html) {
    getExampleModal().querySelector('.modal-content').innerHTML = html;
  }
  
  function initExampleModal() {
    var modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'exampleModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content"></div>' +
          '</div>';
    document.body.appendChild(modal);
    return modal;
  }

  async function getResults(event){
    event.preventDefault();
    let apiKey = "api_key=e0fd5a0f660971376c9527b4a5b7e104"
    let url = "https://api.themoviedb.org/3/search/movie?api_key=e0fd5a0f660971376c9527b4a5b7e104&certification_country=US&certification&query=";
    let inputText = event.target.searchMovie.value;
    header.innerText = "Searching... " + inputText;
    let searchText = inputText.split(" ");
    let finalText = ""
    let index = 0
    searchText.forEach(function (value) {
        if(index == 0){
        finalText = value;
        index = 1;
        }
        else{
            finalText = finalText + "+" + value;
        }
      }); 
    let finalUrl = url + String(finalText);
    const response = await fetch(finalUrl);
    const searchedMovies = await response.json();
    generateHTML2(searchedMovies);

  }

  function generateHTML2(movieData) {
    let i = 0;
    let counter = 1
    movieArea.innerHTML = ``;
    for(i; i<movieData.results.length; i++){
    let title = movieData.results[i].title;
    let poster_path = movieData.results[i].poster_path;
    let backdrop_path = movieData.results[i].backdrop_path;
    let vote = movieData.results[i].vote_average;
    let info = movieData.results[i].overview;
    let release_Date = movieData.results[i].release_date;
    let myimage = new Image();
     myimage.src = 'https://image.tmdb.org/t/p/w500/' + poster_path;
     //console.log(movieData)
    let backDropImage = new Image();
    backDropImage.src = 'https://image.tmdb.org/t/p/w500/' + backdrop_path;

    movieArea.innerHTML += `
        <div class="card mb-4" > 
            <a class="btn btn-success" onclick="exampleOnclick(this,'${title}','${release_Date}','${vote}')">
                <img class="card-img-top img-fluid" src="${myimage.src}" alt="${title}"/>
                <img hidden id="backdrop" class="card-img-top img-fluid" src="${backDropImage.src}" alt="${title}"/>
                <p hidden id="info" > ${info}</p>
            </a>
            <div class="card-body">
                <p class="card-text text-left">&#11088; &nbsp; ${vote}</p>
                <h6 class="card-title">${title}</h6>
            </div>
        </div>
        
    `;
    if(counter%2 == 0){
        movieArea.innerHTML += `
        <div class="w-100 d-none d-sm-block d-md-none"><!-- wrap every 2 on sm--></div>
        `
    }
    if(counter%3 == 0){
        movieArea.innerHTML += `
        <div class="w-100 d-none d-md-block d-lg-none"><!-- wrap every 3 on md--></div>
        `
    }
    if(counter%4 == 0){
        movieArea.innerHTML += `
        <div class="w-100 d-none d-lg-block d-xl-none"><!-- wrap every 4 on lg--></div>
        `
    }
    if(counter%5 == 0){
        movieArea.innerHTML += `
        <div class="w-100 d-none d-xl-block"><!-- wrap every 5 on xl--></div>
        `
    }

    counter += 1 //update index
}
  }

window.onload = function () {
    getRequest2();
    button.addEventListener('click', event => {
        currentPage +=1; //update page index
        getRequest2();
      });
    resetButton.addEventListener('click', event => {
        currentPage = 1; //update page index
        movieArea.innerHTML = ``;
        getRequest2();
        header.innerText = "Now Playing" ;
      });
    form.addEventListener("submit", getResults);
    
    
}

