

var sortMethod = 'default';
searchJamNumber = 2;
let displayMode = 'grid';
async function entryClicked(entryID) {

    
    document.getElementById('modal-notif-blur').style.display='flex';
    document.getElementById('modal-copiedNotif').style.display='flex';
    document.getElementById('modal-notif-blur').style.filter = 'alpha(opacity=1)';
    document.getElementById('modal-copiedNotif').style.filter = 'alpha(opacity=1)';
    document.getElementById('modal-notif-blur').style.opacity = '1';
    document.getElementById('modal-copiedNotif').style.opacity = '1';
    setTimeout(function() {
        fade(document.getElementById('modal-notif-blur'));
        fade(document.getElementById('modal-copiedNotif'));
    }, 700);

    await navigator.clipboard.writeText(entryID);
    document.getElementById(`entry${entryID}`).classList.remove("entry-container-anim");
    document.getElementById(`entry${entryID}`).classList.add("entry-container-anim");
    setTimeout(function() {
        document.getElementById(`entry${entryID}`).classList.remove("entry-container-anim");
    },  1500);
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.01){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op *= 0.9;
    }, 28);
}

function changeButtonContent() {
  if (window.matchMedia('(max-width: 1200px)').matches) {
    document.getElementById('button-filter').innerHTML = "<span class='material-symbols-outlined'>filter_alt</span>";
    document.getElementById('button-displaymode').classList.add('hidden');
    displayMode = 'list';
    document.getElementById('button-displaymode').innerHTML='list';
  }
  else {
    document.getElementById('button-filter').innerHTML = "<span  style='transform:translateX(-0.5vw);' class='material-symbols-outlined'>filter_alt</span>Filter</div>";
    document.getElementById('button-displaymode').classList.remove('hidden');
  }
}

window.addEventListener('resize', function(event) {
  changeButtonContent();
  search(document.getElementById('searchbar').value);
}, true)

function populateEntries(entriesList) {
  
  let entries = sortEntries(entriesList, sortMethod)

    let entriesPerRow = 5;
    if (window.matchMedia('(max-width: 1200px)').matches || displayMode == 'list') {entriesPerRow = 1;}

    let container = document.getElementById('entries-wrapper');
    container.innerHTML = '';
    for (let i = 0; i < entries.length / entriesPerRow ; i++ ) {
        let row = document.createElement('div');
        row.classList.add('entry-row');
        if (displayMode == 'list') {row.classList.add('entry-row-list');}
        container.appendChild(row);
        for (let x = (i*entriesPerRow); x < (i*entriesPerRow)+entriesPerRow ; x++ ) {
          if (x >= entries.length) {return;}
            let levelid=entries[x]['levelID'];
            let creatorsArr = entries[x]['creators'];
            let creatorsList = 'by ';
            let levelName = entries[x]['levelName'];
            let score = entries[x]['finalScore'];
            let placement = entries[x]['placement'];
            let jamNumber = entries[x]['jamNumber'];
            for (let z = 0; z < creatorsArr.length; z++) {
              if (creatorsArr[z].length != 0) {
                creatorsList += creatorsArr[z] + ', ';
              }
            }
            creatorsList = creatorsList.substring(0, creatorsList.length - 2);
            let entryContainer = document.createElement('span');
            entryContainer.classList.add('entry-container');
            if (displayMode == 'list') {entryContainer.classList.add('entry-container-list');}
            
            let entryNameLabel = document.createElement('div');
            entryNameLabel.classList.add('entry-levelname');
            if (displayMode == 'list') {entryNameLabel.classList.add('entry-levelname-list');}
            entryNameLabel.innerHTML = levelName;

            let entryScoreLabel = document.createElement('div');
            entryScoreLabel.classList.add('entry-score');
            if (displayMode == 'list') {entryScoreLabel.classList.add('entry-score-list');}
            entryScoreLabel.innerHTML = `${score}/100`;
            
            let entryCreatorsListLabel = document.createElement('div');
            entryCreatorsListLabel.classList.add('entry-creatorlist');
            if (displayMode == 'list') {entryCreatorsListLabel.classList.add('entry-creatorlist-list');}
            entryCreatorsListLabel.innerHTML = creatorsList;
            
            let entryIDLabel = document.createElement('div');
            entryIDLabel.classList.add('entry-levelid')
            if (displayMode == 'list') {entryIDLabel.classList.add('entry-levelid-list')}
            entryIDLabel.innerHTML = levelid;

            let entryJamNumber = document.createElement('div');
            entryJamNumber.classList.add('entry-jamnumber');
            if (displayMode == 'list') {entryJamNumber.classList.add('entry-jamnumber-list');}
            entryJamNumber.innerHTML = "Jam " + jamNumber;

            let entryPlacement = document.createElement('div');
            entryPlacement.classList.add('entry-placement');
            if (displayMode == 'list') {entryPlacement.classList.add('entry-placement-list');}
            entryPlacement.innerHTML = "#" + placement;
            if (placement == -2) {
              entryPlacement.innerHTML = 'DISQUALIFIED';
              entryPlacement.classList.add('placement-disqualified');
            }
            
            entryContainer.appendChild(entryNameLabel);
            entryContainer.appendChild(entryCreatorsListLabel);
            entryContainer.appendChild(entryIDLabel);
            entryContainer.appendChild(entryScoreLabel);
            entryContainer.appendChild(entryJamNumber);
            entryContainer.appendChild(entryPlacement);
            entryContainer.onclick=function() {window.location.href=`entry?id=${levelid}`};
            entryContainer.id=`entry${levelid}`;

            if (placement == -2) {
              entryContainer.classList.add('disqualified');
            }
            if (placement <= 10 && placement > 5) {
              entryContainer.classList.add('winner');
            }
            if (placement == 1) {
              entryContainer.classList.add('first-place');
              if (displayMode == 'list') {entryContainer.classList.add('first-place-list');}
            }
            if (placement == 2) {
              entryContainer.classList.add('second-place');
              if (displayMode == 'list') {entryContainer.classList.add('second-place-list');}
            }
            if (placement == 3) {
              entryContainer.classList.add('third-place');
              if (displayMode == 'list') {entryContainer.classList.add('third-place-list');}
            }
            if (placement == 4 || placement == 5) {
              entryContainer.classList.add('fourth-fifth-place');
              if (displayMode == 'list') {entryContainer.classList.add('fourth-fifth-place-list');}
            }

            let animDelay = x*.03;
            if (animDelay > 0.9) {animDelay = 0.9;}

            entryContainer.style.animationDelay = `${(animDelay)}s`

            row.appendChild(entryContainer);
        }
      }
}


let sortingOrder = true; // true for up, false for down
function sortByKey(data, key) {

  if (key == 'creators') {
    return [...data].sort((a, b) => {
    const valA = a[key][0];
    const valB = b[key][0];

    if (valA === undefined || valB === undefined) {
      throw new Error(`Key "${key}" not found in one or more objects`);
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortingOrder ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return sortingOrder ? valA - valB : valB - valA;
  });
}

  if (key == 'decoScore' || key == 'gameplayScore' || key == 'originalityScore') {
    console.log([...data][0]['judgeScores']);
    return [...data].sort((a, b) => {
      let sortVal = 0;
      if (key == 'gameplayScore') {sortVal = 0;}
      if (key == 'originalityScore') {sortVal = 1;}
      if (key == 'decoScore') {sortVal = 3;}

      let valA = 0;
      let valB = 0;

      for (let i = 0; i < 5; i++) {
        console.log('adding: ' + a['judgeScores'][i][sortVal] + ' to A');
        valA += parseFloat(a['judgeScores'][i][sortVal]);
        console.log('A is now ' + valA);
      }
      for (let i = 0; i < 5; i++) {
        console.log('adding: ' + b['judgeScores'][i][sortVal] + ' to B');
        valB += parseFloat(b['judgeScores'][i][sortVal]);
        console.log('B is now ' + valB);
      }
      
      console.log('valA total: ' + valA);
      console.log('valB total: ' + valB);
      console.log('');
      console.log('next comp');

      if (valA === undefined || valB === undefined) {
      throw new Error(`Key "${key}" not found in one or more objects`);
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return !sortingOrder ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return !sortingOrder ? valA - valB : valB - valA; // why tf does it need to be inverted????? wtf is this goofy ahh ahh code doing
    });
  }


  return [...data].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA === undefined || valB === undefined) {
      throw new Error(`Key "${key}" not found in one or more objects`);
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortingOrder ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return sortingOrder ? valA - valB : valB - valA;
  });
}


function sortEntries(entryList, sortMethod) {
  switch (sortMethod) {
    case '_id':
      return sortByKey(entryList, '_id', true);
      break;
    case 'levelname':
      return sortByKey(entryList, 'levelName', true);
      break;
    case 'levelID':
      return sortByKey(entryList, 'levelID', true);
      break;
    case 'creatorName':
      return sortByKey(entryList, 'creators', true);
      break;
    case 'finalScore':
      return sortByKey(entryList, 'finalScore', true).reverse();
      break;
    case 'decoScore':
      return sortByKey(entryList, 'decoScore', true);
      break;
    case 'gameplayScore':
      return sortByKey(entryList, 'gameplayScore', true);
      break;
    case 'originalityScore':
      return sortByKey(entryList, 'originalityScore', true);
      break;
    default:
      return sortByKey(entryList, 'finalScore', true).reverse();
      break;
  }
}

function search(query) {
  let filteredEntries = searchFor(query)
  populateEntries(filteredEntries);
}

function changeJamNum(jamNum) {
  searchJamNumber = jamNum;
  search(document.getElementById('searchbar').value);
}

function searchFor(query) {

    let entriesArr = [];
    for (let i = 0; i < db.length; i++) {
      for(var key in db[i]){
        var value = db[i][key];
        if (db[i]['jamNumber'] == searchJamNumber || searchJamNumber == 'All') {

          if (value.toString().toUpperCase().includes(query.toUpperCase())) {
            let skip = false;
            for (let x = 0; x < entriesArr.length; x++) {
              if (entriesArr[x] == db[i]) {
                skip = true;
              }
              
            }
            if (!skip) {entriesArr.push(db[i]);}
          }
        }
      }
    }
    return entriesArr;
}

function clearSearch() {
  document.getElementById('searchbar').value = '';
  search('');
}

function toggleFilterDropdown() {
    let dropdown = document.getElementById('filter-dropdown');
    closeJamNumDropdown();
    if (dropdown.style.height == '0px' || dropdown.style.height == '') {
        dropdown.style.height = 'clamp(240px, 30vh, 160px)';
        dropdown.style.border = 'border: 1px solid rgb(40,40,60);';
    }
    else {
        dropdown.style.height = 0;
        dropdown.style.border = '';
    }
}
function closeFilterDropdown() {
  let dropdown = document.getElementById('filter-dropdown');
  dropdown.style.height = 0;
  dropdown.style.border = '';
}

function toggleJamNumDropdown() {
    let dropdown = document.getElementById('jamSelect-dropdown');
    closeFilterDropdown();
    if (dropdown.style.height == '0px' || dropdown.style.height == '') {
        dropdown.style.height = 'clamp(160px, 16vh, 160px)';
        dropdown.style.border = 'border: 1px solid rgb(40,40,60);';
    }
    else {
        dropdown.style.height = 0;
        dropdown.style.border = '';
    }
}
function closeJamNumDropdown() {
  let dropdown = document.getElementById('jamSelect-dropdown');
  dropdown.style.height = 0;
  dropdown.style.border = '';
}

function toggleDisplayMode() {
  if (displayMode == 'grid') {
    displayMode = 'list';
    document.getElementById('button-displaymode').innerHTML = 'list';

  }
  else {
    displayMode = 'grid';
    document.getElementById('button-displaymode').innerHTML = 'grid_view';
  }
  search(document.getElementById('searchbar').value);
}

function setSortingMethod(method) {
  sortMethod = method;
  search(document.getElementById('searchbar').value);
  toggleFilterDropdown();
}

function setSortingOrder(order) {
  if (order == 'ascending') {
    sortingOrder = true;
  }
    if (order == 'descending') {
    sortingOrder = false;
  }
  search(document.getElementById('searchbar').value);
  toggleFilterDropdown();
}