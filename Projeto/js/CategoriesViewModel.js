var vm = function () {
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/netflix/api/categories");
  if (getUrlParameter("name")) {
    self.baseUri(
      "http://192.168.160.58/netflix/api/search/categories?name=" +
        getUrlParameter("name")
    );
  }
  self.displayName = "Categories";
  self.error = ko.observable("");
  self.totalCategories = ko.observable(1);
  self.totalPages = ko.observable(1);
  self.currentPage = ko.observable(1);
  self.pageSize = ko.observable(localStorage.getItem("pageSize") || 25);
  self.pageSizeList = ko.observableArray([10, 25, 50]);
  localStorage.setItem("pageSize", self.pageSize());
  self.hasPrevious = ko.observable(false);
  self.hasNext = ko.observable(false);
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
    return Math.min(
      self.currentPage() * self.pageSize(),
      self.totalCategories()
    );
  }, self);

  self.search = function () {
    window.location.replace(
      updateQueryStringParameter(
        window.location.href,
        "name",
        encodeURIComponent($(".search-box").val())
      )
    );
  };

  self.activate = function (id) {
    if (getUrlParameter("name")) {
      var composedUri = self.baseUri();
    } else {
      var composedUri =
        self.baseUri() + "?page=" + id + "&pageSize=" + self.pageSize();
    }
    ajaxHelper(composedUri, "GET").done(function (data) {
      hideLoading();
      if (getUrlParameter("name")) {
        self.categories(data);
        self.totalCategories(data.length);
        var totalPages = Math.max(data.length / self.pageSize(), 1);
        self.totalPages(totalPages);
      } else {
        self.categories(data.Categories);
        self.currentPage(data.CurrentPage);
        self.hasNext(data.HasNext);
        self.hasPrevious(data.HasPrevious);
        self.pageSize(data.PageSize);
        self.totalPages(data.TotalPages);
        self.totalCategories(data.TotalCategories);
      }
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

  var triggerChange = 0;
  $("#pageSize").on("change", function () {
    if (triggerChange == 1) {
      localStorage.setItem("pageSize", $("#pageSize").val());
      window.location.reload();
    }
    triggerChange = 1;
  });

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

  $(".search-box").autocomplete({
    source: function (request, response) {
      $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/categories?name=${encodeURIComponent(
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
        `/categoryDetails.html?id=${ui.item.id}`
      );
    },
  });
});
