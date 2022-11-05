/*barra de pesquisa*/

const APIKEY = 'adcc5485847084c828316a68a5f32017'
const ENDPOINT = 'https://api.themoviedb.org/3';
const IMAGENDPOINT = 'https://image.tmdb.org/t/p/w500';
const ABOUTENDPOINT = 'https://www.themoviedb.org/movie/'
const elem = document.getElementById('btnBuscar')
elem.addEventListener ('click', () => {
    let query = document.getElementById('searchBox').value 
    fetch (`${ENDPOINT}/search/movie?api_key=${APIKEY}&query=${query}&language=pt-BR`)
        .then (res => res.json ())
        .then (data => {
            let str = ''
            for (x=0; x< data.results.length; x++) {
                let filme = data.results[x];
                 str += `<div class="card col-md-4 col-sm-6" width="300px">
                        <img src="${IMAGENDPOINT}${filme.poster_path}" class="card-img-top" style=min-width: 300px>
                        <div class="card-body">
                        <h5 class="card-title">${filme.title}</h5>
                        <p class="card-text">${filme.overview}</p>
                        <a href="${ABOUTENDPOINT}${filme.id}" target="_blank" class="btn btn-primary">Mais detalhes...</a>
                        </div>
                     </div>`
            }
            document.getElementById('tela').innerHTML = str
        } )
        .catch (err => console.log (`Erro: ${err.message}`))
})



/*destaques*/

var xhr1= new XMLHttpRequest ();
xhr1.onload=destaques;
xhr1.open('GET',`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=pt-br`);
xhr1.send();


function destaques (){
    
    let Destaque = document.getElementById('Destaque');
    let texto= '';
    

    let Data= JSON.parse(this.responseText);
    for(i=0;i<4;i++)
    {
        let filme=Data.results[i];

        if(filme.poster_path=="")
        {
            continue;
        }
        let data= new Date(filme.release_date);
        
        
        texto=texto + `<div class="card" style="width: 18rem;">
            <img src="https://image.tmdb.org/t/p/original${filme.poster_path}" class="card-img-top" alt="Poster">
        <div class="card-body">
          <h5 class="card-title">${filme.title}</h5>
          <p class="Data">Lançamento: ${data.toLocaleDateString()}</p>
          <p class="card-text">Avaliação: ${filme.vote_average}</p>
        </div>
        <a href="${ABOUTENDPOINT}${filme.id}" target="_blank" class="det-button-card row">Mais detalhes...</a>
        </div>
        `
    ;
  };
  Destaque.innerHTML = texto;
}

