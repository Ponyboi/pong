requirejs.config({
    paths: {
        "underscore": "../lib/underscore/underscore-min",
        "io": "../lib/socket.io-client/socket.io",
        "pixi": "../lib/pixi.js/pixi.min"
    },
    shim: {
        "underscore": {
            exports: "_"
        }
    }
});

requirejs(["game"], function (Game) {
    Game.start();
});