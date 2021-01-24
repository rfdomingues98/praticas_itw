var vm = function () {
  var self = this;
  self.displayName = "Favorites";
  self.error = ko.observable("");
  self.favorites = ko.observableArray(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  self.favorites.sort(function (a, b) {
    return a.Name.toLowerCase() == b.Name.toLowerCase()
      ? 0
      : a.Name.toLowerCase() > b.Name.toLowerCase()
      ? 1
      : -1;
  });

  self.removeFromFavorites = function () {
    var el = this;
    self.favorites.remove(function (e) {
      return e.Id == el.Id;
    });
    localStorage.setItem("favorites", JSON.stringify(self.favorites().sort()));
    console.log(self.favorites());
  };
};

$(document).ready(function () {
  ko.applyBindings(new vm());
});
