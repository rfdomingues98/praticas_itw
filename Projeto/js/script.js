$(document).ready(function () {
  changeTheme();
  $(document).on("click", ".slide-down", function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("main").offset().top,
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
  } else {
    $(".theme-changer i").addClass("icon-moon");
    $(".theme-changer i").removeClass("icon-sun");
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
