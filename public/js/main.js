var counter = 1;

$(function() {
  setInterval(function(){
  $.getJSON("../data.json",function(data)
  { 
    //console.log("aaa");
    //$.each(data.shuttlesTime, function(i,shuttlesTime)
    //{ 
      //console.log(counter);
      //setInterval( function() {
        //console.log(shuttlesTime[i].leaveTime);
        //console.log(shuttlesTime[i].arrivalTime);
        var shuttleData = data.shuttlesTime[counter];

       $("#ontime").text(shuttleData.leaveTime);
       $("#eta").text(shuttleData.arrivalTime);
      //}, 5000);
    var j;
    for (var i in data.shuttlesTime) 
    {
      j = i;
    }
    counter++;

    if(counter > j)
    {
      counter = 1;
    }
  });
  }, 5000);
});