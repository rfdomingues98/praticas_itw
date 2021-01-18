var vm = function () {
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/netflix/api/titles/");
  self.displayName = ko.observable("Title Details");
  self.id = ko.observable(0);
  self.name = ko.observable("");
  self.error = ko.observable("");
  self.dateAdded = ko.observable(new Date());
  self.description = ko.observable("");
  self.duration = ko.observable("");
  self.releaseYear = ko.observable(0);
  self.rating = ko.observable("");
  self.type = ko.observable("");
  self.actors = ko.observableArray([]);
  self.countries = ko.observableArray([]);
  self.directors = ko.observableArray([]);
  self.categories = ko.observableArray([]);
  self.poster = ko.observable("");
  self.encodedTitle = ko.observable("");

  self.activate = function (id) {
    var composedUri = self.baseUri() + id;
    ajaxHelper(composedUri, "GET").done(function (data) {
      self.id(data.Id);
      self.name(data.Name);
      self.dateAdded(data.DateAdded);
      self.description(data.Description);
      self.duration(data.Duration);
      self.releaseYear(data.ReleaseYear);
      self.rating(data.Rating);
      self.type(data.Type);
      self.actors(data.Actors);
      self.countries(data.Countries);
      self.directors(data.Directors);
      self.categories(data.Categories);
      self.encodedTitle(encodeURIComponent(data.Name).split("%20").join("+"));

      var url = `http://www.omdbapi.com/?apikey=f0a5748f&t=${self.encodedTitle()}&y=${self.releaseYear()}`;
      $.ajax({
        type: "GET",
        url,
        dataType: "jsonp",
        contentType: "application/json",
        success: function (data) {
          self.poster(data.Poster);
          hideLoading();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("AJAX Call[" + uri + "] Failed...");
          hideLoading();
          self.error(errorThrown);
        },
      });
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

  showLoading();
  var pg = getUrlParameter("id");
  if (pg == undefined) self.activate(1);
  else {
    self.activate(pg);
  }
};

$(document).ready(function () {
  ko.applyBindings(new vm());
});
