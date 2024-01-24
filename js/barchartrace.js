/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------|
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
am4core.globalAdapter.addAll(2)
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(40, 40, 40, 40);
chart.numberFormatter.numberFormat = "#,###.";
var label = chart.plotContainer.createChild(am4core.Label);
label.x = am4core.percent(97);
label.y = am4core.percent(95);
label.horizontalCenter = "right";
label.verticalCenter = "middle";
label.dx = -15;
label.fontSize = 50;

var playButton = chart.plotContainer.createChild(am4core.PlayButton);
playButton.x = am4core.percent(97);
playButton.y = am4core.percent(95);
playButton.dy = -2;
playButton.verticalCenter = "middle";
playButton.events.on("toggled", function(event) {
  if (event.target.isActive) {
    play();
  }
  else {
    stop();
  }
})

var stepDuration = 4000;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = false;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "name";
series.dataFields.valueX = "value";
series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.maxColumns = 1
series.columns.template.column.cornerRadiusTopRight = 5;
series.interpolationDuration = stepDuration;
series.interpolationEasing = am4core.ease.linear;
var labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "right";
labelBullet.label.text = "{values.valueX.workingValue}";
labelBullet.label.textAlign = "end";
labelBullet.label.dx = -10;
labelBullet.label.maxColumns = 1;
chart.zoomOutButton.disabled = true;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target){
  return chart.colors.getIndex(target.dataItem.index);
});

var year = 1872;
label.text = year.toString();

var interval;

function play() {
  interval = setInterval(function(){
    nextYear();
  }, stepDuration)
  nextYear();
}

function stop() {
  if (interval) {
    clearInterval(interval);
  }
}

function nextYear() {
  year++

  
  if (year > 2010) {
    year = 1872
  }

  while (allData[year] == undefined) {
    year++
  }

  var newData = allData[year];
  var itemsWithNonZero = 0;
  for (var i = 0; i < chart.data.length; i++) {
  
   var actualNewData = null
   for (var j = 0; j < chart.data.length; j++) {
     try {
       if (chart.data[i].name == newData[j].name) {
         actualNewData = newData[j]
         break;
       }
     } catch (error) {
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
   }
    
    try {
      chart.data[i].value = actualNewData.value;
    } catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    
    // chart.data[i].value = newData[i].value;
    if (chart.data[i].value > 0) {
      itemsWithNonZero++;
      
    }
  }
  
    if(itemsWithNonZero > 25){
    itemsWithNonZero = 25
  }
  
  

  if (year == 1872) {
    series.interpolationDuration = stepDuration / 4;
    valueAxis.rangeChangeDuration = stepDuration / 4;
  }
  else {
    series.interpolationDuration = stepDuration;
    valueAxis.rangeChangeDuration = stepDuration;
  }

  chart.invalidateRawData();
  label.text = year.toString();

  categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
}


categoryAxis.sortBySeries = series;

var allData = {
    "1883": [
        {
            "name": "Aichi",
            "value": "1354996",
            "date": "1883"
        },
        {
            "name": "Akita",
            "value": "633203",
            "date": "1883"
        },
        {
            "name": "Aomori",
            "value": "488505",
            "date": "1883"
        },
        {
            "name": "Chiba",
            "value": "1124085",
            "date": "1883"
        },
        {
            "name": "Ehime",
            "value": "1491614",
            "date": "1883"
        },
        {
            "name": "Fukui",
            "value": "582210",
            "date": "1883"
        },
        {
            "name": "Fukuoka",
            "value": "1128289",
            "date": "1883"
        },
        {
            "name": "Fukushima",
            "value": "840241",
            "date": "1883"
        },
        {
            "name": "Gifu",
            "value": "868333",
            "date": "1883"
        },
        {
            "name": "Gunma",
            "value": "613410",
            "date": "1883"
        },
        {
            "name": "Hakodate",
            "value": "117063",
            "date": "1883"
        },
        {
            "name": "Hiroshima",
            "value": "1252811",
            "date": "1883"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1433355",
            "date": "1883"
        },
        {
            "name": "Ibaraki",
            "value": "920876",
            "date": "1883"
        },
        {
            "name": "Ishikawa",
            "value": "1428073",
            "date": "1883"
        },
        {
            "name": "Iwate",
            "value": "611735",
            "date": "1883"
        },
        {
            "name": "Kagoshima",
            "value": "1291586",
            "date": "1883"
        },
        {
            "name": "Kanagawa",
            "value": "800925",
            "date": "1883"
        },
        {
            "name": "K\u014dchi",
            "value": "549184",
            "date": "1883"
        },
        {
            "name": "Kumamoto",
            "value": "997830",
            "date": "1883"
        },
        {
            "name": "Ky\u014dto",
            "value": "840951",
            "date": "1883"
        },
        {
            "name": "Mie",
            "value": "870137",
            "date": "1883"
        },
        {
            "name": "Miyagi",
            "value": "633194",
            "date": "1883"
        },
        {
            "name": "Nagano",
            "value": "1033969",
            "date": "1883"
        },
        {
            "name": "Nagasaki",
            "value": "1212157",
            "date": "1883"
        },
        {
            "name": "Nemuro",
            "value": "5642",
            "date": "1883"
        },
        {
            "name": "Niigata",
            "value": "1586599",
            "date": "1883"
        },
        {
            "name": "\u014cita",
            "value": "746411",
            "date": "1883"
        },
        {
            "name": "Okayama",
            "value": "1029567",
            "date": "1883"
        },
        {
            "name": "Okinawa",
            "value": "360770",
            "date": "1883"
        },
        {
            "name": "\u014csaka",
            "value": "1585696",
            "date": "1883"
        },
        {
            "name": "Saitama",
            "value": "970598",
            "date": "1883"
        },
        {
            "name": "Sapporo",
            "value": "61144",
            "date": "1883"
        },
        {
            "name": "Shiga",
            "value": "639961",
            "date": "1883"
        },
        {
            "name": "Shimane",
            "value": "674984",
            "date": "1883"
        },
        {
            "name": "Shizuoka",
            "value": "985881",
            "date": "1883"
        },
        {
            "name": "Tochigi",
            "value": "609000",
            "date": "1883"
        },
        {
            "name": "Tokushima",
            "value": "649616",
            "date": "1883"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "999623",
            "date": "1883"
        },
        {
            "name": "Tottori",
            "value": "379747",
            "date": "1883"
        },
        {
            "name": "Wakayama",
            "value": "610182",
            "date": "1883"
        },
        {
            "name": "Yamagata",
            "value": "695533",
            "date": "1883"
        },
        {
            "name": "Yamaguchi",
            "value": "897370",
            "date": "1883"
        },
        {
            "name": "Yamanashi",
            "value": "410246",
            "date": "1883"
        }
    ],
    "1882": [
        {
            "name": "Aichi",
            "value": "1332050",
            "date": "1882"
        },
        {
            "name": "Aikawa",
            "value": "",
            "date": "1882"
        },
        {
            "name": "Akita",
            "value": "628435",
            "date": "1882"
        },
        {
            "name": "Aomori",
            "value": "487687",
            "date": "1882"
        },
        {
            "name": "Chiba",
            "value": "1117696",
            "date": "1882"
        },
        {
            "name": "Ehime",
            "value": "1472680",
            "date": "1882"
        },
        {
            "name": "Fukui",
            "value": "577717",
            "date": "1882"
        },
        {
            "name": "Fukuoka",
            "value": "1118652",
            "date": "1882"
        },
        {
            "name": "Fukushima",
            "value": "829990",
            "date": "1882"
        },
        {
            "name": "Gifu",
            "value": "855575",
            "date": "1882"
        },
        {
            "name": "Gunma",
            "value": "604182",
            "date": "1882"
        },
        {
            "name": "Hiroshima",
            "value": "1243032",
            "date": "1882"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1419421",
            "date": "1882"
        },
        {
            "name": "Ibaraki",
            "value": "916739",
            "date": "1882"
        },
        {
            "name": "Ishikawa",
            "value": "1412802",
            "date": "1882"
        },
        {
            "name": "Iwate",
            "value": "605538",
            "date": "1882"
        },
        {
            "name": "Kagoshima",
            "value": "1290281",
            "date": "1882"
        },
        {
            "name": "Kaitaku",
            "value": "177901",
            "date": "1882"
        },
        {
            "name": "Kanagawa",
            "value": "790735",
            "date": "1882"
        },
        {
            "name": "K\u014dchi",
            "value": "546642",
            "date": "1882"
        },
        {
            "name": "Kumamoto",
            "value": "993373",
            "date": "1882"
        },
        {
            "name": "Ky\u014dto",
            "value": "835227",
            "date": "1882"
        },
        {
            "name": "Mie",
            "value": "857887",
            "date": "1882"
        },
        {
            "name": "Miyagi",
            "value": "629286",
            "date": "1882"
        },
        {
            "name": "Nagano",
            "value": "1022408",
            "date": "1882"
        },
        {
            "name": "Nagasaki",
            "value": "1204449",
            "date": "1882"
        },
        {
            "name": "Niigata",
            "value": "1581168",
            "date": "1882"
        },
        {
            "name": "\u014cita",
            "value": "741201",
            "date": "1882"
        },
        {
            "name": "Okayama",
            "value": "1019674",
            "date": "1882"
        },
        {
            "name": "Okinawa",
            "value": "358880",
            "date": "1882"
        },
        {
            "name": "\u014csaka",
            "value": "1572333",
            "date": "1882"
        },
        {
            "name": "Saitama",
            "value": "962717",
            "date": "1882"
        },
        {
            "name": "Shiga",
            "value": "633447",
            "date": "1882"
        },
        {
            "name": "Shimane",
            "value": "669410",
            "date": "1882"
        },
        {
            "name": "Shizuoka",
            "value": "980793",
            "date": "1882"
        },
        {
            "name": "Tochigi",
            "value": "600627",
            "date": "1882"
        },
        {
            "name": "Tokushima",
            "value": "642172",
            "date": "1882"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "987911",
            "date": "1882"
        },
        {
            "name": "Tottori",
            "value": "380915",
            "date": "1882"
        },
        {
            "name": "Wakayama",
            "value": "606754",
            "date": "1882"
        },
        {
            "name": "Yamagata",
            "value": "693360",
            "date": "1882"
        },
        {
            "name": "Yamaguchi",
            "value": "888442",
            "date": "1882"
        },
        {
            "name": "Yamanashi",
            "value": "409929",
            "date": "1882"
        }
    ],
    "1881": [
        {
            "name": "Aichi",
            "value": "1317792",
            "date": "1881"
        },
        {
            "name": "Aikawa",
            "value": "",
            "date": "1881"
        },
        {
            "name": "Akita",
            "value": "625506",
            "date": "1881"
        },
        {
            "name": "Aomori",
            "value": "484274",
            "date": "1881"
        },
        {
            "name": "Chiba",
            "value": "1108678",
            "date": "1881"
        },
        {
            "name": "Ehime",
            "value": "1453472",
            "date": "1881"
        },
        {
            "name": "Fukuoka",
            "value": "1109475",
            "date": "1881"
        },
        {
            "name": "Fukushima",
            "value": "823120",
            "date": "1881"
        },
        {
            "name": "Gifu",
            "value": "849221",
            "date": "1881"
        },
        {
            "name": "Gunma",
            "value": "593625",
            "date": "1881"
        },
        {
            "name": "Hiroshima",
            "value": "1225057",
            "date": "1881"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1406613",
            "date": "1881"
        },
        {
            "name": "Ibaraki",
            "value": "906073",
            "date": "1881"
        },
        {
            "name": "Ishikawa",
            "value": "1856402",
            "date": "1881"
        },
        {
            "name": "Iwate",
            "value": "598132",
            "date": "1881"
        },
        {
            "name": "Kagoshima",
            "value": "1279631",
            "date": "1881"
        },
        {
            "name": "Kaitaku",
            "value": "168084",
            "date": "1881"
        },
        {
            "name": "Kanagawa",
            "value": "772903",
            "date": "1881"
        },
        {
            "name": "K\u014dchi",
            "value": "550686",
            "date": "1881"
        },
        {
            "name": "Kumamoto",
            "value": "995673",
            "date": "1881"
        },
        {
            "name": "Ky\u014dto",
            "value": "831012",
            "date": "1881"
        },
        {
            "name": "Mie",
            "value": "850791",
            "date": "1881"
        },
        {
            "name": "Miyagi",
            "value": "625332",
            "date": "1881"
        },
        {
            "name": "Nagano",
            "value": "1012142",
            "date": "1881"
        },
        {
            "name": "Nagasaki",
            "value": "1196065",
            "date": "1881"
        },
        {
            "name": "Niigata",
            "value": "1564312",
            "date": "1881"
        },
        {
            "name": "\u014cita",
            "value": "740009",
            "date": "1881"
        },
        {
            "name": "Okayama",
            "value": "1007054",
            "date": "1881"
        },
        {
            "name": "Okinawa",
            "value": "356801",
            "date": "1881"
        },
        {
            "name": "\u014csaka",
            "value": "586729",
            "date": "1881"
        },
        {
            "name": "Saitama",
            "value": "952689",
            "date": "1881"
        },
        {
            "name": "Sakai",
            "value": "960711",
            "date": "1881"
        },
        {
            "name": "Shiga",
            "value": "745133",
            "date": "1881"
        },
        {
            "name": "Shimane",
            "value": "1043865",
            "date": "1881"
        },
        {
            "name": "Shizuoka",
            "value": "972265",
            "date": "1881"
        },
        {
            "name": "Tochigi",
            "value": "593383",
            "date": "1881"
        },
        {
            "name": "Tokushima",
            "value": "637550",
            "date": "1881"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "979109",
            "date": "1881"
        },
        {
            "name": "Wakayama",
            "value": "603723",
            "date": "1881"
        },
        {
            "name": "Yamagata",
            "value": "687718",
            "date": "1881"
        },
        {
            "name": "Yamaguchi",
            "value": "883885",
            "date": "1881"
        },
        {
            "name": "Yamanashi",
            "value": "404299",
            "date": "1881"
        }
    ],
    "1880": [
        {
            "name": "Aichi",
            "value": "1303812",
            "date": "1880"
        },
        {
            "name": "Aikawa",
            "value": "",
            "date": "1880"
        },
        {
            "name": "Akita",
            "value": "618833",
            "date": "1880"
        },
        {
            "name": "Aomori",
            "value": "475413",
            "date": "1880"
        },
        {
            "name": "Chiba",
            "value": "1103292",
            "date": "1880"
        },
        {
            "name": "Ehime",
            "value": "1438895",
            "date": "1880"
        },
        {
            "name": "Fukuoka",
            "value": "1097215",
            "date": "1880"
        },
        {
            "name": "Fukushima",
            "value": "808937",
            "date": "1880"
        },
        {
            "name": "Gifu",
            "value": "839613",
            "date": "1880"
        },
        {
            "name": "Gunma",
            "value": "581556",
            "date": "1880"
        },
        {
            "name": "Hiroshima",
            "value": "1213152",
            "date": "1880"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1391928",
            "date": "1880"
        },
        {
            "name": "Ibaraki",
            "value": "894376",
            "date": "1880"
        },
        {
            "name": "Ishikawa",
            "value": "1833778",
            "date": "1880"
        },
        {
            "name": "Iwate",
            "value": "591881",
            "date": "1880"
        },
        {
            "name": "Kagoshima",
            "value": "1270463",
            "date": "1880"
        },
        {
            "name": "Kaitaku",
            "value": "163355",
            "date": "1880"
        },
        {
            "name": "Kanagawa",
            "value": "757462",
            "date": "1880"
        },
        {
            "name": "K\u014dchi",
            "value": "1179247",
            "date": "1880"
        },
        {
            "name": "Kumamoto",
            "value": "986695",
            "date": "1880"
        },
        {
            "name": "Ky\u014dto",
            "value": "822112",
            "date": "1880"
        },
        {
            "name": "Mie",
            "value": "842113",
            "date": "1880"
        },
        {
            "name": "Miyagi",
            "value": "619120",
            "date": "1880"
        },
        {
            "name": "Nagano",
            "value": "1000414",
            "date": "1880"
        },
        {
            "name": "Nagasaki",
            "value": "1190335",
            "date": "1880"
        },
        {
            "name": "Niigata",
            "value": "1546338",
            "date": "1880"
        },
        {
            "name": "Ogasawara",
            "value": "156",
            "date": "1880"
        },
        {
            "name": "\u014cita",
            "value": "731964",
            "date": "1880"
        },
        {
            "name": "Okayama",
            "value": "1000570",
            "date": "1880"
        },
        {
            "name": "Okinawa",
            "value": "310545",
            "date": "1880"
        },
        {
            "name": "\u014csaka",
            "value": "582668",
            "date": "1880"
        },
        {
            "name": "Saitama",
            "value": "933955",
            "date": "1880"
        },
        {
            "name": "Sakai",
            "value": "957407",
            "date": "1880"
        },
        {
            "name": "Shiga",
            "value": "738211",
            "date": "1880"
        },
        {
            "name": "Shimane",
            "value": "1037260",
            "date": "1880"
        },
        {
            "name": "Shizuoka",
            "value": "970022",
            "date": "1880"
        },
        {
            "name": "Tochigi",
            "value": "581358",
            "date": "1880"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "957144",
            "date": "1880"
        },
        {
            "name": "Wakayama",
            "value": "601236",
            "date": "1880"
        },
        {
            "name": "Yamagata",
            "value": "682929",
            "date": "1880"
        },
        {
            "name": "Yamaguchi",
            "value": "877614",
            "date": "1880"
        },
        {
            "name": "Yamanashi",
            "value": "395447",
            "date": "1880"
        }
    ],
    "1879": [
        {
            "name": "Aichi",
            "value": "1295452",
            "date": "1879"
        },
        {
            "name": "Aikawa",
            "value": "",
            "date": "1879"
        },
        {
            "name": "Akita",
            "value": "621130",
            "date": "1879"
        },
        {
            "name": "Aomori",
            "value": "468517",
            "date": "1879"
        },
        {
            "name": "Chiba",
            "value": "1099676",
            "date": "1879"
        },
        {
            "name": "Ehime",
            "value": "1432627",
            "date": "1879"
        },
        {
            "name": "Fukuoka",
            "value": "1087604",
            "date": "1879"
        },
        {
            "name": "Fukushima",
            "value": "804866",
            "date": "1879"
        },
        {
            "name": "Gifu",
            "value": "831887",
            "date": "1879"
        },
        {
            "name": "Gunma",
            "value": "573984",
            "date": "1879"
        },
        {
            "name": "Hiroshima",
            "value": "1207947",
            "date": "1879"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1370720",
            "date": "1879"
        },
        {
            "name": "Ibaraki",
            "value": "887957",
            "date": "1879"
        },
        {
            "name": "Ishikawa",
            "value": "1852811",
            "date": "1879"
        },
        {
            "name": "Iwate",
            "value": "592294",
            "date": "1879"
        },
        {
            "name": "Kagoshima",
            "value": "1261909",
            "date": "1879"
        },
        {
            "name": "Kaitaku",
            "value": "158615",
            "date": "1879"
        },
        {
            "name": "Kanagawa",
            "value": "754610",
            "date": "1879"
        },
        {
            "name": "K\u014dchi",
            "value": "1185764",
            "date": "1879"
        },
        {
            "name": "Kumamoto",
            "value": "981341",
            "date": "1879"
        },
        {
            "name": "Ky\u014dto",
            "value": "814273",
            "date": "1879"
        },
        {
            "name": "Mie",
            "value": "834893",
            "date": "1879"
        },
        {
            "name": "Miyagi",
            "value": "616881",
            "date": "1879"
        },
        {
            "name": "Nagano",
            "value": "986077",
            "date": "1879"
        },
        {
            "name": "Nagasaki",
            "value": "1192134",
            "date": "1879"
        },
        {
            "name": "Niigata",
            "value": "1530712",
            "date": "1879"
        },
        {
            "name": "Ogasawara",
            "value": "194",
            "date": "1879"
        },
        {
            "name": "\u014cita",
            "value": "728115",
            "date": "1879"
        },
        {
            "name": "Okayama",
            "value": "1001220",
            "date": "1879"
        },
        {
            "name": "Okinawa",
            "value": "310545",
            "date": "1879"
        },
        {
            "name": "\u014csaka",
            "value": "578270",
            "date": "1879"
        },
        {
            "name": "Saitama",
            "value": "929939",
            "date": "1879"
        },
        {
            "name": "Sakai",
            "value": "955748",
            "date": "1879"
        },
        {
            "name": "Shiga",
            "value": "729893",
            "date": "1879"
        },
        {
            "name": "Shimane",
            "value": "1034581",
            "date": "1879"
        },
        {
            "name": "Shizuoka",
            "value": "980766",
            "date": "1879"
        },
        {
            "name": "Tochigi",
            "value": "570843",
            "date": "1879"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "953776",
            "date": "1879"
        },
        {
            "name": "Wakayama",
            "value": "602075",
            "date": "1879"
        },
        {
            "name": "Yamagata",
            "value": "681180",
            "date": "1879"
        },
        {
            "name": "Yamaguchi",
            "value": "875607",
            "date": "1879"
        },
        {
            "name": "Yamanashi",
            "value": "391123",
            "date": "1879"
        }
    ],
    "1878": [
        {
            "name": "Aichi",
            "value": "1267206",
            "date": "1878"
        },
        {
            "name": "Aikawa",
            "value": "",
            "date": "1878"
        },
        {
            "name": "Akita",
            "value": "616148",
            "date": "1878"
        },
        {
            "name": "Aomori",
            "value": "464985",
            "date": "1878"
        },
        {
            "name": "Chiba",
            "value": "1078635",
            "date": "1878"
        },
        {
            "name": "Ehime",
            "value": "1403693",
            "date": "1878"
        },
        {
            "name": "Fukuoka",
            "value": "1070244",
            "date": "1878"
        },
        {
            "name": "Fukushima",
            "value": "774707",
            "date": "1878"
        },
        {
            "name": "Gifu",
            "value": "818984",
            "date": "1878"
        },
        {
            "name": "Gunma",
            "value": "554888",
            "date": "1878"
        },
        {
            "name": "Hiroshima",
            "value": "1197835",
            "date": "1878"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1357377",
            "date": "1878"
        },
        {
            "name": "Ibaraki",
            "value": "875491",
            "date": "1878"
        },
        {
            "name": "Ishikawa",
            "value": "1825507",
            "date": "1878"
        },
        {
            "name": "Iwate",
            "value": "579249",
            "date": "1878"
        },
        {
            "name": "Kagoshima",
            "value": "1219942",
            "date": "1878"
        },
        {
            "name": "Kaitaku",
            "value": "151735",
            "date": "1878"
        },
        {
            "name": "Kanagawa",
            "value": "715258",
            "date": "1878"
        },
        {
            "name": "K\u014dchi",
            "value": "1164723",
            "date": "1878"
        },
        {
            "name": "Kumamoto",
            "value": "980976",
            "date": "1878"
        },
        {
            "name": "Ky\u014dto",
            "value": "798911",
            "date": "1878"
        },
        {
            "name": "Mie",
            "value": "830415",
            "date": "1878"
        },
        {
            "name": "Miyagi",
            "value": "594684",
            "date": "1878"
        },
        {
            "name": "Nagano",
            "value": "973959",
            "date": "1878"
        },
        {
            "name": "Nagasaki",
            "value": "1173263",
            "date": "1878"
        },
        {
            "name": "Niigata",
            "value": "1504601",
            "date": "1878"
        },
        {
            "name": "\u014cita",
            "value": "718816",
            "date": "1878"
        },
        {
            "name": "Okayama",
            "value": "984621",
            "date": "1878"
        },
        {
            "name": "\u014csaka",
            "value": "553777",
            "date": "1878"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "168064",
            "date": "1878"
        },
        {
            "name": "Saitama",
            "value": "912528",
            "date": "1878"
        },
        {
            "name": "Sakai",
            "value": "923030",
            "date": "1878"
        },
        {
            "name": "Shiga",
            "value": "721099",
            "date": "1878"
        },
        {
            "name": "Shimane",
            "value": "1023678",
            "date": "1878"
        },
        {
            "name": "Shizuoka",
            "value": "976405",
            "date": "1878"
        },
        {
            "name": "Tochigi",
            "value": "550271",
            "date": "1878"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "881443",
            "date": "1878"
        },
        {
            "name": "Wakayama",
            "value": "591668",
            "date": "1878"
        },
        {
            "name": "Yamagata",
            "value": "662913",
            "date": "1878"
        },
        {
            "name": "Yamaguchi",
            "value": "855618",
            "date": "1878"
        },
        {
            "name": "Yamanashi",
            "value": "381229",
            "date": "1878"
        }
    ],
    "1877": [
        {
            "name": "Aichi",
            "value": "1250839",
            "date": "1877"
        },
        {
            "name": "Aikawa",
            "value": "",
            "date": "1877"
        },
        {
            "name": "Akita",
            "value": "613389",
            "date": "1877"
        },
        {
            "name": "Aomori",
            "value": "462865",
            "date": "1877"
        },
        {
            "name": "Chiba",
            "value": "1071142",
            "date": "1877"
        },
        {
            "name": "Ehime",
            "value": "1394091",
            "date": "1877"
        },
        {
            "name": "Fukuoka",
            "value": "1064050",
            "date": "1877"
        },
        {
            "name": "Fukushima",
            "value": "765115",
            "date": "1877"
        },
        {
            "name": "Gifu",
            "value": "806158",
            "date": "1877"
        },
        {
            "name": "Gunma",
            "value": "547991",
            "date": "1877"
        },
        {
            "name": "Hiroshima",
            "value": "1190069",
            "date": "1877"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1343758",
            "date": "1877"
        },
        {
            "name": "Ibaraki",
            "value": "867701",
            "date": "1877"
        },
        {
            "name": "Ishikawa",
            "value": "1806509",
            "date": "1877"
        },
        {
            "name": "Iwate",
            "value": "578297",
            "date": "1877"
        },
        {
            "name": "Kagoshima",
            "value": "1218383",
            "date": "1877"
        },
        {
            "name": "Kaitaku",
            "value": "150667",
            "date": "1877"
        },
        {
            "name": "Kanagawa",
            "value": "707272",
            "date": "1877"
        },
        {
            "name": "K\u014dchi",
            "value": "1160235",
            "date": "1877"
        },
        {
            "name": "Kumamoto",
            "value": "980642",
            "date": "1877"
        },
        {
            "name": "Ky\u014dto",
            "value": "792042",
            "date": "1877"
        },
        {
            "name": "Mie",
            "value": "818877",
            "date": "1877"
        },
        {
            "name": "Miyagi",
            "value": "591524",
            "date": "1877"
        },
        {
            "name": "Nagano",
            "value": "965677",
            "date": "1877"
        },
        {
            "name": "Nagasaki",
            "value": "1167367",
            "date": "1877"
        },
        {
            "name": "Niigata",
            "value": "1500061",
            "date": "1877"
        },
        {
            "name": "\u014cita",
            "value": "714234",
            "date": "1877"
        },
        {
            "name": "Okayama",
            "value": "976774",
            "date": "1877"
        },
        {
            "name": "\u014csaka",
            "value": "551950",
            "date": "1877"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "167822",
            "date": "1877"
        },
        {
            "name": "Saitama",
            "value": "901714",
            "date": "1877"
        },
        {
            "name": "Sakai",
            "value": "911738",
            "date": "1877"
        },
        {
            "name": "Shiga",
            "value": "711802",
            "date": "1877"
        },
        {
            "name": "Shimane",
            "value": "1017361",
            "date": "1877"
        },
        {
            "name": "Shizuoka",
            "value": "968814",
            "date": "1877"
        },
        {
            "name": "Tochigi",
            "value": "543245",
            "date": "1877"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "877049",
            "date": "1877"
        },
        {
            "name": "Wakayama",
            "value": "584976",
            "date": "1877"
        },
        {
            "name": "Yamagata",
            "value": "657613",
            "date": "1877"
        },
        {
            "name": "Yamaguchi",
            "value": "850608",
            "date": "1877"
        },
        {
            "name": "Yamanashi",
            "value": "377944",
            "date": "1877"
        }
    ],
    "1876": [
        {
            "name": "Aichi",
            "value": "1244711",
            "date": "1876"
        },
        {
            "name": "Aikawa",
            "value": "104764",
            "date": "1876"
        },
        {
            "name": "Akita",
            "value": "609420",
            "date": "1876"
        },
        {
            "name": "Aomori",
            "value": "489245",
            "date": "1876"
        },
        {
            "name": "Ashigara",
            "value": "355880",
            "date": "1876"
        },
        {
            "name": "Chiba",
            "value": "1061664",
            "date": "1876"
        },
        {
            "name": "Chikuma",
            "value": "570701",
            "date": "1876"
        },
        {
            "name": "Ehime",
            "value": "793214",
            "date": "1876"
        },
        {
            "name": "Fukuoka",
            "value": "457335",
            "date": "1876"
        },
        {
            "name": "Fukushima",
            "value": "281824",
            "date": "1876"
        },
        {
            "name": "Gifu",
            "value": "692218",
            "date": "1876"
        },
        {
            "name": "Hamada",
            "value": "270804",
            "date": "1876"
        },
        {
            "name": "Hamamatsu",
            "value": "421342",
            "date": "1876"
        },
        {
            "name": "Hiroshima",
            "value": "964337",
            "date": "1876"
        },
        {
            "name": "Hokuj\u014d",
            "value": "218605",
            "date": "1876"
        },
        {
            "name": "Hy\u014dgo",
            "value": "204141",
            "date": "1876"
        },
        {
            "name": "Ibaraki",
            "value": "858927",
            "date": "1876"
        },
        {
            "name": "Ishikawa",
            "value": "696429",
            "date": "1876"
        },
        {
            "name": "Iwai",
            "value": "385031",
            "date": "1876"
        },
        {
            "name": "Iwasaki",
            "value": "258080",
            "date": "1876"
        },
        {
            "name": "Iwate",
            "value": "327924",
            "date": "1876"
        },
        {
            "name": "Kagawa",
            "value": "591584",
            "date": "1876"
        },
        {
            "name": "Kagoshima",
            "value": "820654",
            "date": "1876"
        },
        {
            "name": "Kaitaku",
            "value": "149554",
            "date": "1876"
        },
        {
            "name": "Kanagawa",
            "value": "497677",
            "date": "1876"
        },
        {
            "name": "K\u014dchi",
            "value": "534070",
            "date": "1876"
        },
        {
            "name": "Kokura",
            "value": "322156",
            "date": "1876"
        },
        {
            "name": "Kumagaya",
            "value": "842717",
            "date": "1876"
        },
        {
            "name": "Ky\u014dto",
            "value": "574918",
            "date": "1876"
        },
        {
            "name": "Mie",
            "value": "429986",
            "date": "1876"
        },
        {
            "name": "Miyagi",
            "value": "421960",
            "date": "1876"
        },
        {
            "name": "Miyazaki",
            "value": "388508",
            "date": "1876"
        },
        {
            "name": "Mizuma",
            "value": "400504",
            "date": "1876"
        },
        {
            "name": "My\u014dd\u014d",
            "value": "787160",
            "date": "1876"
        },
        {
            "name": "Nagano",
            "value": "486812",
            "date": "1876"
        },
        {
            "name": "Nagasaki",
            "value": "672278",
            "date": "1876"
        },
        {
            "name": "Nara",
            "value": "433938",
            "date": "1876"
        },
        {
            "name": "Niigata",
            "value": "1388812",
            "date": "1876"
        },
        {
            "name": "Niikawa",
            "value": "649458",
            "date": "1876"
        },
        {
            "name": "\u014cita",
            "value": "583740",
            "date": "1876"
        },
        {
            "name": "Okayama",
            "value": "961035",
            "date": "1876"
        },
        {
            "name": "Okitama",
            "value": "132341",
            "date": "1876"
        },
        {
            "name": "\u014csaka",
            "value": "549280",
            "date": "1876"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "167572",
            "date": "1876"
        },
        {
            "name": "Saga",
            "value": "491260",
            "date": "1876"
        },
        {
            "name": "Saitama",
            "value": "455891",
            "date": "1876"
        },
        {
            "name": "Sakai",
            "value": "470596",
            "date": "1876"
        },
        {
            "name": "Shiga",
            "value": "589747",
            "date": "1876"
        },
        {
            "name": "Shikama",
            "value": "659643",
            "date": "1876"
        },
        {
            "name": "Shimane",
            "value": "342621",
            "date": "1876"
        },
        {
            "name": "Shirakawa",
            "value": "976753",
            "date": "1876"
        },
        {
            "name": "Shizuoka",
            "value": "382814",
            "date": "1876"
        },
        {
            "name": "Tochigi",
            "value": "665724",
            "date": "1876"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "873646",
            "date": "1876"
        },
        {
            "name": "Tottori",
            "value": "395632",
            "date": "1876"
        },
        {
            "name": "Toyo'oka",
            "value": "513079",
            "date": "1876"
        },
        {
            "name": "Tsuruga",
            "value": "553425",
            "date": "1876"
        },
        {
            "name": "Tsurugaoka",
            "value": "207939",
            "date": "1876"
        },
        {
            "name": "Wakamatsu",
            "value": "215624",
            "date": "1876"
        },
        {
            "name": "Wakayama",
            "value": "579112",
            "date": "1876"
        },
        {
            "name": "Watarai",
            "value": "380475",
            "date": "1876"
        },
        {
            "name": "Yamagata",
            "value": "312313",
            "date": "1876"
        },
        {
            "name": "Yamaguchi",
            "value": "844550",
            "date": "1876"
        },
        {
            "name": "Yamanashi",
            "value": "374250",
            "date": "1876"
        }
    ],
    "1875": [
        {
            "name": "Aichi",
            "value": "1234003",
            "date": "1875"
        },
        {
            "name": "Aikawa",
            "value": "104630",
            "date": "1875"
        },
        {
            "name": "Akita",
            "value": "604114",
            "date": "1875"
        },
        {
            "name": "Aomori",
            "value": "484428",
            "date": "1875"
        },
        {
            "name": "Ashigara",
            "value": "353609",
            "date": "1875"
        },
        {
            "name": "Chiba",
            "value": "1055373",
            "date": "1875"
        },
        {
            "name": "Chikuma",
            "value": "564332",
            "date": "1875"
        },
        {
            "name": "Ehime",
            "value": "791522",
            "date": "1875"
        },
        {
            "name": "Fukuoka",
            "value": "450965",
            "date": "1875"
        },
        {
            "name": "Fukushima",
            "value": "281302",
            "date": "1875"
        },
        {
            "name": "Gifu",
            "value": "683050",
            "date": "1875"
        },
        {
            "name": "Hamada",
            "value": "268455",
            "date": "1875"
        },
        {
            "name": "Hamamatsu",
            "value": "420513",
            "date": "1875"
        },
        {
            "name": "Hiroshima",
            "value": "942827",
            "date": "1875"
        },
        {
            "name": "Hokuj\u014d",
            "value": "217362",
            "date": "1875"
        },
        {
            "name": "Hy\u014dgo",
            "value": "201389",
            "date": "1875"
        },
        {
            "name": "Ibaraki",
            "value": "378269",
            "date": "1875"
        },
        {
            "name": "Ishikawa",
            "value": "691735",
            "date": "1875"
        },
        {
            "name": "Iwasaki",
            "value": "249553",
            "date": "1875"
        },
        {
            "name": "Iwate",
            "value": "323434",
            "date": "1875"
        },
        {
            "name": "Kagoshima",
            "value": "813692",
            "date": "1875"
        },
        {
            "name": "Kaitaku",
            "value": "149008",
            "date": "1875"
        },
        {
            "name": "Kanagawa",
            "value": "507928",
            "date": "1875"
        },
        {
            "name": "K\u014dchi",
            "value": "531863",
            "date": "1875"
        },
        {
            "name": "Kokura",
            "value": "317108",
            "date": "1875"
        },
        {
            "name": "Kumagaya",
            "value": "828420",
            "date": "1875"
        },
        {
            "name": "Ky\u014dto",
            "value": "571192",
            "date": "1875"
        },
        {
            "name": "Mie",
            "value": "427831",
            "date": "1875"
        },
        {
            "name": "Miyagi",
            "value": "419135",
            "date": "1875"
        },
        {
            "name": "Miyazaki",
            "value": "384071",
            "date": "1875"
        },
        {
            "name": "Mizuma",
            "value": "396903",
            "date": "1875"
        },
        {
            "name": "Mizusawa",
            "value": "380409",
            "date": "1875"
        },
        {
            "name": "My\u014dd\u014d",
            "value": "1349672",
            "date": "1875"
        },
        {
            "name": "Nagano",
            "value": "481351",
            "date": "1875"
        },
        {
            "name": "Nagasaki",
            "value": "668974",
            "date": "1875"
        },
        {
            "name": "Nara",
            "value": "430734",
            "date": "1875"
        },
        {
            "name": "Niigata",
            "value": "1388353",
            "date": "1875"
        },
        {
            "name": "Niihari",
            "value": "485119",
            "date": "1875"
        },
        {
            "name": "Niikawa",
            "value": "638822",
            "date": "1875"
        },
        {
            "name": "Oda",
            "value": "619647",
            "date": "1875"
        },
        {
            "name": "\u014cita",
            "value": "580347",
            "date": "1875"
        },
        {
            "name": "Okayama",
            "value": "335592",
            "date": "1875"
        },
        {
            "name": "Okitama",
            "value": "131935",
            "date": "1875"
        },
        {
            "name": "\u014csaka",
            "value": "545035",
            "date": "1875"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "167320",
            "date": "1875"
        },
        {
            "name": "Saga",
            "value": "487008",
            "date": "1875"
        },
        {
            "name": "Saitama",
            "value": "440433",
            "date": "1875"
        },
        {
            "name": "Sakai",
            "value": "466048",
            "date": "1875"
        },
        {
            "name": "Sakata",
            "value": "207902",
            "date": "1875"
        },
        {
            "name": "Shiga",
            "value": "584756",
            "date": "1875"
        },
        {
            "name": "Shikama",
            "value": "651033",
            "date": "1875"
        },
        {
            "name": "Shimane",
            "value": "340398",
            "date": "1875"
        },
        {
            "name": "Shirakawa",
            "value": "965242",
            "date": "1875"
        },
        {
            "name": "Shizuoka",
            "value": "378076",
            "date": "1875"
        },
        {
            "name": "Tochigi",
            "value": "648503",
            "date": "1875"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "855270",
            "date": "1875"
        },
        {
            "name": "Tottori",
            "value": "392589",
            "date": "1875"
        },
        {
            "name": "Toyo'oka",
            "value": "508027",
            "date": "1875"
        },
        {
            "name": "Tsuruga",
            "value": "548833",
            "date": "1875"
        },
        {
            "name": "Wakamatsu",
            "value": "212052",
            "date": "1875"
        },
        {
            "name": "Wakayama",
            "value": "572436",
            "date": "1875"
        },
        {
            "name": "Watarai",
            "value": "369479",
            "date": "1875"
        },
        {
            "name": "Yamagata",
            "value": "309837",
            "date": "1875"
        },
        {
            "name": "Yamaguchi",
            "value": "838946",
            "date": "1875"
        },
        {
            "name": "Yamanashi",
            "value": "369255",
            "date": "1875"
        }
    ],
    "1874": [
        {
            "name": "Aichi",
            "value": "1217521",
            "date": "1874"
        },
        {
            "name": "Aikawa",
            "value": "104405",
            "date": "1874"
        },
        {
            "name": "Akita",
            "value": "596641",
            "date": "1874"
        },
        {
            "name": "Aomori",
            "value": "473098",
            "date": "1874"
        },
        {
            "name": "Ashigara",
            "value": "344132",
            "date": "1874"
        },
        {
            "name": "Chiba",
            "value": "1043189",
            "date": "1874"
        },
        {
            "name": "Chikuma",
            "value": "556959",
            "date": "1874"
        },
        {
            "name": "Ehime",
            "value": "786408",
            "date": "1874"
        },
        {
            "name": "Fukuoka",
            "value": "448628",
            "date": "1874"
        },
        {
            "name": "Fukushima",
            "value": "270679",
            "date": "1874"
        },
        {
            "name": "Gifu",
            "value": "672627",
            "date": "1874"
        },
        {
            "name": "Hamada",
            "value": "263955",
            "date": "1874"
        },
        {
            "name": "Hamamatsu",
            "value": "414721",
            "date": "1874"
        },
        {
            "name": "Hiroshima",
            "value": "941978",
            "date": "1874"
        },
        {
            "name": "Hokuj\u014d",
            "value": "215792",
            "date": "1874"
        },
        {
            "name": "Hy\u014dgo",
            "value": "197512",
            "date": "1874"
        },
        {
            "name": "Ibaraki",
            "value": "375172",
            "date": "1874"
        },
        {
            "name": "Ishikawa",
            "value": "686249",
            "date": "1874"
        },
        {
            "name": "Iwasaki",
            "value": "244703",
            "date": "1874"
        },
        {
            "name": "Iwate",
            "value": "321871",
            "date": "1874"
        },
        {
            "name": "Kagoshima",
            "value": "812327",
            "date": "1874"
        },
        {
            "name": "Kaitaku",
            "value": "146443",
            "date": "1874"
        },
        {
            "name": "Kanagawa",
            "value": "502504",
            "date": "1874"
        },
        {
            "name": "K\u014dchi",
            "value": "528728",
            "date": "1874"
        },
        {
            "name": "Kokura",
            "value": "312539",
            "date": "1874"
        },
        {
            "name": "Kumagaya",
            "value": "808913",
            "date": "1874"
        },
        {
            "name": "Ky\u014dto",
            "value": "572763",
            "date": "1874"
        },
        {
            "name": "Mie",
            "value": "417439",
            "date": "1874"
        },
        {
            "name": "Miyagi",
            "value": "410437",
            "date": "1874"
        },
        {
            "name": "Miyazaki",
            "value": "388083",
            "date": "1874"
        },
        {
            "name": "Mizuma",
            "value": "396371",
            "date": "1874"
        },
        {
            "name": "Mizusawa",
            "value": "379170",
            "date": "1874"
        },
        {
            "name": "My\u014dd\u014d",
            "value": "1335364",
            "date": "1874"
        },
        {
            "name": "Nagano",
            "value": "474141",
            "date": "1874"
        },
        {
            "name": "Nagasaki",
            "value": "668482",
            "date": "1874"
        },
        {
            "name": "Nara",
            "value": "427635",
            "date": "1874"
        },
        {
            "name": "Niigata",
            "value": "1368782",
            "date": "1874"
        },
        {
            "name": "Niihari",
            "value": "478940",
            "date": "1874"
        },
        {
            "name": "Niikawa",
            "value": "629006",
            "date": "1874"
        },
        {
            "name": "Oda",
            "value": "608353",
            "date": "1874"
        },
        {
            "name": "\u014cita",
            "value": "578163",
            "date": "1874"
        },
        {
            "name": "Okayama",
            "value": "333575",
            "date": "1874"
        },
        {
            "name": "Okitama",
            "value": "131910",
            "date": "1874"
        },
        {
            "name": "\u014csaka",
            "value": "535409",
            "date": "1874"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "167073",
            "date": "1874"
        },
        {
            "name": "Saga",
            "value": "486946",
            "date": "1874"
        },
        {
            "name": "Saitama",
            "value": "435436",
            "date": "1874"
        },
        {
            "name": "Sakai",
            "value": "455450",
            "date": "1874"
        },
        {
            "name": "Sakata",
            "value": "208107",
            "date": "1874"
        },
        {
            "name": "Shiga",
            "value": "579704",
            "date": "1874"
        },
        {
            "name": "Shikama",
            "value": "641946",
            "date": "1874"
        },
        {
            "name": "Shimane",
            "value": "340065",
            "date": "1874"
        },
        {
            "name": "Shirakawa",
            "value": "957790",
            "date": "1874"
        },
        {
            "name": "Shizuoka",
            "value": "372674",
            "date": "1874"
        },
        {
            "name": "Tochigi",
            "value": "636348",
            "date": "1874"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "830935",
            "date": "1874"
        },
        {
            "name": "Tottori",
            "value": "388861",
            "date": "1874"
        },
        {
            "name": "Toyo'oka",
            "value": "507815",
            "date": "1874"
        },
        {
            "name": "Tsuruga",
            "value": "547582",
            "date": "1874"
        },
        {
            "name": "Wakamatsu",
            "value": "209671",
            "date": "1874"
        },
        {
            "name": "Wakayama",
            "value": "565696",
            "date": "1874"
        },
        {
            "name": "Watarai",
            "value": "363563",
            "date": "1874"
        },
        {
            "name": "Yamagata",
            "value": "307535",
            "date": "1874"
        },
        {
            "name": "Yamaguchi",
            "value": "836419",
            "date": "1874"
        },
        {
            "name": "Yamanashi",
            "value": "364345",
            "date": "1874"
        }
    ],
    "1873": [
        {
            "name": "Aichi",
            "value": "1217444",
            "date": "1873"
        },
        {
            "name": "Aikawa",
            "value": "103553",
            "date": "1873"
        },
        {
            "name": "Akita",
            "value": "581859",
            "date": "1873"
        },
        {
            "name": "Aomori",
            "value": "473317",
            "date": "1873"
        },
        {
            "name": "Ashigara",
            "value": "342298",
            "date": "1873"
        },
        {
            "name": "Asuwa",
            "value": "339210",
            "date": "1873"
        },
        {
            "name": "Chikuma",
            "value": "554657",
            "date": "1873"
        },
        {
            "name": "Fukuoka",
            "value": "445278",
            "date": "1873"
        },
        {
            "name": "Fukushima",
            "value": "268959",
            "date": "1873"
        },
        {
            "name": "Gifu",
            "value": "668148",
            "date": "1873"
        },
        {
            "name": "Gunma",
            "value": "384796",
            "date": "1873"
        },
        {
            "name": "Hamada",
            "value": "262035",
            "date": "1873"
        },
        {
            "name": "Hamamatsu",
            "value": "416543",
            "date": "1873"
        },
        {
            "name": "Hiroshima",
            "value": "925962",
            "date": "1873"
        },
        {
            "name": "Hokuj\u014d",
            "value": "215676",
            "date": "1873"
        },
        {
            "name": "Hy\u014dgo",
            "value": "200058",
            "date": "1873"
        },
        {
            "name": "Ibaraki",
            "value": "368560",
            "date": "1873"
        },
        {
            "name": "Inba",
            "value": "578927",
            "date": "1873"
        },
        {
            "name": "Iruma",
            "value": "414824",
            "date": "1873"
        },
        {
            "name": "Ishikawa",
            "value": "669647",
            "date": "1873"
        },
        {
            "name": "Ishizuchi",
            "value": "420303",
            "date": "1873"
        },
        {
            "name": "Iwasaki",
            "value": "242941",
            "date": "1873"
        },
        {
            "name": "Iwate",
            "value": "320731",
            "date": "1873"
        },
        {
            "name": "Kagawa",
            "value": "564351",
            "date": "1873"
        },
        {
            "name": "Kagoshima",
            "value": "806902",
            "date": "1873"
        },
        {
            "name": "Kaitaku",
            "value": "123668",
            "date": "1873"
        },
        {
            "name": "Kamiyama",
            "value": "358253",
            "date": "1873"
        },
        {
            "name": "Kanagawa",
            "value": "479180",
            "date": "1873"
        },
        {
            "name": "Kashiwazaki",
            "value": "719646",
            "date": "1873"
        },
        {
            "name": "Kisarazu",
            "value": "458619",
            "date": "1873"
        },
        {
            "name": "K\u014dchi",
            "value": "526285",
            "date": "1873"
        },
        {
            "name": "Kokura",
            "value": "307535",
            "date": "1873"
        },
        {
            "name": "Ky\u014dto",
            "value": "569733",
            "date": "1873"
        },
        {
            "name": "Mie",
            "value": "419068",
            "date": "1873"
        },
        {
            "name": "Miyagi",
            "value": "408088",
            "date": "1873"
        },
        {
            "name": "Miyazaki",
            "value": "382564",
            "date": "1873"
        },
        {
            "name": "Mizuma",
            "value": "393656",
            "date": "1873"
        },
        {
            "name": "Mizusawa",
            "value": "376079",
            "date": "1873"
        },
        {
            "name": "My\u014dd\u014d",
            "value": "755533",
            "date": "1873"
        },
        {
            "name": "Nagano",
            "value": "469032",
            "date": "1873"
        },
        {
            "name": "Nagasaki",
            "value": "665123",
            "date": "1873"
        },
        {
            "name": "Nara",
            "value": "423004",
            "date": "1873"
        },
        {
            "name": "Niigata",
            "value": "637576",
            "date": "1873"
        },
        {
            "name": "Niihari",
            "value": "474170",
            "date": "1873"
        },
        {
            "name": "Niikawa",
            "value": "623977",
            "date": "1873"
        },
        {
            "name": "Oda",
            "value": "605666",
            "date": "1873"
        },
        {
            "name": "\u014cita",
            "value": "565460",
            "date": "1873"
        },
        {
            "name": "Okayama",
            "value": "333714",
            "date": "1873"
        },
        {
            "name": "Okitama",
            "value": "131162",
            "date": "1873"
        },
        {
            "name": "\u014csaka",
            "value": "530885",
            "date": "1873"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "166789",
            "date": "1873"
        },
        {
            "name": "Saga",
            "value": "480034",
            "date": "1873"
        },
        {
            "name": "Saitama",
            "value": "429094",
            "date": "1873"
        },
        {
            "name": "Sakai",
            "value": "451442",
            "date": "1873"
        },
        {
            "name": "Sakata",
            "value": "206859",
            "date": "1873"
        },
        {
            "name": "Shiga",
            "value": "578099",
            "date": "1873"
        },
        {
            "name": "Shikama",
            "value": "639576",
            "date": "1873"
        },
        {
            "name": "Shimane",
            "value": "340222",
            "date": "1873"
        },
        {
            "name": "Shirakawa",
            "value": "950389",
            "date": "1873"
        },
        {
            "name": "Shizuoka",
            "value": "369731",
            "date": "1873"
        },
        {
            "name": "Tochigi",
            "value": "392106",
            "date": "1873"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "813504",
            "date": "1873"
        },
        {
            "name": "Tottori",
            "value": "386186",
            "date": "1873"
        },
        {
            "name": "Toyo'oka",
            "value": "507465",
            "date": "1873"
        },
        {
            "name": "Tsuruga",
            "value": "200832",
            "date": "1873"
        },
        {
            "name": "Utsunomiya",
            "value": "234888",
            "date": "1873"
        },
        {
            "name": "Wakamatsu",
            "value": "206053",
            "date": "1873"
        },
        {
            "name": "Wakayama",
            "value": "562410",
            "date": "1873"
        },
        {
            "name": "Watarai",
            "value": "364565",
            "date": "1873"
        },
        {
            "name": "Yamagata",
            "value": "302743",
            "date": "1873"
        },
        {
            "name": "Yamaguchi",
            "value": "830060",
            "date": "1873"
        },
        {
            "name": "Yamanashi",
            "value": "362973",
            "date": "1873"
        }
    ],
    "1872": [
        {
            "name": "Aichi",
            "value": "604116",
            "date": "1872"
        },
        {
            "name": "Aikawa",
            "value": "103098",
            "date": "1872"
        },
        {
            "name": "Akita",
            "value": "582297",
            "date": "1872"
        },
        {
            "name": "Aomori",
            "value": "473244",
            "date": "1872"
        },
        {
            "name": "Ashigara",
            "value": "339582",
            "date": "1872"
        },
        {
            "name": "Asuwa",
            "value": "346700",
            "date": "1872"
        },
        {
            "name": "Chikuma",
            "value": "550841",
            "date": "1872"
        },
        {
            "name": "Fukuoka",
            "value": "441175",
            "date": "1872"
        },
        {
            "name": "Fukushima",
            "value": "268576",
            "date": "1872"
        },
        {
            "name": "Gifu",
            "value": "660896",
            "date": "1872"
        },
        {
            "name": "Gunma",
            "value": "382697",
            "date": "1872"
        },
        {
            "name": "Hamada",
            "value": "259611",
            "date": "1872"
        },
        {
            "name": "Hamamatsu",
            "value": "414928",
            "date": "1872"
        },
        {
            "name": "Hiroshima",
            "value": "919047",
            "date": "1872"
        },
        {
            "name": "Hokuj\u014d",
            "value": "215602",
            "date": "1872"
        },
        {
            "name": "Hy\u014dgo",
            "value": "198559",
            "date": "1872"
        },
        {
            "name": "Ibaraki",
            "value": "366505",
            "date": "1872"
        },
        {
            "name": "Inba",
            "value": "574652",
            "date": "1872"
        },
        {
            "name": "Inukami",
            "value": "271332",
            "date": "1872"
        },
        {
            "name": "Iruma",
            "value": "410952",
            "date": "1872"
        },
        {
            "name": "Ishikawa",
            "value": "403357",
            "date": "1872"
        },
        {
            "name": "Ishizuchi",
            "value": "418561",
            "date": "1872"
        },
        {
            "name": "Iwasaki",
            "value": "242906",
            "date": "1872"
        },
        {
            "name": "Iwate",
            "value": "319486",
            "date": "1872"
        },
        {
            "name": "Kagawa",
            "value": "559712",
            "date": "1872"
        },
        {
            "name": "Kagoshima",
            "value": "670864",
            "date": "1872"
        },
        {
            "name": "Kaitaku",
            "value": "123668",
            "date": "1872"
        },
        {
            "name": "Kamiyama",
            "value": "357413",
            "date": "1872"
        },
        {
            "name": "Kanagawa",
            "value": "492714",
            "date": "1872"
        },
        {
            "name": "Kashiwazaki",
            "value": "718249",
            "date": "1872"
        },
        {
            "name": "Kisarazu",
            "value": "456689",
            "date": "1872"
        },
        {
            "name": "K\u014dchi",
            "value": "524511",
            "date": "1872"
        },
        {
            "name": "Kokura",
            "value": "304574",
            "date": "1872"
        },
        {
            "name": "Ky\u014dto",
            "value": "567334",
            "date": "1872"
        },
        {
            "name": "Mie",
            "value": "413865",
            "date": "1872"
        },
        {
            "name": "Mimitsu",
            "value": "201798",
            "date": "1872"
        },
        {
            "name": "Miyagi",
            "value": "404577",
            "date": "1872"
        },
        {
            "name": "Miyakonoj\u014d",
            "value": "310121",
            "date": "1872"
        },
        {
            "name": "Mizuma",
            "value": "391535",
            "date": "1872"
        },
        {
            "name": "Mizusawa",
            "value": "372562",
            "date": "1872"
        },
        {
            "name": "My\u014dd\u014d",
            "value": "750985",
            "date": "1872"
        },
        {
            "name": "Nagano",
            "value": "466652",
            "date": "1872"
        },
        {
            "name": "Nagasaki",
            "value": "630487",
            "date": "1872"
        },
        {
            "name": "Nanao",
            "value": "397511",
            "date": "1872"
        },
        {
            "name": "Nara",
            "value": "418326",
            "date": "1872"
        },
        {
            "name": "Niigata",
            "value": "635484",
            "date": "1872"
        },
        {
            "name": "Niihari",
            "value": "470509",
            "date": "1872"
        },
        {
            "name": "Niikawa",
            "value": "480638",
            "date": "1872"
        },
        {
            "name": "Nukata",
            "value": "606252",
            "date": "1872"
        },
        {
            "name": "Oda",
            "value": "546430",
            "date": "1872"
        },
        {
            "name": "\u014cita",
            "value": "562318",
            "date": "1872"
        },
        {
            "name": "Okayama",
            "value": "387459",
            "date": "1872"
        },
        {
            "name": "Okitama",
            "value": "130293",
            "date": "1872"
        },
        {
            "name": "\u014csaka",
            "value": "530885",
            "date": "1872"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "166789",
            "date": "1872"
        },
        {
            "name": "Saga",
            "value": "506667",
            "date": "1872"
        },
        {
            "name": "Saitama",
            "value": "426989",
            "date": "1872"
        },
        {
            "name": "Sakai",
            "value": "446852",
            "date": "1872"
        },
        {
            "name": "Sakata",
            "value": "203676",
            "date": "1872"
        },
        {
            "name": "Shiga",
            "value": "305232",
            "date": "1872"
        },
        {
            "name": "Shikama",
            "value": "635791",
            "date": "1872"
        },
        {
            "name": "Shimane",
            "value": "340042",
            "date": "1872"
        },
        {
            "name": "Shirakawa",
            "value": "513593",
            "date": "1872"
        },
        {
            "name": "Shizuoka",
            "value": "368505",
            "date": "1872"
        },
        {
            "name": "Tochigi",
            "value": "388934",
            "date": "1872"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "779361",
            "date": "1872"
        },
        {
            "name": "Tottori",
            "value": "385531",
            "date": "1872"
        },
        {
            "name": "Toyo'oka",
            "value": "505073",
            "date": "1872"
        },
        {
            "name": "Tsuruga",
            "value": "199819",
            "date": "1872"
        },
        {
            "name": "Utsunomiya",
            "value": "234124",
            "date": "1872"
        },
        {
            "name": "Wakamatsu",
            "value": "203722",
            "date": "1872"
        },
        {
            "name": "Wakayama",
            "value": "556919",
            "date": "1872"
        },
        {
            "name": "Watarai",
            "value": "363732",
            "date": "1872"
        },
        {
            "name": "Yamagata",
            "value": "299291",
            "date": "1872"
        },
        {
            "name": "Yamaguchi",
            "value": "827536",
            "date": "1872"
        },
        {
            "name": "Yamanashi",
            "value": "360068",
            "date": "1872"
        },
        {
            "name": "Yatsushiro",
            "value": "439444",
            "date": "1872"
        }
    ],
    "1892": [
        {
            "name": "Aichi",
            "value": "1497791",
            "date": "1892"
        },
        {
            "name": "Akita",
            "value": "712738",
            "date": "1892"
        },
        {
            "name": "Aomori",
            "value": "559391",
            "date": "1892"
        },
        {
            "name": "Chiba",
            "value": "1205153",
            "date": "1892"
        },
        {
            "name": "Ehime",
            "value": "940009",
            "date": "1892"
        },
        {
            "name": "Fukui",
            "value": "607450",
            "date": "1892"
        },
        {
            "name": "Fukuoka",
            "value": "1258058",
            "date": "1892"
        },
        {
            "name": "Fukushima",
            "value": "980310",
            "date": "1892"
        },
        {
            "name": "Gifu",
            "value": "936219",
            "date": "1892"
        },
        {
            "name": "Gunma",
            "value": "759617",
            "date": "1892"
        },
        {
            "name": "Hiroshima",
            "value": "1336145",
            "date": "1892"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "493024",
            "date": "1892"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1576970",
            "date": "1892"
        },
        {
            "name": "Ibaraki",
            "value": "1046682",
            "date": "1892"
        },
        {
            "name": "Ishikawa",
            "value": "753886",
            "date": "1892"
        },
        {
            "name": "Iwate",
            "value": "682996",
            "date": "1892"
        },
        {
            "name": "Kagawa",
            "value": "675940",
            "date": "1892"
        },
        {
            "name": "Kagoshima",
            "value": "1024598",
            "date": "1892"
        },
        {
            "name": "Kanagawa",
            "value": "1015481",
            "date": "1892"
        },
        {
            "name": "K\u014dchi",
            "value": "584569",
            "date": "1892"
        },
        {
            "name": "Kumamoto",
            "value": "1075301",
            "date": "1892"
        },
        {
            "name": "Ky\u014dto",
            "value": "914700",
            "date": "1892"
        },
        {
            "name": "Mie",
            "value": "936465",
            "date": "1892"
        },
        {
            "name": "Miyagi",
            "value": "776378",
            "date": "1892"
        },
        {
            "name": "Miyazaki",
            "value": "431693",
            "date": "1892"
        },
        {
            "name": "Nagano",
            "value": "1171819",
            "date": "1892"
        },
        {
            "name": "Nagasaki",
            "value": "786416",
            "date": "1892"
        },
        {
            "name": "Nara",
            "value": "506304",
            "date": "1892"
        },
        {
            "name": "Niigata",
            "value": "1711968",
            "date": "1892"
        },
        {
            "name": "\u014cita",
            "value": "792912",
            "date": "1892"
        },
        {
            "name": "Okayama",
            "value": "1082745",
            "date": "1892"
        },
        {
            "name": "Okinawa",
            "value": "419970",
            "date": "1892"
        },
        {
            "name": "\u014csaka",
            "value": "1370232",
            "date": "1892"
        },
        {
            "name": "Saga",
            "value": "569831",
            "date": "1892"
        },
        {
            "name": "Saitama",
            "value": "1098947",
            "date": "1892"
        },
        {
            "name": "Shiga",
            "value": "681145",
            "date": "1892"
        },
        {
            "name": "Shimane",
            "value": "703256",
            "date": "1892"
        },
        {
            "name": "Shizuoka",
            "value": "1105875",
            "date": "1892"
        },
        {
            "name": "Tochigi",
            "value": "731893",
            "date": "1892"
        },
        {
            "name": "Tokushima",
            "value": "682398",
            "date": "1892"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1519583",
            "date": "1892"
        },
        {
            "name": "Tottori",
            "value": "405725",
            "date": "1892"
        },
        {
            "name": "Toyama",
            "value": "763105",
            "date": "1892"
        },
        {
            "name": "Wakayama",
            "value": "633771",
            "date": "1892"
        },
        {
            "name": "Yamagata",
            "value": "773015",
            "date": "1892"
        },
        {
            "name": "Yamaguchi",
            "value": "937036",
            "date": "1892"
        },
        {
            "name": "Yamanashi",
            "value": "467337",
            "date": "1892"
        }
    ],
    "1891": [
        {
            "name": "Aichi",
            "value": "1483744",
            "date": "1891"
        },
        {
            "name": "Akita",
            "value": "703482",
            "date": "1891"
        },
        {
            "name": "Aomori",
            "value": "551389",
            "date": "1891"
        },
        {
            "name": "Chiba",
            "value": "1196785",
            "date": "1891"
        },
        {
            "name": "Ehime",
            "value": "933510",
            "date": "1891"
        },
        {
            "name": "Fukui",
            "value": "605014",
            "date": "1891"
        },
        {
            "name": "Fukuoka",
            "value": "1244912",
            "date": "1891"
        },
        {
            "name": "Fukushima",
            "value": "964578",
            "date": "1891"
        },
        {
            "name": "Gifu",
            "value": "930604",
            "date": "1891"
        },
        {
            "name": "Gunma",
            "value": "749030",
            "date": "1891"
        },
        {
            "name": "Hiroshima",
            "value": "1324538",
            "date": "1891"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "452152",
            "date": "1891"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1562323",
            "date": "1891"
        },
        {
            "name": "Ibaraki",
            "value": "1034620",
            "date": "1891"
        },
        {
            "name": "Ishikawa",
            "value": "753445",
            "date": "1891"
        },
        {
            "name": "Iwate",
            "value": "676665",
            "date": "1891"
        },
        {
            "name": "Kagawa",
            "value": "673004",
            "date": "1891"
        },
        {
            "name": "Kagoshima",
            "value": "1014560",
            "date": "1891"
        },
        {
            "name": "Kanagawa",
            "value": "992047",
            "date": "1891"
        },
        {
            "name": "K\u014dchi",
            "value": "580330",
            "date": "1891"
        },
        {
            "name": "Kumamoto",
            "value": "1064885",
            "date": "1891"
        },
        {
            "name": "Ky\u014dto",
            "value": "903189",
            "date": "1891"
        },
        {
            "name": "Mie",
            "value": "931687",
            "date": "1891"
        },
        {
            "name": "Miyagi",
            "value": "758013",
            "date": "1891"
        },
        {
            "name": "Miyazaki",
            "value": "424033",
            "date": "1891"
        },
        {
            "name": "Nagano",
            "value": "1158936",
            "date": "1891"
        },
        {
            "name": "Nagasaki",
            "value": "776779",
            "date": "1891"
        },
        {
            "name": "Nara",
            "value": "502033",
            "date": "1891"
        },
        {
            "name": "Niigata",
            "value": "1700427",
            "date": "1891"
        },
        {
            "name": "\u014cita",
            "value": "790063",
            "date": "1891"
        },
        {
            "name": "Okayama",
            "value": "1076391",
            "date": "1891"
        },
        {
            "name": "Okinawa",
            "value": "412354",
            "date": "1891"
        },
        {
            "name": "\u014csaka",
            "value": "1357358",
            "date": "1891"
        },
        {
            "name": "Saga",
            "value": "568925",
            "date": "1891"
        },
        {
            "name": "Saitama",
            "value": "1087361",
            "date": "1891"
        },
        {
            "name": "Shiga",
            "value": "678775",
            "date": "1891"
        },
        {
            "name": "Shimane",
            "value": "700665",
            "date": "1891"
        },
        {
            "name": "Shizuoka",
            "value": "1094476",
            "date": "1891"
        },
        {
            "name": "Tochigi",
            "value": "722510",
            "date": "1891"
        },
        {
            "name": "Tokushima",
            "value": "682225",
            "date": "1891"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1500026",
            "date": "1891"
        },
        {
            "name": "Tottori",
            "value": "403589",
            "date": "1891"
        },
        {
            "name": "Toyama",
            "value": "759040",
            "date": "1891"
        },
        {
            "name": "Wakayama",
            "value": "630667",
            "date": "1891"
        },
        {
            "name": "Yamagata",
            "value": "764701",
            "date": "1891"
        },
        {
            "name": "Yamaguchi",
            "value": "929629",
            "date": "1891"
        },
        {
            "name": "Yamanashi",
            "value": "463263",
            "date": "1891"
        }
    ],
    "1890": [
        {
            "name": "Aichi",
            "value": "1473099",
            "date": "1890"
        },
        {
            "name": "Akita",
            "value": "697298",
            "date": "1890"
        },
        {
            "name": "Aomori",
            "value": "545026",
            "date": "1890"
        },
        {
            "name": "Chiba",
            "value": "1191353",
            "date": "1890"
        },
        {
            "name": "Ehime",
            "value": "926972",
            "date": "1890"
        },
        {
            "name": "Fukui",
            "value": "603444",
            "date": "1890"
        },
        {
            "name": "Fukuoka",
            "value": "1236015",
            "date": "1890"
        },
        {
            "name": "Fukushima",
            "value": "952489",
            "date": "1890"
        },
        {
            "name": "Gifu",
            "value": "932658",
            "date": "1890"
        },
        {
            "name": "Gunma",
            "value": "738061",
            "date": "1890"
        },
        {
            "name": "Hiroshima",
            "value": "1319507",
            "date": "1890"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "414430",
            "date": "1890"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1551367",
            "date": "1890"
        },
        {
            "name": "Ibaraki",
            "value": "1025497",
            "date": "1890"
        },
        {
            "name": "Ishikawa",
            "value": "753337",
            "date": "1890"
        },
        {
            "name": "Iwate",
            "value": "671956",
            "date": "1890"
        },
        {
            "name": "Kagawa",
            "value": "672557",
            "date": "1890"
        },
        {
            "name": "Kagoshima",
            "value": "1005816",
            "date": "1890"
        },
        {
            "name": "Kanagawa",
            "value": "979756",
            "date": "1890"
        },
        {
            "name": "K\u014dchi",
            "value": "577937",
            "date": "1890"
        },
        {
            "name": "Kumamoto",
            "value": "1057646",
            "date": "1890"
        },
        {
            "name": "Ky\u014dto",
            "value": "894928",
            "date": "1890"
        },
        {
            "name": "Mie",
            "value": "926376",
            "date": "1890"
        },
        {
            "name": "Miyagi",
            "value": "751830",
            "date": "1890"
        },
        {
            "name": "Miyazaki",
            "value": "416824",
            "date": "1890"
        },
        {
            "name": "Nagano",
            "value": "1146071",
            "date": "1890"
        },
        {
            "name": "Nagasaki",
            "value": "773095",
            "date": "1890"
        },
        {
            "name": "Nara",
            "value": "500742",
            "date": "1890"
        },
        {
            "name": "Niigata",
            "value": "1693727",
            "date": "1890"
        },
        {
            "name": "\u014cita",
            "value": "792085",
            "date": "1890"
        },
        {
            "name": "Okayama",
            "value": "1072706",
            "date": "1890"
        },
        {
            "name": "Okinawa",
            "value": "406622",
            "date": "1890"
        },
        {
            "name": "\u014csaka",
            "value": "1348317",
            "date": "1890"
        },
        {
            "name": "Saga",
            "value": "565568",
            "date": "1890"
        },
        {
            "name": "Saitama",
            "value": "1081121",
            "date": "1890"
        },
        {
            "name": "Shiga",
            "value": "677502",
            "date": "1890"
        },
        {
            "name": "Shimane",
            "value": "697878",
            "date": "1890"
        },
        {
            "name": "Shizuoka",
            "value": "1084562",
            "date": "1890"
        },
        {
            "name": "Tochigi",
            "value": "713362",
            "date": "1890"
        },
        {
            "name": "Tokushima",
            "value": "683994",
            "date": "1890"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1486671",
            "date": "1890"
        },
        {
            "name": "Tottori",
            "value": "401697",
            "date": "1890"
        },
        {
            "name": "Toyama",
            "value": "754105",
            "date": "1890"
        },
        {
            "name": "Wakayama",
            "value": "630373",
            "date": "1890"
        },
        {
            "name": "Yamagata",
            "value": "756909",
            "date": "1890"
        },
        {
            "name": "Yamaguchi",
            "value": "927015",
            "date": "1890"
        },
        {
            "name": "Yamanashi",
            "value": "458534",
            "date": "1890"
        }
    ],
    "1889": [
        {
            "name": "Aichi",
            "value": "1456294",
            "date": "1889"
        },
        {
            "name": "Akita",
            "value": "690122",
            "date": "1889"
        },
        {
            "name": "Aomori",
            "value": "538110",
            "date": "1889"
        },
        {
            "name": "Chiba",
            "value": "1184062",
            "date": "1889"
        },
        {
            "name": "Ehime",
            "value": "921708",
            "date": "1889"
        },
        {
            "name": "Fukui",
            "value": "602342",
            "date": "1889"
        },
        {
            "name": "Fukuoka",
            "value": "1224551",
            "date": "1889"
        },
        {
            "name": "Fukushima",
            "value": "934449",
            "date": "1889"
        },
        {
            "name": "Gifu",
            "value": "918456",
            "date": "1889"
        },
        {
            "name": "Gunma",
            "value": "722865",
            "date": "1889"
        },
        {
            "name": "Hiroshima",
            "value": "1303457",
            "date": "1889"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "378188",
            "date": "1889"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1541731",
            "date": "1889"
        },
        {
            "name": "Ibaraki",
            "value": "1014354",
            "date": "1889"
        },
        {
            "name": "Ishikawa",
            "value": "751605",
            "date": "1889"
        },
        {
            "name": "Iwate",
            "value": "667115",
            "date": "1889"
        },
        {
            "name": "Kagawa",
            "value": "668548",
            "date": "1889"
        },
        {
            "name": "Kagoshima",
            "value": "998153",
            "date": "1889"
        },
        {
            "name": "Kanagawa",
            "value": "960069",
            "date": "1889"
        },
        {
            "name": "K\u014dchi",
            "value": "575852",
            "date": "1889"
        },
        {
            "name": "Kumamoto",
            "value": "1052478",
            "date": "1889"
        },
        {
            "name": "Ky\u014dto",
            "value": "887031",
            "date": "1889"
        },
        {
            "name": "Mie",
            "value": "918369",
            "date": "1889"
        },
        {
            "name": "Miyagi",
            "value": "760291",
            "date": "1889"
        },
        {
            "name": "Miyazaki",
            "value": "412729",
            "date": "1889"
        },
        {
            "name": "Nagano",
            "value": "1128690",
            "date": "1889"
        },
        {
            "name": "Nagasaki",
            "value": "762812",
            "date": "1889"
        },
        {
            "name": "Nara",
            "value": "498871",
            "date": "1889"
        },
        {
            "name": "Niigata",
            "value": "1681985",
            "date": "1889"
        },
        {
            "name": "\u014cita",
            "value": "788635",
            "date": "1889"
        },
        {
            "name": "Okayama",
            "value": "1068086",
            "date": "1889"
        },
        {
            "name": "Okinawa",
            "value": "381142",
            "date": "1889"
        },
        {
            "name": "\u014csaka",
            "value": "1324216",
            "date": "1889"
        },
        {
            "name": "Saga",
            "value": "560594",
            "date": "1889"
        },
        {
            "name": "Saitama",
            "value": "1069144",
            "date": "1889"
        },
        {
            "name": "Shiga",
            "value": "671788",
            "date": "1889"
        },
        {
            "name": "Shimane",
            "value": "695782",
            "date": "1889"
        },
        {
            "name": "Shizuoka",
            "value": "1070841",
            "date": "1889"
        },
        {
            "name": "Tochigi",
            "value": "699121",
            "date": "1889"
        },
        {
            "name": "Tokushima",
            "value": "681863",
            "date": "1889"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1628551",
            "date": "1889"
        },
        {
            "name": "Tottori",
            "value": "399060",
            "date": "1889"
        },
        {
            "name": "Toyama",
            "value": "745248",
            "date": "1889"
        },
        {
            "name": "Wakayama",
            "value": "627332",
            "date": "1889"
        },
        {
            "name": "Yamagata",
            "value": "750840",
            "date": "1889"
        },
        {
            "name": "Yamaguchi",
            "value": "922497",
            "date": "1889"
        },
        {
            "name": "Yamanashi",
            "value": "452781",
            "date": "1889"
        }
    ],
    "1888": [
        {
            "name": "Aichi",
            "value": "1444011",
            "date": "1888"
        },
        {
            "name": "Akita",
            "value": "682928",
            "date": "1888"
        },
        {
            "name": "Aomori",
            "value": "530292",
            "date": "1888"
        },
        {
            "name": "Chiba",
            "value": "1172138",
            "date": "1888"
        },
        {
            "name": "Ehime",
            "value": "906414",
            "date": "1888"
        },
        {
            "name": "Fukui",
            "value": "596704",
            "date": "1888"
        },
        {
            "name": "Fukuoka",
            "value": "1209295",
            "date": "1888"
        },
        {
            "name": "Fukushima",
            "value": "913459",
            "date": "1888"
        },
        {
            "name": "Gifu",
            "value": "909226",
            "date": "1888"
        },
        {
            "name": "Gunma",
            "value": "718215",
            "date": "1888"
        },
        {
            "name": "Hiroshima",
            "value": "1289109",
            "date": "1888"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "347950",
            "date": "1888"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1521817",
            "date": "1888"
        },
        {
            "name": "Ibaraki",
            "value": "998976",
            "date": "1888"
        },
        {
            "name": "Ishikawa",
            "value": "745110",
            "date": "1888"
        },
        {
            "name": "Iwate",
            "value": "656047",
            "date": "1888"
        },
        {
            "name": "Kagawa",
            "value": "660484",
            "date": "1888"
        },
        {
            "name": "Kagoshima",
            "value": "985271",
            "date": "1888"
        },
        {
            "name": "Kanagawa",
            "value": "947766",
            "date": "1888"
        },
        {
            "name": "K\u014dchi",
            "value": "569874",
            "date": "1888"
        },
        {
            "name": "Kumamoto",
            "value": "1042281",
            "date": "1888"
        },
        {
            "name": "Ky\u014dto",
            "value": "875084",
            "date": "1888"
        },
        {
            "name": "Mie",
            "value": "909702",
            "date": "1888"
        },
        {
            "name": "Miyagi",
            "value": "736628",
            "date": "1888"
        },
        {
            "name": "Miyazaki",
            "value": "407827",
            "date": "1888"
        },
        {
            "name": "Nagano",
            "value": "1111946",
            "date": "1888"
        },
        {
            "name": "Nagasaki",
            "value": "752402",
            "date": "1888"
        },
        {
            "name": "Nara",
            "value": "496431",
            "date": "1888"
        },
        {
            "name": "Niigata",
            "value": "1665378",
            "date": "1888"
        },
        {
            "name": "\u014cita",
            "value": "781554",
            "date": "1888"
        },
        {
            "name": "Okayama",
            "value": "1062155",
            "date": "1888"
        },
        {
            "name": "Okinawa",
            "value": "374266",
            "date": "1888"
        },
        {
            "name": "\u014csaka",
            "value": "1281150",
            "date": "1888"
        },
        {
            "name": "Saga",
            "value": "553423",
            "date": "1888"
        },
        {
            "name": "Saitama",
            "value": "1054483",
            "date": "1888"
        },
        {
            "name": "Shiga",
            "value": "667563",
            "date": "1888"
        },
        {
            "name": "Shimane",
            "value": "692101",
            "date": "1888"
        },
        {
            "name": "Shizuoka",
            "value": "1058226",
            "date": "1888"
        },
        {
            "name": "Tochigi",
            "value": "684341",
            "date": "1888"
        },
        {
            "name": "Tokushima",
            "value": "676154",
            "date": "1888"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1559517",
            "date": "1888"
        },
        {
            "name": "Tottori",
            "value": "394333",
            "date": "1888"
        },
        {
            "name": "Toyama",
            "value": "738445",
            "date": "1888"
        },
        {
            "name": "Wakayama",
            "value": "623842",
            "date": "1888"
        },
        {
            "name": "Yamagata",
            "value": "741896",
            "date": "1888"
        },
        {
            "name": "Yamaguchi",
            "value": "914083",
            "date": "1888"
        },
        {
            "name": "Yamanashi",
            "value": "445182",
            "date": "1888"
        }
    ],
    "1887": [
        {
            "name": "Aichi",
            "value": "1429486",
            "date": "1887"
        },
        {
            "name": "Akita",
            "value": "662917",
            "date": "1887"
        },
        {
            "name": "Aomori",
            "value": "523226",
            "date": "1887"
        },
        {
            "name": "Chiba",
            "value": "1159287",
            "date": "1887"
        },
        {
            "name": "Ehime",
            "value": "1557257",
            "date": "1887"
        },
        {
            "name": "Fukui",
            "value": "590548",
            "date": "1887"
        },
        {
            "name": "Fukuoka",
            "value": "1188877",
            "date": "1887"
        },
        {
            "name": "Fukushima",
            "value": "893954",
            "date": "1887"
        },
        {
            "name": "Gifu",
            "value": "899311",
            "date": "1887"
        },
        {
            "name": "Gunma",
            "value": "690880",
            "date": "1887"
        },
        {
            "name": "Hiroshima",
            "value": "1278537",
            "date": "1887"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "326614",
            "date": "1887"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1499704",
            "date": "1887"
        },
        {
            "name": "Ibaraki",
            "value": "980803",
            "date": "1887"
        },
        {
            "name": "Ishikawa",
            "value": "737224",
            "date": "1887"
        },
        {
            "name": "Iwate",
            "value": "651989",
            "date": "1887"
        },
        {
            "name": "Kagoshima",
            "value": "962219",
            "date": "1887"
        },
        {
            "name": "Kanagawa",
            "value": "923178",
            "date": "1887"
        },
        {
            "name": "K\u014dchi",
            "value": "562066",
            "date": "1887"
        },
        {
            "name": "Kumamoto",
            "value": "1030261",
            "date": "1887"
        },
        {
            "name": "Ky\u014dto",
            "value": "866743",
            "date": "1887"
        },
        {
            "name": "Mie",
            "value": "901698",
            "date": "1887"
        },
        {
            "name": "Miyagi",
            "value": "720075",
            "date": "1887"
        },
        {
            "name": "Miyazaki",
            "value": "403810",
            "date": "1887"
        },
        {
            "name": "Nagano",
            "value": "1095998",
            "date": "1887"
        },
        {
            "name": "Nagasaki",
            "value": "739825",
            "date": "1887"
        },
        {
            "name": "Nara",
            "value": "489213",
            "date": "1887"
        },
        {
            "name": "Niigata",
            "value": "1652736",
            "date": "1887"
        },
        {
            "name": "\u014cita",
            "value": "773101",
            "date": "1887"
        },
        {
            "name": "Okayama",
            "value": "1051333",
            "date": "1887"
        },
        {
            "name": "Okinawa",
            "value": "375280",
            "date": "1887"
        },
        {
            "name": "\u014csaka",
            "value": "1245695",
            "date": "1887"
        },
        {
            "name": "Saga",
            "value": "547832",
            "date": "1887"
        },
        {
            "name": "Saitama",
            "value": "1039376",
            "date": "1887"
        },
        {
            "name": "Shiga",
            "value": "661323",
            "date": "1887"
        },
        {
            "name": "Shimane",
            "value": "688127",
            "date": "1887"
        },
        {
            "name": "Shizuoka",
            "value": "1038941",
            "date": "1887"
        },
        {
            "name": "Tochigi",
            "value": "670042",
            "date": "1887"
        },
        {
            "name": "Tokushima",
            "value": "670963",
            "date": "1887"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1509757",
            "date": "1887"
        },
        {
            "name": "Tottori",
            "value": "390061",
            "date": "1887"
        },
        {
            "name": "Toyama",
            "value": "726078",
            "date": "1887"
        },
        {
            "name": "Wakayama",
            "value": "621554",
            "date": "1887"
        },
        {
            "name": "Yamagata",
            "value": "732913",
            "date": "1887"
        },
        {
            "name": "Yamaguchi",
            "value": "911859",
            "date": "1887"
        },
        {
            "name": "Yamanashi",
            "value": "437475",
            "date": "1887"
        }
    ],
    "1886": [
        {
            "name": "Aichi",
            "value": "1404106",
            "date": "1886"
        },
        {
            "name": "Aichi",
            "value": "1386473",
            "date": "1886"
        },
        {
            "name": "Akita",
            "value": "654037",
            "date": "1886"
        },
        {
            "name": "Akita",
            "value": "644367",
            "date": "1886"
        },
        {
            "name": "Aomori",
            "value": "515779",
            "date": "1886"
        },
        {
            "name": "Aomori",
            "value": "499549",
            "date": "1886"
        },
        {
            "name": "Chiba",
            "value": "1141621",
            "date": "1886"
        },
        {
            "name": "Chiba",
            "value": "1125375",
            "date": "1886"
        },
        {
            "name": "Ehime",
            "value": "1533988",
            "date": "1886"
        },
        {
            "name": "Ehime",
            "value": "1529375",
            "date": "1886"
        },
        {
            "name": "Fukui",
            "value": "585776",
            "date": "1886"
        },
        {
            "name": "Fukui",
            "value": "592331",
            "date": "1886"
        },
        {
            "name": "Fukuoka",
            "value": "1159294",
            "date": "1886"
        },
        {
            "name": "Fukuoka",
            "value": "1148328",
            "date": "1886"
        },
        {
            "name": "Fukushima",
            "value": "870822",
            "date": "1886"
        },
        {
            "name": "Fukushima",
            "value": "855079",
            "date": "1886"
        },
        {
            "name": "Gifu",
            "value": "889739",
            "date": "1886"
        },
        {
            "name": "Gifu",
            "value": "884848",
            "date": "1886"
        },
        {
            "name": "Gunma",
            "value": "667931",
            "date": "1886"
        },
        {
            "name": "Gunma",
            "value": "648329",
            "date": "1886"
        },
        {
            "name": "Hiroshima",
            "value": "1276461",
            "date": "1886"
        },
        {
            "name": "Hiroshima",
            "value": "1272876",
            "date": "1886"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "309121",
            "date": "1886"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "284040",
            "date": "1886"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1480685",
            "date": "1886"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1466102",
            "date": "1886"
        },
        {
            "name": "Ibaraki",
            "value": "967480",
            "date": "1886"
        },
        {
            "name": "Ibaraki",
            "value": "948161",
            "date": "1886"
        },
        {
            "name": "Ishikawa",
            "value": "728974",
            "date": "1886"
        },
        {
            "name": "Ishikawa",
            "value": "739141",
            "date": "1886"
        },
        {
            "name": "Iwate",
            "value": "641395",
            "date": "1886"
        },
        {
            "name": "Iwate",
            "value": "628591",
            "date": "1886"
        },
        {
            "name": "Kagoshima",
            "value": "943088",
            "date": "1886"
        },
        {
            "name": "Kagoshima",
            "value": "941063",
            "date": "1886"
        },
        {
            "name": "Kanagawa",
            "value": "896948",
            "date": "1886"
        },
        {
            "name": "Kanagawa",
            "value": "865976",
            "date": "1886"
        },
        {
            "name": "K\u014dchi",
            "value": "557776",
            "date": "1886"
        },
        {
            "name": "K\u014dchi",
            "value": "552513",
            "date": "1886"
        },
        {
            "name": "Kumamoto",
            "value": "1020460",
            "date": "1886"
        },
        {
            "name": "Kumamoto",
            "value": "1003777",
            "date": "1886"
        },
        {
            "name": "Ky\u014dto",
            "value": "849362",
            "date": "1886"
        },
        {
            "name": "Ky\u014dto",
            "value": "848761",
            "date": "1886"
        },
        {
            "name": "Mie",
            "value": "892654",
            "date": "1886"
        },
        {
            "name": "Mie",
            "value": "883462",
            "date": "1886"
        },
        {
            "name": "Miyagi",
            "value": "688124",
            "date": "1886"
        },
        {
            "name": "Miyagi",
            "value": "665345",
            "date": "1886"
        },
        {
            "name": "Miyazaki",
            "value": "394261",
            "date": "1886"
        },
        {
            "name": "Miyazaki",
            "value": "386299",
            "date": "1886"
        },
        {
            "name": "Nagano",
            "value": "1074069",
            "date": "1886"
        },
        {
            "name": "Nagano",
            "value": "1057494",
            "date": "1886"
        },
        {
            "name": "Nagasaki",
            "value": "729042",
            "date": "1886"
        },
        {
            "name": "Nagasaki",
            "value": "719082",
            "date": "1886"
        },
        {
            "name": "Niigata",
            "value": "1632257",
            "date": "1886"
        },
        {
            "name": "Niigata",
            "value": "1628650",
            "date": "1886"
        },
        {
            "name": "\u014cita",
            "value": "762275",
            "date": "1886"
        },
        {
            "name": "\u014cita",
            "value": "761476",
            "date": "1886"
        },
        {
            "name": "Okayama",
            "value": "1043029",
            "date": "1886"
        },
        {
            "name": "Okayama",
            "value": "1045669",
            "date": "1886"
        },
        {
            "name": "Okinawa",
            "value": "378809",
            "date": "1886"
        },
        {
            "name": "Okinawa",
            "value": "373587",
            "date": "1886"
        },
        {
            "name": "\u014csaka",
            "value": "1695196",
            "date": "1886"
        },
        {
            "name": "\u014csaka",
            "value": "1691243",
            "date": "1886"
        },
        {
            "name": "Saga",
            "value": "534981",
            "date": "1886"
        },
        {
            "name": "Saga",
            "value": "527244",
            "date": "1886"
        },
        {
            "name": "Saitama",
            "value": "1015824",
            "date": "1886"
        },
        {
            "name": "Saitama",
            "value": "1004020",
            "date": "1886"
        },
        {
            "name": "Shiga",
            "value": "654558",
            "date": "1886"
        },
        {
            "name": "Shiga",
            "value": "648339",
            "date": "1886"
        },
        {
            "name": "Shimane",
            "value": "684257",
            "date": "1886"
        },
        {
            "name": "Shimane",
            "value": "684856",
            "date": "1886"
        },
        {
            "name": "Shizuoka",
            "value": "1019301",
            "date": "1886"
        },
        {
            "name": "Shizuoka",
            "value": "1002693",
            "date": "1886"
        },
        {
            "name": "Tochigi",
            "value": "655880",
            "date": "1886"
        },
        {
            "name": "Tochigi",
            "value": "641420",
            "date": "1886"
        },
        {
            "name": "Tokushima",
            "value": "661548",
            "date": "1886"
        },
        {
            "name": "Tokushima",
            "value": "656064",
            "date": "1886"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1455647",
            "date": "1886"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1276506",
            "date": "1886"
        },
        {
            "name": "Tottori",
            "value": "386083",
            "date": "1886"
        },
        {
            "name": "Tottori",
            "value": "383241",
            "date": "1886"
        },
        {
            "name": "Toyama",
            "value": "715384",
            "date": "1886"
        },
        {
            "name": "Toyama",
            "value": "712532",
            "date": "1886"
        },
        {
            "name": "Wakayama",
            "value": "613862",
            "date": "1886"
        },
        {
            "name": "Wakayama",
            "value": "619343",
            "date": "1886"
        },
        {
            "name": "Yamagata",
            "value": "722978",
            "date": "1886"
        },
        {
            "name": "Yamagata",
            "value": "717252",
            "date": "1886"
        },
        {
            "name": "Yamaguchi",
            "value": "897557",
            "date": "1886"
        },
        {
            "name": "Yamaguchi",
            "value": "899606",
            "date": "1886"
        },
        {
            "name": "Yamanashi",
            "value": "430996",
            "date": "1886"
        },
        {
            "name": "Yamanashi",
            "value": "425898",
            "date": "1886"
        }
    ],
    "1885": [
        {
            "name": "Aichi",
            "value": "1373419",
            "date": "1885"
        },
        {
            "name": "Akita",
            "value": "639259",
            "date": "1885"
        },
        {
            "name": "Aomori",
            "value": "495182",
            "date": "1885"
        },
        {
            "name": "Chiba",
            "value": "1118109",
            "date": "1885"
        },
        {
            "name": "Ehime",
            "value": "1527562",
            "date": "1885"
        },
        {
            "name": "Fukui",
            "value": "591669",
            "date": "1885"
        },
        {
            "name": "Fukuoka",
            "value": "1139986",
            "date": "1885"
        },
        {
            "name": "Fukushima",
            "value": "861428",
            "date": "1885"
        },
        {
            "name": "Gifu",
            "value": "880277",
            "date": "1885"
        },
        {
            "name": "Gunma",
            "value": "640871",
            "date": "1885"
        },
        {
            "name": "Hakodate",
            "value": "146335",
            "date": "1885"
        },
        {
            "name": "Hiroshima",
            "value": "1272105",
            "date": "1885"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1458647",
            "date": "1885"
        },
        {
            "name": "Ibaraki",
            "value": "938377",
            "date": "1885"
        },
        {
            "name": "Ishikawa",
            "value": "740362",
            "date": "1885"
        },
        {
            "name": "Iwate",
            "value": "622426",
            "date": "1885"
        },
        {
            "name": "Kagoshima",
            "value": "933196",
            "date": "1885"
        },
        {
            "name": "Kanagawa",
            "value": "848682",
            "date": "1885"
        },
        {
            "name": "K\u014dchi",
            "value": "548638",
            "date": "1885"
        },
        {
            "name": "Kumamoto",
            "value": "1000911",
            "date": "1885"
        },
        {
            "name": "Ky\u014dto",
            "value": "853058",
            "date": "1885"
        },
        {
            "name": "Mie",
            "value": "879353",
            "date": "1885"
        },
        {
            "name": "Miyagi",
            "value": "651401",
            "date": "1885"
        },
        {
            "name": "Miyazaki",
            "value": "383769",
            "date": "1885"
        },
        {
            "name": "Nagano",
            "value": "1048065",
            "date": "1885"
        },
        {
            "name": "Nagasaki",
            "value": "712631",
            "date": "1885"
        },
        {
            "name": "Nemuro",
            "value": "17224",
            "date": "1885"
        },
        {
            "name": "Niigata",
            "value": "1601796",
            "date": "1885"
        },
        {
            "name": "\u014cita",
            "value": "757747",
            "date": "1885"
        },
        {
            "name": "Okayama",
            "value": "1040280",
            "date": "1885"
        },
        {
            "name": "Okinawa",
            "value": "367874",
            "date": "1885"
        },
        {
            "name": "\u014csaka",
            "value": "1681935",
            "date": "1885"
        },
        {
            "name": "Saga",
            "value": "522697",
            "date": "1885"
        },
        {
            "name": "Saitama",
            "value": "994704",
            "date": "1885"
        },
        {
            "name": "Sapporo",
            "value": "109781",
            "date": "1885"
        },
        {
            "name": "Shiga",
            "value": "645519",
            "date": "1885"
        },
        {
            "name": "Shimane",
            "value": "682536",
            "date": "1885"
        },
        {
            "name": "Shizuoka",
            "value": "991127",
            "date": "1885"
        },
        {
            "name": "Tochigi",
            "value": "635751",
            "date": "1885"
        },
        {
            "name": "Tokushima",
            "value": "651731",
            "date": "1885"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1233843",
            "date": "1885"
        },
        {
            "name": "Tottori",
            "value": "381838",
            "date": "1885"
        },
        {
            "name": "Toyama",
            "value": "706014",
            "date": "1885"
        },
        {
            "name": "Wakayama",
            "value": "618026",
            "date": "1885"
        },
        {
            "name": "Yamagata",
            "value": "709145",
            "date": "1885"
        },
        {
            "name": "Yamaguchi",
            "value": "900339",
            "date": "1885"
        },
        {
            "name": "Yamanashi",
            "value": "419444",
            "date": "1885"
        }
    ],
    "1884": [
        {
            "name": "Aichi",
            "value": "1370576",
            "date": "1884"
        },
        {
            "name": "Akita",
            "value": "640575",
            "date": "1884"
        },
        {
            "name": "Aomori",
            "value": "493137",
            "date": "1884"
        },
        {
            "name": "Chiba",
            "value": "1113651",
            "date": "1884"
        },
        {
            "name": "Ehime",
            "value": "1511820",
            "date": "1884"
        },
        {
            "name": "Fukui",
            "value": "583065",
            "date": "1884"
        },
        {
            "name": "Fukuoka",
            "value": "1135496",
            "date": "1884"
        },
        {
            "name": "Fukushima",
            "value": "857833",
            "date": "1884"
        },
        {
            "name": "Gifu",
            "value": "873020",
            "date": "1884"
        },
        {
            "name": "Gunma",
            "value": "636082",
            "date": "1884"
        },
        {
            "name": "Hakodate",
            "value": "140959",
            "date": "1884"
        },
        {
            "name": "Hiroshima",
            "value": "1259148",
            "date": "1884"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1448199",
            "date": "1884"
        },
        {
            "name": "Ibaraki",
            "value": "929747",
            "date": "1884"
        },
        {
            "name": "Ishikawa",
            "value": "735478",
            "date": "1884"
        },
        {
            "name": "Iwate",
            "value": "615616",
            "date": "1884"
        },
        {
            "name": "Kagoshima",
            "value": "935094",
            "date": "1884"
        },
        {
            "name": "Kanagawa",
            "value": "831151",
            "date": "1884"
        },
        {
            "name": "K\u014dchi",
            "value": "546977",
            "date": "1884"
        },
        {
            "name": "Kumamoto",
            "value": "1001011",
            "date": "1884"
        },
        {
            "name": "Ky\u014dto",
            "value": "851246",
            "date": "1884"
        },
        {
            "name": "Mie",
            "value": "877666",
            "date": "1884"
        },
        {
            "name": "Miyagi",
            "value": "644417",
            "date": "1884"
        },
        {
            "name": "Miyazaki",
            "value": "381879",
            "date": "1884"
        },
        {
            "name": "Nagano",
            "value": "1043341",
            "date": "1884"
        },
        {
            "name": "Nagasaki",
            "value": "707604",
            "date": "1884"
        },
        {
            "name": "Nemuro",
            "value": "13172",
            "date": "1884"
        },
        {
            "name": "Niigata",
            "value": "1589304",
            "date": "1884"
        },
        {
            "name": "\u014cita",
            "value": "752161",
            "date": "1884"
        },
        {
            "name": "Okayama",
            "value": "1037239",
            "date": "1884"
        },
        {
            "name": "Okinawa",
            "value": "364701",
            "date": "1884"
        },
        {
            "name": "\u014csaka",
            "value": "1653157",
            "date": "1884"
        },
        {
            "name": "Saga",
            "value": "519712",
            "date": "1884"
        },
        {
            "name": "Saitama",
            "value": "985889",
            "date": "1884"
        },
        {
            "name": "Sapporo",
            "value": "95744",
            "date": "1884"
        },
        {
            "name": "Shiga",
            "value": "639634",
            "date": "1884"
        },
        {
            "name": "Shimane",
            "value": "678813",
            "date": "1884"
        },
        {
            "name": "Shizuoka",
            "value": "982512",
            "date": "1884"
        },
        {
            "name": "Tochigi",
            "value": "627441",
            "date": "1884"
        },
        {
            "name": "Tokushima",
            "value": "651109",
            "date": "1884"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1217542",
            "date": "1884"
        },
        {
            "name": "Tottori",
            "value": "381300",
            "date": "1884"
        },
        {
            "name": "Toyama",
            "value": "701622",
            "date": "1884"
        },
        {
            "name": "Wakayama",
            "value": "612505",
            "date": "1884"
        },
        {
            "name": "Yamagata",
            "value": "705507",
            "date": "1884"
        },
        {
            "name": "Yamaguchi",
            "value": "897296",
            "date": "1884"
        },
        {
            "name": "Yamanashi",
            "value": "416497",
            "date": "1884"
        }
    ],
    "1918": [
        {
            "name": "Aichi",
            "value": "2140077",
            "date": "1918"
        },
        {
            "name": "Akita",
            "value": "977212",
            "date": "1918"
        },
        {
            "name": "Aomori",
            "value": "797841",
            "date": "1918"
        },
        {
            "name": "Chiba",
            "value": "1395746",
            "date": "1918"
        },
        {
            "name": "Ehime",
            "value": "1128039",
            "date": "1918"
        },
        {
            "name": "Fukui",
            "value": "636847",
            "date": "1918"
        },
        {
            "name": "Fukuoka",
            "value": "2112596",
            "date": "1918"
        },
        {
            "name": "Fukushima",
            "value": "1389609",
            "date": "1918"
        },
        {
            "name": "Gifu",
            "value": "1120482",
            "date": "1918"
        },
        {
            "name": "Gunma",
            "value": "1082141",
            "date": "1918"
        },
        {
            "name": "Hiroshima",
            "value": "1687926",
            "date": "1918"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "2177700",
            "date": "1918"
        },
        {
            "name": "Hy\u014dgo",
            "value": "2321053",
            "date": "1918"
        },
        {
            "name": "Ibaraki",
            "value": "1407735",
            "date": "1918"
        },
        {
            "name": "Ishikawa",
            "value": "802835",
            "date": "1918"
        },
        {
            "name": "Iwate",
            "value": "869652",
            "date": "1918"
        },
        {
            "name": "Kagawa",
            "value": "714374",
            "date": "1918"
        },
        {
            "name": "Kagoshima",
            "value": "1462497",
            "date": "1918"
        },
        {
            "name": "Kanagawa",
            "value": "1323026",
            "date": "1918"
        },
        {
            "name": "K\u014dchi",
            "value": "708710",
            "date": "1918"
        },
        {
            "name": "Kumamoto",
            "value": "1311325",
            "date": "1918"
        },
        {
            "name": "Ky\u014dto",
            "value": "1383890",
            "date": "1918"
        },
        {
            "name": "Mie",
            "value": "1114891",
            "date": "1918"
        },
        {
            "name": "Miyagi",
            "value": "954571",
            "date": "1918"
        },
        {
            "name": "Miyazaki",
            "value": "651151",
            "date": "1918"
        },
        {
            "name": "Nagano",
            "value": "1564354",
            "date": "1918"
        },
        {
            "name": "Nagasaki",
            "value": "1230249",
            "date": "1918"
        },
        {
            "name": "Nara",
            "value": "594482",
            "date": "1918"
        },
        {
            "name": "Niigata",
            "value": "1916017",
            "date": "1918"
        },
        {
            "name": "\u014cita",
            "value": "920994",
            "date": "1918"
        },
        {
            "name": "Okayama",
            "value": "1285590",
            "date": "1918"
        },
        {
            "name": "Okinawa",
            "value": "580940",
            "date": "1918"
        },
        {
            "name": "\u014csaka",
            "value": "2888492",
            "date": "1918"
        },
        {
            "name": "Saga",
            "value": "679322",
            "date": "1918"
        },
        {
            "name": "Saitama",
            "value": "1391712",
            "date": "1918"
        },
        {
            "name": "Shiga",
            "value": "703944",
            "date": "1918"
        },
        {
            "name": "Shimane",
            "value": "717530",
            "date": "1918"
        },
        {
            "name": "Shizuoka",
            "value": "1591772",
            "date": "1918"
        },
        {
            "name": "Tochigi",
            "value": "1103333",
            "date": "1918"
        },
        {
            "name": "Tokushima",
            "value": "744088",
            "date": "1918"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "3719335",
            "date": "1918"
        },
        {
            "name": "Tottori",
            "value": "465281",
            "date": "1918"
        },
        {
            "name": "Toyama",
            "value": "803191",
            "date": "1918"
        },
        {
            "name": "Wakayama",
            "value": "795400",
            "date": "1918"
        },
        {
            "name": "Yamagata",
            "value": "987053",
            "date": "1918"
        },
        {
            "name": "Yamaguchi",
            "value": "1099048",
            "date": "1918"
        },
        {
            "name": "Yamanashi",
            "value": "633224",
            "date": "1918"
        }
    ],
    "1913": [
        {
            "name": "Aichi",
            "value": "2073224",
            "date": "1913"
        },
        {
            "name": "Akita",
            "value": "943628",
            "date": "1913"
        },
        {
            "name": "Aomori",
            "value": "764485",
            "date": "1913"
        },
        {
            "name": "Chiba",
            "value": "1401587",
            "date": "1913"
        },
        {
            "name": "Ehime",
            "value": "1097989",
            "date": "1913"
        },
        {
            "name": "Fukui",
            "value": "651513",
            "date": "1913"
        },
        {
            "name": "Fukuoka",
            "value": "1926417",
            "date": "1913"
        },
        {
            "name": "Fukushima",
            "value": "1303501",
            "date": "1913"
        },
        {
            "name": "Gifu",
            "value": "1094961",
            "date": "1913"
        },
        {
            "name": "Gunma",
            "value": "1020853",
            "date": "1913"
        },
        {
            "name": "Hiroshima",
            "value": "1691699",
            "date": "1913"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "1817705",
            "date": "1913"
        },
        {
            "name": "Hy\u014dgo",
            "value": "2143791",
            "date": "1913"
        },
        {
            "name": "Ibaraki",
            "value": "1328329",
            "date": "1913"
        },
        {
            "name": "Ishikawa",
            "value": "805266",
            "date": "1913"
        },
        {
            "name": "Iwate",
            "value": "835415",
            "date": "1913"
        },
        {
            "name": "Kagawa",
            "value": "759556",
            "date": "1913"
        },
        {
            "name": "Kagoshima",
            "value": "1397387",
            "date": "1913"
        },
        {
            "name": "Kanagawa",
            "value": "1228254",
            "date": "1913"
        },
        {
            "name": "K\u014dchi",
            "value": "693548",
            "date": "1913"
        },
        {
            "name": "Kumamoto",
            "value": "1303405",
            "date": "1913"
        },
        {
            "name": "Ky\u014dto",
            "value": "1288213",
            "date": "1913"
        },
        {
            "name": "Mie",
            "value": "1101573",
            "date": "1913"
        },
        {
            "name": "Miyagi",
            "value": "927337",
            "date": "1913"
        },
        {
            "name": "Miyazaki",
            "value": "597472",
            "date": "1913"
        },
        {
            "name": "Nagano",
            "value": "1484205",
            "date": "1913"
        },
        {
            "name": "Nagasaki",
            "value": "1134700",
            "date": "1913"
        },
        {
            "name": "Nara",
            "value": "600711",
            "date": "1913"
        },
        {
            "name": "Niigata",
            "value": "1911308",
            "date": "1913"
        },
        {
            "name": "\u014cita",
            "value": "926936",
            "date": "1913"
        },
        {
            "name": "Okayama",
            "value": "1261142",
            "date": "1913"
        },
        {
            "name": "Okinawa",
            "value": "534415",
            "date": "1913"
        },
        {
            "name": "\u014csaka",
            "value": "2461067",
            "date": "1913"
        },
        {
            "name": "Saga",
            "value": "693611",
            "date": "1913"
        },
        {
            "name": "Saitama",
            "value": "1343674",
            "date": "1913"
        },
        {
            "name": "Shiga",
            "value": "697369",
            "date": "1913"
        },
        {
            "name": "Shimane",
            "value": "758754",
            "date": "1913"
        },
        {
            "name": "Shizuoka",
            "value": "1483712",
            "date": "1913"
        },
        {
            "name": "Tochigi",
            "value": "1044177",
            "date": "1913"
        },
        {
            "name": "Tokushima",
            "value": "742320",
            "date": "1913"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "3145365",
            "date": "1913"
        },
        {
            "name": "Tottori",
            "value": "470674",
            "date": "1913"
        },
        {
            "name": "Toyama",
            "value": "805613",
            "date": "1913"
        },
        {
            "name": "Wakayama",
            "value": "770293",
            "date": "1913"
        },
        {
            "name": "Yamagata",
            "value": "965356",
            "date": "1913"
        },
        {
            "name": "Yamaguchi",
            "value": "1089791",
            "date": "1913"
        },
        {
            "name": "Yamanashi",
            "value": "608969",
            "date": "1913"
        }
    ],
    "1908": [
        {
            "name": "Aichi",
            "value": "1886739",
            "date": "1908"
        },
        {
            "name": "Akita",
            "value": "892650",
            "date": "1908"
        },
        {
            "name": "Aomori",
            "value": "721127",
            "date": "1908"
        },
        {
            "name": "Chiba",
            "value": "1358445",
            "date": "1908"
        },
        {
            "name": "Ehime",
            "value": "1057547",
            "date": "1908"
        },
        {
            "name": "Fukui",
            "value": "630439",
            "date": "1908"
        },
        {
            "name": "Fukuoka",
            "value": "1721084",
            "date": "1908"
        },
        {
            "name": "Fukushima",
            "value": "1234281",
            "date": "1908"
        },
        {
            "name": "Gifu",
            "value": "1031156",
            "date": "1908"
        },
        {
            "name": "Gunma",
            "value": "961026",
            "date": "1908"
        },
        {
            "name": "Hiroshima",
            "value": "1598755",
            "date": "1908"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "1459424",
            "date": "1908"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1982983",
            "date": "1908"
        },
        {
            "name": "Ibaraki",
            "value": "1259995",
            "date": "1908"
        },
        {
            "name": "Ishikawa",
            "value": "780150",
            "date": "1908"
        },
        {
            "name": "Iwate",
            "value": "776714",
            "date": "1908"
        },
        {
            "name": "Kagawa",
            "value": "729563",
            "date": "1908"
        },
        {
            "name": "Kagoshima",
            "value": "1275465",
            "date": "1908"
        },
        {
            "name": "Kanagawa",
            "value": "1178098",
            "date": "1908"
        },
        {
            "name": "K\u014dchi",
            "value": "670910",
            "date": "1908"
        },
        {
            "name": "Kumamoto",
            "value": "1236361",
            "date": "1908"
        },
        {
            "name": "Ky\u014dto",
            "value": "1155671",
            "date": "1908"
        },
        {
            "name": "Mie",
            "value": "1077295",
            "date": "1908"
        },
        {
            "name": "Miyagi",
            "value": "893365",
            "date": "1908"
        },
        {
            "name": "Miyazaki",
            "value": "542088",
            "date": "1908"
        },
        {
            "name": "Nagano",
            "value": "1402072",
            "date": "1908"
        },
        {
            "name": "Nagasaki",
            "value": "1103590",
            "date": "1908"
        },
        {
            "name": "Nara",
            "value": "569772",
            "date": "1908"
        },
        {
            "name": "Niigata",
            "value": "1822239",
            "date": "1908"
        },
        {
            "name": "\u014cita",
            "value": "880290",
            "date": "1908"
        },
        {
            "name": "Okayama",
            "value": "1223207",
            "date": "1908"
        },
        {
            "name": "Okinawa",
            "value": "502309",
            "date": "1908"
        },
        {
            "name": "\u014csaka",
            "value": "2144030",
            "date": "1908"
        },
        {
            "name": "Saga",
            "value": "671531",
            "date": "1908"
        },
        {
            "name": "Saitama",
            "value": "1284502",
            "date": "1908"
        },
        {
            "name": "Shiga",
            "value": "694370",
            "date": "1908"
        },
        {
            "name": "Shimane",
            "value": "738048",
            "date": "1908"
        },
        {
            "name": "Shizuoka",
            "value": "1376048",
            "date": "1908"
        },
        {
            "name": "Tochigi",
            "value": "977437",
            "date": "1908"
        },
        {
            "name": "Tokushima",
            "value": "720888",
            "date": "1908"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "3053946",
            "date": "1908"
        },
        {
            "name": "Tottori",
            "value": "441142",
            "date": "1908"
        },
        {
            "name": "Toyama",
            "value": "770665",
            "date": "1908"
        },
        {
            "name": "Wakayama",
            "value": "723357",
            "date": "1908"
        },
        {
            "name": "Yamagata",
            "value": "913445",
            "date": "1908"
        },
        {
            "name": "Yamaguchi",
            "value": "1044926",
            "date": "1908"
        },
        {
            "name": "Yamanashi",
            "value": "573341",
            "date": "1908"
        }
    ],
    "1903": [
        {
            "name": "Aichi",
            "value": "1752042",
            "date": "1903"
        },
        {
            "name": "Akita",
            "value": "837665",
            "date": "1903"
        },
        {
            "name": "Aomori",
            "value": "665691",
            "date": "1903"
        },
        {
            "name": "Chiba",
            "value": "1316547",
            "date": "1903"
        },
        {
            "name": "Ehime",
            "value": "1034962",
            "date": "1903"
        },
        {
            "name": "Fukui",
            "value": "635881",
            "date": "1903"
        },
        {
            "name": "Fukuoka",
            "value": "1571158",
            "date": "1903"
        },
        {
            "name": "Fukushima",
            "value": "1175224",
            "date": "1903"
        },
        {
            "name": "Gifu",
            "value": "1020765",
            "date": "1903"
        },
        {
            "name": "Gunma",
            "value": "904046",
            "date": "1903"
        },
        {
            "name": "Hiroshima",
            "value": "1508713",
            "date": "1903"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "1089503",
            "date": "1903"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1833957",
            "date": "1903"
        },
        {
            "name": "Ibaraki",
            "value": "1200475",
            "date": "1903"
        },
        {
            "name": "Ishikawa",
            "value": "768155",
            "date": "1903"
        },
        {
            "name": "Iwate",
            "value": "748752",
            "date": "1903"
        },
        {
            "name": "Kagawa",
            "value": "711603",
            "date": "1903"
        },
        {
            "name": "Kagoshima",
            "value": "1184143",
            "date": "1903"
        },
        {
            "name": "Kanagawa",
            "value": "1051433",
            "date": "1903"
        },
        {
            "name": "K\u014dchi",
            "value": "646008",
            "date": "1903"
        },
        {
            "name": "Kumamoto",
            "value": "1198486",
            "date": "1903"
        },
        {
            "name": "Ky\u014dto",
            "value": "1055119",
            "date": "1903"
        },
        {
            "name": "Mie",
            "value": "1044323",
            "date": "1903"
        },
        {
            "name": "Miyagi",
            "value": "905883",
            "date": "1903"
        },
        {
            "name": "Miyazaki",
            "value": "501926",
            "date": "1903"
        },
        {
            "name": "Nagano",
            "value": "1348556",
            "date": "1903"
        },
        {
            "name": "Nagasaki",
            "value": "1015364",
            "date": "1903"
        },
        {
            "name": "Nara",
            "value": "558314",
            "date": "1903"
        },
        {
            "name": "Niigata",
            "value": "1780123",
            "date": "1903"
        },
        {
            "name": "\u014cita",
            "value": "854982",
            "date": "1903"
        },
        {
            "name": "Okayama",
            "value": "1188244",
            "date": "1903"
        },
        {
            "name": "Okinawa",
            "value": "476230",
            "date": "1903"
        },
        {
            "name": "\u014csaka",
            "value": "1823456",
            "date": "1903"
        },
        {
            "name": "Saga",
            "value": "654593",
            "date": "1903"
        },
        {
            "name": "Saitama",
            "value": "1240280",
            "date": "1903"
        },
        {
            "name": "Shiga",
            "value": "716920",
            "date": "1903"
        },
        {
            "name": "Shimane",
            "value": "731295",
            "date": "1903"
        },
        {
            "name": "Shizuoka",
            "value": "1293470",
            "date": "1903"
        },
        {
            "name": "Tochigi",
            "value": "912274",
            "date": "1903"
        },
        {
            "name": "Tokushima",
            "value": "707545",
            "date": "1903"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "2532677",
            "date": "1903"
        },
        {
            "name": "Tottori",
            "value": "435959",
            "date": "1903"
        },
        {
            "name": "Toyama",
            "value": "776851",
            "date": "1903"
        },
        {
            "name": "Wakayama",
            "value": "697766",
            "date": "1903"
        },
        {
            "name": "Yamagata",
            "value": "879564",
            "date": "1903"
        },
        {
            "name": "Yamaguchi",
            "value": "1015156",
            "date": "1903"
        },
        {
            "name": "Yamanashi",
            "value": "540657",
            "date": "1903"
        }
    ],
    "1898": [
        {
            "name": "Aichi",
            "value": "1639611",
            "date": "1898"
        },
        {
            "name": "Akita",
            "value": "781129",
            "date": "1898"
        },
        {
            "name": "Aomori",
            "value": "617531",
            "date": "1898"
        },
        {
            "name": "Chiba",
            "value": "1275376",
            "date": "1898"
        },
        {
            "name": "Ehime",
            "value": "995441",
            "date": "1898"
        },
        {
            "name": "Fukui",
            "value": "621468",
            "date": "1898"
        },
        {
            "name": "Fukuoka",
            "value": "1425625",
            "date": "1898"
        },
        {
            "name": "Fukushima",
            "value": "1098002",
            "date": "1898"
        },
        {
            "name": "Gifu",
            "value": "977922",
            "date": "1898"
        },
        {
            "name": "Gunma",
            "value": "830223",
            "date": "1898"
        },
        {
            "name": "Hiroshima",
            "value": "1449622",
            "date": "1898"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "859534",
            "date": "1898"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1717634",
            "date": "1898"
        },
        {
            "name": "Ibaraki",
            "value": "1149594",
            "date": "1898"
        },
        {
            "name": "Ishikawa",
            "value": "751320",
            "date": "1898"
        },
        {
            "name": "Iwate",
            "value": "718737",
            "date": "1898"
        },
        {
            "name": "Kagawa",
            "value": "694280",
            "date": "1898"
        },
        {
            "name": "Kagoshima",
            "value": "1104220",
            "date": "1898"
        },
        {
            "name": "Kanagawa",
            "value": "926884",
            "date": "1898"
        },
        {
            "name": "K\u014dchi",
            "value": "622950",
            "date": "1898"
        },
        {
            "name": "Kumamoto",
            "value": "1156270",
            "date": "1898"
        },
        {
            "name": "Ky\u014dto",
            "value": "997488",
            "date": "1898"
        },
        {
            "name": "Mie",
            "value": "996646",
            "date": "1898"
        },
        {
            "name": "Miyagi",
            "value": "851210",
            "date": "1898"
        },
        {
            "name": "Miyazaki",
            "value": "464510",
            "date": "1898"
        },
        {
            "name": "Nagano",
            "value": "1264918",
            "date": "1898"
        },
        {
            "name": "Nagasaki",
            "value": "902455",
            "date": "1898"
        },
        {
            "name": "Nara",
            "value": "535619",
            "date": "1898"
        },
        {
            "name": "Niigata",
            "value": "1745625",
            "date": "1898"
        },
        {
            "name": "\u014cita",
            "value": "835917",
            "date": "1898"
        },
        {
            "name": "Okayama",
            "value": "1135826",
            "date": "1898"
        },
        {
            "name": "Okinawa",
            "value": "460221",
            "date": "1898"
        },
        {
            "name": "\u014csaka",
            "value": "1600923",
            "date": "1898"
        },
        {
            "name": "Saga",
            "value": "618679",
            "date": "1898"
        },
        {
            "name": "Saitama",
            "value": "1175697",
            "date": "1898"
        },
        {
            "name": "Shiga",
            "value": "694606",
            "date": "1898"
        },
        {
            "name": "Shimane",
            "value": "716586",
            "date": "1898"
        },
        {
            "name": "Shizuoka",
            "value": "1200322",
            "date": "1898"
        },
        {
            "name": "Tochigi",
            "value": "829630",
            "date": "1898"
        },
        {
            "name": "Tokushima",
            "value": "688123",
            "date": "1898"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "2101784",
            "date": "1898"
        },
        {
            "name": "Tottori",
            "value": "421020",
            "date": "1898"
        },
        {
            "name": "Toyama",
            "value": "766407",
            "date": "1898"
        },
        {
            "name": "Wakayama",
            "value": "672225",
            "date": "1898"
        },
        {
            "name": "Yamagata",
            "value": "827138",
            "date": "1898"
        },
        {
            "name": "Yamaguchi",
            "value": "979596",
            "date": "1898"
        },
        {
            "name": "Yamanashi",
            "value": "506497",
            "date": "1898"
        }
    ],
    "1897": [
        {
            "name": "Aichi",
            "value": "1592733",
            "date": "1897"
        },
        {
            "name": "Akita",
            "value": "757041",
            "date": "1897"
        },
        {
            "name": "Aomori",
            "value": "600294",
            "date": "1897"
        },
        {
            "name": "Chiba",
            "value": "1245874",
            "date": "1897"
        },
        {
            "name": "Ehime",
            "value": "971955",
            "date": "1897"
        },
        {
            "name": "Fukui",
            "value": "612620",
            "date": "1897"
        },
        {
            "name": "Fukuoka",
            "value": "1357777",
            "date": "1897"
        },
        {
            "name": "Fukushima",
            "value": "1061013",
            "date": "1897"
        },
        {
            "name": "Gifu",
            "value": "960713",
            "date": "1897"
        },
        {
            "name": "Gunma",
            "value": "806277",
            "date": "1897"
        },
        {
            "name": "Hiroshima",
            "value": "1405674",
            "date": "1897"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "755837",
            "date": "1897"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1652366",
            "date": "1897"
        },
        {
            "name": "Ibaraki",
            "value": "1115269",
            "date": "1897"
        },
        {
            "name": "Ishikawa",
            "value": "749775",
            "date": "1897"
        },
        {
            "name": "Iwate",
            "value": "702750",
            "date": "1897"
        },
        {
            "name": "Kagawa",
            "value": "676681",
            "date": "1897"
        },
        {
            "name": "Kagoshima",
            "value": "1083745",
            "date": "1897"
        },
        {
            "name": "Kanagawa",
            "value": "870256",
            "date": "1897"
        },
        {
            "name": "K\u014dchi",
            "value": "609005",
            "date": "1897"
        },
        {
            "name": "Kumamoto",
            "value": "1122068",
            "date": "1897"
        },
        {
            "name": "Ky\u014dto",
            "value": "957260",
            "date": "1897"
        },
        {
            "name": "Mie",
            "value": "967406",
            "date": "1897"
        },
        {
            "name": "Miyagi",
            "value": "833113",
            "date": "1897"
        },
        {
            "name": "Miyazaki",
            "value": "455535",
            "date": "1897"
        },
        {
            "name": "Nagano",
            "value": "1231859",
            "date": "1897"
        },
        {
            "name": "Nagasaki",
            "value": "845441",
            "date": "1897"
        },
        {
            "name": "Nara",
            "value": "524562",
            "date": "1897"
        },
        {
            "name": "Niigata",
            "value": "1733629",
            "date": "1897"
        },
        {
            "name": "\u014cita",
            "value": "819996",
            "date": "1897"
        },
        {
            "name": "Okayama",
            "value": "1108393",
            "date": "1897"
        },
        {
            "name": "Okinawa",
            "value": "449112",
            "date": "1897"
        },
        {
            "name": "\u014csaka",
            "value": "1503771",
            "date": "1897"
        },
        {
            "name": "Saga",
            "value": "599679",
            "date": "1897"
        },
        {
            "name": "Saitama",
            "value": "1152823",
            "date": "1897"
        },
        {
            "name": "Shiga",
            "value": "688343",
            "date": "1897"
        },
        {
            "name": "Shimane",
            "value": "709065",
            "date": "1897"
        },
        {
            "name": "Shizuoka",
            "value": "1175982",
            "date": "1897"
        },
        {
            "name": "Tochigi",
            "value": "798946",
            "date": "1897"
        },
        {
            "name": "Tokushima",
            "value": "676694",
            "date": "1897"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1948581",
            "date": "1897"
        },
        {
            "name": "Tottori",
            "value": "412965",
            "date": "1897"
        },
        {
            "name": "Toyama",
            "value": "754799",
            "date": "1897"
        },
        {
            "name": "Wakayama",
            "value": "656025",
            "date": "1897"
        },
        {
            "name": "Yamagata",
            "value": "811039",
            "date": "1897"
        },
        {
            "name": "Yamaguchi",
            "value": "961065",
            "date": "1897"
        },
        {
            "name": "Yamanashi",
            "value": "492689",
            "date": "1897"
        }
    ],
    "1896": [
        {
            "name": "Aichi",
            "value": "1577320",
            "date": "1896"
        },
        {
            "name": "Akita",
            "value": "748358",
            "date": "1896"
        },
        {
            "name": "Aomori",
            "value": "589557",
            "date": "1896"
        },
        {
            "name": "Chiba",
            "value": "1239660",
            "date": "1896"
        },
        {
            "name": "Ehime",
            "value": "964079",
            "date": "1896"
        },
        {
            "name": "Fukui",
            "value": "619273",
            "date": "1896"
        },
        {
            "name": "Fukuoka",
            "value": "1333423",
            "date": "1896"
        },
        {
            "name": "Fukushima",
            "value": "1041294",
            "date": "1896"
        },
        {
            "name": "Gifu",
            "value": "960502",
            "date": "1896"
        },
        {
            "name": "Gunma",
            "value": "797870",
            "date": "1896"
        },
        {
            "name": "Hiroshima",
            "value": "1388193",
            "date": "1896"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "698144",
            "date": "1896"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1631241",
            "date": "1896"
        },
        {
            "name": "Ibaraki",
            "value": "1101540",
            "date": "1896"
        },
        {
            "name": "Ishikawa",
            "value": "755734",
            "date": "1896"
        },
        {
            "name": "Iwate",
            "value": "694867",
            "date": "1896"
        },
        {
            "name": "Kagawa",
            "value": "673378",
            "date": "1896"
        },
        {
            "name": "Kagoshima",
            "value": "1069752",
            "date": "1896"
        },
        {
            "name": "Kanagawa",
            "value": "852283",
            "date": "1896"
        },
        {
            "name": "K\u014dchi",
            "value": "600865",
            "date": "1896"
        },
        {
            "name": "Kumamoto",
            "value": "1108802",
            "date": "1896"
        },
        {
            "name": "Ky\u014dto",
            "value": "957775",
            "date": "1896"
        },
        {
            "name": "Mie",
            "value": "963668",
            "date": "1896"
        },
        {
            "name": "Miyagi",
            "value": "821257",
            "date": "1896"
        },
        {
            "name": "Miyazaki",
            "value": "450416",
            "date": "1896"
        },
        {
            "name": "Nagano",
            "value": "1221113",
            "date": "1896"
        },
        {
            "name": "Nagasaki",
            "value": "832616",
            "date": "1896"
        },
        {
            "name": "Nara",
            "value": "521918",
            "date": "1896"
        },
        {
            "name": "Niigata",
            "value": "1736456",
            "date": "1896"
        },
        {
            "name": "\u014cita",
            "value": "814064",
            "date": "1896"
        },
        {
            "name": "Okayama",
            "value": "1100984",
            "date": "1896"
        },
        {
            "name": "Okinawa",
            "value": "442834",
            "date": "1896"
        },
        {
            "name": "\u014csaka",
            "value": "1456176",
            "date": "1896"
        },
        {
            "name": "Saga",
            "value": "596275",
            "date": "1896"
        },
        {
            "name": "Saitama",
            "value": "1147133",
            "date": "1896"
        },
        {
            "name": "Shiga",
            "value": "689723",
            "date": "1896"
        },
        {
            "name": "Shimane",
            "value": "706028",
            "date": "1896"
        },
        {
            "name": "Shizuoka",
            "value": "1162613",
            "date": "1896"
        },
        {
            "name": "Tochigi",
            "value": "781864",
            "date": "1896"
        },
        {
            "name": "Tokushima",
            "value": "675570",
            "date": "1896"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1907174",
            "date": "1896"
        },
        {
            "name": "Tottori",
            "value": "411585",
            "date": "1896"
        },
        {
            "name": "Toyama",
            "value": "762892",
            "date": "1896"
        },
        {
            "name": "Wakayama",
            "value": "651021",
            "date": "1896"
        },
        {
            "name": "Yamagata",
            "value": "800831",
            "date": "1896"
        },
        {
            "name": "Yamaguchi",
            "value": "952300",
            "date": "1896"
        },
        {
            "name": "Yamanashi",
            "value": "489412",
            "date": "1896"
        }
    ],
    "1895": [
        {
            "name": "Aichi",
            "value": "1553447",
            "date": "1895"
        },
        {
            "name": "Akita",
            "value": "737922",
            "date": "1895"
        },
        {
            "name": "Aomori",
            "value": "584459",
            "date": "1895"
        },
        {
            "name": "Chiba",
            "value": "1230385",
            "date": "1895"
        },
        {
            "name": "Ehime",
            "value": "956166",
            "date": "1895"
        },
        {
            "name": "Fukui",
            "value": "618203",
            "date": "1895"
        },
        {
            "name": "Fukuoka",
            "value": "1313777",
            "date": "1895"
        },
        {
            "name": "Fukushima",
            "value": "1022780",
            "date": "1895"
        },
        {
            "name": "Gifu",
            "value": "960062",
            "date": "1895"
        },
        {
            "name": "Gunma",
            "value": "792575",
            "date": "1895"
        },
        {
            "name": "Hiroshima",
            "value": "1367820",
            "date": "1895"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "647883",
            "date": "1895"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1610829",
            "date": "1895"
        },
        {
            "name": "Ibaraki",
            "value": "1085445",
            "date": "1895"
        },
        {
            "name": "Ishikawa",
            "value": "754120",
            "date": "1895"
        },
        {
            "name": "Iwate",
            "value": "702915",
            "date": "1895"
        },
        {
            "name": "Kagawa",
            "value": "674600",
            "date": "1895"
        },
        {
            "name": "Kagoshima",
            "value": "1058171",
            "date": "1895"
        },
        {
            "name": "Kanagawa",
            "value": "834624",
            "date": "1895"
        },
        {
            "name": "K\u014dchi",
            "value": "598011",
            "date": "1895"
        },
        {
            "name": "Kumamoto",
            "value": "1105932",
            "date": "1895"
        },
        {
            "name": "Ky\u014dto",
            "value": "951825",
            "date": "1895"
        },
        {
            "name": "Mie",
            "value": "960773",
            "date": "1895"
        },
        {
            "name": "Miyagi",
            "value": "817805",
            "date": "1895"
        },
        {
            "name": "Miyazaki",
            "value": "447126",
            "date": "1895"
        },
        {
            "name": "Nagano",
            "value": "1210435",
            "date": "1895"
        },
        {
            "name": "Nagasaki",
            "value": "820338",
            "date": "1895"
        },
        {
            "name": "Nara",
            "value": "518025",
            "date": "1895"
        },
        {
            "name": "Niigata",
            "value": "1731329",
            "date": "1895"
        },
        {
            "name": "\u014cita",
            "value": "805374",
            "date": "1895"
        },
        {
            "name": "Okayama",
            "value": "1094551",
            "date": "1895"
        },
        {
            "name": "Okinawa",
            "value": "439578",
            "date": "1895"
        },
        {
            "name": "\u014csaka",
            "value": "1422750",
            "date": "1895"
        },
        {
            "name": "Saga",
            "value": "587287",
            "date": "1895"
        },
        {
            "name": "Saitama",
            "value": "1137773",
            "date": "1895"
        },
        {
            "name": "Shiga",
            "value": "690043",
            "date": "1895"
        },
        {
            "name": "Shimane",
            "value": "705674",
            "date": "1895"
        },
        {
            "name": "Shizuoka",
            "value": "1148653",
            "date": "1895"
        },
        {
            "name": "Tochigi",
            "value": "767478",
            "date": "1895"
        },
        {
            "name": "Tokushima",
            "value": "674976",
            "date": "1895"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1867913",
            "date": "1895"
        },
        {
            "name": "Tottori",
            "value": "407650",
            "date": "1895"
        },
        {
            "name": "Toyama",
            "value": "764399",
            "date": "1895"
        },
        {
            "name": "Wakayama",
            "value": "644983",
            "date": "1895"
        },
        {
            "name": "Yamagata",
            "value": "790779",
            "date": "1895"
        },
        {
            "name": "Yamaguchi",
            "value": "948234",
            "date": "1895"
        },
        {
            "name": "Yamanashi",
            "value": "482349",
            "date": "1895"
        }
    ],
    "1894": [
        {
            "name": "Aichi",
            "value": "1529349",
            "date": "1894"
        },
        {
            "name": "Akita",
            "value": "726974",
            "date": "1894"
        },
        {
            "name": "Aomori",
            "value": "574235",
            "date": "1894"
        },
        {
            "name": "Chiba",
            "value": "1221631",
            "date": "1894"
        },
        {
            "name": "Ehime",
            "value": "945101",
            "date": "1894"
        },
        {
            "name": "Fukui",
            "value": "613486",
            "date": "1894"
        },
        {
            "name": "Fukuoka",
            "value": "1285082",
            "date": "1894"
        },
        {
            "name": "Fukushima",
            "value": "1005381",
            "date": "1894"
        },
        {
            "name": "Gifu",
            "value": "949235",
            "date": "1894"
        },
        {
            "name": "Gunma",
            "value": "778729",
            "date": "1894"
        },
        {
            "name": "Hiroshima",
            "value": "1346327",
            "date": "1894"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "594143",
            "date": "1894"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1595428",
            "date": "1894"
        },
        {
            "name": "Ibaraki",
            "value": "1069316",
            "date": "1894"
        },
        {
            "name": "Ishikawa",
            "value": "752202",
            "date": "1894"
        },
        {
            "name": "Iwate",
            "value": "693730",
            "date": "1894"
        },
        {
            "name": "Kagawa",
            "value": "671638",
            "date": "1894"
        },
        {
            "name": "Kagoshima",
            "value": "1042962",
            "date": "1894"
        },
        {
            "name": "Kanagawa",
            "value": "811986",
            "date": "1894"
        },
        {
            "name": "K\u014dchi",
            "value": "590875",
            "date": "1894"
        },
        {
            "name": "Kumamoto",
            "value": "1097299",
            "date": "1894"
        },
        {
            "name": "Ky\u014dto",
            "value": "937383",
            "date": "1894"
        },
        {
            "name": "Mie",
            "value": "950038",
            "date": "1894"
        },
        {
            "name": "Miyagi",
            "value": "802927",
            "date": "1894"
        },
        {
            "name": "Miyazaki",
            "value": "439273",
            "date": "1894"
        },
        {
            "name": "Nagano",
            "value": "1189936",
            "date": "1894"
        },
        {
            "name": "Nagasaki",
            "value": "803713",
            "date": "1894"
        },
        {
            "name": "Nara",
            "value": "512181",
            "date": "1894"
        },
        {
            "name": "Niigata",
            "value": "1719562",
            "date": "1894"
        },
        {
            "name": "\u014cita",
            "value": "796456",
            "date": "1894"
        },
        {
            "name": "Okayama",
            "value": "1083743",
            "date": "1894"
        },
        {
            "name": "Okinawa",
            "value": "432078",
            "date": "1894"
        },
        {
            "name": "\u014csaka",
            "value": "1400308",
            "date": "1894"
        },
        {
            "name": "Saga",
            "value": "579844",
            "date": "1894"
        },
        {
            "name": "Saitama",
            "value": "1119126",
            "date": "1894"
        },
        {
            "name": "Shiga",
            "value": "686715",
            "date": "1894"
        },
        {
            "name": "Shimane",
            "value": "700921",
            "date": "1894"
        },
        {
            "name": "Shizuoka",
            "value": "1128584",
            "date": "1894"
        },
        {
            "name": "Tochigi",
            "value": "751874",
            "date": "1894"
        },
        {
            "name": "Tokushima",
            "value": "670745",
            "date": "1894"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1829583",
            "date": "1894"
        },
        {
            "name": "Tottori",
            "value": "404111",
            "date": "1894"
        },
        {
            "name": "Toyama",
            "value": "763450",
            "date": "1894"
        },
        {
            "name": "Wakayama",
            "value": "636699",
            "date": "1894"
        },
        {
            "name": "Yamagata",
            "value": "781727",
            "date": "1894"
        },
        {
            "name": "Yamaguchi",
            "value": "939940",
            "date": "1894"
        },
        {
            "name": "Yamanashi",
            "value": "474959",
            "date": "1894"
        }
    ],
    "1893": [
        {
            "name": "Aichi",
            "value": "1512420",
            "date": "1893"
        },
        {
            "name": "Akita",
            "value": "720871",
            "date": "1893"
        },
        {
            "name": "Aomori",
            "value": "567002",
            "date": "1893"
        },
        {
            "name": "Chiba",
            "value": "1215742",
            "date": "1893"
        },
        {
            "name": "Ehime",
            "value": "942632",
            "date": "1893"
        },
        {
            "name": "Fukui",
            "value": "610550",
            "date": "1893"
        },
        {
            "name": "Fukuoka",
            "value": "1275050",
            "date": "1893"
        },
        {
            "name": "Fukushima",
            "value": "994825",
            "date": "1893"
        },
        {
            "name": "Gifu",
            "value": "941523",
            "date": "1893"
        },
        {
            "name": "Gunma",
            "value": "766687",
            "date": "1893"
        },
        {
            "name": "Hiroshima",
            "value": "1342484",
            "date": "1893"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "537953",
            "date": "1893"
        },
        {
            "name": "Hy\u014dgo",
            "value": "1581525",
            "date": "1893"
        },
        {
            "name": "Ibaraki",
            "value": "1058369",
            "date": "1893"
        },
        {
            "name": "Ishikawa",
            "value": "753871",
            "date": "1893"
        },
        {
            "name": "Iwate",
            "value": "690456",
            "date": "1893"
        },
        {
            "name": "Kagawa",
            "value": "675237",
            "date": "1893"
        },
        {
            "name": "Kagoshima",
            "value": "1036863",
            "date": "1893"
        },
        {
            "name": "Kanagawa",
            "value": "799862",
            "date": "1893"
        },
        {
            "name": "K\u014dchi",
            "value": "587428",
            "date": "1893"
        },
        {
            "name": "Kumamoto",
            "value": "1084165",
            "date": "1893"
        },
        {
            "name": "Ky\u014dto",
            "value": "924093",
            "date": "1893"
        },
        {
            "name": "Mie",
            "value": "943376",
            "date": "1893"
        },
        {
            "name": "Miyagi",
            "value": "790079",
            "date": "1893"
        },
        {
            "name": "Miyazaki",
            "value": "436067",
            "date": "1893"
        },
        {
            "name": "Nagano",
            "value": "1179234",
            "date": "1893"
        },
        {
            "name": "Nagasaki",
            "value": "795461",
            "date": "1893"
        },
        {
            "name": "Nara",
            "value": "508963",
            "date": "1893"
        },
        {
            "name": "Niigata",
            "value": "1713384",
            "date": "1893"
        },
        {
            "name": "\u014cita",
            "value": "794050",
            "date": "1893"
        },
        {
            "name": "Okayama",
            "value": "1084423",
            "date": "1893"
        },
        {
            "name": "Okinawa",
            "value": "421769",
            "date": "1893"
        },
        {
            "name": "\u014csaka",
            "value": "1380768",
            "date": "1893"
        },
        {
            "name": "Saga",
            "value": "577175",
            "date": "1893"
        },
        {
            "name": "Saitama",
            "value": "1109604",
            "date": "1893"
        },
        {
            "name": "Shiga",
            "value": "682455",
            "date": "1893"
        },
        {
            "name": "Shimane",
            "value": "702301",
            "date": "1893"
        },
        {
            "name": "Shizuoka",
            "value": "1117127",
            "date": "1893"
        },
        {
            "name": "Tochigi",
            "value": "744426",
            "date": "1893"
        },
        {
            "name": "Tokushima",
            "value": "679046",
            "date": "1893"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "1790731",
            "date": "1893"
        },
        {
            "name": "Tottori",
            "value": "404321",
            "date": "1893"
        },
        {
            "name": "Toyama",
            "value": "764196",
            "date": "1893"
        },
        {
            "name": "Wakayama",
            "value": "634494",
            "date": "1893"
        },
        {
            "name": "Yamagata",
            "value": "778280",
            "date": "1893"
        },
        {
            "name": "Yamaguchi",
            "value": "938158",
            "date": "1893"
        },
        {
            "name": "Yamanashi",
            "value": "471480",
            "date": "1893"
        }
    ],
    "1947": [
        {
            "name": "Aichi",
            "value": "3122902",
            "date": "1947"
        },
        {
            "name": "Akita",
            "value": "1257398",
            "date": "1947"
        },
        {
            "name": "Aomori",
            "value": "1180245",
            "date": "1947"
        },
        {
            "name": "Chiba",
            "value": "2112917",
            "date": "1947"
        },
        {
            "name": "Ehime",
            "value": "1453887",
            "date": "1947"
        },
        {
            "name": "Fukui",
            "value": "726264",
            "date": "1947"
        },
        {
            "name": "Fukuoka",
            "value": "3178134",
            "date": "1947"
        },
        {
            "name": "Fukushima",
            "value": "1992460",
            "date": "1947"
        },
        {
            "name": "Gifu",
            "value": "1493644",
            "date": "1947"
        },
        {
            "name": "Gunma",
            "value": "1572787",
            "date": "1947"
        },
        {
            "name": "Hiroshima",
            "value": "2011498",
            "date": "1947"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "3852821",
            "date": "1947"
        },
        {
            "name": "Hy\u014dgo",
            "value": "3057444",
            "date": "1947"
        },
        {
            "name": "Ibaraki",
            "value": "2013735",
            "date": "1947"
        },
        {
            "name": "Ishikawa",
            "value": "927743",
            "date": "1947"
        },
        {
            "name": "Iwate",
            "value": "1262743",
            "date": "1947"
        },
        {
            "name": "Kagawa",
            "value": "917673",
            "date": "1947"
        },
        {
            "name": "Kagoshima",
            "value": "1746305",
            "date": "1947"
        },
        {
            "name": "Kanagawa",
            "value": "2218120",
            "date": "1947"
        },
        {
            "name": "K\u014dchi",
            "value": "848337",
            "date": "1947"
        },
        {
            "name": "Kumamoto",
            "value": "1765726",
            "date": "1947"
        },
        {
            "name": "Ky\u014dto",
            "value": "1739084",
            "date": "1947"
        },
        {
            "name": "Mie",
            "value": "1416494",
            "date": "1947"
        },
        {
            "name": "Miyagi",
            "value": "1566831",
            "date": "1947"
        },
        {
            "name": "Miyazaki",
            "value": "1025689",
            "date": "1947"
        },
        {
            "name": "Nagano",
            "value": "2060010",
            "date": "1947"
        },
        {
            "name": "Nagasaki",
            "value": "1531674",
            "date": "1947"
        },
        {
            "name": "Nara",
            "value": "779935",
            "date": "1947"
        },
        {
            "name": "Niigata",
            "value": "2418271",
            "date": "1947"
        },
        {
            "name": "\u014cita",
            "value": "1233651",
            "date": "1947"
        },
        {
            "name": "Okayama",
            "value": "1619622",
            "date": "1947"
        },
        {
            "name": "\u014csaka",
            "value": "3334659",
            "date": "1947"
        },
        {
            "name": "Saga",
            "value": "917797",
            "date": "1947"
        },
        {
            "name": "Saitama",
            "value": "2100453",
            "date": "1947"
        },
        {
            "name": "Shiga",
            "value": "858367",
            "date": "1947"
        },
        {
            "name": "Shimane",
            "value": "894267",
            "date": "1947"
        },
        {
            "name": "Shizuoka",
            "value": "2353005",
            "date": "1947"
        },
        {
            "name": "Tochigi",
            "value": "1534311",
            "date": "1947"
        },
        {
            "name": "Tokushima",
            "value": "854811",
            "date": "1947"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "5000777",
            "date": "1947"
        },
        {
            "name": "Tottori",
            "value": "587606",
            "date": "1947"
        },
        {
            "name": "Toyama",
            "value": "979229",
            "date": "1947"
        },
        {
            "name": "Wakayama",
            "value": "959999",
            "date": "1947"
        },
        {
            "name": "Yamagata",
            "value": "1335653",
            "date": "1947"
        },
        {
            "name": "Yamaguchi",
            "value": "1479244",
            "date": "1947"
        },
        {
            "name": "Yamanashi",
            "value": "807251",
            "date": "1947"
        }
    ],
    "1946": [
        {
            "name": "Aichi",
            "value": "2919085",
            "date": "1946"
        },
        {
            "name": "Akita",
            "value": "1195813",
            "date": "1946"
        },
        {
            "name": "Aomori",
            "value": "1089232",
            "date": "1946"
        },
        {
            "name": "Chiba",
            "value": "2008568",
            "date": "1946"
        },
        {
            "name": "Ehime",
            "value": "1380700",
            "date": "1946"
        },
        {
            "name": "Fukui",
            "value": "695703",
            "date": "1946"
        },
        {
            "name": "Fukuoka",
            "value": "2906644",
            "date": "1946"
        },
        {
            "name": "Fukushima",
            "value": "1918746",
            "date": "1946"
        },
        {
            "name": "Gifu",
            "value": "1444000",
            "date": "1946"
        },
        {
            "name": "Gunma",
            "value": "1524635",
            "date": "1946"
        },
        {
            "name": "Hiroshima",
            "value": "1901430",
            "date": "1946"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "3488013",
            "date": "1946"
        },
        {
            "name": "Hy\u014dgo",
            "value": "2826192",
            "date": "1946"
        },
        {
            "name": "Ibaraki",
            "value": "1940833",
            "date": "1946"
        },
        {
            "name": "Ishikawa",
            "value": "877197",
            "date": "1946"
        },
        {
            "name": "Iwate",
            "value": "1217154",
            "date": "1946"
        },
        {
            "name": "Kagawa",
            "value": "872312",
            "date": "1946"
        },
        {
            "name": "Kagoshima",
            "value": "1629760",
            "date": "1946"
        },
        {
            "name": "Kanagawa",
            "value": "2019943",
            "date": "1946"
        },
        {
            "name": "K\u014dchi",
            "value": "797876",
            "date": "1946"
        },
        {
            "name": "Kumamoto",
            "value": "1631976",
            "date": "1946"
        },
        {
            "name": "Ky\u014dto",
            "value": "1621998",
            "date": "1946"
        },
        {
            "name": "Mie",
            "value": "1371858",
            "date": "1946"
        },
        {
            "name": "Miyagi",
            "value": "1462100",
            "date": "1946"
        },
        {
            "name": "Miyazaki",
            "value": "957856",
            "date": "1946"
        },
        {
            "name": "Nagano",
            "value": "2028648",
            "date": "1946"
        },
        {
            "name": "Nagasaki",
            "value": "1417977",
            "date": "1946"
        },
        {
            "name": "Nara",
            "value": "744381",
            "date": "1946"
        },
        {
            "name": "Niigata",
            "value": "2326811",
            "date": "1946"
        },
        {
            "name": "\u014cita",
            "value": "1149501",
            "date": "1946"
        },
        {
            "name": "Okayama",
            "value": "1538621",
            "date": "1946"
        },
        {
            "name": "\u014csaka",
            "value": "2976140",
            "date": "1946"
        },
        {
            "name": "Saga",
            "value": "856692",
            "date": "1946"
        },
        {
            "name": "Saitama",
            "value": "2028553",
            "date": "1946"
        },
        {
            "name": "Shiga",
            "value": "831306",
            "date": "1946"
        },
        {
            "name": "Shimane",
            "value": "848995",
            "date": "1946"
        },
        {
            "name": "Shizuoka",
            "value": "2260059",
            "date": "1946"
        },
        {
            "name": "Tochigi",
            "value": "1503619",
            "date": "1946"
        },
        {
            "name": "Tokushima",
            "value": "829405",
            "date": "1946"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "4183072",
            "date": "1946"
        },
        {
            "name": "Tottori",
            "value": "557429",
            "date": "1946"
        },
        {
            "name": "Toyama",
            "value": "932669",
            "date": "1946"
        },
        {
            "name": "Wakayama",
            "value": "933231",
            "date": "1946"
        },
        {
            "name": "Yamagata",
            "value": "1294934",
            "date": "1946"
        },
        {
            "name": "Yamaguchi",
            "value": "1375496",
            "date": "1946"
        },
        {
            "name": "Yamanashi",
            "value": "796973",
            "date": "1946"
        }
    ],
    "1945": [
        {
            "name": "Aichi",
            "value": "2857851",
            "date": "1945"
        },
        {
            "name": "Akita",
            "value": "1211871",
            "date": "1945"
        },
        {
            "name": "Aomori",
            "value": "1083250",
            "date": "1945"
        },
        {
            "name": "Chiba",
            "value": "1966862",
            "date": "1945"
        },
        {
            "name": "Ehime",
            "value": "1361484",
            "date": "1945"
        },
        {
            "name": "Fukui",
            "value": "724856",
            "date": "1945"
        },
        {
            "name": "Fukuoka",
            "value": "2746855",
            "date": "1945"
        },
        {
            "name": "Fukushima",
            "value": "1957356",
            "date": "1945"
        },
        {
            "name": "Gifu",
            "value": "1518649",
            "date": "1945"
        },
        {
            "name": "Gunma",
            "value": "1546081",
            "date": "1945"
        },
        {
            "name": "Hiroshima",
            "value": "1885471",
            "date": "1945"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "3518389",
            "date": "1945"
        },
        {
            "name": "Hy\u014dgo",
            "value": "2821892",
            "date": "1945"
        },
        {
            "name": "Ibaraki",
            "value": "1944344",
            "date": "1945"
        },
        {
            "name": "Ishikawa",
            "value": "887510",
            "date": "1945"
        },
        {
            "name": "Iwate",
            "value": "1227789",
            "date": "1945"
        },
        {
            "name": "Kagawa",
            "value": "863700",
            "date": "1945"
        },
        {
            "name": "Kagoshima",
            "value": "1538466",
            "date": "1945"
        },
        {
            "name": "Kanagawa",
            "value": "1865667",
            "date": "1945"
        },
        {
            "name": "K\u014dchi",
            "value": "775578",
            "date": "1945"
        },
        {
            "name": "Kumamoto",
            "value": "1556490",
            "date": "1945"
        },
        {
            "name": "Ky\u014dto",
            "value": "1603796",
            "date": "1945"
        },
        {
            "name": "Mie",
            "value": "1394286",
            "date": "1945"
        },
        {
            "name": "Miyagi",
            "value": "1462254",
            "date": "1945"
        },
        {
            "name": "Miyazaki",
            "value": "913687",
            "date": "1945"
        },
        {
            "name": "Nagano",
            "value": "2121050",
            "date": "1945"
        },
        {
            "name": "Nagasaki",
            "value": "1318589",
            "date": "1945"
        },
        {
            "name": "Nara",
            "value": "779685",
            "date": "1945"
        },
        {
            "name": "Niigata",
            "value": "2389653",
            "date": "1945"
        },
        {
            "name": "\u014cita",
            "value": "1124513",
            "date": "1945"
        },
        {
            "name": "Okayama",
            "value": "1564626",
            "date": "1945"
        },
        {
            "name": "\u014csaka",
            "value": "2800958",
            "date": "1945"
        },
        {
            "name": "Saga",
            "value": "830431",
            "date": "1945"
        },
        {
            "name": "Saitama",
            "value": "2047261",
            "date": "1945"
        },
        {
            "name": "Shiga",
            "value": "860911",
            "date": "1945"
        },
        {
            "name": "Shimane",
            "value": "860275",
            "date": "1945"
        },
        {
            "name": "Shizuoka",
            "value": "2220358",
            "date": "1945"
        },
        {
            "name": "Tochigi",
            "value": "1546355",
            "date": "1945"
        },
        {
            "name": "Tokushima",
            "value": "835763",
            "date": "1945"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "3488284",
            "date": "1945"
        },
        {
            "name": "Tottori",
            "value": "563220",
            "date": "1945"
        },
        {
            "name": "Toyama",
            "value": "953834",
            "date": "1945"
        },
        {
            "name": "Wakayama",
            "value": "936006",
            "date": "1945"
        },
        {
            "name": "Yamagata",
            "value": "1326350",
            "date": "1945"
        },
        {
            "name": "Yamaguchi",
            "value": "1356491",
            "date": "1945"
        },
        {
            "name": "Yamanashi",
            "value": "839057",
            "date": "1945"
        }
    ],
    "1944": [
        {
            "name": "Aichi",
            "value": "3280206",
            "date": "1944"
        },
        {
            "name": "Akita",
            "value": "1048769",
            "date": "1944"
        },
        {
            "name": "Aomori",
            "value": "1009104",
            "date": "1944"
        },
        {
            "name": "Chiba",
            "value": "1659345",
            "date": "1944"
        },
        {
            "name": "Ehime",
            "value": "1186491",
            "date": "1944"
        },
        {
            "name": "Fukui",
            "value": "621933",
            "date": "1944"
        },
        {
            "name": "Fukuoka",
            "value": "3066472",
            "date": "1944"
        },
        {
            "name": "Fukushima",
            "value": "1599392",
            "date": "1944"
        },
        {
            "name": "Gifu",
            "value": "1266008",
            "date": "1944"
        },
        {
            "name": "Gunma",
            "value": "1319517",
            "date": "1944"
        },
        {
            "name": "Hiroshima",
            "value": "1962950",
            "date": "1944"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "3256157",
            "date": "1944"
        },
        {
            "name": "Hy\u014dgo",
            "value": "3224376",
            "date": "1944"
        },
        {
            "name": "Ibaraki",
            "value": "1656678",
            "date": "1944"
        },
        {
            "name": "Ishikawa",
            "value": "743672",
            "date": "1944"
        },
        {
            "name": "Iwate",
            "value": "1104049",
            "date": "1944"
        },
        {
            "name": "Kagawa",
            "value": "713134",
            "date": "1944"
        },
        {
            "name": "Kagoshima",
            "value": "1594009",
            "date": "1944"
        },
        {
            "name": "Kanagawa",
            "value": "2474354",
            "date": "1944"
        },
        {
            "name": "Karafuto",
            "value": "391825",
            "date": "1944"
        },
        {
            "name": "K\u014dchi",
            "value": "693053",
            "date": "1944"
        },
        {
            "name": "Kumamoto",
            "value": "1371005",
            "date": "1944"
        },
        {
            "name": "Ky\u014dto",
            "value": "1635528",
            "date": "1944"
        },
        {
            "name": "Mie",
            "value": "1209266",
            "date": "1944"
        },
        {
            "name": "Miyagi",
            "value": "1275862",
            "date": "1944"
        },
        {
            "name": "Miyazaki",
            "value": "839556",
            "date": "1944"
        },
        {
            "name": "Nagano",
            "value": "1650511",
            "date": "1944"
        },
        {
            "name": "Nagasaki",
            "value": "1490890",
            "date": "1944"
        },
        {
            "name": "Nara",
            "value": "606789",
            "date": "1944"
        },
        {
            "name": "Niigata",
            "value": "1994817",
            "date": "1944"
        },
        {
            "name": "\u014cita",
            "value": "973707",
            "date": "1944"
        },
        {
            "name": "Okayama",
            "value": "1333300",
            "date": "1944"
        },
        {
            "name": "Okinawa",
            "value": "590480",
            "date": "1944"
        },
        {
            "name": "\u014csaka",
            "value": "4412953",
            "date": "1944"
        },
        {
            "name": "Saga",
            "value": "705651",
            "date": "1944"
        },
        {
            "name": "Saitama",
            "value": "1647625",
            "date": "1944"
        },
        {
            "name": "Shiga",
            "value": "691972",
            "date": "1944"
        },
        {
            "name": "Shimane",
            "value": "729819",
            "date": "1944"
        },
        {
            "name": "Shizuoka",
            "value": "2027856",
            "date": "1944"
        },
        {
            "name": "Tochigi",
            "value": "1203679",
            "date": "1944"
        },
        {
            "name": "Tokushima",
            "value": "703260",
            "date": "1944"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "7271001",
            "date": "1944"
        },
        {
            "name": "Tottori",
            "value": "476284",
            "date": "1944"
        },
        {
            "name": "Toyama",
            "value": "819614",
            "date": "1944"
        },
        {
            "name": "Wakayama",
            "value": "847388",
            "date": "1944"
        },
        {
            "name": "Yamagata",
            "value": "1083569",
            "date": "1944"
        },
        {
            "name": "Yamaguchi",
            "value": "1357368",
            "date": "1944"
        },
        {
            "name": "Yamanashi",
            "value": "634897",
            "date": "1944"
        }
    ],
    "1940": [
        {
            "name": "Aichi",
            "value": "3166592",
            "date": "1940"
        },
        {
            "name": "Akita",
            "value": "1052275",
            "date": "1940"
        },
        {
            "name": "Aomori",
            "value": "1000509",
            "date": "1940"
        },
        {
            "name": "Chiba",
            "value": "1588425",
            "date": "1940"
        },
        {
            "name": "Ehime",
            "value": "1178705",
            "date": "1940"
        },
        {
            "name": "Fukui",
            "value": "643904",
            "date": "1940"
        },
        {
            "name": "Fukuoka",
            "value": "3094132",
            "date": "1940"
        },
        {
            "name": "Fukushima",
            "value": "1625521",
            "date": "1940"
        },
        {
            "name": "Gifu",
            "value": "1265024",
            "date": "1940"
        },
        {
            "name": "Gunma",
            "value": "1299027",
            "date": "1940"
        },
        {
            "name": "Hiroshima",
            "value": "1869504",
            "date": "1940"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "3272718",
            "date": "1940"
        },
        {
            "name": "Hy\u014dgo",
            "value": "3221232",
            "date": "1940"
        },
        {
            "name": "Ibaraki",
            "value": "1620000",
            "date": "1940"
        },
        {
            "name": "Ishikawa",
            "value": "757676",
            "date": "1940"
        },
        {
            "name": "Iwate",
            "value": "1095793",
            "date": "1940"
        },
        {
            "name": "Kagawa",
            "value": "730394",
            "date": "1940"
        },
        {
            "name": "Kagoshima",
            "value": "1589467",
            "date": "1940"
        },
        {
            "name": "Kanagawa",
            "value": "2188974",
            "date": "1940"
        },
        {
            "name": "K\u014dchi",
            "value": "709286",
            "date": "1940"
        },
        {
            "name": "Kumamoto",
            "value": "1368179",
            "date": "1940"
        },
        {
            "name": "Ky\u014dto",
            "value": "1729993",
            "date": "1940"
        },
        {
            "name": "Mie",
            "value": "1198783",
            "date": "1940"
        },
        {
            "name": "Miyagi",
            "value": "1271238",
            "date": "1940"
        },
        {
            "name": "Miyazaki",
            "value": "840357",
            "date": "1940"
        },
        {
            "name": "Nagano",
            "value": "1710729",
            "date": "1940"
        },
        {
            "name": "Nagasaki",
            "value": "1370063",
            "date": "1940"
        },
        {
            "name": "Nara",
            "value": "620509",
            "date": "1940"
        },
        {
            "name": "Niigata",
            "value": "2064402",
            "date": "1940"
        },
        {
            "name": "\u014cita",
            "value": "972975",
            "date": "1940"
        },
        {
            "name": "Okayama",
            "value": "1329358",
            "date": "1940"
        },
        {
            "name": "Okinawa",
            "value": "574579",
            "date": "1940"
        },
        {
            "name": "\u014csaka",
            "value": "4792966",
            "date": "1940"
        },
        {
            "name": "Saga",
            "value": "701517",
            "date": "1940"
        },
        {
            "name": "Saitama",
            "value": "1608039",
            "date": "1940"
        },
        {
            "name": "Shiga",
            "value": "703679",
            "date": "1940"
        },
        {
            "name": "Shimane",
            "value": "740940",
            "date": "1940"
        },
        {
            "name": "Shizuoka",
            "value": "2017860",
            "date": "1940"
        },
        {
            "name": "Tochigi",
            "value": "1206657",
            "date": "1940"
        },
        {
            "name": "Tokushima",
            "value": "718717",
            "date": "1940"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "7354971",
            "date": "1940"
        },
        {
            "name": "Tottori",
            "value": "484390",
            "date": "1940"
        },
        {
            "name": "Toyama",
            "value": "822569",
            "date": "1940"
        },
        {
            "name": "Wakayama",
            "value": "865074",
            "date": "1940"
        },
        {
            "name": "Yamagata",
            "value": "1119338",
            "date": "1940"
        },
        {
            "name": "Yamaguchi",
            "value": "1294242",
            "date": "1940"
        },
        {
            "name": "Yamanashi",
            "value": "663026",
            "date": "1940"
        }
    ],
    "1935": [
        {
            "name": "Aichi",
            "value": "2862701",
            "date": "1935"
        },
        {
            "name": "Akita",
            "value": "1037744",
            "date": "1935"
        },
        {
            "name": "Aomori",
            "value": "967129",
            "date": "1935"
        },
        {
            "name": "Chiba",
            "value": "1546394",
            "date": "1935"
        },
        {
            "name": "Ehime",
            "value": "1164898",
            "date": "1935"
        },
        {
            "name": "Fukui",
            "value": "646659",
            "date": "1935"
        },
        {
            "name": "Fukuoka",
            "value": "2755804",
            "date": "1935"
        },
        {
            "name": "Fukushima",
            "value": "1581563",
            "date": "1935"
        },
        {
            "name": "Gifu",
            "value": "1225799",
            "date": "1935"
        },
        {
            "name": "Gunma",
            "value": "1242453",
            "date": "1935"
        },
        {
            "name": "Hiroshima",
            "value": "1804916",
            "date": "1935"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "3068282",
            "date": "1935"
        },
        {
            "name": "Hy\u014dgo",
            "value": "2923249",
            "date": "1935"
        },
        {
            "name": "Ibaraki",
            "value": "1548991",
            "date": "1935"
        },
        {
            "name": "Ishikawa",
            "value": "768416",
            "date": "1935"
        },
        {
            "name": "Iwate",
            "value": "1046111",
            "date": "1935"
        },
        {
            "name": "Kagawa",
            "value": "748656",
            "date": "1935"
        },
        {
            "name": "Kagoshima",
            "value": "1591466",
            "date": "1935"
        },
        {
            "name": "Kanagawa",
            "value": "1840005",
            "date": "1935"
        },
        {
            "name": "K\u014dchi",
            "value": "714980",
            "date": "1935"
        },
        {
            "name": "Kumamoto",
            "value": "1387054",
            "date": "1935"
        },
        {
            "name": "Ky\u014dto",
            "value": "1702508",
            "date": "1935"
        },
        {
            "name": "Mie",
            "value": "1174595",
            "date": "1935"
        },
        {
            "name": "Miyagi",
            "value": "1234801",
            "date": "1935"
        },
        {
            "name": "Miyazaki",
            "value": "824431",
            "date": "1935"
        },
        {
            "name": "Nagano",
            "value": "1714000",
            "date": "1935"
        },
        {
            "name": "Nagasaki",
            "value": "1296883",
            "date": "1935"
        },
        {
            "name": "Nara",
            "value": "620471",
            "date": "1935"
        },
        {
            "name": "Niigata",
            "value": "1995777",
            "date": "1935"
        },
        {
            "name": "\u014cita",
            "value": "980458",
            "date": "1935"
        },
        {
            "name": "Okayama",
            "value": "1332647",
            "date": "1935"
        },
        {
            "name": "Okinawa",
            "value": "592494",
            "date": "1935"
        },
        {
            "name": "\u014csaka",
            "value": "4297174",
            "date": "1935"
        },
        {
            "name": "Saga",
            "value": "686117",
            "date": "1935"
        },
        {
            "name": "Saitama",
            "value": "1528854",
            "date": "1935"
        },
        {
            "name": "Shiga",
            "value": "711436",
            "date": "1935"
        },
        {
            "name": "Shimane",
            "value": "747119",
            "date": "1935"
        },
        {
            "name": "Shizuoka",
            "value": "1939860",
            "date": "1935"
        },
        {
            "name": "Tochigi",
            "value": "1195057",
            "date": "1935"
        },
        {
            "name": "Tokushima",
            "value": "728748",
            "date": "1935"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "6369919",
            "date": "1935"
        },
        {
            "name": "Tottori",
            "value": "490461",
            "date": "1935"
        },
        {
            "name": "Toyama",
            "value": "798890",
            "date": "1935"
        },
        {
            "name": "Wakayama",
            "value": "864087",
            "date": "1935"
        },
        {
            "name": "Yamagata",
            "value": "1116822",
            "date": "1935"
        },
        {
            "name": "Yamaguchi",
            "value": "1190542",
            "date": "1935"
        },
        {
            "name": "Yamanashi",
            "value": "646727",
            "date": "1935"
        }
    ],
    "1930": [
        {
            "name": "Aichi",
            "value": "2567413",
            "date": "1930"
        },
        {
            "name": "Akita",
            "value": "987706",
            "date": "1930"
        },
        {
            "name": "Aomori",
            "value": "879914",
            "date": "1930"
        },
        {
            "name": "Chiba",
            "value": "1470121",
            "date": "1930"
        },
        {
            "name": "Ehime",
            "value": "1142122",
            "date": "1930"
        },
        {
            "name": "Fukui",
            "value": "618144",
            "date": "1930"
        },
        {
            "name": "Fukuoka",
            "value": "2527119",
            "date": "1930"
        },
        {
            "name": "Fukushima",
            "value": "1508150",
            "date": "1930"
        },
        {
            "name": "Gifu",
            "value": "1178405",
            "date": "1930"
        },
        {
            "name": "Gunma",
            "value": "1186080",
            "date": "1930"
        },
        {
            "name": "Hiroshima",
            "value": "1692136",
            "date": "1930"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "2812335",
            "date": "1930"
        },
        {
            "name": "Hy\u014dgo",
            "value": "2646301",
            "date": "1930"
        },
        {
            "name": "Ibaraki",
            "value": "1487097",
            "date": "1930"
        },
        {
            "name": "Ishikawa",
            "value": "756835",
            "date": "1930"
        },
        {
            "name": "Iwate",
            "value": "975771",
            "date": "1930"
        },
        {
            "name": "Kagawa",
            "value": "732816",
            "date": "1930"
        },
        {
            "name": "Kagoshima",
            "value": "1556690",
            "date": "1930"
        },
        {
            "name": "Kanagawa",
            "value": "1619606",
            "date": "1930"
        },
        {
            "name": "K\u014dchi",
            "value": "718152",
            "date": "1930"
        },
        {
            "name": "Kumamoto",
            "value": "1353993",
            "date": "1930"
        },
        {
            "name": "Ky\u014dto",
            "value": "1552832",
            "date": "1930"
        },
        {
            "name": "Mie",
            "value": "1157407",
            "date": "1930"
        },
        {
            "name": "Miyagi",
            "value": "1142784",
            "date": "1930"
        },
        {
            "name": "Miyazaki",
            "value": "760467",
            "date": "1930"
        },
        {
            "name": "Nagano",
            "value": "1717118",
            "date": "1930"
        },
        {
            "name": "Nagasaki",
            "value": "1233362",
            "date": "1930"
        },
        {
            "name": "Nara",
            "value": "596225",
            "date": "1930"
        },
        {
            "name": "Niigata",
            "value": "1933326",
            "date": "1930"
        },
        {
            "name": "\u014cita",
            "value": "945771",
            "date": "1930"
        },
        {
            "name": "Okayama",
            "value": "1283962",
            "date": "1930"
        },
        {
            "name": "Okinawa",
            "value": "577509",
            "date": "1930"
        },
        {
            "name": "\u014csaka",
            "value": "3540017",
            "date": "1930"
        },
        {
            "name": "Saga",
            "value": "691565",
            "date": "1930"
        },
        {
            "name": "Saitama",
            "value": "1459172",
            "date": "1930"
        },
        {
            "name": "Shiga",
            "value": "691631",
            "date": "1930"
        },
        {
            "name": "Shimane",
            "value": "739507",
            "date": "1930"
        },
        {
            "name": "Shizuoka",
            "value": "1797805",
            "date": "1930"
        },
        {
            "name": "Tochigi",
            "value": "1141737",
            "date": "1930"
        },
        {
            "name": "Tokushima",
            "value": "716544",
            "date": "1930"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "5408678",
            "date": "1930"
        },
        {
            "name": "Tottori",
            "value": "489266",
            "date": "1930"
        },
        {
            "name": "Toyama",
            "value": "778953",
            "date": "1930"
        },
        {
            "name": "Wakayama",
            "value": "830748",
            "date": "1930"
        },
        {
            "name": "Yamagata",
            "value": "1080034",
            "date": "1930"
        },
        {
            "name": "Yamaguchi",
            "value": "1135637",
            "date": "1930"
        },
        {
            "name": "Yamanashi",
            "value": "631042",
            "date": "1930"
        }
    ],
    "1925": [
        {
            "name": "Aichi",
            "value": "2319494",
            "date": "1925"
        },
        {
            "name": "Akita",
            "value": "936408",
            "date": "1925"
        },
        {
            "name": "Aomori",
            "value": "812977",
            "date": "1925"
        },
        {
            "name": "Chiba",
            "value": "1399257",
            "date": "1925"
        },
        {
            "name": "Ehime",
            "value": "1096366",
            "date": "1925"
        },
        {
            "name": "Fukui",
            "value": "597899",
            "date": "1925"
        },
        {
            "name": "Fukuoka",
            "value": "2301668",
            "date": "1925"
        },
        {
            "name": "Fukushima",
            "value": "1437596",
            "date": "1925"
        },
        {
            "name": "Gifu",
            "value": "1132557",
            "date": "1925"
        },
        {
            "name": "Gunma",
            "value": "1118858",
            "date": "1925"
        },
        {
            "name": "Hiroshima",
            "value": "1617680",
            "date": "1925"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "2498679",
            "date": "1925"
        },
        {
            "name": "Hy\u014dgo",
            "value": "2454679",
            "date": "1925"
        },
        {
            "name": "Ibaraki",
            "value": "1409092",
            "date": "1925"
        },
        {
            "name": "Ishikawa",
            "value": "750854",
            "date": "1925"
        },
        {
            "name": "Iwate",
            "value": "900984",
            "date": "1925"
        },
        {
            "name": "Kagawa",
            "value": "700308",
            "date": "1925"
        },
        {
            "name": "Kagoshima",
            "value": "1472193",
            "date": "1925"
        },
        {
            "name": "Kanagawa",
            "value": "1416792",
            "date": "1925"
        },
        {
            "name": "K\u014dchi",
            "value": "687478",
            "date": "1925"
        },
        {
            "name": "Kumamoto",
            "value": "1296086",
            "date": "1925"
        },
        {
            "name": "Ky\u014dto",
            "value": "1406382",
            "date": "1925"
        },
        {
            "name": "Mie",
            "value": "1107692",
            "date": "1925"
        },
        {
            "name": "Miyagi",
            "value": "1044036",
            "date": "1925"
        },
        {
            "name": "Miyazaki",
            "value": "691094",
            "date": "1925"
        },
        {
            "name": "Nagano",
            "value": "1629217",
            "date": "1925"
        },
        {
            "name": "Nagasaki",
            "value": "1163945",
            "date": "1925"
        },
        {
            "name": "Nara",
            "value": "583828",
            "date": "1925"
        },
        {
            "name": "Niigata",
            "value": "1849807",
            "date": "1925"
        },
        {
            "name": "\u014cita",
            "value": "915136",
            "date": "1925"
        },
        {
            "name": "Okayama",
            "value": "1238447",
            "date": "1925"
        },
        {
            "name": "Okinawa",
            "value": "557622",
            "date": "1925"
        },
        {
            "name": "\u014csaka",
            "value": "3059502",
            "date": "1925"
        },
        {
            "name": "Saga",
            "value": "684831",
            "date": "1925"
        },
        {
            "name": "Saitama",
            "value": "1394461",
            "date": "1925"
        },
        {
            "name": "Shiga",
            "value": "662412",
            "date": "1925"
        },
        {
            "name": "Shimane",
            "value": "722402",
            "date": "1925"
        },
        {
            "name": "Shizuoka",
            "value": "1671217",
            "date": "1925"
        },
        {
            "name": "Tochigi",
            "value": "1090428",
            "date": "1925"
        },
        {
            "name": "Tokushima",
            "value": "689814",
            "date": "1925"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "4485144",
            "date": "1925"
        },
        {
            "name": "Tottori",
            "value": "472230",
            "date": "1925"
        },
        {
            "name": "Toyama",
            "value": "749243",
            "date": "1925"
        },
        {
            "name": "Wakayama",
            "value": "787511",
            "date": "1925"
        },
        {
            "name": "Yamagata",
            "value": "1027297",
            "date": "1925"
        },
        {
            "name": "Yamaguchi",
            "value": "1094544",
            "date": "1925"
        },
        {
            "name": "Yamanashi",
            "value": "600675",
            "date": "1925"
        }
    ],
    "1920": [
        {
            "name": "Aichi",
            "value": "2089762",
            "date": "1920"
        },
        {
            "name": "Akita",
            "value": "898537",
            "date": "1920"
        },
        {
            "name": "Aomori",
            "value": "756454",
            "date": "1920"
        },
        {
            "name": "Chiba",
            "value": "1336155",
            "date": "1920"
        },
        {
            "name": "Ehime",
            "value": "1046720",
            "date": "1920"
        },
        {
            "name": "Fukui",
            "value": "599155",
            "date": "1920"
        },
        {
            "name": "Fukuoka",
            "value": "2188249",
            "date": "1920"
        },
        {
            "name": "Fukushima",
            "value": "1362750",
            "date": "1920"
        },
        {
            "name": "Gifu",
            "value": "1070407",
            "date": "1920"
        },
        {
            "name": "Gunma",
            "value": "1052610",
            "date": "1920"
        },
        {
            "name": "Hiroshima",
            "value": "1541905",
            "date": "1920"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "2359183",
            "date": "1920"
        },
        {
            "name": "Hy\u014dgo",
            "value": "2301799",
            "date": "1920"
        },
        {
            "name": "Ibaraki",
            "value": "1350400",
            "date": "1920"
        },
        {
            "name": "Ishikawa",
            "value": "747360",
            "date": "1920"
        },
        {
            "name": "Iwate",
            "value": "845540",
            "date": "1920"
        },
        {
            "name": "Kagawa",
            "value": "677852",
            "date": "1920"
        },
        {
            "name": "Kagoshima",
            "value": "1415582",
            "date": "1920"
        },
        {
            "name": "Kanagawa",
            "value": "1323390",
            "date": "1920"
        },
        {
            "name": "K\u014dchi",
            "value": "670895",
            "date": "1920"
        },
        {
            "name": "Kumamoto",
            "value": "1233233",
            "date": "1920"
        },
        {
            "name": "Ky\u014dto",
            "value": "1287147",
            "date": "1920"
        },
        {
            "name": "Mie",
            "value": "1069270",
            "date": "1920"
        },
        {
            "name": "Miyagi",
            "value": "961768",
            "date": "1920"
        },
        {
            "name": "Miyazaki",
            "value": "651097",
            "date": "1920"
        },
        {
            "name": "Nagano",
            "value": "1562722",
            "date": "1920"
        },
        {
            "name": "Nagasaki",
            "value": "1136182",
            "date": "1920"
        },
        {
            "name": "Nara",
            "value": "564607",
            "date": "1920"
        },
        {
            "name": "Niigata",
            "value": "1776474",
            "date": "1920"
        },
        {
            "name": "\u014cita",
            "value": "860282",
            "date": "1920"
        },
        {
            "name": "Okayama",
            "value": "1217698",
            "date": "1920"
        },
        {
            "name": "Okinawa",
            "value": "571572",
            "date": "1920"
        },
        {
            "name": "\u014csaka",
            "value": "2587847",
            "date": "1920"
        },
        {
            "name": "Saga",
            "value": "673895",
            "date": "1920"
        },
        {
            "name": "Saitama",
            "value": "1319533",
            "date": "1920"
        },
        {
            "name": "Shiga",
            "value": "651050",
            "date": "1920"
        },
        {
            "name": "Shimane",
            "value": "714712",
            "date": "1920"
        },
        {
            "name": "Shizuoka",
            "value": "1550387",
            "date": "1920"
        },
        {
            "name": "Tochigi",
            "value": "1046479",
            "date": "1920"
        },
        {
            "name": "Tokushima",
            "value": "670212",
            "date": "1920"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "3699428",
            "date": "1920"
        },
        {
            "name": "Tottori",
            "value": "454675",
            "date": "1920"
        },
        {
            "name": "Toyama",
            "value": "724276",
            "date": "1920"
        },
        {
            "name": "Wakayama",
            "value": "750411",
            "date": "1920"
        },
        {
            "name": "Yamagata",
            "value": "968925",
            "date": "1920"
        },
        {
            "name": "Yamaguchi",
            "value": "1041013",
            "date": "1920"
        },
        {
            "name": "Yamanashi",
            "value": "583453",
            "date": "1920"
        }
    ],
    "1975": [
        {
            "name": "Aichi",
            "value": "5923569",
            "date": "1975"
        },
        {
            "name": "Akita",
            "value": "1232481",
            "date": "1975"
        },
        {
            "name": "Aomori",
            "value": "1468646",
            "date": "1975"
        },
        {
            "name": "Chiba",
            "value": "4149147",
            "date": "1975"
        },
        {
            "name": "Ehime",
            "value": "1465215",
            "date": "1975"
        },
        {
            "name": "Fukui",
            "value": "773599",
            "date": "1975"
        },
        {
            "name": "Fukuoka",
            "value": "4292963",
            "date": "1975"
        },
        {
            "name": "Fukushima",
            "value": "1970616",
            "date": "1975"
        },
        {
            "name": "Gifu",
            "value": "1867978",
            "date": "1975"
        },
        {
            "name": "Gunma",
            "value": "1756480",
            "date": "1975"
        },
        {
            "name": "Hiroshima",
            "value": "2646324",
            "date": "1975"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5338206",
            "date": "1975"
        },
        {
            "name": "Hy\u014dgo",
            "value": "4992140",
            "date": "1975"
        },
        {
            "name": "Ibaraki",
            "value": "2342198",
            "date": "1975"
        },
        {
            "name": "Ishikawa",
            "value": "1069872",
            "date": "1975"
        },
        {
            "name": "Iwate",
            "value": "1385563",
            "date": "1975"
        },
        {
            "name": "Kagawa",
            "value": "961292",
            "date": "1975"
        },
        {
            "name": "Kagoshima",
            "value": "1723902",
            "date": "1975"
        },
        {
            "name": "Kanagawa",
            "value": "6397748",
            "date": "1975"
        },
        {
            "name": "K\u014dchi",
            "value": "808397",
            "date": "1975"
        },
        {
            "name": "Kumamoto",
            "value": "1715273",
            "date": "1975"
        },
        {
            "name": "Ky\u014dto",
            "value": "2424856",
            "date": "1975"
        },
        {
            "name": "Mie",
            "value": "1626002",
            "date": "1975"
        },
        {
            "name": "Miyagi",
            "value": "1955267",
            "date": "1975"
        },
        {
            "name": "Miyazaki",
            "value": "1085055",
            "date": "1975"
        },
        {
            "name": "Nagano",
            "value": "2017564",
            "date": "1975"
        },
        {
            "name": "Nagasaki",
            "value": "1571912",
            "date": "1975"
        },
        {
            "name": "Nara",
            "value": "1077491",
            "date": "1975"
        },
        {
            "name": "Niigata",
            "value": "2391938",
            "date": "1975"
        },
        {
            "name": "\u014cita",
            "value": "1190314",
            "date": "1975"
        },
        {
            "name": "Okayama",
            "value": "1814305",
            "date": "1975"
        },
        {
            "name": "Okinawa",
            "value": "1042572",
            "date": "1975"
        },
        {
            "name": "\u014csaka",
            "value": "8278925",
            "date": "1975"
        },
        {
            "name": "Saga",
            "value": "837674",
            "date": "1975"
        },
        {
            "name": "Saitama",
            "value": "4821340",
            "date": "1975"
        },
        {
            "name": "Shiga",
            "value": "985621",
            "date": "1975"
        },
        {
            "name": "Shimane",
            "value": "768886",
            "date": "1975"
        },
        {
            "name": "Shizuoka",
            "value": "3308799",
            "date": "1975"
        },
        {
            "name": "Tochigi",
            "value": "1698003",
            "date": "1975"
        },
        {
            "name": "Tokushima",
            "value": "805166",
            "date": "1975"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "11673554",
            "date": "1975"
        },
        {
            "name": "Tottori",
            "value": "581311",
            "date": "1975"
        },
        {
            "name": "Toyama",
            "value": "1070791",
            "date": "1975"
        },
        {
            "name": "Wakayama",
            "value": "1072118",
            "date": "1975"
        },
        {
            "name": "Yamagata",
            "value": "1220302",
            "date": "1975"
        },
        {
            "name": "Yamaguchi",
            "value": "1555218",
            "date": "1975"
        },
        {
            "name": "Yamanashi",
            "value": "783050",
            "date": "1975"
        }
    ],
    "1970": [
        {
            "name": "Aichi",
            "value": "5386163",
            "date": "1970"
        },
        {
            "name": "Akita",
            "value": "1241376",
            "date": "1970"
        },
        {
            "name": "Aomori",
            "value": "1427520",
            "date": "1970"
        },
        {
            "name": "Chiba",
            "value": "3366624",
            "date": "1970"
        },
        {
            "name": "Ehime",
            "value": "1418124",
            "date": "1970"
        },
        {
            "name": "Fukui",
            "value": "744230",
            "date": "1970"
        },
        {
            "name": "Fukuoka",
            "value": "4027416",
            "date": "1970"
        },
        {
            "name": "Fukushima",
            "value": "1946077",
            "date": "1970"
        },
        {
            "name": "Gifu",
            "value": "1758954",
            "date": "1970"
        },
        {
            "name": "Gunma",
            "value": "1658909",
            "date": "1970"
        },
        {
            "name": "Hiroshima",
            "value": "2436135",
            "date": "1970"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5184287",
            "date": "1970"
        },
        {
            "name": "Hy\u014dgo",
            "value": "4667928",
            "date": "1970"
        },
        {
            "name": "Ibaraki",
            "value": "2143551",
            "date": "1970"
        },
        {
            "name": "Ishikawa",
            "value": "1002420",
            "date": "1970"
        },
        {
            "name": "Iwate",
            "value": "1371383",
            "date": "1970"
        },
        {
            "name": "Kagawa",
            "value": "907897",
            "date": "1970"
        },
        {
            "name": "Kagoshima",
            "value": "1729150",
            "date": "1970"
        },
        {
            "name": "Kanagawa",
            "value": "5472247",
            "date": "1970"
        },
        {
            "name": "K\u014dchi",
            "value": "786882",
            "date": "1970"
        },
        {
            "name": "Kumamoto",
            "value": "1700229",
            "date": "1970"
        },
        {
            "name": "Ky\u014dto",
            "value": "2250087",
            "date": "1970"
        },
        {
            "name": "Mie",
            "value": "1543083",
            "date": "1970"
        },
        {
            "name": "Miyagi",
            "value": "1819223",
            "date": "1970"
        },
        {
            "name": "Miyazaki",
            "value": "1051105",
            "date": "1970"
        },
        {
            "name": "Nagano",
            "value": "1956917",
            "date": "1970"
        },
        {
            "name": "Nagasaki",
            "value": "1570245",
            "date": "1970"
        },
        {
            "name": "Nara",
            "value": "930160",
            "date": "1970"
        },
        {
            "name": "Niigata",
            "value": "2360982",
            "date": "1970"
        },
        {
            "name": "\u014cita",
            "value": "1155566",
            "date": "1970"
        },
        {
            "name": "Okayama",
            "value": "1707026",
            "date": "1970"
        },
        {
            "name": "\u014csaka",
            "value": "7620480",
            "date": "1970"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "945111",
            "date": "1970"
        },
        {
            "name": "Saga",
            "value": "838468",
            "date": "1970"
        },
        {
            "name": "Saitama",
            "value": "3866472",
            "date": "1970"
        },
        {
            "name": "Shiga",
            "value": "889768",
            "date": "1970"
        },
        {
            "name": "Shimane",
            "value": "773575",
            "date": "1970"
        },
        {
            "name": "Shizuoka",
            "value": "3089895",
            "date": "1970"
        },
        {
            "name": "Tochigi",
            "value": "1580021",
            "date": "1970"
        },
        {
            "name": "Tokushima",
            "value": "791111",
            "date": "1970"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "11408071",
            "date": "1970"
        },
        {
            "name": "Tottori",
            "value": "568777",
            "date": "1970"
        },
        {
            "name": "Toyama",
            "value": "1029695",
            "date": "1970"
        },
        {
            "name": "Wakayama",
            "value": "1042736",
            "date": "1970"
        },
        {
            "name": "Yamagata",
            "value": "1225618",
            "date": "1970"
        },
        {
            "name": "Yamaguchi",
            "value": "1511448",
            "date": "1970"
        },
        {
            "name": "Yamanashi",
            "value": "762029",
            "date": "1970"
        }
    ],
    "1965": [
        {
            "name": "Aichi",
            "value": "4798653",
            "date": "1965"
        },
        {
            "name": "Akita",
            "value": "1279835",
            "date": "1965"
        },
        {
            "name": "Aomori",
            "value": "1416591",
            "date": "1965"
        },
        {
            "name": "Chiba",
            "value": "2701770",
            "date": "1965"
        },
        {
            "name": "Ehime",
            "value": "1446384",
            "date": "1965"
        },
        {
            "name": "Fukui",
            "value": "750557",
            "date": "1965"
        },
        {
            "name": "Fukuoka",
            "value": "3964611",
            "date": "1965"
        },
        {
            "name": "Fukushima",
            "value": "1983754",
            "date": "1965"
        },
        {
            "name": "Gifu",
            "value": "1700365",
            "date": "1965"
        },
        {
            "name": "Gunma",
            "value": "1605584",
            "date": "1965"
        },
        {
            "name": "Hiroshima",
            "value": "2281146",
            "date": "1965"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5171800",
            "date": "1965"
        },
        {
            "name": "Hy\u014dgo",
            "value": "4309944",
            "date": "1965"
        },
        {
            "name": "Ibaraki",
            "value": "2056154",
            "date": "1965"
        },
        {
            "name": "Ishikawa",
            "value": "980499",
            "date": "1965"
        },
        {
            "name": "Iwate",
            "value": "1411118",
            "date": "1965"
        },
        {
            "name": "Kagawa",
            "value": "900845",
            "date": "1965"
        },
        {
            "name": "Kagoshima",
            "value": "1853541",
            "date": "1965"
        },
        {
            "name": "Kanagawa",
            "value": "4430743",
            "date": "1965"
        },
        {
            "name": "K\u014dchi",
            "value": "812714",
            "date": "1965"
        },
        {
            "name": "Kumamoto",
            "value": "1770736",
            "date": "1965"
        },
        {
            "name": "Ky\u014dto",
            "value": "2102808",
            "date": "1965"
        },
        {
            "name": "Mie",
            "value": "1514467",
            "date": "1965"
        },
        {
            "name": "Miyagi",
            "value": "1753126",
            "date": "1965"
        },
        {
            "name": "Miyazaki",
            "value": "1080692",
            "date": "1965"
        },
        {
            "name": "Nagano",
            "value": "1958007",
            "date": "1965"
        },
        {
            "name": "Nagasaki",
            "value": "1641245",
            "date": "1965"
        },
        {
            "name": "Nara",
            "value": "825965",
            "date": "1965"
        },
        {
            "name": "Niigata",
            "value": "2398931",
            "date": "1965"
        },
        {
            "name": "\u014cita",
            "value": "1187480",
            "date": "1965"
        },
        {
            "name": "Okayama",
            "value": "1645135",
            "date": "1965"
        },
        {
            "name": "\u014csaka",
            "value": "6657189",
            "date": "1965"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "934176",
            "date": "1965"
        },
        {
            "name": "Saga",
            "value": "871885",
            "date": "1965"
        },
        {
            "name": "Saitama",
            "value": "3014983",
            "date": "1965"
        },
        {
            "name": "Shiga",
            "value": "853385",
            "date": "1965"
        },
        {
            "name": "Shimane",
            "value": "821620",
            "date": "1965"
        },
        {
            "name": "Shizuoka",
            "value": "2912521",
            "date": "1965"
        },
        {
            "name": "Tochigi",
            "value": "1521656",
            "date": "1965"
        },
        {
            "name": "Tokushima",
            "value": "815115",
            "date": "1965"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "10869244",
            "date": "1965"
        },
        {
            "name": "Tottori",
            "value": "579853",
            "date": "1965"
        },
        {
            "name": "Toyama",
            "value": "1025465",
            "date": "1965"
        },
        {
            "name": "Wakayama",
            "value": "1026975",
            "date": "1965"
        },
        {
            "name": "Yamagata",
            "value": "1263103",
            "date": "1965"
        },
        {
            "name": "Yamaguchi",
            "value": "1543573",
            "date": "1965"
        },
        {
            "name": "Yamanashi",
            "value": "763194",
            "date": "1965"
        }
    ],
    "1960": [
        {
            "name": "Aichi",
            "value": "4206313",
            "date": "1960"
        },
        {
            "name": "Akita",
            "value": "1335580",
            "date": "1960"
        },
        {
            "name": "Aomori",
            "value": "1426606",
            "date": "1960"
        },
        {
            "name": "Chiba",
            "value": "2306010",
            "date": "1960"
        },
        {
            "name": "Ehime",
            "value": "1500687",
            "date": "1960"
        },
        {
            "name": "Fukui",
            "value": "752696",
            "date": "1960"
        },
        {
            "name": "Fukuoka",
            "value": "4006679",
            "date": "1960"
        },
        {
            "name": "Fukushima",
            "value": "2051137",
            "date": "1960"
        },
        {
            "name": "Gifu",
            "value": "1638399",
            "date": "1960"
        },
        {
            "name": "Gunma",
            "value": "1578476",
            "date": "1960"
        },
        {
            "name": "Hiroshima",
            "value": "2184043",
            "date": "1960"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5039206",
            "date": "1960"
        },
        {
            "name": "Hy\u014dgo",
            "value": "3906487",
            "date": "1960"
        },
        {
            "name": "Ibaraki",
            "value": "2047024",
            "date": "1960"
        },
        {
            "name": "Ishikawa",
            "value": "973418",
            "date": "1960"
        },
        {
            "name": "Iwate",
            "value": "1448517",
            "date": "1960"
        },
        {
            "name": "Kagawa",
            "value": "918867",
            "date": "1960"
        },
        {
            "name": "Kagoshima",
            "value": "1963104",
            "date": "1960"
        },
        {
            "name": "Kanagawa",
            "value": "3443176",
            "date": "1960"
        },
        {
            "name": "K\u014dchi",
            "value": "854595",
            "date": "1960"
        },
        {
            "name": "Kumamoto",
            "value": "1856192",
            "date": "1960"
        },
        {
            "name": "Ky\u014dto",
            "value": "1993403",
            "date": "1960"
        },
        {
            "name": "Mie",
            "value": "1485054",
            "date": "1960"
        },
        {
            "name": "Miyagi",
            "value": "1743195",
            "date": "1960"
        },
        {
            "name": "Miyazaki",
            "value": "1134590",
            "date": "1960"
        },
        {
            "name": "Nagano",
            "value": "1981433",
            "date": "1960"
        },
        {
            "name": "Nagasaki",
            "value": "1760421",
            "date": "1960"
        },
        {
            "name": "Nara",
            "value": "781058",
            "date": "1960"
        },
        {
            "name": "Niigata",
            "value": "2442037",
            "date": "1960"
        },
        {
            "name": "\u014cita",
            "value": "1239655",
            "date": "1960"
        },
        {
            "name": "Okayama",
            "value": "1670454",
            "date": "1960"
        },
        {
            "name": "\u014csaka",
            "value": "5504746",
            "date": "1960"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "883122",
            "date": "1960"
        },
        {
            "name": "Saga",
            "value": "942874",
            "date": "1960"
        },
        {
            "name": "Saitama",
            "value": "2430871",
            "date": "1960"
        },
        {
            "name": "Shiga",
            "value": "842695",
            "date": "1960"
        },
        {
            "name": "Shimane",
            "value": "888886",
            "date": "1960"
        },
        {
            "name": "Shizuoka",
            "value": "2756271",
            "date": "1960"
        },
        {
            "name": "Tochigi",
            "value": "1513624",
            "date": "1960"
        },
        {
            "name": "Tokushima",
            "value": "847274",
            "date": "1960"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "9683802",
            "date": "1960"
        },
        {
            "name": "Tottori",
            "value": "599135",
            "date": "1960"
        },
        {
            "name": "Toyama",
            "value": "1032614",
            "date": "1960"
        },
        {
            "name": "Wakayama",
            "value": "1002191",
            "date": "1960"
        },
        {
            "name": "Yamagata",
            "value": "1320664",
            "date": "1960"
        },
        {
            "name": "Yamaguchi",
            "value": "1602207",
            "date": "1960"
        },
        {
            "name": "Yamanashi",
            "value": "782062",
            "date": "1960"
        }
    ],
    "1955": [
        {
            "name": "Aichi",
            "value": "3769209",
            "date": "1955"
        },
        {
            "name": "Akita",
            "value": "1348871",
            "date": "1955"
        },
        {
            "name": "Aomori",
            "value": "1382523",
            "date": "1955"
        },
        {
            "name": "Chiba",
            "value": "2205060",
            "date": "1955"
        },
        {
            "name": "Ehime",
            "value": "1540628",
            "date": "1955"
        },
        {
            "name": "Fukui",
            "value": "754055",
            "date": "1955"
        },
        {
            "name": "Fukuoka",
            "value": "3859764",
            "date": "1955"
        },
        {
            "name": "Fukushima",
            "value": "2095237",
            "date": "1955"
        },
        {
            "name": "Gifu",
            "value": "1583605",
            "date": "1955"
        },
        {
            "name": "Gunma",
            "value": "1613549",
            "date": "1955"
        },
        {
            "name": "Hiroshima",
            "value": "2149044",
            "date": "1955"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "4773087",
            "date": "1955"
        },
        {
            "name": "Hy\u014dgo",
            "value": "3620947",
            "date": "1955"
        },
        {
            "name": "Ibaraki",
            "value": "2064037",
            "date": "1955"
        },
        {
            "name": "Ishikawa",
            "value": "966187",
            "date": "1955"
        },
        {
            "name": "Iwate",
            "value": "1427097",
            "date": "1955"
        },
        {
            "name": "Kagawa",
            "value": "943823",
            "date": "1955"
        },
        {
            "name": "Kagoshima",
            "value": "2044112",
            "date": "1955"
        },
        {
            "name": "Kanagawa",
            "value": "2919497",
            "date": "1955"
        },
        {
            "name": "K\u014dchi",
            "value": "882683",
            "date": "1955"
        },
        {
            "name": "Kumamoto",
            "value": "1895663",
            "date": "1955"
        },
        {
            "name": "Ky\u014dto",
            "value": "1935161",
            "date": "1955"
        },
        {
            "name": "Mie",
            "value": "1485582",
            "date": "1955"
        },
        {
            "name": "Miyagi",
            "value": "1727065",
            "date": "1955"
        },
        {
            "name": "Miyazaki",
            "value": "1139384",
            "date": "1955"
        },
        {
            "name": "Nagano",
            "value": "2021292",
            "date": "1955"
        },
        {
            "name": "Nagasaki",
            "value": "1747596",
            "date": "1955"
        },
        {
            "name": "Nara",
            "value": "776861",
            "date": "1955"
        },
        {
            "name": "Niigata",
            "value": "2473492",
            "date": "1955"
        },
        {
            "name": "\u014cita",
            "value": "1277199",
            "date": "1955"
        },
        {
            "name": "Okayama",
            "value": "1689800",
            "date": "1955"
        },
        {
            "name": "\u014csaka",
            "value": "4618308",
            "date": "1955"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "801065",
            "date": "1955"
        },
        {
            "name": "Saga",
            "value": "973749",
            "date": "1955"
        },
        {
            "name": "Saitama",
            "value": "2262623",
            "date": "1955"
        },
        {
            "name": "Shiga",
            "value": "853734",
            "date": "1955"
        },
        {
            "name": "Shimane",
            "value": "929066",
            "date": "1955"
        },
        {
            "name": "Shizuoka",
            "value": "2650435",
            "date": "1955"
        },
        {
            "name": "Tochigi",
            "value": "1547580",
            "date": "1955"
        },
        {
            "name": "Tokushima",
            "value": "878109",
            "date": "1955"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "8037084",
            "date": "1955"
        },
        {
            "name": "Tottori",
            "value": "614259",
            "date": "1955"
        },
        {
            "name": "Toyama",
            "value": "1021121",
            "date": "1955"
        },
        {
            "name": "Wakayama",
            "value": "1006819",
            "date": "1955"
        },
        {
            "name": "Yamagata",
            "value": "1353649",
            "date": "1955"
        },
        {
            "name": "Yamaguchi",
            "value": "1609839",
            "date": "1955"
        },
        {
            "name": "Yamanashi",
            "value": "807044",
            "date": "1955"
        }
    ],
    "1950": [
        {
            "name": "Aichi",
            "value": "3390585",
            "date": "1950"
        },
        {
            "name": "Akita",
            "value": "1309031",
            "date": "1950"
        },
        {
            "name": "Aomori",
            "value": "1282867",
            "date": "1950"
        },
        {
            "name": "Chiba",
            "value": "2139037",
            "date": "1950"
        },
        {
            "name": "Ehime",
            "value": "1521878",
            "date": "1950"
        },
        {
            "name": "Fukui",
            "value": "752374",
            "date": "1950"
        },
        {
            "name": "Fukuoka",
            "value": "3530169",
            "date": "1950"
        },
        {
            "name": "Fukushima",
            "value": "2062394",
            "date": "1950"
        },
        {
            "name": "Gifu",
            "value": "1544538",
            "date": "1950"
        },
        {
            "name": "Gunma",
            "value": "1601380",
            "date": "1950"
        },
        {
            "name": "Hiroshima",
            "value": "2081967",
            "date": "1950"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "4295567",
            "date": "1950"
        },
        {
            "name": "Hy\u014dgo",
            "value": "3309935",
            "date": "1950"
        },
        {
            "name": "Ibaraki",
            "value": "2039418",
            "date": "1950"
        },
        {
            "name": "Ishikawa",
            "value": "957279",
            "date": "1950"
        },
        {
            "name": "Iwate",
            "value": "1346728",
            "date": "1950"
        },
        {
            "name": "Kagawa",
            "value": "946022",
            "date": "1950"
        },
        {
            "name": "Kagoshima",
            "value": "1804118",
            "date": "1950"
        },
        {
            "name": "Kanagawa",
            "value": "2487665",
            "date": "1950"
        },
        {
            "name": "K\u014dchi",
            "value": "873874",
            "date": "1950"
        },
        {
            "name": "Kumamoto",
            "value": "1827582",
            "date": "1950"
        },
        {
            "name": "Ky\u014dto",
            "value": "1832934",
            "date": "1950"
        },
        {
            "name": "Mie",
            "value": "1461197",
            "date": "1950"
        },
        {
            "name": "Miyagi",
            "value": "1663442",
            "date": "1950"
        },
        {
            "name": "Miyazaki",
            "value": "1091427",
            "date": "1950"
        },
        {
            "name": "Nagano",
            "value": "2060831",
            "date": "1950"
        },
        {
            "name": "Nagasaki",
            "value": "1645492",
            "date": "1950"
        },
        {
            "name": "Nara",
            "value": "763883",
            "date": "1950"
        },
        {
            "name": "Niigata",
            "value": "2460997",
            "date": "1950"
        },
        {
            "name": "\u014cita",
            "value": "1252999",
            "date": "1950"
        },
        {
            "name": "Okayama",
            "value": "1661099",
            "date": "1950"
        },
        {
            "name": "\u014csaka",
            "value": "3857047",
            "date": "1950"
        },
        {
            "name": "Ry\u016bky\u016b",
            "value": "917875",
            "date": "1950"
        },
        {
            "name": "Saga",
            "value": "945082",
            "date": "1950"
        },
        {
            "name": "Saitama",
            "value": "2146445",
            "date": "1950"
        },
        {
            "name": "Shiga",
            "value": "861180",
            "date": "1950"
        },
        {
            "name": "Shimane",
            "value": "912551",
            "date": "1950"
        },
        {
            "name": "Shizuoka",
            "value": "2471472",
            "date": "1950"
        },
        {
            "name": "Tochigi",
            "value": "1550462",
            "date": "1950"
        },
        {
            "name": "Tokushima",
            "value": "878511",
            "date": "1950"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "6277500",
            "date": "1950"
        },
        {
            "name": "Tottori",
            "value": "600177",
            "date": "1950"
        },
        {
            "name": "Toyama",
            "value": "1008790",
            "date": "1950"
        },
        {
            "name": "Wakayama",
            "value": "982113",
            "date": "1950"
        },
        {
            "name": "Yamagata",
            "value": "1357347",
            "date": "1950"
        },
        {
            "name": "Yamaguchi",
            "value": "1540882",
            "date": "1950"
        },
        {
            "name": "Yamanashi",
            "value": "811369",
            "date": "1950"
        }
    ],
    "1948": [
        {
            "name": "Aichi",
            "value": "3226116",
            "date": "1948"
        },
        {
            "name": "Akita",
            "value": "1283710",
            "date": "1948"
        },
        {
            "name": "Aomori",
            "value": "1218325",
            "date": "1948"
        },
        {
            "name": "Chiba",
            "value": "2140511",
            "date": "1948"
        },
        {
            "name": "Ehime",
            "value": "1481106",
            "date": "1948"
        },
        {
            "name": "Fukui",
            "value": "733374",
            "date": "1948"
        },
        {
            "name": "Fukuoka",
            "value": "3312577",
            "date": "1948"
        },
        {
            "name": "Fukushima",
            "value": "2026482",
            "date": "1948"
        },
        {
            "name": "Gifu",
            "value": "1524812",
            "date": "1948"
        },
        {
            "name": "Gunma",
            "value": "1608894",
            "date": "1948"
        },
        {
            "name": "Hiroshima",
            "value": "2045923",
            "date": "1948"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "4021050",
            "date": "1948"
        },
        {
            "name": "Hy\u014dgo",
            "value": "3156888",
            "date": "1948"
        },
        {
            "name": "Ibaraki",
            "value": "2044578",
            "date": "1948"
        },
        {
            "name": "Ishikawa",
            "value": "941772",
            "date": "1948"
        },
        {
            "name": "Iwate",
            "value": "1294203",
            "date": "1948"
        },
        {
            "name": "Kagawa",
            "value": "934123",
            "date": "1948"
        },
        {
            "name": "Kagoshima",
            "value": "1766514",
            "date": "1948"
        },
        {
            "name": "Kanagawa",
            "value": "2317551",
            "date": "1948"
        },
        {
            "name": "K\u014dchi",
            "value": "866385",
            "date": "1948"
        },
        {
            "name": "Kumamoto",
            "value": "1786058",
            "date": "1948"
        },
        {
            "name": "Ky\u014dto",
            "value": "1784753",
            "date": "1948"
        },
        {
            "name": "Mie",
            "value": "1451100",
            "date": "1948"
        },
        {
            "name": "Miyagi",
            "value": "1596307",
            "date": "1948"
        },
        {
            "name": "Miyazaki",
            "value": "1052483",
            "date": "1948"
        },
        {
            "name": "Nagano",
            "value": "2079682",
            "date": "1948"
        },
        {
            "name": "Nagasaki",
            "value": "1565558",
            "date": "1948"
        },
        {
            "name": "Nara",
            "value": "778677",
            "date": "1948"
        },
        {
            "name": "Niigata",
            "value": "2435451",
            "date": "1948"
        },
        {
            "name": "\u014cita",
            "value": "1245689",
            "date": "1948"
        },
        {
            "name": "Okayama",
            "value": "1650285",
            "date": "1948"
        },
        {
            "name": "\u014csaka",
            "value": "3515225",
            "date": "1948"
        },
        {
            "name": "Saga",
            "value": "931336",
            "date": "1948"
        },
        {
            "name": "Saitama",
            "value": "2132221",
            "date": "1948"
        },
        {
            "name": "Shiga",
            "value": "872775",
            "date": "1948"
        },
        {
            "name": "Shimane",
            "value": "903576",
            "date": "1948"
        },
        {
            "name": "Shizuoka",
            "value": "2407102",
            "date": "1948"
        },
        {
            "name": "Tochigi",
            "value": "1557860",
            "date": "1948"
        },
        {
            "name": "Tokushima",
            "value": "869290",
            "date": "1948"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "5417871",
            "date": "1948"
        },
        {
            "name": "Tottori",
            "value": "592863",
            "date": "1948"
        },
        {
            "name": "Toyama",
            "value": "998349",
            "date": "1948"
        },
        {
            "name": "Wakayama",
            "value": "979982",
            "date": "1948"
        },
        {
            "name": "Yamagata",
            "value": "1346492",
            "date": "1948"
        },
        {
            "name": "Yamaguchi",
            "value": "1505532",
            "date": "1948"
        },
        {
            "name": "Yamanashi",
            "value": "815485",
            "date": "1948"
        }
    ],
    "2010": [
        {
            "name": "Aichi",
            "value": "7410719",
            "date": "2010"
        },
        {
            "name": "Akita",
            "value": "1085997",
            "date": "2010"
        },
        {
            "name": "Aomori",
            "value": "1373339",
            "date": "2010"
        },
        {
            "name": "Chiba",
            "value": "6216289",
            "date": "2010"
        },
        {
            "name": "Ehime",
            "value": "1431493",
            "date": "2010"
        },
        {
            "name": "Fukui",
            "value": "806314",
            "date": "2010"
        },
        {
            "name": "Fukuoka",
            "value": "5071968",
            "date": "2010"
        },
        {
            "name": "Fukushima",
            "value": "2029064",
            "date": "2010"
        },
        {
            "name": "Gifu",
            "value": "2080773",
            "date": "2010"
        },
        {
            "name": "Gunma",
            "value": "2008068",
            "date": "2010"
        },
        {
            "name": "Hiroshima",
            "value": "2860750",
            "date": "2010"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5506419",
            "date": "2010"
        },
        {
            "name": "Hy\u014dgo",
            "value": "5588133",
            "date": "2010"
        },
        {
            "name": "Ibaraki",
            "value": "2969770",
            "date": "2010"
        },
        {
            "name": "Ishikawa",
            "value": "1169788",
            "date": "2010"
        },
        {
            "name": "Iwate",
            "value": "1330147",
            "date": "2010"
        },
        {
            "name": "Kagawa",
            "value": "995842",
            "date": "2010"
        },
        {
            "name": "Kagoshima",
            "value": "1706242",
            "date": "2010"
        },
        {
            "name": "Kanagawa",
            "value": "9048331",
            "date": "2010"
        },
        {
            "name": "K\u014dchi",
            "value": "764456",
            "date": "2010"
        },
        {
            "name": "Kumamoto",
            "value": "1817426",
            "date": "2010"
        },
        {
            "name": "Ky\u014dto",
            "value": "2636092",
            "date": "2010"
        },
        {
            "name": "Mie",
            "value": "1854724",
            "date": "2010"
        },
        {
            "name": "Miyagi",
            "value": "2348165",
            "date": "2010"
        },
        {
            "name": "Miyazaki",
            "value": "1135233",
            "date": "2010"
        },
        {
            "name": "Nagano",
            "value": "2152449",
            "date": "2010"
        },
        {
            "name": "Nagasaki",
            "value": "1426779",
            "date": "2010"
        },
        {
            "name": "Nara",
            "value": "1400728",
            "date": "2010"
        },
        {
            "name": "Niigata",
            "value": "2374450",
            "date": "2010"
        },
        {
            "name": "\u014cita",
            "value": "1196529",
            "date": "2010"
        },
        {
            "name": "Okayama",
            "value": "1945276",
            "date": "2010"
        },
        {
            "name": "Okinawa",
            "value": "1392818",
            "date": "2010"
        },
        {
            "name": "\u014csaka",
            "value": "8865245",
            "date": "2010"
        },
        {
            "name": "Saga",
            "value": "849788",
            "date": "2010"
        },
        {
            "name": "Saitama",
            "value": "7194556",
            "date": "2010"
        },
        {
            "name": "Shiga",
            "value": "1410777",
            "date": "2010"
        },
        {
            "name": "Shimane",
            "value": "717397",
            "date": "2010"
        },
        {
            "name": "Shizuoka",
            "value": "3765007",
            "date": "2010"
        },
        {
            "name": "Tochigi",
            "value": "2007683",
            "date": "2010"
        },
        {
            "name": "Tokushima",
            "value": "785491",
            "date": "2010"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "13159388",
            "date": "2010"
        },
        {
            "name": "Tottori",
            "value": "588667",
            "date": "2010"
        },
        {
            "name": "Toyama",
            "value": "1093247",
            "date": "2010"
        },
        {
            "name": "Wakayama",
            "value": "1002198",
            "date": "2010"
        },
        {
            "name": "Yamagata",
            "value": "1168924",
            "date": "2010"
        },
        {
            "name": "Yamaguchi",
            "value": "1451338",
            "date": "2010"
        },
        {
            "name": "Yamanashi",
            "value": "863075",
            "date": "2010"
        }
    ],
    "2005": [
        {
            "name": "Aichi",
            "value": "7254704",
            "date": "2005"
        },
        {
            "name": "Akita",
            "value": "1145501",
            "date": "2005"
        },
        {
            "name": "Aomori",
            "value": "1436657",
            "date": "2005"
        },
        {
            "name": "Chiba",
            "value": "6056462",
            "date": "2005"
        },
        {
            "name": "Ehime",
            "value": "1467815",
            "date": "2005"
        },
        {
            "name": "Fukui",
            "value": "821592",
            "date": "2005"
        },
        {
            "name": "Fukuoka",
            "value": "5049908",
            "date": "2005"
        },
        {
            "name": "Fukushima",
            "value": "2091319",
            "date": "2005"
        },
        {
            "name": "Gifu",
            "value": "2107226",
            "date": "2005"
        },
        {
            "name": "Gunma",
            "value": "2024135",
            "date": "2005"
        },
        {
            "name": "Hiroshima",
            "value": "2876642",
            "date": "2005"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5627737",
            "date": "2005"
        },
        {
            "name": "Hy\u014dgo",
            "value": "5590601",
            "date": "2005"
        },
        {
            "name": "Ibaraki",
            "value": "2975167",
            "date": "2005"
        },
        {
            "name": "Ishikawa",
            "value": "1174026",
            "date": "2005"
        },
        {
            "name": "Iwate",
            "value": "1385041",
            "date": "2005"
        },
        {
            "name": "Kagawa",
            "value": "1012400",
            "date": "2005"
        },
        {
            "name": "Kagoshima",
            "value": "1753179",
            "date": "2005"
        },
        {
            "name": "Kanagawa",
            "value": "8791597",
            "date": "2005"
        },
        {
            "name": "K\u014dchi",
            "value": "796292",
            "date": "2005"
        },
        {
            "name": "Kumamoto",
            "value": "1842233",
            "date": "2005"
        },
        {
            "name": "Ky\u014dto",
            "value": "2647660",
            "date": "2005"
        },
        {
            "name": "Mie",
            "value": "1866963",
            "date": "2005"
        },
        {
            "name": "Miyagi",
            "value": "2360218",
            "date": "2005"
        },
        {
            "name": "Miyazaki",
            "value": "1153042",
            "date": "2005"
        },
        {
            "name": "Nagano",
            "value": "2196114",
            "date": "2005"
        },
        {
            "name": "Nagasaki",
            "value": "1478632",
            "date": "2005"
        },
        {
            "name": "Nara",
            "value": "1421310",
            "date": "2005"
        },
        {
            "name": "Niigata",
            "value": "2431459",
            "date": "2005"
        },
        {
            "name": "\u014cita",
            "value": "1209571",
            "date": "2005"
        },
        {
            "name": "Okayama",
            "value": "1957264",
            "date": "2005"
        },
        {
            "name": "Okinawa",
            "value": "1361594",
            "date": "2005"
        },
        {
            "name": "\u014csaka",
            "value": "8817166",
            "date": "2005"
        },
        {
            "name": "Saga",
            "value": "866369",
            "date": "2005"
        },
        {
            "name": "Saitama",
            "value": "7054243",
            "date": "2005"
        },
        {
            "name": "Shiga",
            "value": "1380361",
            "date": "2005"
        },
        {
            "name": "Shimane",
            "value": "742223",
            "date": "2005"
        },
        {
            "name": "Shizuoka",
            "value": "3792377",
            "date": "2005"
        },
        {
            "name": "Tochigi",
            "value": "2016631",
            "date": "2005"
        },
        {
            "name": "Tokushima",
            "value": "809950",
            "date": "2005"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "12576601",
            "date": "2005"
        },
        {
            "name": "Tottori",
            "value": "607012",
            "date": "2005"
        },
        {
            "name": "Toyama",
            "value": "1111729",
            "date": "2005"
        },
        {
            "name": "Wakayama",
            "value": "1035969",
            "date": "2005"
        },
        {
            "name": "Yamagata",
            "value": "1216181",
            "date": "2005"
        },
        {
            "name": "Yamaguchi",
            "value": "1492606",
            "date": "2005"
        },
        {
            "name": "Yamanashi",
            "value": "884515",
            "date": "2005"
        }
    ],
    "2000": [
        {
            "name": "Aichi",
            "value": "7043300",
            "date": "2000"
        },
        {
            "name": "Akita",
            "value": "1189279",
            "date": "2000"
        },
        {
            "name": "Aomori",
            "value": "1475728",
            "date": "2000"
        },
        {
            "name": "Chiba",
            "value": "5926285",
            "date": "2000"
        },
        {
            "name": "Ehime",
            "value": "1493092",
            "date": "2000"
        },
        {
            "name": "Fukui",
            "value": "828944",
            "date": "2000"
        },
        {
            "name": "Fukuoka",
            "value": "5015699",
            "date": "2000"
        },
        {
            "name": "Fukushima",
            "value": "2126935",
            "date": "2000"
        },
        {
            "name": "Gifu",
            "value": "2107700",
            "date": "2000"
        },
        {
            "name": "Gunma",
            "value": "2024852",
            "date": "2000"
        },
        {
            "name": "Hiroshima",
            "value": "2878915",
            "date": "2000"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5683062",
            "date": "2000"
        },
        {
            "name": "Hy\u014dgo",
            "value": "5550574",
            "date": "2000"
        },
        {
            "name": "Ibaraki",
            "value": "2985676",
            "date": "2000"
        },
        {
            "name": "Ishikawa",
            "value": "1180977",
            "date": "2000"
        },
        {
            "name": "Iwate",
            "value": "1416180",
            "date": "2000"
        },
        {
            "name": "Kagawa",
            "value": "1022890",
            "date": "2000"
        },
        {
            "name": "Kagoshima",
            "value": "1786194",
            "date": "2000"
        },
        {
            "name": "Kanagawa",
            "value": "8489974",
            "date": "2000"
        },
        {
            "name": "K\u014dchi",
            "value": "813949",
            "date": "2000"
        },
        {
            "name": "Kumamoto",
            "value": "1859344",
            "date": "2000"
        },
        {
            "name": "Ky\u014dto",
            "value": "2644391",
            "date": "2000"
        },
        {
            "name": "Mie",
            "value": "1857339",
            "date": "2000"
        },
        {
            "name": "Miyagi",
            "value": "2365320",
            "date": "2000"
        },
        {
            "name": "Miyazaki",
            "value": "1170007",
            "date": "2000"
        },
        {
            "name": "Nagano",
            "value": "2215168",
            "date": "2000"
        },
        {
            "name": "Nagasaki",
            "value": "1516523",
            "date": "2000"
        },
        {
            "name": "Nara",
            "value": "1442795",
            "date": "2000"
        },
        {
            "name": "Niigata",
            "value": "2475733",
            "date": "2000"
        },
        {
            "name": "\u014cita",
            "value": "1221140",
            "date": "2000"
        },
        {
            "name": "Okayama",
            "value": "1950828",
            "date": "2000"
        },
        {
            "name": "Okinawa",
            "value": "1318220",
            "date": "2000"
        },
        {
            "name": "\u014csaka",
            "value": "8805081",
            "date": "2000"
        },
        {
            "name": "Saga",
            "value": "876654",
            "date": "2000"
        },
        {
            "name": "Saitama",
            "value": "6938006",
            "date": "2000"
        },
        {
            "name": "Shiga",
            "value": "1342832",
            "date": "2000"
        },
        {
            "name": "Shimane",
            "value": "761503",
            "date": "2000"
        },
        {
            "name": "Shizuoka",
            "value": "3767393",
            "date": "2000"
        },
        {
            "name": "Tochigi",
            "value": "2004817",
            "date": "2000"
        },
        {
            "name": "Tokushima",
            "value": "824108",
            "date": "2000"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "12064101",
            "date": "2000"
        },
        {
            "name": "Tottori",
            "value": "613289",
            "date": "2000"
        },
        {
            "name": "Toyama",
            "value": "1120851",
            "date": "2000"
        },
        {
            "name": "Wakayama",
            "value": "1069912",
            "date": "2000"
        },
        {
            "name": "Yamagata",
            "value": "1244147",
            "date": "2000"
        },
        {
            "name": "Yamaguchi",
            "value": "1527964",
            "date": "2000"
        },
        {
            "name": "Yamanashi",
            "value": "888172",
            "date": "2000"
        }
    ],
    "1995": [
        {
            "name": "Aichi",
            "value": "6868336",
            "date": "1995"
        },
        {
            "name": "Akita",
            "value": "1213667",
            "date": "1995"
        },
        {
            "name": "Aomori",
            "value": "1481663",
            "date": "1995"
        },
        {
            "name": "Chiba",
            "value": "5797782",
            "date": "1995"
        },
        {
            "name": "Ehime",
            "value": "1506700",
            "date": "1995"
        },
        {
            "name": "Fukui",
            "value": "826996",
            "date": "1995"
        },
        {
            "name": "Fukuoka",
            "value": "4933393",
            "date": "1995"
        },
        {
            "name": "Fukushima",
            "value": "2133592",
            "date": "1995"
        },
        {
            "name": "Gifu",
            "value": "2100315",
            "date": "1995"
        },
        {
            "name": "Gunma",
            "value": "2003540",
            "date": "1995"
        },
        {
            "name": "Hiroshima",
            "value": "2881748",
            "date": "1995"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5692321",
            "date": "1995"
        },
        {
            "name": "Hy\u014dgo",
            "value": "5401877",
            "date": "1995"
        },
        {
            "name": "Ibaraki",
            "value": "2955530",
            "date": "1995"
        },
        {
            "name": "Ishikawa",
            "value": "1180068",
            "date": "1995"
        },
        {
            "name": "Iwate",
            "value": "1419505",
            "date": "1995"
        },
        {
            "name": "Kagawa",
            "value": "1027006",
            "date": "1995"
        },
        {
            "name": "Kagoshima",
            "value": "1794224",
            "date": "1995"
        },
        {
            "name": "Kanagawa",
            "value": "8245900",
            "date": "1995"
        },
        {
            "name": "K\u014dchi",
            "value": "816704",
            "date": "1995"
        },
        {
            "name": "Kumamoto",
            "value": "1859793",
            "date": "1995"
        },
        {
            "name": "Ky\u014dto",
            "value": "2629592",
            "date": "1995"
        },
        {
            "name": "Mie",
            "value": "1841358",
            "date": "1995"
        },
        {
            "name": "Miyagi",
            "value": "2328739",
            "date": "1995"
        },
        {
            "name": "Miyazaki",
            "value": "1175819",
            "date": "1995"
        },
        {
            "name": "Nagano",
            "value": "2193984",
            "date": "1995"
        },
        {
            "name": "Nagasaki",
            "value": "1544934",
            "date": "1995"
        },
        {
            "name": "Nara",
            "value": "1430862",
            "date": "1995"
        },
        {
            "name": "Niigata",
            "value": "2488364",
            "date": "1995"
        },
        {
            "name": "\u014cita",
            "value": "1231306",
            "date": "1995"
        },
        {
            "name": "Okayama",
            "value": "1950750",
            "date": "1995"
        },
        {
            "name": "Okinawa",
            "value": "1273440",
            "date": "1995"
        },
        {
            "name": "\u014csaka",
            "value": "8797268",
            "date": "1995"
        },
        {
            "name": "Saga",
            "value": "884316",
            "date": "1995"
        },
        {
            "name": "Saitama",
            "value": "6759311",
            "date": "1995"
        },
        {
            "name": "Shiga",
            "value": "1287005",
            "date": "1995"
        },
        {
            "name": "Shimane",
            "value": "771441",
            "date": "1995"
        },
        {
            "name": "Shizuoka",
            "value": "3737689",
            "date": "1995"
        },
        {
            "name": "Tochigi",
            "value": "1984390",
            "date": "1995"
        },
        {
            "name": "Tokushima",
            "value": "832427",
            "date": "1995"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "11773605",
            "date": "1995"
        },
        {
            "name": "Tottori",
            "value": "614929",
            "date": "1995"
        },
        {
            "name": "Toyama",
            "value": "1123125",
            "date": "1995"
        },
        {
            "name": "Wakayama",
            "value": "1080435",
            "date": "1995"
        },
        {
            "name": "Yamagata",
            "value": "1256958",
            "date": "1995"
        },
        {
            "name": "Yamaguchi",
            "value": "1555543",
            "date": "1995"
        },
        {
            "name": "Yamanashi",
            "value": "881996",
            "date": "1995"
        }
    ],
    "1990": [
        {
            "name": "Aichi",
            "value": "6690603",
            "date": "1990"
        },
        {
            "name": "Akita",
            "value": "1227478",
            "date": "1990"
        },
        {
            "name": "Aomori",
            "value": "1482873",
            "date": "1990"
        },
        {
            "name": "Chiba",
            "value": "5555429",
            "date": "1990"
        },
        {
            "name": "Ehime",
            "value": "1515025",
            "date": "1990"
        },
        {
            "name": "Fukui",
            "value": "823585",
            "date": "1990"
        },
        {
            "name": "Fukuoka",
            "value": "4811050",
            "date": "1990"
        },
        {
            "name": "Fukushima",
            "value": "2104058",
            "date": "1990"
        },
        {
            "name": "Gifu",
            "value": "2066569",
            "date": "1990"
        },
        {
            "name": "Gunma",
            "value": "1966265",
            "date": "1990"
        },
        {
            "name": "Hiroshima",
            "value": "2849847",
            "date": "1990"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5643647",
            "date": "1990"
        },
        {
            "name": "Hy\u014dgo",
            "value": "5405040",
            "date": "1990"
        },
        {
            "name": "Ibaraki",
            "value": "2845382",
            "date": "1990"
        },
        {
            "name": "Ishikawa",
            "value": "1164628",
            "date": "1990"
        },
        {
            "name": "Iwate",
            "value": "1416928",
            "date": "1990"
        },
        {
            "name": "Kagawa",
            "value": "1023412",
            "date": "1990"
        },
        {
            "name": "Kagoshima",
            "value": "1797824",
            "date": "1990"
        },
        {
            "name": "Kanagawa",
            "value": "7980391",
            "date": "1990"
        },
        {
            "name": "K\u014dchi",
            "value": "825034",
            "date": "1990"
        },
        {
            "name": "Kumamoto",
            "value": "1840326",
            "date": "1990"
        },
        {
            "name": "Ky\u014dto",
            "value": "2602460",
            "date": "1990"
        },
        {
            "name": "Mie",
            "value": "1792514",
            "date": "1990"
        },
        {
            "name": "Miyagi",
            "value": "2248558",
            "date": "1990"
        },
        {
            "name": "Miyazaki",
            "value": "1168907",
            "date": "1990"
        },
        {
            "name": "Nagano",
            "value": "2156627",
            "date": "1990"
        },
        {
            "name": "Nagasaki",
            "value": "1562959",
            "date": "1990"
        },
        {
            "name": "Nara",
            "value": "1375481",
            "date": "1990"
        },
        {
            "name": "Niigata",
            "value": "2474583",
            "date": "1990"
        },
        {
            "name": "\u014cita",
            "value": "1236942",
            "date": "1990"
        },
        {
            "name": "Okayama",
            "value": "1925877",
            "date": "1990"
        },
        {
            "name": "Okinawa",
            "value": "1222398",
            "date": "1990"
        },
        {
            "name": "\u014csaka",
            "value": "8734516",
            "date": "1990"
        },
        {
            "name": "Saga",
            "value": "877851",
            "date": "1990"
        },
        {
            "name": "Saitama",
            "value": "6405319",
            "date": "1990"
        },
        {
            "name": "Shiga",
            "value": "1222411",
            "date": "1990"
        },
        {
            "name": "Shimane",
            "value": "781021",
            "date": "1990"
        },
        {
            "name": "Shizuoka",
            "value": "3670840",
            "date": "1990"
        },
        {
            "name": "Tochigi",
            "value": "1935168",
            "date": "1990"
        },
        {
            "name": "Tokushima",
            "value": "831598",
            "date": "1990"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "11855563",
            "date": "1990"
        },
        {
            "name": "Tottori",
            "value": "615722",
            "date": "1990"
        },
        {
            "name": "Toyama",
            "value": "1120161",
            "date": "1990"
        },
        {
            "name": "Wakayama",
            "value": "1074325",
            "date": "1990"
        },
        {
            "name": "Yamagata",
            "value": "1258390",
            "date": "1990"
        },
        {
            "name": "Yamaguchi",
            "value": "1572616",
            "date": "1990"
        },
        {
            "name": "Yamanashi",
            "value": "852966",
            "date": "1990"
        }
    ],
    "1985": [
        {
            "name": "Aichi",
            "value": "6455172",
            "date": "1985"
        },
        {
            "name": "Akita",
            "value": "1254032",
            "date": "1985"
        },
        {
            "name": "Aomori",
            "value": "1524448",
            "date": "1985"
        },
        {
            "name": "Chiba",
            "value": "5148163",
            "date": "1985"
        },
        {
            "name": "Ehime",
            "value": "1529983",
            "date": "1985"
        },
        {
            "name": "Fukui",
            "value": "817633",
            "date": "1985"
        },
        {
            "name": "Fukuoka",
            "value": "4719259",
            "date": "1985"
        },
        {
            "name": "Fukushima",
            "value": "2080304",
            "date": "1985"
        },
        {
            "name": "Gifu",
            "value": "2028536",
            "date": "1985"
        },
        {
            "name": "Gunma",
            "value": "1921259",
            "date": "1985"
        },
        {
            "name": "Hiroshima",
            "value": "2819200",
            "date": "1985"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5679439",
            "date": "1985"
        },
        {
            "name": "Hy\u014dgo",
            "value": "5278050",
            "date": "1985"
        },
        {
            "name": "Ibaraki",
            "value": "2725005",
            "date": "1985"
        },
        {
            "name": "Ishikawa",
            "value": "1152325",
            "date": "1985"
        },
        {
            "name": "Iwate",
            "value": "1433611",
            "date": "1985"
        },
        {
            "name": "Kagawa",
            "value": "1022569",
            "date": "1985"
        },
        {
            "name": "Kagoshima",
            "value": "1819270",
            "date": "1985"
        },
        {
            "name": "Kanagawa",
            "value": "7431974",
            "date": "1985"
        },
        {
            "name": "K\u014dchi",
            "value": "839784",
            "date": "1985"
        },
        {
            "name": "Kumamoto",
            "value": "1837747",
            "date": "1985"
        },
        {
            "name": "Ky\u014dto",
            "value": "2586574",
            "date": "1985"
        },
        {
            "name": "Mie",
            "value": "1747311",
            "date": "1985"
        },
        {
            "name": "Miyagi",
            "value": "2176295",
            "date": "1985"
        },
        {
            "name": "Miyazaki",
            "value": "1175543",
            "date": "1985"
        },
        {
            "name": "Nagano",
            "value": "2136927",
            "date": "1985"
        },
        {
            "name": "Nagasaki",
            "value": "1593968",
            "date": "1985"
        },
        {
            "name": "Nara",
            "value": "1304866",
            "date": "1985"
        },
        {
            "name": "Niigata",
            "value": "2478470",
            "date": "1985"
        },
        {
            "name": "\u014cita",
            "value": "1250214",
            "date": "1985"
        },
        {
            "name": "Okayama",
            "value": "1916906",
            "date": "1985"
        },
        {
            "name": "Okinawa",
            "value": "1179097",
            "date": "1985"
        },
        {
            "name": "\u014csaka",
            "value": "8668095",
            "date": "1985"
        },
        {
            "name": "Saga",
            "value": "880013",
            "date": "1985"
        },
        {
            "name": "Saitama",
            "value": "5863678",
            "date": "1985"
        },
        {
            "name": "Shiga",
            "value": "1155844",
            "date": "1985"
        },
        {
            "name": "Shimane",
            "value": "794629",
            "date": "1985"
        },
        {
            "name": "Shizuoka",
            "value": "3574692",
            "date": "1985"
        },
        {
            "name": "Tochigi",
            "value": "1866066",
            "date": "1985"
        },
        {
            "name": "Tokushima",
            "value": "834889",
            "date": "1985"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "11829363",
            "date": "1985"
        },
        {
            "name": "Tottori",
            "value": "616024",
            "date": "1985"
        },
        {
            "name": "Toyama",
            "value": "1118369",
            "date": "1985"
        },
        {
            "name": "Wakayama",
            "value": "1087206",
            "date": "1985"
        },
        {
            "name": "Yamagata",
            "value": "1261662",
            "date": "1985"
        },
        {
            "name": "Yamaguchi",
            "value": "1601627",
            "date": "1985"
        },
        {
            "name": "Yamanashi",
            "value": "832832",
            "date": "1985"
        }
    ],
    "1980": [
        {
            "name": "Aichi",
            "value": "6221638",
            "date": "1980"
        },
        {
            "name": "Akita",
            "value": "1256745",
            "date": "1980"
        },
        {
            "name": "Aomori",
            "value": "1523907",
            "date": "1980"
        },
        {
            "name": "Chiba",
            "value": "4735424",
            "date": "1980"
        },
        {
            "name": "Ehime",
            "value": "1506637",
            "date": "1980"
        },
        {
            "name": "Fukui",
            "value": "794354",
            "date": "1980"
        },
        {
            "name": "Fukuoka",
            "value": "4553461",
            "date": "1980"
        },
        {
            "name": "Fukushima",
            "value": "2035272",
            "date": "1980"
        },
        {
            "name": "Gifu",
            "value": "1960107",
            "date": "1980"
        },
        {
            "name": "Gunma",
            "value": "1848562",
            "date": "1980"
        },
        {
            "name": "Hiroshima",
            "value": "2739161",
            "date": "1980"
        },
        {
            "name": "Hokkaid\u014d",
            "value": "5575989",
            "date": "1980"
        },
        {
            "name": "Hy\u014dgo",
            "value": "5144892",
            "date": "1980"
        },
        {
            "name": "Ibaraki",
            "value": "2558007",
            "date": "1980"
        },
        {
            "name": "Ishikawa",
            "value": "1119304",
            "date": "1980"
        },
        {
            "name": "Iwate",
            "value": "1421927",
            "date": "1980"
        },
        {
            "name": "Kagawa",
            "value": "999864",
            "date": "1980"
        },
        {
            "name": "Kagoshima",
            "value": "1784623",
            "date": "1980"
        },
        {
            "name": "Kanagawa",
            "value": "6924348",
            "date": "1980"
        },
        {
            "name": "K\u014dchi",
            "value": "831275",
            "date": "1980"
        },
        {
            "name": "Kumamoto",
            "value": "1790327",
            "date": "1980"
        },
        {
            "name": "Ky\u014dto",
            "value": "2527330",
            "date": "1980"
        },
        {
            "name": "Mie",
            "value": "1686936",
            "date": "1980"
        },
        {
            "name": "Miyagi",
            "value": "2082320",
            "date": "1980"
        },
        {
            "name": "Miyazaki",
            "value": "1151587",
            "date": "1980"
        },
        {
            "name": "Nagano",
            "value": "2083934",
            "date": "1980"
        },
        {
            "name": "Nagasaki",
            "value": "1590564",
            "date": "1980"
        },
        {
            "name": "Nara",
            "value": "1209365",
            "date": "1980"
        },
        {
            "name": "Niigata",
            "value": "2451357",
            "date": "1980"
        },
        {
            "name": "\u014cita",
            "value": "1228913",
            "date": "1980"
        },
        {
            "name": "Okayama",
            "value": "1871023",
            "date": "1980"
        },
        {
            "name": "Okinawa",
            "value": "1106559",
            "date": "1980"
        },
        {
            "name": "\u014csaka",
            "value": "8473446",
            "date": "1980"
        },
        {
            "name": "Saga",
            "value": "865574",
            "date": "1980"
        },
        {
            "name": "Saitama",
            "value": "5420480",
            "date": "1980"
        },
        {
            "name": "Shiga",
            "value": "1079898",
            "date": "1980"
        },
        {
            "name": "Shimane",
            "value": "784795",
            "date": "1980"
        },
        {
            "name": "Shizuoka",
            "value": "3446804",
            "date": "1980"
        },
        {
            "name": "Tochigi",
            "value": "1792201",
            "date": "1980"
        },
        {
            "name": "Tokushima",
            "value": "825261",
            "date": "1980"
        },
        {
            "name": "T\u014dky\u014d",
            "value": "11618281",
            "date": "1980"
        },
        {
            "name": "Tottori",
            "value": "604221",
            "date": "1980"
        },
        {
            "name": "Toyama",
            "value": "1103459",
            "date": "1980"
        },
        {
            "name": "Wakayama",
            "value": "1087012",
            "date": "1980"
        },
        {
            "name": "Yamagata",
            "value": "1251917",
            "date": "1980"
        },
        {
            "name": "Yamaguchi",
            "value": "1587079",
            "date": "1980"
        },
        {
            "name": "Yamanashi",
            "value": "804256",
            "date": "1980"
        }
    ]
}

chart.data = JSON.parse(JSON.stringify(allData[year]));
categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

series.events.on("inited", function() {
  setTimeout(function() {
    playButton.isActive = true; // this          starts interval
  }, 2000)
})
