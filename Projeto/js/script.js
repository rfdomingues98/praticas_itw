$(document).ready(function () {
  changeTheme();
  $(document).on("click", ".slide-down", function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("main").offset().top - 80,
    });
  });
  $(document).on("click", ".navbar-toggle", function () {
    $(this).toggleClass("open");
    $("#js-menu").toggleClass("menu-active");
  });

  if ($(".header-info").length != 0) {
    if ($(window).scrollTop() >= 20) {
      $(".navbar").removeClass("hiding");
    }
    if ($(window).scrollTop() < 20) {
      $(".navbar").addClass("hiding");
    }

    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= 20) {
        $(".navbar").removeClass("hiding");
      }
      if ($(window).scrollTop() < 20) {
        $(".navbar").addClass("hiding");
      }
    });
  } else {
    $(".navbar").css("top", "0");
    $(".navbar").removeClass("hiding");
  }

  $(".theme-changer").click(function () {
    localStorage.setItem(
      "theme",
      localStorage.getItem("theme") == "dark" ? "light" : "dark"
    );
    changeTheme();
  });
});

function changeTheme() {
  this.lightTheme = [
    "#920c02",
    "#780800",
    "#ece5b8",
    "#dfd592",
    "#f2eecf",
    "#e5dca5",
    "#dbd08a",
  ];
  this.barChartLightBg = [
    "rgba(109,243,253,0.8)",
    "rgba(104,250,233,0.8)",
    "rgba(125,254,205,0.8)",
    "rgba(161,255,172,0.8)",
    "rgba(203,254,139,0.8)",
  ];
  this.barChartLightBorder = [
    "rgba(109,243,253,1)",
    "rgba(104,250,233,1)",
    "rgba(125,254,205,1)",
    "rgba(161,255,172,1)",
    "rgba(203,254,139,1)",
  ];
  this.barChartDarkBg = [
    "rgba(146,12,2,0.8)",
    "rgba(189,59,35,0.8)",
    "rgba(233,97,67,0.8)",
    "rgba(255,135,101,0.8)",
    "rgba(255,173,137,0.8)",
  ];
  this.barChartDarkBorder = [
    "rgba(146,12,2,1)",
    "rgba(189,59,35,1)",
    "rgba(233,97,67,1)",
    "rgba(255,135,101,1)",
    "rgba(255,173,137,1)",
  ];
  this.doughnutChartLightBg = [
    "rgba(109,243,253,0.8)",
    "rgba(203,254,139,0.8)",
  ];
  this.doughnutChartLightBorder = [
    "rgba(109,243,253,1)",
    "rgba(203,254,139,1)",
  ];
  this.doughnutChartDarkBg = ["rgba(146,12,2,0.8)", "rgba(255,173,137,0.8)"];
  this.doughnutChartDarkBorder = ["rgba(146,12,2,1)", "rgba(255,173,137,1)"];
  this.darkTheme = [
    "#6df3fd",
    "#87f7ff",
    "#131a47",
    "#202a6d",
    "#0d1130",
    "#1a235a",
    "#242f75",
  ];
  var theme = localStorage.getItem("theme");
  if (!theme) localStorage.setItem("theme", "dark");
  $(":root").css("--primary", this[theme + "Theme"][0]);
  $(":root").css("--primary-lighter", this[theme + "Theme"][1]);
  $(":root").css("--bg-color", this[theme + "Theme"][2]);
  $(":root").css("--bg-top-color", this[theme + "Theme"][3]);
  $(":root").css("--scrollbar-bg", this[theme + "Theme"][4]);
  $(":root").css("--bg-color-lighter", this[theme + "Theme"][5]);
  $(":root").css("--bg-top-color-lighter", this[theme + "Theme"][6]);

  if (theme == "dark") {
    $(".theme-changer i").addClass("icon-sun");
    $(".theme-changer i").removeClass("icon-moon");
    if (typeof chart1 !== "undefined") {
      chart1.data.datasets[0].backgroundColor = this.barChartLightBg;
      chart1.data.datasets[0].borderColor = this.barChartLightBorder;
      chart1.options.scales.xAxes[0].ticks.minor.fontColor = this.barChartLightBorder[0];
      chart1.options.scales.yAxes[0].ticks.minor.fontColor = this.barChartLightBorder[0];
      chart1.options.scales.xAxes[0].gridLines.color = this.barChartLightBorder[0];
      chart1.options.scales.yAxes[0].gridLines.color = this.barChartLightBorder[0];
      chart1.update();
    }
    if (typeof chart2 !== "undefined") {
      chart2.data.datasets[0].backgroundColor = this.doughnutChartLightBg;
      chart2.data.datasets[0].borderColor = this.doughnutChartLightBorder;
      chart2.options.legend.labels.fontColor = this.doughnutChartLightBorder[0];
      chart2.update();
    }
  } else {
    $(".theme-changer i").addClass("icon-moon");
    $(".theme-changer i").removeClass("icon-sun");
    if (typeof chart1 !== "undefined") {
      chart1.data.datasets[0].backgroundColor = this.barChartDarkBg;
      chart1.data.datasets[0].borderColor = this.barChartDarkBorder;
      chart1.options.scales.xAxes[0].ticks.minor.fontColor = this.barChartDarkBorder[0];
      chart1.options.scales.yAxes[0].ticks.minor.fontColor = this.barChartDarkBorder[0];
      chart1.options.scales.xAxes[0].gridLines.color = this.barChartDarkBorder[0];
      chart1.options.scales.yAxes[0].gridLines.color = this.barChartDarkBorder[0];
      chart1.update();
    }
    if (typeof chart2 !== "undefined") {
      chart2.data.datasets[0].backgroundColor = this.doughnutChartDarkBg;
      chart2.data.datasets[0].borderColor = this.doughnutChartDarkBorder;
      chart2.options.legend.labels.fontColor = this.doughnutChartDarkBorder[0];
      chart2.update();
    }
  }
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
}

function updateQueryStringParameter(uri, key, value) {
  if (typeof value == "object") {
    value.join(",");
  }
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

function removeQueryStringParameters(uri, ignore) {
  var oldURL = uri;
  var index = 0;
  var newURL = oldURL;
  index = oldURL.indexOf("?");
  if (index == -1) {
    index = oldURL.indexOf("#");
  }
  if (index != -1) {
    newURL = oldURL.substring(0, index);
    if (ignore) {
      var params = oldURL.substring(index).split("&");
      params.forEach(function (e) {
        if (e.split("=")[0] == ignore) {
          newURL += "?" + ignore + "=" + e.split("=")[1];
        }
      });
    }
  }
  return newURL;
}

$(".filterToggle").click(function () {
  $(".filter-wnd").toggle();
});

// function toggleFavorite(e) {
//   var titleId = e.id.slice(e.id.indexOf("_") + 1);
//   var favorites = JSON.parse(localStorage.getItem("favorites"));
//   favorites.push(titleId);
//   localStorage.setItem("favorites", JSON.stringify(favorites));
// }
