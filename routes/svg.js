/*jslint vars: false, node: true */
/*global */

var commons = require('./commons'),
    renderResults;

renderResults = function (response, params, error, results) {
    "use strict";

    var i,
        j,
        chartData = {
            labels: [],
            values: []
        },
        aux,
        svg;

    try {
        for (i = 0; i < results.length; i += 1) {
            aux = [];
            chartData.labels.push(results[i][params.chart.labels].value);
            for (j = 0; j < params.chart.series.length; j += 1) {
                aux.push(parseInt(results[i][params.chart.series[j]].value, 10));
            }
            chartData.values.push(aux);
        }
        params.chart.data = chartData;
    } catch (err) {
        console.log(err);
        response.send('Some error happened processing the data.', 500);
        return;
    }

    svg = commons.generateSVG(params.chart, chartData);

    response.header("Content-Type", "image/svg+xml");
    response.write(svg);
    response.end();
};

// Get the data, generate chart in SVG and return it

exports.get = function (request, response) {
    "use strict";

    var params = request.query;

    if (!params.chart) {
        // Invalid request, chart is mandatory
        response.send('Missing chart settings', 400);
        return;
    }

    commons.processPetition(request, response, renderResults);
    // Nothing more to do, the callbacks will take care of the response
};