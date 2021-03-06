var currentPage = 1;
var search = false;
var searchTerm = '';
const movieArea = document.querySelector("#movie-area");
const button = document.getElementById('moreMovies');
const form = document.querySelector("form");
const header = document.getElementById('mainHeading');
const resetButton = document.getElementById('reset');

async function getRequest(){
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
            <a class="btn btn-success" onclick="exampleOnclick(this)">
                <img id="poster" class="card-img-top img-fluid" src="${myimage.src}" alt="${title}"/>
                <img hidden id="backdrop" class="card-img-top img-fluid" src="${backDropImage.src}" alt="${title}"/>
                <p hidden id="info" > ${info}</p>
                <p hidden id="vote" > ${vote}</p>
                <p hidden id="release_Date" > ${release_Date}</p>
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

  function exampleOnclick(btn) {
    var name = btn.innerHTML;
    var backdrop = btn.querySelector('#backdrop').src;
    let movieTitle = btn.querySelector('#backdrop').alt;
    if(backdrop.includes("null")) {
        backdrop = btn.querySelector('#poster').src; 
    }
    // console.log(btn.querySelector('#poster').src);
    // console.log(backdrop);
    let movieRelease = btn.querySelector('#release_Date').textContent;
    let movieRated = btn.querySelector('#vote').textContent;
    let movieString = "| " + movieRelease + " | " + "&#11088; &nbsp;" + movieRated + " |";
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
        '<img class="card-img-top img-fluid" src="'+ backdrop + '" alt="${title}"/>' +
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
    currentPage = 1;
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
    let finalUrl = url + String(finalText) + '&page='+ String(currentPage);
    const response = await fetch(finalUrl);
    const searchedMovies = await response.json();
    movieArea.innerHTML = ``;
    search = true;
    searchTerm = url + String(finalText) + '&page=';
    generateHTML(searchedMovies);

  }

  async function getResults2(){
    let url = searchTerm + String(currentPage);
    const response = await fetch(url);
    const searchedMovies = await response.json();
    generateHTML(searchedMovies);

  }


window.onload = function () {
    getRequest();

    button.addEventListener('click', event => {
        currentPage +=1; //update page index
        if(search == true){
            getResults2();
        }
        else{
            getRequest();
        }
      });

    resetButton.addEventListener('click', event => {
        currentPage = 1; //update page index
        movieArea.innerHTML = ``;
        search = false;
        getRequest();
        header.innerText = "Now Playing" ;
      });
      
    form.addEventListener("submit", getResults);
    
    
}

