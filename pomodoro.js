$(function () {

    var maxSession = 60,//60
        maxBreak = 20,//20
        defaultSession = 25,//25
        session,
        defaultBreak = 10,//10
        _break,
        stepSession = 5,//5
        stepBreak = 5,//1
        k, k2 = 0,
        duration = 0,
        countdown = 0,
        snd = new Audio("https://freewavesamples.com/files/Alesis-Sanctuary-QCard-Loose-Bell-C5.wav"),
        noOfRepetitions = 1;
    session = defaultSession;
    _break = defaultBreak;
    snd.addEventListener('ended', function () {
        noOfRepetitions = noOfRepetitions - 1;
        if (noOfRepetitions > 0) {
            this.currentTime = 0;
            this.play()
        };
    }, false);

    $("#session").html(session);
    $("#_break").html(_break);

    $("#sp").click(function () {
        if (session < maxSession) {
            session += stepSession;
            $("#session").html(session);
        }
    });
    $("#session").click(function () {
        session = defaultSession;
        $("#session").html(session);
    });
    $("#sn").click(function () {
        if (session > stepSession) {
            session -= stepSession;
            $("#session").html(session);
        }
    });

    $("#bp").click(function () {
        if (_break < maxBreak) {
            _break += stepBreak;
            $("#_break").html(_break);
        }
    });
    $("#_break").click(function () {
        _break = defaultBreak;
        $("#_break").html(_break);
    });
    $("#bn").click(function () {
        if (_break > stepBreak) {
            _break -= stepBreak;
            $("#_break").html(_break);
        }
    });

    $("#stop").prop('disabled', true);
    $("#start").click(function () {
        $("#stop").prop('disabled', false);
        snd.play();
        $("#sp").prop('disabled', true);
        $("#session").prop('disabled', true);
        $("#sn").prop('disabled', true);
        $("#bp").prop('disabled', true);
        $("#_break").prop('disabled', true);
        $("#bn").prop('disabled', true);
        $("#start").prop('disabled', true);

        $("#stop").click(function () {
            $("#stop").prop('disabled', true);
            snd.play();
            noOfRepetitions = 1;
            console.log("stop");
            $("#sp").prop('disabled', false);
            $("#session").prop('disabled', false);
            $("#sn").prop('disabled', false);
            $("#bp").prop('disabled', false);
            $("#_break").prop('disabled', false);
            $("#bn").prop('disabled', false);
            $("#start").prop('disabled', false);
            k2 = 0;
            clearInterval(clock);
        });
        duration = (session + _break) * 60;
        countdown = duration;
        var clock = setInterval(function () {
            countdown--;
            k2 = (duration - countdown) / duration;
            if (duration - countdown == session * 60) {
                noOfRepetitions = 2;
                snd.play();
            }
            if (duration - countdown == (session + _break) * 60) {
                noOfRepetitions = 2;
                snd.play();
            }

            if (countdown <= 0) {
                clearInterval(clock);
                $("#sp").prop('disabled', false);
                $("#session").prop('disabled', false);
                $("#sn").prop('disabled', false);
                $("#bp").prop('disabled', false);
                $("#_break").prop('disabled', false);
                $("#bn").prop('disabled', false);
                $("#start").prop('disabled', false);
                k2 = 0;
            }
        }, 1000);
    });

    function draw() {

        k = (session / (session + _break)) * 2 * Math.PI - 0.5 * Math.PI;

        var canvas = $('#myCanvas')[0];
        var context = canvas.getContext('2d');
        var x = canvas.width / 2;
        var y = canvas.height * 0.49;

        context.beginPath();
        context.arc(x, y, 60, -0.5 * Math.PI, k, false);
        context.lineWidth = 120;
        context.strokeStyle = 'orange';
        context.stroke();

        context.beginPath();
        context.arc(x, y, 60, k, -0.5 * Math.PI, false);
        context.lineWidth = 120;
        context.strokeStyle = 'teal';
        context.stroke();

        context.beginPath();
        context.arc(x, y, 60, -0.01 - Math.PI / 2 + Math.PI * 2 * k2, +0.01 - Math.PI / 2 + Math.PI * 2 * k2, false);
        context.lineWidth = 120;
        context.strokeStyle = 'red';
        context.stroke();
    }

    var view = setInterval(function () {
        draw();
    }, 100);

});