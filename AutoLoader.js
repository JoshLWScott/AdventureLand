function loadFiles( url ) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open( 'GET', url, false );
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4) {
            switch( httpRequest.status) {
                case 200:
                    eval.apply( window, [httpRequest.response || httpRequest.responseText] );
                    break;
                default:
            }
        }
    };
    httpRequest.send(null);
}

/* Array of files we should load into our game */
let FilesToLoad = [
    "https://raw.githubusercontent.com/JoshLWScott/AdventureLand/master/Store.js",
    "https://raw.githubusercontent.com/JoshLWScott/AdventureLand/master/GeneralFunctions.js",
]

/* Loop through them and load them in */
FilesToLoad.forEach( url => loadFiles(url) )