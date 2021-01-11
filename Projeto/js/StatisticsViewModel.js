var vm = function () {
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/netflix/api/statistics");
  self.error = ko.observable("");
  self.actors = ko.observable(0);
  self.categories = ko.observable(0);
  self.countries = ko.observable(0);
  self.directors = ko.observable(0);
  self.titles = ko.observable(0);

  self.activate = function () {
    ajaxHelper(self.baseUri(), "GET").done(function (data) {
      hideLoading();
      self.actors(data.Actors);
      self.categories(data.Categories);
      self.countries(data.Countries);
      self.directors(data.Directors);
      self.titles(data.Titles);
    });
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
