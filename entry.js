function loadData() {
    let levelNameText = document.getElementById('levelname');
    let creatorslistText = document.getElementById('creatorslist');
    let levelIDText = document.getElementById('levelid');
    let videoContainer = document.getElementById('entry-showcase')
    let finalScoreLabel = document.getElementById('finalscore');


    const urlParams = new URLSearchParams(window.location.search);
    const levelID = urlParams.get('id') || null;

    const entryData = getLevelById(levelID);
    console.log(entryData);

    if (entryData == null) {
        document.getElementById('modal-failed').classList.remove('hidden');
        return 0;
    }

    levelNameText.innerHTML = entryData['levelName'];
    let creatorsList = entryData['creators'];
    let creators = '';
    for (let i = 0; i < creatorsList.length; i++) {
        if (creatorsList[i].length != 0) {
            creators += creatorsList[i] + ', ';
        }
    }
    creators = creators.substring(0, creators.length - 2);
    creatorslistText.innerHTML = 'by ' + creators;

    levelIDText.innerHTML = entryData['levelID'];

    document.getElementById('placement').innerHTML = '#' + entryData['placement'];
    if (entryData['placement'] == -1) {
        document.getElementById('placement').innerHTML = 'Disqualified';
    }

    finalScoreLabel.innerHTML = entryData['finalScore'];
    for (let i = 0; i < 5; i++) {
        let comment = document.getElementById(`comment${i+1}`);
        comment.innerHTML = `" ${entryData['judgeComments'][i]} "`;
        if (entryData['judgeComments'][i] == '' || entryData['judgeComments'][i] == null) {
            comment.innerHTML = "No Comment Provided."; 
            comment.classList.add("nocomment");
        }
    }
    let showcaseID = entryData['showcase'];
    if (showcaseID != '' && showcaseID != null) {

        let video = document.createElement('iframe');
        video.id = 'video';
        video.src = `https:\//www.youtube-nocookie.com/embed/${showcaseID}`;
        video.title = "Youtube Video Player";
        video.frameborder = "0";
        video.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        video.referrerPolicy="strict-origin-when-cross-origin";
        video.allowFullscreen;
        
        videoContainer.appendChild(video);
    }
    else {
        videoContainer.remove();
    }

    scoresList = entryData['judgeScores'];
    console.log(scoresList);
    for (let i = 0; i < 5; i++) {
        let scoresContainer = document.getElementById(`judge${i+1}ScoresList`);
        let actualsContainer = document.getElementById(`judge${i+1}actuals`);
        let scoreTotal = 0;
        let actualScores = convertScoresToActuals(scoresList);
        console.log('actuals:', actualScores);
        for (let x = 0; x < 5; x++) {
            let score = document.createElement('a');
            score.innerHTML = scoresList[i][x];
            score.classList.add('score');
            let actualScore = document.createElement('a');
            actualScore.innerHTML = scoresList[i][x];
            actualScore.classList.add('scoreActual');
            actualScore.innerHTML = actualScores[i][x];
            scoresContainer.appendChild(score);
            actualsContainer.appendChild(actualScore);
            scoreTotal += (scoresList[i][x]/1);
        }
        console.log(scoreTotal);
        let totalScore = document.createElement('a');
        totalScore.innerHTML = Math.round(scoreTotal);
        totalScore.classList.add('score');
        scoresContainer.appendChild(totalScore);
        let actualTotal = sum(actualScores[i]);
        let totalActualScore = document.createElement('a');
        totalActualScore.classList.add('scoreActual');
        totalActualScore.innerHTML = actualTotal;
        actualsContainer.appendChild(totalActualScore);
        
    }

}

function sum(arr) {
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
        x+=arr[i];
    }
    return x;
}

function convertScoresToActuals(scoresArr) {
    let actuals = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    for (let i = 0; i < 5; i++) {
            actuals[i][0] = (scoresArr[i][0]/1)*10;
            actuals[i][1] = (scoresArr[i][1]/1)*5;
            actuals[i][2] = (scoresArr[i][2]/1)*2;
            actuals[i][3] = (scoresArr[i][3]/1)*2;
            actuals[i][4] = (scoresArr[i][4]/1);
    }
    return actuals;
}