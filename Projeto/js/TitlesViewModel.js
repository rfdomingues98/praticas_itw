var vm = function () {
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/netflix/api/titles");
  self.displayName = "Titles";
  self.error = ko.observable("");
  self.totalTitles = ko.observable(1);
  self.totalPages = ko.observable(1);
  self.currentPage = ko.observable(1);
  self.pageSize = ko.observable(20);
  self.hasPrevious = ko.observable(false);
  self.hasNext = ko.observable(false);
  self.titles = ko.observableArray([]);
  self.pageArray = function () {
    var list = [];
    var size = Math.min(self.totalPages(), 9);
    var step;
    if (size < 9 || self.currentPage() === 1) {
      step = 0;
    } else if (self.currentPage() >= self.totalPages() - 4) {
      step = self.totalPages() - 9;
    } else {
      step = Math.max(self.currentPage() - 5, 0);
    }

    for (var i = 1; i <= size; i++) list.push(i + step);
    return list;
  };
  self.previousPage = ko.computed(function () {
    return self.currentPage() - 1;
  }, self);
  self.nextPage = ko.computed(function () {
    return self.currentPage() + 1;
  }, self);
  self.fromRecord = ko.computed(function () {
    return self.previousPage() * self.pageSize() + 1;
  }, self);
  self.toRecord = ko.computed(function () {
    return Math.min(self.currentPage() * self.pageSize(), self.totalTitles());
  }, self);

  self.activate = function (id) {
    console.log("CALL: getTitle...");
    var composedUri =
      self.baseUri() + "?page=" + id + "&pageSize=" + self.pageSize();
    ajaxHelper(composedUri, "GET").done(function (data) {
      console.log(data);
      hideLoading();
      self.titles(data.Titles);
      self.currentPage(data.CurrentPage);
      self.hasNext(data.HasNext);
      self.hasPrevious(data.HasPrevious);
      self.pageSize(data.PageSize);
      self.totalPages(data.TotalPages);
      self.totalTitles(data.TotalTitles);
      //self.SetFavourites();
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
  var pg = getUrlParameter("page");
  if (pg == undefined) self.activate(1);
  else {
    self.activate(pg);
  }
};

$(document).ready(function () {
  ko.applyBindings(new vm());
});
