$(document).ready(function() {
  $.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
      var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
      options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  $.ajax({
    type: "GET",
    url: "http://networkauditor.org/api-teamsaber/getteams/duo",
    dataType: "json",
    success: function(data) {
      var loading = $('#loading');
      loading.hide()
      readData(data);
    }
  });

  function readData(json) {
    teams = [];
    for (var team in json) {
      var teamData = json[team];
      var songObj = {
        "name": teamData["teamName"],
        "score": teamData["score"],
        "color": teamData["color"]
      }

      teams.push(songObj);
    }

    teams.sort(function(a, b) {
      return b.score - a.score
    });

    var tbody = $('tbody');

    for (var i in teams) {
      var team = teams[i]
      var html = '<tr><td class="col1"><font color="' + team["color"] + '">'
      html += team["name"] + ' : '
      html += team["score"].toLocaleString() + '</font></td></tr>'

      tbody.append(html);
    }
  }
});
