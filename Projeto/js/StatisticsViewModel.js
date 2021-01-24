var ctx1 = document.getElementById("chart1");
var ctx2 = document.getElementById("chart2");
var chart1 = new Chart(ctx1, {
  type: "bar",
  data: {
    labels: ["Titles", "Directors", "Actors", "Categories", "Countries"],
    datasets: [
      {
        backgroundColor: [
          "rgba(109,243,253,0.8)",
          "rgba(104,250,233,0.8)",
          "rgba(125,254,205,0.8)",
          "rgba(161,255,172,0.8)",
          "rgba(203,254,139,0.8)",
        ],
        borderColor: [
          "rgba(109,243,253,1)",
          "rgba(104,250,233,1)",
          "rgba(125,254,205,1)",
          "rgba(161,255,172,1)",
          "rgba(203,254,139,1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    legend: {
      display: false,
    },
    tooltip: {
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          type: "logarithmic",
          ticks: {
            fontColor: "rgba(109,243,253,1)",
            padding: 5,
            callback: function (tick, index, ticks) {
              return tick.toLocaleString();
            },
          },
          afterBuildTicks: function (chart) {
            var maxTicks = 10;
            var maxLog = Math.log(chart.ticks[0]);
            var minLogDensity = maxLog / maxTicks;

            var ticks = [];
            var currLog = -Infinity;
            _.each(chart.ticks.reverse(), function (tick) {
              var log = Math.max(0, Math.log(tick));
              if (log - currLog > minLogDensity) {
                ticks.push(tick);
                currLog = log;
              }
            });
            chart.ticks = ticks;
          },
          gridLines: {
            display: true,
            drawBorder: true,
            drawOnChartArea: false,
            drawTicks: false,
            color: "rgba(109,243,253,1)",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "rgba(109,243,253,1)",
            padding: 5,
          },
          gridLines: {
            display: true,
            drawBorder: true,
            drawOnChartArea: false,
            drawTicks: false,
            color: "rgba(109,243,253,1)",
          },
        },
      ],
    },
    callback: function (...args) {
      const value = ChartJS.Ticks.formatters.logarithmic.call(this, ...args);
      if (value.length) {
        return Number(value).toLocaleString();
      }
      return value;
    },
  },
});
var chart2 = new Chart(ctx2, {
  type: "doughnut",
  data: {
    labels: ["Movie", "TV Show"],
    datasets: [
      {
        backgroundColor: ["rgba(109,243,253,0.8)", "rgba(203,254,139,0.8)"],
        borderColor: ["rgba(109,243,253,1)", "rgba(203,254,139,1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    legend: {
      labels: {
        fontColor: "rgba(109,243,253,1)",
      },
    },
    tooltip: {
      intersect: false,
    },
  },
});
chart1.render();
chart2.render();

var vm = function () {
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/netflix/api/statistics");
  self.error = ko.observable("");
  self.actors = ko.observable(0);
  self.categories = ko.observable(0);
  self.countries = ko.observable(0);
  self.directors = ko.observable(0);
  self.titles = ko.observable(0);
  self.titleTypes = ko.observableArray([]);

  self.activate = function () {
    ajaxHelper(self.baseUri(), "GET").done(function (data) {
      hideLoading();
      self.actors(data.Actors);
      self.categories(data.Categories);
      self.countries(data.Countries);
      self.directors(data.Directors);
      self.titles(data.Titles);

      var data1 = [
        data.Titles,
        data.Directors,
        data.Actors,
        data.Categories,
        data.Countries,
      ];
      chart1.data.datasets[0].data = data1;

      chart1.update();
    });

    ajaxHelper("http://192.168.160.58/netflix/api/titletypes", "GET").done(
      function (data) {
        self.titleTypes(data);

        var data1 = data.map(function (x) {
          return x.Name;
        });
        var data2 = data.map(function (x) {
          return x.Titles;
        });
        chart2.data.labels = data1;
        chart2.data.datasets[0].data = data2;
        chart2.update();
      }
    );
  };

  function ajaxHelper(uri, method, data) {
    self.error("");
    return $.ajax({
      type: method,
      url: uri,
      dataType: "json",
      contentType: "application/json",
      data: data ? JSON.stringify(data) : null,
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("AJAX Call[" + uri + "] Failed...");
        hideLoading();
        self.error(errorThrown);
      },
    });
  }

  function showLoading() {
    $(".modal").css("display", "block");
  }
  function hideLoading() {
    $(".modal").css("display", "none");
  }

  showLoading();
  self.activate();
};

$(document).ready(function () {
  ko.applyBindings(new vm());
});
