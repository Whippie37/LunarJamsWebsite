function init() {
    let activeJam = true;
    let backgrounds = new Array(6);
    backgrounds[0] = '\'./Assets/game_bg_01_001-uhd.png\'';
    backgrounds[1] = '\'./Assets/game_bg_02_001-uhd.png\'';
    backgrounds[2] = '\'./Assets/game_bg_03_001-uhd.png\'';
    backgrounds[3] = '\'./Assets/game_bg_05_001-uhd.png\'';
    backgrounds[4] = '\'./Assets/game_bg_06_001-uhd.png\'';
    backgrounds[5] = '\'./Assets/game_bg_12_001-uhd.png\'';
    backgrounds[6] = '\'./Assets/RFB_sized.png\'';
    let rng = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    if (Math.floor(Math.random() * (10000)) + 1 == 1) {rng = 6;}
    document.getElementById('background').style.background = `linear-gradient(0deg,rgba(94, 29, 138, 1) 0%, rgba(78, 42, 168, 1) 42%, rgba(0, 81, 255, 1) 100%), url(${backgrounds[rng]})`;
    if (activeJam == false) {
        document.getElementById('themes-wrapper').style.height = 0;
        document.getElementById('message').style.height = "200px";
    }
    else {
        document.getElementById('message').style.height = 0;
        document.getElementById('themes-wrapper').style.height = "200px";
    }
    main();
}


function main() {
    document.body.ondragstart = function() {return false;};
    var countdownTime = getClockTime();
    document.getElementById('timer').innerHTML = countdownTime;
    setTimeout(main, 100);
}

function getClockTime() {
    let currentTime = Math.floor(Date.now() / 1000);
    let startTime = 1758330420; //1761926400000
    let endTime = 1759300133; //1762189200000
    startDifference = (currentTime - startTime);
    let seconds = 0;
    

    if (startDifference > 0) {startDifference = 0; seconds = 0;}; 
    if (currentTime > endTime) {
        seconds = 0;
    }
    else if (startDifference == 0) {
        seconds = (endTime - currentTime)
    }
    else {
        seconds = startDifference*-1;
    }
    
    let char = ' ';
    let days = 0;
    if (startDifference < 0) {
        char = '-';
        days = Math.floor(seconds / 86400);
        seconds %= 86400;
    }


    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds%60);

    
    hours = Math.abs(hours);
    minutes = Math.abs(minutes);
    seconds = Math.abs(seconds);

    let time = 0;
    if (char == '-') {
        time = `${char}${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    else {
        time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    
    return time;
}