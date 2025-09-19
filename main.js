function main() {
    var countdownTime = getClockTime();
    document.getElementById('timer').innerHTML = countdownTime;
    setTimeout(main, 1);
}

function getClockTime() {
    let currentTime = Date.now();
    let startTime = 1758149220000;
    let endTime = 1758235320000;
    startDifference = (currentTime - startTime);
    if (startDifference > 0) {startDifference = 0}; 
    let seconds = 0;
    if (startDifference == 0) {
        seconds = (endTime - currentTime)
    }
        else {
            seconds = startDifference*-1;
        }
    seconds =  Math.floor(seconds/1000);
    
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds%60);
    
    let char = '';
    if (startDifference < 0) {char = '-';}

    let time = `${char}${String(hours)}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return time;
}