function fetchDrivers() {
  var year = document.getElementById("year").value;
  var url = "https://ergast.com/api/f1/" + year + "/1/results.json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayDrivers(data))
    .catch((error) => console.log(error));
}

function displayDrivers(data) {
  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  var series = data.MRData.series;
  var season = data.MRData.season;
  var totalResults = data.MRData.total;

  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  var headerRow = document.createElement("tr");
  var headers = [
    "Driver Name",
    "Permanent Number",
    "Nationality",
    "Date of Birth",
    "Additional Information",
  ];

  headers.forEach((headerText) => {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  var drivers = data.MRData.RaceTable.Races[0].Results;

  drivers.forEach((driver) => {
    var driverRow = document.createElement("tr");

    var driverName = document.createElement("td");
    driverName.appendChild(
      document.createTextNode(
        driver.Driver.givenName + " " + driver.Driver.familyName
      )
    );
    driverRow.appendChild(driverName);

    var permanentNumber = document.createElement("td");
    permanentNumber.appendChild(
      document.createTextNode(driver.Driver.permanentNumber)
    );
    driverRow.appendChild(permanentNumber);

    var nationality = document.createElement("td");
    nationality.appendChild(document.createTextNode(driver.Driver.nationality));
    driverRow.appendChild(nationality);

    var dateOfBirth = document.createElement("td");
    dateOfBirth.appendChild(document.createTextNode(driver.Driver.dateOfBirth));
    driverRow.appendChild(dateOfBirth);

    var additionalInfo = document.createElement("td");
    var bioLink = document.createElement("a");
    bioLink.href = driver.Driver.url;
    bioLink.target = "_blank";
    bioLink.appendChild(document.createTextNode("Bio"));
    additionalInfo.appendChild(bioLink);
    driverRow.appendChild(additionalInfo);

    tbody.appendChild(driverRow);
  });

  table.appendChild(tbody);
  resultsDiv.appendChild(table);

  var infoParagraph = document.createElement("p");
  infoParagraph.innerHTML =
    "Series: " +
    series +
    "<br>Season: " +
    season +
    "<br>Total Results: " +
    totalResults;
  resultsDiv.appendChild(infoParagraph);
}
