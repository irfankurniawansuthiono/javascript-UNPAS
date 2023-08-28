// fitur mencari movie
const search = document.querySelector('.search-button');
const keyword = document.querySelector('.input-keyword');
const movieContainer = document.querySelector('.movie-container');

search.addEventListener('click', async function(){
    try{
        const movies = await getMovies(keyword.value);
        updateUI(movies)
    } catch (err){
        alert(err);
    }
    
})

// getMovies()
function getMovies(keyword){
    return fetch('http://www.omdbapi.com/?apikey=d17c4e1&s='+keyword)
    .then(response => {
        if ( !response.ok ){
            throw new Error(response.statusText)
        }
        return response.json()
    })
}

// updateUI()
function updateUI(movies){
    console.log(movies)
    if( movies.Response == "True" ){
         let cards = '';
        movies.Search.forEach(m => cards += showCards(m));
        movieContainer.innerHTML = cards;
    }else if ( movies.Response == "False" ){
         movieContainer.innerHTML = `<h1> There's no results for <span style="color: red">${keyword.value}</span>`;
    }    
}

// showDetails
// menggunakan event binding untuk mengambil button show details
document.addEventListener('click', async function(e){
    if ( e.target.classList.contains('modal-detail-button') ){
        const detail = e.target.dataset.imdbid;
        return fetch('http://www.omdbapi.com/?apikey=d17c4e1&i=' + detail)
            .then(response => response.json())
            .then(response => moviesIMDBui(response))
         
    }
});

// jadi dengan menggunakan event binding kita bisa memanfaatkan documents mendapatkan info apa saja aktifitas yang ada di dalam documents. jadi jika kita menggunakan eventListener click, dan kita bisa mendapatkan classnya juga. jadi kita bisa memanfaatkan kelas. jika yang di klik mengandung kelas tertentu dengan logika if. elemen yang awalnya ga ada dengan event binding kita bisa memberikan event untuknya


// function untuk mengupdate UI 
function moviesIMDBui(m){
    const movieDetail = showDetail(m);
    const showModal = document.querySelector('.modal-body');
    showModal.innerHTML = movieDetail;
}




// fungsi memunculkan movie dan detail movie
function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="${m.Title || 'Blank'}"/>
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtittle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                        data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Detail</a>
                    </div>
                </div>
            </div>
`;
};

function showDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid" />
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title}</h4></li>
                        <li class="list-group-item">
                            <strong>Director : </strong>${m.Director}
                        </li>
                        <li class="list-group-item">
                            <strong>Realease : </strong>${m.Released}
                        </li>
                        <li class="list-group-item">
                            <strong>Genre : </strong>${m.Genre}
                        </li>
                        <li class="list-group-item">
                            <strong>Actors : </strong>${m.Actors}
                        </li>
                        <li class="list-group-item">
                            <strong>Plot : </strong>${m.Plot}
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
`
};