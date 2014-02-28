var carpoolcheck = document.getElementsByName("carpoolcheck");

window.onload = function() {
    var messages = [];
    var socket = io.connect('http://ucsdsmartliner.herokuapp.com/');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    $("#reqConfirmInfo").hide()
    $("#invConfirmInfo").hide()
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
        field.value = "";
        socket.emit('send', { message: text });
    };
}

function cancelReq(){
    if(carpoolcheck[0].checked)
    {
        $("#carpoolnumReq").text("4");
    }
    else if(carpoolcheck[1].checked)
    {
        $("#invConfirmInfo").fadeOut(300);
    }
}

function chooseERC(){
    if(carpoolcheck[0].checked)
    {
        $("#invConfirmInfo").hide()
        $("#destReq").text("ERC");
        $("#carpoolnumReq").text("5");
        $("#reqConfirmInfo").fadeIn(300);
    }
    else if(carpoolcheck[1].checked)
    {
        $("#reqConfirmInfo").hide()
        $("#destInv").text("ERC");
        $("#carpoolnumInv").text("5");
        $("#invConfirmInfo").fadeIn(300);
    }
}

function chooseMarshall(){
    if(carpoolcheck[0].checked)
    {
        $("#invConfirmInfo").hide()
        $("#destReq").text("Marshall");
        $("#carpoolnumReq").text("5");
        $("#reqConfirmInfo").fadeIn(300);
    }
    else if(carpoolcheck[1].checked)
    {
        $("#reqConfirmInfo").hide()
        $("#destInv").text("Marshall");
        $("#carpoolnumInv").text("5");
        $("#invConfirmInfo").fadeIn(300);
    }
}

function chooseMuir(){
    console.log("muir");
    if(carpoolcheck[0].checked)
    {
        $("#invConfirmInfo").hide()
        $("#destReq").text("Muir");
        $("#carpoolnumReq").text("5");
        $("#reqConfirmInfo").fadeIn(300);
    }
    else if(carpoolcheck[1].checked)
    {
        $("#reqConfirmInfo").hide()
        $("#destInv").text("Muir");
        $("#carpoolnumInv").text("5");
        $("#invConfirmInfo").fadeIn(300);
    }
}

function chooseRevelle(){
    if(carpoolcheck[0].checked)
    {
        $("#invConfirmInfo").hide()
        $("#destReq").text("Revelle")
        $("#carpoolnumReq").text("5");
        $("#reqConfirmInfo").fadeIn(300);
    }
    else if(carpoolcheck[1].checked)
    {
        $("#reqConfirmInfo").hide()
        $("#destInv").text("Revelle");
        $("#carpoolnumInv").text("5");
        $("#invConfirmInfo").fadeIn(300);
    }
}

function chooseWarren(){
    if(carpoolcheck[0].checked)
    {
        $("#invConfirmInfo").hide()
        $("#destReq").text("Warren");
        $("#carpoolnumReq").text("5");
        $("#reqConfirmInfo").fadeIn(300);
    }
    else if(carpoolcheck[1].checked)
    {
        $("#reqConfirmInfo").hide()
        $("#destInv").text("Warren");
        $("#carpoolnumInv").text("5");
        $("#invConfirmInfo").fadeIn(300);
    }
}

function chooseSixth(){
    if(carpoolcheck[0].checked)
    {
        $("#invConfirmInfo").hide()
        $("#destReq").text("Sixth");
        $("#carpoolnumReq").text("5");
        $("#reqConfirmInfo").fadeIn(300);
    }
    else if(carpoolcheck[1].checked)
    {
        $("#reqConfirmInfo").hide()
        $("#destInv").text("Sixth");
        $("#carpoolnumInv").text("5");
        $("#invConfirmInfo").fadeIn(300);
    }
}

function chooseCenter(){
    if(carpoolcheck[0].checked)
    {
        $("#invConfirmInfo").hide()
        $("#destReq").text("Center");
        $("#carpoolnumReq").text("5");
        $("#reqConfirmInfo").fadeIn(300);
    }
    else if(carpoolcheck[1].checked)
    {
        $("#reqConfirmInfo").hide()
        $("#destInv").text("Center");
        $("#carpoolnumInv").text("5");
        $("#invConfirmInfo").fadeIn(300);
    }
}

function chooseMed(){
    if(carpoolcheck[0].checked)
    {
        $("#invConfirmInfo").hide()
        $("#destReq").text("Med");
        $("#carpoolnumReq").text("5");
        $("#reqConfirmInfo").fadeIn(300);
    }
    else if(carpoolcheck[1].checked)
    {
        $("#reqConfirmInfo").hide()
        $("#destInv").text("Med");
        $("#carpoolnumInv").text("5");
        $("#invConfirmInfo").fadeIn(300);
    }
}