window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3500/');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    /*var lat;
    var long;
    var latletter;
    var longletter;

    function findLocation() 
    {
      navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
    }
    function foundLocation(position)
    {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      //alert('Found location: ' + lat + ', ' + long);
      if(lat >= 0)
      {
        latletter = 'N';
      }
      else
      {
        latletter = 'S';
        lat = -lat;
      }

      if(long >= 0)
      {
        longletter = 'W';
      }
      else
      {
        longletter = 'E';
        long = -long;
      }
    }
    function noLocation()
    {
      alert('Could not find location');
    }

    var geolocation = 'Your Current Location: ' + latletter + lat + longletter + long;

    console.log(geolocation);
    alert('Found location: ' + lat + ', ' + long);

    /*socket.on('geoloc', function (data)
    {
        if (data.geoloc) 
        {
            messages.push(data.geoloc);
            var html = '';
            for(var i=0; i<messages.length; i++)
            {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } 
        else {
            console.log("There is a problem:", data);
        }
        };
    });*/

    

    socket.on('message', function (data)
    {
        if(data.message)
        {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++)
            {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    //socket.emit.('geoloc', { message: geolocation });

	sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
    };
}