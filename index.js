#!/usr/bin/env node

var program = require('commander');
var request = require('request');
var parseXml = require('xml2js').parseString;

const competitions_url = 'https://mobile.guardianapis.com/sport/football/competitions';
const competition_teams_url_base = 'http://football.api.press.net/v1.5/competition/teams';

function get_competitions(filter, callback) {
    request(competitions_url, function (error, response, body) {
	if (error) {
	    callback(error);
	    return;
	}
	
	var result = JSON.parse(body);
	if (filter) {
	    result = result.filter(function(competition) {
		return competition.fullName.toLowerCase().includes(filter.toLowerCase());
	    });
	}

	callback(null, result)
    });
}

function to_pa_date(mapi_date) {
    return mapi_date.replace(/-/g, '');
}

function get_competition_teams_url(competition) {
    url = competition_teams_url_base +
	'/' + process.env.PA_KEY +
	'/' + competition.id +
	'/' + to_pa_date(competition.startDate) +
	'/' + to_pa_date(competition.endDate);
    return url
}

function get_competition_teams(competition, filter, callback) {
    request(get_competition_teams_url(competition), function (error, response, body) {
	if (error) {
	    callback(error);
	    return;
	}

	parseXml(body, function (error, xml) {
	    if (error) {
		callback(error);
		return;
	    }
	    if (xml.teams.errors) {
		callback(xml.teams.errors[0].error[0]);
		return;
	    }
	    var results = [];
	    xml.teams.team.filter(function(tag) {
		return tag._.toLowerCase().includes(filter.toLowerCase());
	    }).forEach(function(tag) {
		results.push({
		    name: tag._,
		    id: tag.$.teamID
		});
	    });
	    callback(null, results);
	});
    });
}

program
    .arguments('<query>')
    .option('-c, --competition <competition>', 'The competition to restrict results to')
    .action(function(query) {
	get_competitions(program.competition, function(err, result) {
	    if (err) {
		console.error(err);
		process.exit();
	    }
	    result.forEach(function(competition) {
		get_competition_teams(competition, query, function(err, result) {
		    if (err) {
			console.error(err);
			process.exit();
		    }
		    if (result.length > 0) {
			console.log(competition.fullName + ":");
			console.log(result);
		    }
		});
	    });
	});
    })
    .parse(process.argv)
