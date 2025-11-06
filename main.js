let carousel = document.getElementsByClassName("info-wrapper");
let selectedButton = 0;
let lang = '';
let cookies = new Map();

function setBackground() {
    let backgrounds = new Array(6);
    backgrounds[0] = '\'./Assets/game_bg_01_001-uhd.png\'';
    backgrounds[1] = '\'./Assets/game_bg_02_001-uhd.png\'';
    backgrounds[2] = '\'./Assets/game_bg_03_001-uhd.png\'';
    backgrounds[3] = '\'./Assets/game_bg_05_001-uhd.png\'';
    backgrounds[4] = '\'./Assets/game_bg_06_001-uhd.png\'';
    backgrounds[5] = '\'./Assets/game_bg_12_001-uhd.png\'';
    backgrounds[6] = '\'./Assets/RFB_sized.png\'';
    let rng = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    if (Math.floor(Math.random() * (10000)) + 1 == 1) { rng = 6; }
    document.getElementById('background').style.background = `linear-gradient(0deg,rgba(94, 29, 138, 1) 0%, rgba(78, 42, 168, 1) 42%, rgba(0, 81, 255, 1) 100%), url(${backgrounds[rng]})`;

}


function saveCookies() {
    let cookiesString = '';
    cookiesString = 'lang=' + lang;
    document.cookie = cookiesString;
}
function loadCookies() {
    let cookie = document.cookie;
    const cookiesList = cookie.split("|");
    for (var i = 0; i < cookiesList.length; i++) {
        let temp = cookiesList[i].split('=');
        cookies.set(temp[0], temp[1]);
    }
    lang = cookies.get("lang");
}

function setLang(langID) {
    if (langID == 0) {
        lang = 'en';
    }
    if (langID == 1) {
        lang = 'es';
    }
    saveCookies();
    injectText();
}

function init() {
    let activeJam = true;
    loadCookies();
    setBackground();
    let section = document.getElementById('homepage-section-left');

    let message = "Welcome to Lunar Jam.";
    let message2 = "Jam Starts October 31 - 12PM EST.";

    let messageSection = document.createElement('div');
    messageSection.className = "message";
    messageSection.id = "message";

    let messageMain = document.createElement('p');
    messageMain.classList.add("message");
    messageMain.className = "message-main";
    messageMain.id = "message-main";
    

    let messageSub = document.createElement('p');
    messageSub.className = "message-sub";
    messageSub.id = "message-sub";
    


    if (activeJam == false) {

        let videoshowcase = document.createElement('div');
        videoshowcase.className = 'video-showcase';
        videoshowcase.id = 'video-showcase';

        let video = document.createElement('iframe');
        video.classname = 'video';
        video.id = 'video';
        video.src = 'https:\//www.youtube-nocookie.com/embed/U2r4YA7nNlI';
        video.title = "Youtube Video Player";
        video.frameborder = "0";
        video.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        video.referrerPolicy="strict-origin-when-cross-origin";
        video.allowFullscreen;


        section.append(messageSection);
        messageSection.append(messageMain);
        messageMain.innerHTML = message;


        section.append(videoshowcase);
        videoshowcase.append(video);
        messageSection.append(messageSub);
        messageSub.innerHTML = message2;
    }
    else {
        section.append(messageSection);
        messageSection.append(messageMain);
        messageMain.innerHTML = "Lunar Jam #1<br> Active Now";

        messageSection.append(messageSub);
        messageSub.innerHTML = "Time Remaining";
        messageSub.style.transform = "translateY(1.3rem)"


        let timerWrapper = document.createElement('div');
        timerWrapper.className = 'wrapper';
        timerWrapper.id = 'timer-wrapper';

        let timer = document.createElement('div');
        timer.className = 'timer';
        timer.id = 'timer';

        section.append(timerWrapper);
        timerWrapper.append(timer);
        timer.innerHTML = "00:00:00";

        let themesWrapper = document.createElement('div');
        themesWrapper.className = "wrapper";
        themesWrapper.id = "themes-wrapper";

        let mainThemeWrapper = document.createElement('div');
        mainThemeWrapper.className = "wrapper";
        mainThemeWrapper.id = "main-theme-wrapper";

        let themesLabel = document.createElement('p');
        themesLabel.className = "themes-label";
        themesLabel.innerHTML = "Main Theme";
        themesLabel.style.fontSize = "1.5rem";
        let themesLabel2 = document.createElement('p');
        themesLabel2.className = "themes-label";
        themesLabel2.innerHTML = "Sub-Themes";

        let mainTheme = document.createElement('p');
        mainTheme.className = "main-theme";
        mainTheme.id = "main-theme";
        mainTheme.innerHTML = "Transport"; // CHANGE THIS TO THE MAIN THEME

        let subThemesWrapper = document.createElement('div');
        subThemesWrapper.className = "wrapper";
        subThemesWrapper.id = "sub-theme-wrapper";

        let subTheme1 = document.createElement('p');
        subTheme1.className = 'sub-theme';
        subTheme1.id = "sub-theme1";
        subTheme1.innerHTML = "Value"; // CHANGE THIS TO SUB-THEME 1

        let subTheme2 = document.createElement('p');
        subTheme2.className = 'sub-theme';
        subTheme2.id = "sub-theme2";
        subTheme2.innerHTML = "Zone"; // CHANGE THIS TO SUB-THEME 2

        let subThemesContainer = document.createElement('div');
        subThemesContainer.className = "wrapper";
        subThemesContainer.style = "height : auto; padding : 20px;";

        section.append(themesWrapper);
        themesWrapper.append(mainThemeWrapper);
        mainThemeWrapper.append(themesLabel);
        mainThemeWrapper.append(mainTheme);

        themesWrapper.append(subThemesWrapper);
        subThemesWrapper.append(themesLabel2);
        subThemesWrapper.append(subThemesContainer);
        subThemesContainer.append(subTheme1);
        subThemesContainer.append(subTheme2);


    }



    let ticking = false;

    addEventListener("scroll", (event) => {

        if (!ticking) {
            setTimeout(() => {

                if (window.scrollY >= 934) {
                    document.getElementById("navbar").style.height = "8vh";
                }
                else {
                    document.getElementById("navbar").style.height = 0;
                }
                ticking = false;
            }, 600);
            ticking = true;
        }
        console.log('bad idea');
    });

    

    main();
    injectText();
}
const buttons = document.getElementsByClassName("carousel-button");



function injectText() {
    let language = lang;
    if (language.length != 2) {return 0;}
    language = './' + lang + '.json';
    let siteText = fetch(language) // get json document
        .then(response => response.json())
        .then(siteText => {

            if (document.getElementById('index')) {

                
                const message = siteText['Messages']; // import messages from json
                let messageMain = document.getElementById('message-main');
                messageMain.innerHTML = message[0];
                
                let messageSub = document.getElementById('message-sub');
                messageSub.innerHTML = message[1];
                
                
                const buttonsText = siteText['buttons']; // import buttons text from json
                // inject buttons text
                let navbar = document.getElementsByClassName('navbar-item');
                let navigation = document.getElementsByClassName('navigation-button');
                
                let carouselButtons = document.getElementsByClassName('carousel-button');
                for (var i = 0; i < carouselButtons.length; i++) {
                    carouselButtons[i].innerHTML = buttonsText[i + ((navbar.length) + (navigation.length))];
                }
                
                const infoText = siteText['About']; // import info section text
                // inject info section text
                document.getElementById('info-section-header').innerHTML = infoText[0];
                document.getElementById('info-section-content').innerHTML = infoText[1];
                
                const prizesText = siteText['Prizes']; // import prizes section text
                // inject prizes section text
                let prizes = document.getElementsByClassName(" prizes-content");
                for (var i = 0; i < prizes.length; i++) {
                    prizes[i].innerHTML = prizesText[i];
                }
                
                const rulesText = siteText['Rules'] // import rules section text
                //inject rules section text
                let rules = document.getElementsByClassName("rules-content");
                for (var i = 0; i < rules.length; i++) {
                    rules[i].innerHTML = rulesText[i];
                }
                
                document.getElementById('judges-header').innerHTML = siteText['Judges'];
                
                const scoringText = siteText['Scoring'] // import scoring section text
                //inject scoring section text
                let scoring = document.getElementsByClassName("scoring-content");
                for (var i = 0; i < scoring.length; i++) {
                    scoring[i].innerHTML = scoringText[i];
                }
            }

            const rubricText = siteText['Rubric'];
             
            if (document.getElementById('rubric')) {
                const grid = document.getElementsByClassName("grid-cell");
                for (var i = 0; i < grid.length; i++) {
                    grid[i].innerHTML = rubricText[i];
                }
            }
            })
            .catch(error => console.error('Error:', error));
        }
        
        function goToAbout() {
            window.scrollTo(0, 1024);
        }
        
        function selectButton(buttonNum) {
            for (var i = 0; i < 5; i++) {
        buttons[i].style.background = "linear-gradient(0deg,rgba(4, 8, 26, .5) 0%, rgba(5, 11, 27, .5) 100%)";
    }
    buttons[buttonNum].style.background = "linear-gradient(0deg,rgba(30, 188, 199, 1) 0%, rgba(28, 214, 171, 1) 100%)";
    selectedButton = buttonNum;
}


function showInfoSection() {
    for (let i = 0; i < carousel.length; i++) {
        carousel[i].style.left = `${100 * i}vw`.toString();
    }
    selectButton(0);
}

function showPrizesSection() {
    for (let i = 0; i < carousel.length; i++) {
        carousel[i].style.left = `${(100 * (i)) - 100}vw`.toString();
    }
    selectButton(1);
}

function showRulesSection() {
    for (let i = 0; i < carousel.length; i++) {
        carousel[i].style.left = `${(100 * (i)) - 200}vw`.toString();
    }
    selectButton(2);
}

function showJudgesSection() {
    for (let i = 0; i < carousel.length; i++) {
        carousel[i].style.left = `${(100 * (i)) - 300}vw`.toString();
    }
    selectButton(3);
}

function showScoringSection() {
    for (let i = 0; i < carousel.length; i++) {
        carousel[i].style.left = `${(100 * (i)) - 400}vw`.toString();
    }
    selectButton(4);
}


function main() {
    document.body.ondragstart = function () { return false; };
    var countdownTime = getClockTime();


    if (document.getElementById('timer')) {
        document.getElementById('timer').innerHTML = countdownTime;
    }

    setTimeout(main, 500);
}

function getClockTime() {
    let currentTime = Math.floor(Date.now() / 1000);
    //let startTime = 1761944400; //1761926400000
    //let endTime = 1762207200; //1762189200000
    let startTime = Math.floor(new Date('2025-10-31T12:00:00-05:00').getTime() / 1000) - 3600;
    let endTime = Math.floor(new Date('2025-11-03T12:00:00-05:00').getTime() / 1000) - 3600;
    startDifference = (currentTime - startTime);
    let seconds = 0;


    if (startDifference > 0) { startDifference = 0; seconds = 0; };
    if (currentTime > endTime) {
        seconds = 0;
    }
    else if (startDifference == 0) {
        seconds = (endTime - currentTime)
    }
    else {
        seconds = startDifference * -1;
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
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);


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

function toggleLanguageDropdown() {
    let dropdown = document.getElementById('language-select-dropdown');
    if (dropdown.style.height == '0px' || dropdown.style.height == '') {
        dropdown.style.height = '7vh';
        dropdown.style.border = 'border: 1px solid rgb(40,40,60);';
    }
    else {
        dropdown.style.height = 0;
        dropdown.style.border = '';
    }
}
