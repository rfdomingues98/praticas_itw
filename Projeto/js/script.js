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

  $(".theme-changer").click(changeTheme);
});

function changeTheme() {
  $(".theme-changer i").toggleClass("icon-sun");
  $(".theme-changer i").toggleClass("icon-moon");
  $(":root").css(
    "--primary",
    $(":root").css("--primary") === "#6df3fd" ? "#920c02" : "#6df3fd"
  );
  $(":root").css(
    "--primary-lighter",
    $(":root").css("--primary-lighter") === "#87f7ff" ? "#780800" : "#87f7ff"
  );
  $(":root").css(
    "--bg-color",
    $(":root").css("--bg-color") === "#131a47" ? "#ece5b8" : "#131a47"
  );
  $(":root").css(
    "--bg-top-color",
    $(":root").css("--bg-top-color") === "#202a6d" ? "#dfd592" : "#202a6d"
  );
  $(":root").css(
    "--scrollbar-bg",
    $(":root").css("--scrollbar-bg") === "#0d1130" ? "#f2eecf" : "#0d1130"
  );
}
