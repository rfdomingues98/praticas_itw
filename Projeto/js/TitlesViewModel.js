var vm = function () {
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/netflix/api/titles?");
  self.categoriesUri = ko.observable(
    "http://192.168.160.58/netflix/api/categories"
  );
  if (getUrlParameter("movies")) {
    self.baseUri("http://192.168.160.58/netflix/api/movies?");
  }
  if (getUrlParameter("series")) {
    self.baseUri("http://192.168.160.58/netflix/api/series?");
  }
  if (getUrlParameter("lastAdded")) {
    self.baseUri("http://192.168.160.58/netflix/api/lasttitles?");
  }
  if (getUrlParameter("categories")) {
    self.baseUri(
      "http://192.168.160.58/netflix/api/search/titleswithcategories?categories=" +
        getUrlParameter("categories")
    );
  }
  if (getUrlParameter("name") && !getUrlParameter("categories")) {
    if (getUrlParameter("movies")) {
      self.baseUri("http://192.168.160.58/netflix/api/search/movies?");
    }
    if (getUrlParameter("series")) {
      self.baseUri("http://192.168.160.58/netflix/api/search/series?");
    } else {
      self.baseUri("http://192.168.160.58/netflix/api/search/titles?");
    }
    self.baseUri(self.baseUri() + "name=" + getUrlParameter("name"));
  }

  self.displayName = "Titles";
  self.error = ko.observable("");
  self.totalTitles = ko.observable(1);
  self.totalPages = ko.observable(1);
  self.currentPage = ko.observable(1);
  self.pageSize = ko.observable(20);
  self.hasPrevious = ko.observable(false);
  self.hasNext = ko.observable(false);
  self.titles = ko.observableArray([]);
  self.categories = ko.observableArray([]);
  self.pageArray = function () {
    var list = [];
    var size = Math.min(self.totalPages(), 5);
    var step;
    if (size < 5 || self.currentPage() === 1) {
      step = 0;
    } else if (self.currentPage() >= self.totalPages() - 2) {
      step = self.totalPages() - 5;
    } else {
      step = Math.max(self.currentPage() - 3, 0);
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
    if (
      (getUrlParameter("movies") && getUrlParameter("name")) ||
      (getUrlParameter("series") && getUrlParameter("name"))
    )
      var composedUri = self.baseUri();
    else
      var composedUri =
        self.baseUri() + "&page=" + id + "&pageSize=" + self.pageSize();
    console.log(composedUri);
    ajaxHelper(composedUri, "GET").done(function (data) {
      hideLoading();
      console.log(data);
      if (
        (getUrlParameter("movies") && getUrlParameter("name")) ||
        (getUrlParameter("series") && getUrlParameter("name"))
      ) {
        self.titles(data);
        self.totalTitles(data.length);

        var totalPages = Math.min(data.length / self.pageSize(), 1);
        self.totalPages(totalPages);
      } else {
        self.titles(data.Titles);
        self.currentPage(data.CurrentPage);
        self.hasNext(data.HasNext);
        self.hasPrevious(data.HasPrevious);
        self.pageSize(data.PageSize);
        self.totalPages(data.TotalPages);
        self.totalTitles(data.TotalTitles);
      }
      //self.SetFavourites();
    });
    ajaxHelper(self.categoriesUri(), "GET").done(function (data) {
      self.categories(data.Categories);

      if (getUrlParameter("movies")) {
        $("input[value='movies'").prop("checked", true);
      }
      if (getUrlParameter("series")) {
        $("input[value='series'").prop("checked", true);
      }
      if (getUrlParameter("lastAdded")) {
        $("input[value='last'").prop("checked", true);
      }
      if (getUrlParameter("categories")) {
        $("input[value='categories'").prop("checked", true);
        var selectedCategories = getUrlParameter("categories").split(",");
        selectedCategories.map(function (x) {
          $(`.categories[value='${x}']`).prop("checked", true);
        });
        if ($("input[value='categories']").prop("checked", true)) {
          $(".categories").prop("disabled", false);
        }
      }
    });
  };
  self.search = function () {
    window.location.replace(
      updateQueryStringParameter(
        window.location.href,
        "name",
        $(".search-box").val()
      )
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
  var pg = getUrlParameter("page");
  if (pg == undefined) self.activate(1);
  else {
    self.activate(pg);
  }
};

$(document).ready(function () {
  ko.applyBindings(new vm());

  var search = "Titles";
  if (getUrlParameter("movies")) {
    search = "Movies";
  } else if (getUrlParameter("series")) {
    search = "Series";
  }
  $(".search-box").autocomplete({
    source: function (request, response) {
      $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/${search}?name=${encodeURIComponent(
          $(".search-box").val()
        )}`,
        dataType: "json",
        data: {
          term: request.term,
        },
        success: function (data) {
          response(
            $.map(data, function (value, key) {
              return {
                value: value.Name,
                id: value.Id,
              };
            })
          );
        },
      });
    },
    messages: {
      noResults: "",
      results: function () {
        return;
      },
    },
    minLength: 2,
    select: function (event, ui) {
      window.location.href = window.location.origin.concat(
        `/titleDetails.html?id=${ui.item.id}`
      );
    },
  });

  $("input[name='filter']").change(function () {
    if (this.id == "categories") {
      $(".categories").prop("disabled", false);
    } else {
      $(".categories").prop("disabled", true);
      $(".categories").prop("checked", false);
    }
  });
});

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

function resetFilters() {
  $("input[name=filter]").prop("checked", false);
  $(".categories").prop("disabled", true);
  //! Falta resetar url para tirar querystring parameters
  window.location.replace(window.location.origin + window.location.pathname);
}

function applyFilters() {
  if ($("input[name='filter']:checked").val() == "movies") {
    window.location.replace(
      updateQueryStringParameter(
        removeQueryStringParameters(window.location.href, "name"),
        "movies",
        1
      )
    );
  } else if ($("input[name='filter']:checked").val() == "series") {
    window.location.replace(
      updateQueryStringParameter(
        removeQueryStringParameters(window.location.href, "name"),
        "series",
        1
      )
    );
  } else if ($("input[name='filter']:checked").val() == "last") {
    window.location.replace(
      updateQueryStringParameter(
        removeQueryStringParameters(window.location.href, "name"),
        "lastAdded",
        1
      )
    );
  } else if ($("input[name='filter']:checked").val() == "categories") {
    var selectedCategories = [];
    $(".categories:checked").map(function () {
      selectedCategories.push(parseInt(this.value));
    });
    window.location.replace(
      updateQueryStringParameter(
        removeQueryStringParameters(window.location.href),
        "categories",
        selectedCategories
      )
    );
  }
}
