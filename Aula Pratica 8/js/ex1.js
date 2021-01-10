$("#citySelector").change(function () {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather",
    data: {
      q: $("#citySelector").val(),
      // appid: "e68f22ad203124f1fa6e6f6e85bd1d24",
      appid: "b2b1df463182c3cca5276e9d3267cc95",
    },
    success: function (data) {
      if (data.name) {
        $("table").removeClass("d-none");
        $("#cityName").html(data.name + " / " + data.sys.country);
        $("#coordinates").html(
          "Lon (º): " + data.coord.lon + " / Lat (º): " + data.coord.lat
        );
        $("#weather").html(data.weather[0].description);
        $("#temp").html(
          data.main.temp.toString() +
            "ºK / " +
            (data.main.temp - 273.15).toString() +
            "ºC"
        );
        $("#pressure").html(data.main.pressure);
        $("#allData").html(
          JSON.stringify(data, null, 4).replace(/\n/g, "<br>")
        );
      }
    },
    error: function () {
      $("table").addClass("d-none");
      alert("Erro!");
    },
  });
});
