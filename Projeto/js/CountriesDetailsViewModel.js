var vm = function () {
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/netflix/api/countries/");
  self.displayName = ko.observable("Country Details");
  self.id = ko.observable(0);
  self.name = ko.observable("");
  self.error = ko.observable("");
  self.titles = ko.observableArray([]);

  self.activate = function (id) {
    var composedUri = self.baseUri() + id;
    ajaxHelper(composedUri, "GET").done(function (data) {
      self.id(data.Id);
      self.name(data.Name);
      self.titles(data.Titles);
      hideLoading();
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
