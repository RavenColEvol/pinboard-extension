const pinboard = document.getElementById('pinboard');
const pinsList = document.getElementById('pins');
const clearAll = document.getElementById('clearAll');

pinboard.onsubmit = function(event) {
    event.preventDefault();
    const key = event.target['key'].value;
    const value = event.target['value'].value;
    pinboard.reset();
    chrome.storage.sync.get(['pins'], function(result) {
        const pins = result.pins || [];
        pins.push([key, value]);
        chrome.storage.sync.set({['pins']: pins}, function() {
            pinsList.appendChild(createListItem(key, value));
        }); 
    });
}

clearAll.onclick = function() {
    chrome.storage.sync.set({['pins']: []}, function() {
        pinsList.innerHTML = '';
    })
}

onload = function() {
    chrome.storage.sync.get(['pins'], function(result) {
        const pins = result.pins || [];
        if(pins) {
            pins.forEach(function([key, value]) {
                pinsList.appendChild(createListItem(key, value));
            });
        }
    });
}

function createListItem(key, value) {
    const li = document.createElement('li');
    li.onclick = setCopy.bind(null, value);
    li.innerHTML = key;
    return li;
}

function setCopy(value) {
    console.log('value', value);
    navigator.clipboard.writeText(value);
}