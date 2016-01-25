'use strict';

var StatsJs = require('stats-js');

var Stats = new StatsJs();
Stats.domElement.style.position = 'absolute';
Stats.domElement.style.left = '0px';
Stats.domElement.style.top = '0px';

window.addEventListener('load', function() {
    document.body.appendChild(Stats.domElement)
});

export default Stats;