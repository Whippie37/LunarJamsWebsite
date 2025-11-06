"use strict";
import db from './entries.json' assert {type:'json'};
var sortMethod = 'default';
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
    }, 300);

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


function populateEntries(entriesList) {
  let entries = sortEntries(entriesList, sortMethod)

    let container = document.getElementById('entries-wrapper');
    container.innerHTML = '';
    for (let i = 0; i < entries.length / 5 ; i++ ) {
        let row = document.createElement('div');
        row.classList.add('entry-row');
        container.appendChild(row);
        for (let x = (i*5); x < (i*5)+5 ; x++ ) {
          if (x >= entries.length) {return;}

            let levelid=entries[x]['levelID'];
            let creatorsArr = entries[x]['creators'];
            let creatorsList = 'by ';
            let levelName = entries[x]['levelName'];
            for (let z = 0; z < creatorsArr.length; z++) {
              if (creatorsArr[z].length != 0) {
                creatorsList += creatorsArr[z] + ', ';
              }
            }
            creatorsList = creatorsList.substring(0, creatorsList.length - 2);
            let entryContainer = document.createElement('span');
            entryContainer.classList.add('entry-container');
            
            let entryNameLabel = document.createElement('div');
            entryNameLabel.classList.add('entry-levelname');
            entryNameLabel.innerHTML = levelName;

            let entryScoreLabel = document.createElement('div');
            entryScoreLabel.classList.add('entry-score');
            entryScoreLabel.innerHTML = '???/100';
            
            let entryCreatorsListLabel = document.createElement('div');
            entryCreatorsListLabel.classList.add('entry-creatorlist');
            entryCreatorsListLabel.innerHTML = creatorsList;
            
            let entryIDLabel = document.createElement('div');
            entryIDLabel.classList.add('entry-levelid')
            entryIDLabel.innerHTML = levelid;
            
            entryContainer.appendChild(entryNameLabel);
            entryContainer.appendChild(entryCreatorsListLabel);
            entryContainer.appendChild(entryIDLabel);
            entryContainer.appendChild(entryScoreLabel);
            entryContainer.onclick=function() {entryClicked(levelid)};
            entryContainer.id=`entry${levelid}`;
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
    case 'levelname':
      return sortByKey(entryList, 'levelName', true);
      break;
    case 'levelID':
      return sortByKey(entryList, 'levelID', true);
      break;
    case 'creatorName':
      return sortByKey(entryList, 'creators', true);
      break;
    case 'totalScore':
      return sortByKey(entryList, '_id', true);
      break;
    case 'decoScore':
      return sortByKey(entryList, '_id', true);
      break;
    case 'gameplayScore':
      return sortByKey(entryList, '_id', true);
      break;
    case 'themeScore':
      return sortByKey(entryList, '_id', true);
      break;
    case 'originalityScore':
      return sortByKey(entryList, '_id', true);
      break;
    default:
      return sortByKey(entryList, '_id', true);
      break;
  }
}

function search(query) {
  let filteredEntries = earchFor(query)
  populateEntries(filteredEntries);
}

function searchFor(query) {

    let entriesArr = [];
    for (let i = 0; i < db.length; i++) {
      for(var key in db[i]){
        var value = db[i][key];
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
    return entriesArr;
}

function clearSearch() {
  document.getElementById('searchbar').value = '';
  search('');
}

function toggleDropdown() {
    let dropdown = document.getElementById('filter-dropdown');
    if (dropdown.style.height == '0px' || dropdown.style.height == '') {
        dropdown.style.height = 'clamp(240px, 30vh, 160px)';
        dropdown.style.border = 'border: 1px solid rgb(40,40,60);';
    }
    else {
        dropdown.style.height = 0;
        dropdown.style.border = '';
    }
}

function setSortingMethod(method) {
  sortMethod = method;
  search(document.getElementById('searchbar').value);
  toggleDropdown();
}

function setSortingOrder(order) {
  if (order == 'ascending') {
    sortingOrder = true;
  }
    if (order == 'descending') {
    sortingOrder = false;
  }
  search(document.getElementById('searchbar').value);
  toggleDropdown();
}

function init() {
    populateEntries(db);
}


init();