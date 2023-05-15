const defaultPoster = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Film_reel.svg"; 

let movieTemplate = Handlebars.compile(`
    <img src="{{poster}}" alt="{{Title}}"/>
    <div class='right'>
        <p class='type'>{{Type}}</p>  
        <h2 class='title'>{{Title}}</h2>
        <h3 class='titleYear'>({{Year}})</h3>
        <button class='btnInfo' onclick="getMovieDetails('{{imdbID}}')">Details</button>
    </div>
`);

let movieDetailsTemplate = Handlebars.compile(`
    <h1>{{Title}} ({{Year}})</h1>
    <div class='block'>
        <img class='imgDet' src="{{poster}}" alt="{{Title}}"/>
        <div class='listItem'>
            <div class='list'>
                <h3>Released:</h3>
                <p>{{Released}}</p>
            </div>
            <div class='list'>
                <h3>Genre:</h3>
                <p>{{Genre}}</p>
            </div>
            <div class='list'>
                <h3>Country:</h3>
                <p>{{Country}}</p>
            </div>
            <div class='list'>
                <h3>Director:</h3>
                <p>{{Director}}</p>
            </div>
            <div class='list'>
                <h3>Writer:</h3>
                <p>{{Writer}}</p>
            </div>
            <div class='list'>
                <h3>Actors:</h3>
                <p>{{Actors}}</p>
            </div>                
            <div class='list'>
                <h3>Awards:</h3>
                <p>{{Awards}}</p>
            </div>
            <div class='list'>
                <h3>Box Office:</h3>
                <p>{{BoxOffice}}</p>
            </div>
            <div class='list'>
                <h3>Runtime:</h3>
                <p>{{Runtime}}</p>
            </div>
            <div class='list'>
                <h3>Plot:</h3>
                <p>{{Plot}}</p>
            </div>
        </div>
    </div>
`);
