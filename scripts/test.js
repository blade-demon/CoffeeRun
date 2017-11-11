(function(window) {
    'use strict';
    var App = window.App || {};
    var launchCount = 0;

    function SpaceShip() {

    }

    SpaceShip.prototype.blastoff = function() {
        launchCount++;
        console.log('Spaceship launched!');
    }

    SpaceShip.prototype.reportLaunchCount = function() {
        console.log('Total number of launches: ' + launchCount);
    }

    App.SpaceShip = SpaceShip;
    window.App = App;
})(window)