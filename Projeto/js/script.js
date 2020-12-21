$(document).ready(function () {
  $(".slide-down").click(function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("main").offset().top,
    });
  });
  $(".navbar-toggle").click(function () {
    $(this).toggleClass("open");
    $("#js-menu").toggleClass("menu-active");
  });

  if ($(window).scrollTop() >= $("#main").offset().top - 200) {
    $(".navbar").removeClass("hiding");
  }
  if ($(window).scrollTop() < $("#main").offset().top - 200) {
    $(".navbar").addClass("hiding");
  }

  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= $("#main").offset().top - 200) {
      $(".navbar").removeClass("hiding");
    }
    if ($(window).scrollTop() < $("#main").offset().top - 200) {
      $(".navbar").addClass("hiding");
    }
  });
});
