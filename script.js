var message = document.getElementById('message');
var bgmessage = document.getElementById('bgmessage');
var initialPauseSpeed = 800;
var minPauseSpeed = 10;
var initialDelay = 70;

var pauseSpeed = initialPauseSpeed;
var delay = initialDelay;
var position = 0;

const typewriter = new Typewriter(message, {
    delay: initialDelay,
});
const bgWriter = new Typewriter(bgmessage, {
    delay: initialDelay,
    cursor: ""
});

typewriter.typeString('The diminutive for<br/><span class="vladimir">Vladimir</span> can be<br/>')

fetch('./diminutives.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var pauseSpeedDelta = Math.ceil((initialPauseSpeed - minPauseSpeed) / data.length);
        console.log("pauseSpeedDelta is " + pauseSpeedDelta);

        function callme(){
            // bgWriter.typeString(data[position++].ru + ', ').start();
        }

        for (var i = 0; i < data.length; i++) {
            dimi= data[i]
            console.log(dimi.en);
            typewriter.typeString('<span class="dimi">' + dimi.en + '</span>')
                .callFunction(callme)              
                .pauseFor(pauseSpeed);
            if((i+1) != data.length) { // if not the last iteration
                typewriter.deleteChars(dimi.en.length)
                    .changeDelay(delay);
                pauseSpeed -= pauseSpeedDelta;
                console.log("pauseSpeed is now " + pauseSpeed);
                delay -= 5;
                console.log("delay is now " + delay);
            }
        }
        typewriter.changeDelay(initialDelay)
            .pauseFor(initialPauseSpeed)
            .typeString(' ...<br/>')
            .pauseFor(initialPauseSpeed)
            .typeString('but never <span class="vlad">Vlad</span>')
            .pauseFor(initialPauseSpeed)
            .typeString(" <b>!</b>")
            .pauseFor(200)
            .typeString("<b>!</b>")
            .pauseFor(100)
            .typeString("<b>!</b>")
            .pauseFor(initialPauseSpeed)
            .deleteChars(4)
            .pauseFor(400)
            .typeString("<sup>*</sup><b>!!!</b>")
            .pauseFor(initialPauseSpeed)
            .changeDelay(50)
            .typeString('<br/><span class="remark"><sup>*</sup> Which is short for Vladislav.</span>')
            .start();
    });

