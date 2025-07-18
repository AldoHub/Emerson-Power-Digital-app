document.addEventListener("DOMContentLoaded", async() => {
    await fetchConfig();
    await fetchAssets();
    await bgPath();
    getFirstFiveCases();
    loadVideoBg();
    loadPanzoom();
    initKeyboard();
    addEventToHotspots();
    toggleSidebars();
    addEventToBackArrow();
    addCloseEventToModalButton();
    addEventsToTypes();
    addEventToEmailButton();
    addEventToCloseKeyboard();
    addEventToInputs();
    addEventToCartSubmit();
    addEventToSuccessButton();
    addEventToCloseSuccessModal();
    addEventToMapHotspots()
    clearOnDocumentClick();
    stopPropagationOnModal();
    setFullscreen();
    checkScreenChange();
    //addNextEvent();
    //addPrevEvent();
    inactiveTime();
    //f();
    //addEbookHotspots();
    
});

  

//config
let config = {};
let filesPath = "";
let url = "";
let EloquaUrl = "";

let zone = document.querySelector('.zone');
let overlay = document.querySelector('.overlay');
let hotspotNodes = document.querySelectorAll(".hotspot");
let hotspots = Array.from(hotspotNodes);
let handleNodes = document.querySelectorAll('.handle');
let handles = Array.from(handleNodes);
let barNodes = document.querySelectorAll('.bar');
let sidebar = document.querySelector('.sidebar');
let sidebarTitle = document.querySelector('.sidebar-title');
let backArrow = document.querySelector('.back-arrow');
let bars = Array.from(barNodes);
let modal = document.querySelector('.modal');
let close = document.querySelector('.close-modal');
let mainTitle = document.querySelector('.main-title');
let typesAssets = document.querySelector('.types-assets');
let typesSelector = document.querySelector('.types-selector');
let typeNodes = document.querySelectorAll('.types-selector p');
let _wrapper = document.querySelector("._wrapper");
let types = Array.from(typeNodes);
let selectedAsset = '';
let reset = document.querySelector('.reset');
let cartBar = document.querySelector('.personal-space');
let prevArrow = document.querySelector('.prev-arrow');
let nextArrow = document.querySelector('.next-arrow');
let mapResourcesHotspot = document.querySelector('.resources-map-hotspot');
let mapCasesHotspot = document.querySelector('.cases-map-hotspot');

//cart
let cart = [];
let items = document.querySelector('.items');
let emailButton = document.querySelector('.email-button');
let cartSubmit = document.querySelector('.cart-form-submit');
let successMessage = document.querySelector('.success-message-wrapper');
let closeSuccess = document.querySelector('.close-success');
let successButtonSubmit = document.querySelector('.success-button-submit');

//keyboard
let keyboardWrapper = document.querySelector('.keyboard-wrapper');
let closeKeyboard = document.querySelector('.close-keyboard');
let keyboardText = document.querySelector('.keyboard-text');
let form = document.querySelector('form');
let inputNodes = document.querySelectorAll('input');
let inputs = Array.from(inputNodes);
let currentInput = "";

let currentImages = "";
let currentType = "";
let currentFilename = "";
let currentContent = '';
let currentCartThumb = '';
let currentIndex = '';

let fullscreen = document.querySelector(".fullscreen");
let fSpan = fullscreen.querySelector("span");
let isFullScreen = false;
let page = document.querySelector('.page');
let totalPages = document.querySelector('.total-pages');
let currentPage = 1;
let s = 0;
let toggleCaps = false;
let toggleShift = false;

let panz = "";
let evHandler = "";
let bgAsset = "";
let videobg = "";
let next = document.querySelector(".next-page");
let cartIndexes = [];
let index = 0;
let oldPage;

let additional_cases;
//first five specified items
let first_five = [];

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }
  
const myFlag = isTouchDevice();
console.log("is touch/pointer: ", myFlag)
if(myFlag){
    evHandler = 'pointerdown';
}else{
    evHandler = 'click'
}

function checkScreenChange(){
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            console.log('Exited fullscreen mode');
            // Add your custom event handling code here
            _wrapper.style.opacity = 0;
            setTimeout(() => {     
                generateFlipbookContent(currentImages, currentType, currentFilename);
                if(selectedAsset == 'resources'){
                    generateTextContent(currentType, currentFilename, currentContent, currentCartThumb, currentIndex);
                }
                _wrapper.style.opacity = 1;
                fSpan.innerHTML = "Fullscreen";
            }, 500)
        }
    });
}

var idleTime1 = 0;
var idleTime2 = 0;
function inactiveTime (){
    console.log("INACTIVE TIMER")
    var idleInterval = setInterval(timerIncrement, 1000);

}

function timerIncrement() {
    //idleTime1 = idleTime1 + 1;
    idleTime2 = idleTime2 + 1;
    /*
    if (idleTime1 > 3) { //in secs
       
       panzoom(panz, {
            minZoom: 1,
            maxZoom: 3,
            initialX: 300,
            initialY: 500,
            initialZoom: 1,
            bounds: true,
            boundsPadding: 1
        }).zoomAbs( 0, 0, 1 ); 
        idleTime1 = 0;
    }
    */
    if (idleTime2 > 45) { // in secs
       resetApp(); 
       idleTime2 = 0;
    }

    $(this).mousemove(function (e) {
        //idleTime1 = 0;
        idleTime2 = 0;
    });
    $(this).keypress(function (e) {
        //idleTime1 = 0;
        idleTime2 = 0;
    });
}



function clearCart(){
    items.innerHTML = "";
    cart = [];
    cartIndexes = [];
}

function resetApp(){ 
    panzoom(panz, {
        minZoom: 1,
        maxZoom: 3,
        initialX: 300,
        initialY: 500,
        initialZoom: 1,
        bounds: true,
        boundsPadding: 1
    }).zoomAbs( 0, 0, 1 );

    //close everything else
    hideActiveSidebars();
    resetMenubar();
    formReset();
    clearCart();
}


function setFullscreen(){
    fullscreen.addEventListener(evHandler, () => {
            if(isFullScreen){
                fSpan.innerHTML = "Fullscreen";
                //close full screen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                  } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                  } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
                _wrapper.style.opacity = 0;
                setTimeout(() => {     
                    generateFlipbookContent(currentImages, currentType, currentFilename);
                    generateTextContent(currentType, currentFilename, currentContent, currentCartThumb, currentIndex);
                    _wrapper.style.opacity = 1;
                }, 500)
            }else{
                fSpan.innerHTML = "Close";
                //open fullscreen
                if (_wrapper.requestFullscreen) {
                    _wrapper.requestFullscreen();
                } else if (_wrapper.webkitRequestFullscreen) { /* Safari */
                    _wrapper.webkitRequestFullscreen();
                } else if (_wrapper.msRequestFullscreen) { /* IE11 */
                    _wrapper.msRequestFullscreen();
                }

                _wrapper.style.opacity = 0;
                //closeModal();
                setTimeout(() => { 
                    generateFlipbookContent(currentImages, currentType, currentFilename);
                    _wrapper.style.opacity = 1;
                }, 500)
            }   
            isFullScreen = !isFullScreen;
    });
}

//--- fetch the app configuration
async function fetchConfig(){
    if(window.versions){
        let response = await window.versions.config();
        config = JSON.parse(response);
        console.log("------------>", config);
        if(config["mode"] == 'test'){
            url = config["testUrl"];
        }else{
            url = config["url"];
        }
        //eloqua
        EloquaUrl = config["eloquaUrl"];

        videobg = config['video_bg'];
        additional_cases = config["additional cases"]
    }
    else{
        //alert("No configuration file found!");
        await fetch('./../config.json')
        .then((response) => response.json())
        .then((data) => config = data);
        if(config["mode"] == 'test'){
            url = config["testUrl"];
        }else{
            url = config["url"];
        }
        
        videobg = config['video_bg'];
        EloquaUrl = config["eloquaUrl"];
        additional_cases = config["additional cases"]
        console.log(url);
    }
}

//--- fetch the assets path
async function fetchAssets() {
    if(window.versions){
        let response = await window.versions.files();
        //replace the backslashes
        filesPath = response.replaceAll("\\", "/");
        console.log("files path root: ", response);
        }
       else{
           alert("No Assets folder found!");
       }
}

//--- fetch the assets path
async function bgPath() {
    if(window.versions){
        let response = await window.versions.bgpath();
        //replace the backslashes
        bgAsset = response.replaceAll("\\", "/");
        console.log("files path root: ", response);
        }
       else{
          bgAsset = '../public';
       }
}

function loadVideoBg(){
    console.log("VIDEO BG: ", videobg)
    let video = document.querySelector('video');
    console.log(bgAsset + videobg)
    video.src = bgAsset + videobg;
}

//--- panzoom lib
function loadPanzoom(){
    //just grab a DOM element
    panz = document.querySelector('.zone')
    //And pass it to panzoom
    let _panzoom = panzoom(panz, {
        minZoom: 1,
        maxZoom: 3,
        initialX: 300,
        initialY: 500,
        initialZoom: 1,
        bounds: true,
        boundsPadding: 1
    });
/*
    reset.addEventListener('click', () => {
        panzoom(panz, {
            minZoom: 1,
            maxZoom: 3,
            initialX: 300,
            initialY: 500,
            initialZoom: 1,
            bounds: true,
            boundsPadding: 1
        }).zoomAbs( 0, 0, 1 );
        reset.classList.remove('show');
    })
 
    _panzoom.on('zoom', function(e) {
       
       reset.classList.add('show');
       
       setTimeout(() =>{
        reset.classList.remove('show');
       }, 3000)
       
    });
*/

    _panzoom.on('zoom', function(e){
         let _bubble = document.querySelector(".bubble");
            if(_bubble){
                //remove if one is found
               _bubble.remove();
            }
    })
}

function debounce(func, timeout = 1500){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}


function saveInput(views, e, _page){
        //console.log('Current view: ', $(this).turn('view'), _page);
        totalPages.innerHTML = currentImages.length;
                
}

//--- load turnjs
function loadTurnjs(id, displayMode){
 
    currentPage = 1;
    s = 0;

    let oTurn = $(`#${id}`).turn({
        display: displayMode,
        acceleration: true,
        gradients: !$.isTouch,
        elevation:90,
     
        when: {
            turned: function(e, _page) {
              /*
              //new arrows functionality
              const processChange = debounce(() => saveInput($(this).turn('view'), e, _page));
              processChange(); 
              
              
              */



               //old stuff
               console.log('Current view: ', $(this).turn('view'), _page);
           
                page.style.opacity = 0;

           
                if($(this).turn('view')[1] != 0){
                  page.innerHTML = $(this).turn('view')[0] + "-" + $(this).turn('view')[1];
                }else{
                  page.innerHTML = $(this).turn('view')[0];
                }
                
                //page.innerHTML = _page -1 + "-" + 1;
                currentPage = _page;
                
                console.log(e)

                totalPages.innerHTML = currentImages.length;
                if($(this).turn('view')[0] == 0){
                    prevArrow.style.opacity = 0;
                }else{
                    prevArrow.style.opacity = 1;
                }

                console.log($(this).turn('view')[1], currentImages.length)

                if($(this).turn('view')[1] == currentImages.length){
                    nextArrow.style.opacity = 0;
                    nextArrow.style.pointerEvents = 'none';
                   
                }else{
                    nextArrow.style.opacity = 1;
                    nextArrow.style.pointerEvents = 'all';
                  
                }

                if($(this).turn('view')[1] == 0){
                    nextArrow.style.opacity = 0;
                    nextArrow.style.pointerEvents = 'none';
                   
                }else{
                    nextArrow.style.opacity = 1;
                    nextArrow.style.pointerEvents = 'all';
                   
                }

               
                setTimeout((e) => {

                    page.style.opacity = 1;
                    totalPages.style.opacity = 1;
                }, 500) 


            }
        }
    });
   
/*
    //new arrows functionality
    $(`.test-elem`).click(function(e){
        e.preventDefault();
        oTurn.turn("previous");
    })


    $(`.test-elem2`).click(function(e){
        e.preventDefault();
        oTurn.turn("next");
    })


    $(".prev-page").click(function(e){
        e.preventDefault();
        oTurn.turn("previous");

    });
    
    $(".next-page").click(function(e){
        e.preventDefault();
        oTurn.turn("next");
        
    });

    prevArrow.style.opacity = 0;

    if(selectedAsset !== 'resources'){
        nextArrow.style.opacity = 0;
    }

    prevArrow.addEventListener(evHandler, (e) => {
        e.preventDefault();
        oTurn.turn("previous");
    });

    nextArrow.addEventListener(evHandler, (e) => {
        e.preventDefault();
        oTurn.turn("next");
    });
    
    */

    //old stuff 
     $(".prev-page").click(function(e){
        e.preventDefault();
        oTurn.turn("previous");

    });
    
    $(".next-page").click(function(e){
        e.preventDefault();
        oTurn.turn("next");
    });
   

    if(selectedAsset !== 'resources'){
        nextArrow.style.opacity = 0;
        prevArrow.style.opacity = 0;
    }

    prevArrow.addEventListener(evHandler, (e) => {
        //console.log("EVENT: ", e)
        e.preventDefault();
        oTurn.turn("previous");
    });

    nextArrow.addEventListener(evHandler, (e) => {
        //console.log("EVENT: ", e)
        e.preventDefault();
        oTurn.turn("next");
    });

}


/*

function addEbookHotspots(){

     let testElem = document.querySelector(".test-elem");
     testElem.addEventListener(evHandler, (e) => {
        if(page.innerHTML == '1'){
            return;
        }

        if(page.innerHTML == '0-1'){
            return;
        }

        if(currentPage == 1) {
            page.innerHTML = 0 + "-" + 1;
            prev.style.pointerEvents = 'none';
        }else{
           // page.style.opacity = 0;
           s = s - 2;
           //console.log("_____>: ", s)
           page.innerHTML = s + "-" + (s+ 1);
         
        }
        currentPage--;
         
    });

    let testElem2 = document.querySelector(".test-elem2");
    testElem2.addEventListener(evHandler, (e) => {
       
        console.log(e)
        e.stopPropagation();
        
        let total = totalPages.innerHTML;
        console.log("----------->",total)
        console.log(currentPage, s)
    
        if(total == 1){
            return;
        }

        if(currentPage == 1) {
            s = 2;
            page.innerHTML = s + "-" + (s+1);
            //prev.style.display = 'block';
        }else{
            //prev.style.pointerEvents = 'all';

           if(page.innerHTML.includes(total)){
                console.log("DONE")
           }else{
            //page.style.opacity = 0;
            s = s + 2;
           
            if((s+1) == parseInt(total) || (s) == parseInt(total)){
                //console.log("TOTAL: ", s);
                if (total % 2 == 0){
                   page.innerHTML = total;
                }else{
                   page.innerHTML = s + "-" + (s+ 1);
                }
            }else{
                page.innerHTML = s + "-" + (s+ 1);
              }
           }

        }
           
        currentPage++;
     
        
    });
    
}



function addPrevEvent(){
    
    let prev = document.querySelector(".prev-page");
    prev.addEventListener(evHandler, () => {

        if(page.innerHTML == '1'){
            return;
        }

        if(page.innerHTML == '0-1'){
            return;
        }

        if(currentPage == 1) {
            page.innerHTML = 0 + "-" + 1;
            prev.style.pointerEvents = 'none';
        }else{
           // page.style.opacity = 0;
           s = s - 2;
           //console.log("_____>: ", s)
           page.innerHTML = s + "-" + (s+ 1);
         
        }
        currentPage--;
    
        })
   

    prevArrow.addEventListener(evHandler, () => {
        
        if(page.innerHTML == '1'){
            return;
        }
        
        if(page.innerHTML == '0-1'){
            return
        }

        if(currentPage == 1) {
            
            page.innerHTML = 0 + "-" + 1;
            prev.style.pointerEvents = 'none';
        }else{
           // page.style.opacity = 0;
           s = s - 2;
           //console.log("_____>: ", s)
           page.innerHTML = s + "-" + (s+ 1);
         
        }
        currentPage--;
    
        })
}

function addNextEvent(){
    let next = document.querySelector(".next-page");
    let prev = document.querySelector(".prev-page");
    next.addEventListener(evHandler, () => {
        let total = totalPages.innerHTML;
        console.log("----------->",total)
        console.log(currentPage, s)
    
        if(total == 1){
            return;
        }

        if(currentPage == 1) {
            s = 2;
            page.innerHTML = s + "-" + (s+1);
            //prev.style.display = 'block';
        }else{
            //prev.style.pointerEvents = 'all';

           if(page.innerHTML.includes(total)){
                console.log("DONE")
           }else{
            //page.style.opacity = 0;
            s = s + 2;
           
            if((s+1) == parseInt(total) || (s) == parseInt(total)){
                //console.log("TOTAL: ", s);
                if (total % 2 == 0){
                   page.innerHTML = total;
                }else{
                   page.innerHTML = s + "-" + (s+ 1);
                }
            }else{
                page.innerHTML = s + "-" + (s+ 1);
              }
           }

        }
           
        currentPage++;
    });

    nextArrow.addEventListener(evHandler, () => {
        let total = totalPages.innerHTML;
        console.log("----------->",total)
        console.log(currentPage, s)
        
        if(total == 1){
            return;
        }

        if(currentPage == 1) {
            s = 2;
            page.innerHTML = s + "-" + (s+1);
            //prev.style.display = 'block';
        }else{
            //prev.style.pointerEvents = 'all';

           if(page.innerHTML.includes(total)){
                console.log("DONE")
              
           }else{
           // page.style.opacity = 0;
            s = s + 2;
           
            if((s+1) == parseInt(total) || (s) == parseInt(total)){
                //console.log("TOTAL: ", s);
                if (total % 2 == 0){
                   page.innerHTML = total;
                }else{
                   page.innerHTML = s + "-" + (s+ 1);
                }
            }else{
                page.innerHTML = s + "-" + (s+ 1);
                
              }
           }

        }
        currentPage++;
    })
  
}



function hidePrev(){
    let prev = document.querySelector(".prev-page");
    prev.style.display = 'none';
}

*/

//--- init digital keyboard
function initKeyboard(){
    const Keyboard = window.SimpleKeyboard.default;

    const myKeyboard = new Keyboard({
      onKeyPress: (button) => onKeyPress(button),
    });
    
    function onKeyPress(button) {
        //console.log(button)

        //set the curernt input value
        if(button == '{bksp}'){
            currentInput.value = currentInput.value.slice(0, -1);
        }else if(button == '{space}'){
            currentInput.value += ' ';
        }else if(button == '{tab}'){
            currentInput.value += '     ';
        }else if(button == '{shift}' || button == '{lock}'){
            let currentLayout = myKeyboard.options.layoutName;
            let shiftToggle = currentLayout === "default" ? "shift" : "default";
          
            myKeyboard.setOptions({
              layoutName: shiftToggle
            });
        }else if(button == '{enter}'){
            cartSubmit.click();
        }else{
            if(toggleCaps){
                currentInput.value += button.toUpperCase();
            }else{
                currentInput.value += button;
            }
        }
    }
}


//--- processes the hotspots
function addEventToHotspots(){
    hotspots.map(hotspot => {
        //get the type
        let elementType = hotspot.getAttribute('data-type');
        //add the corresponding event
        addEvents(elementType, hotspot)
    });
}

//--- adds the events to the corresponding hotspots
function addEvents(elementType, element){
   
    //--- TODO -- check if the event is a double click, then skip it
    let name = element.getAttribute('data-name');
    let index = element.getAttribute('data-index');
    let configIndex = element.getAttribute('data-index-config');
    let controls = _wrapper.querySelector(".controls");
  
        element.addEventListener(evHandler, async(e) => {
            
            //console.log("CLICKED HOTSPOT")
            e.stopPropagation();
            hideActiveSidebars();
            //toggleShowClass(overlay);   
            
            if(elementType == 'resources'){
                selectedAsset = elementType;
                controls.style.display = 'flex';
            }else{
                selectedAsset = '';
                controls.style.display = 'none';
            }

            let _index = index;
            //get the correct index
            if(configIndex){
               let cases = config['cases'];
               await Promise.all(  
                cases.map((c,i) => {
                    let key = Object.keys(c);
                    //get the reference index
                    if(configIndex== c[key]['index']){
                        _index = i;
                        //console.log(configIndex, i)
                    }
                })
             )
            }

            //config[elementType][_index][name]['files']
            if(config[elementType][_index][name]['files'].length > 1){
                showBubble(elementType, name, index, configIndex, element)
            }else{
                if(index == undefined){
                
                    showModal(elementType, name, configIndex, null, 0);
                }
                if(configIndex == undefined){
                  
                    showModal(elementType, name, index, null, 0);
                }
            }
            
        });
   
}

//--- display the mini modal with the files
async function showBubble(elementType, name, index, configIndex, element){

    //console.log(name)

    //check if there is a bubble already
    let _bubble = document.querySelector(".bubble");
    if(_bubble){
        //remove if one is found
       _bubble.remove();
    }
   
    let _index = index;
   
    //get the correct index
    if(configIndex){
       let cases = config['cases'];
       await Promise.all(  
        cases.map((c,i) => {
            let key = Object.keys(c);
            //get the reference index
            if(configIndex== c[key]['index']){
                _index = i;
                //console.log(configIndex, i)
            }
        })
     )
    }
  
    //create the modal element
    let bubble = document.createElement('div');
    bubble.classList.add('bubble');

    //get the item coords
    let rect = element.getBoundingClientRect();
    let x = rect.left + window.scrollX;
    let y = rect.top + window.scrollY;

      
    //create the elements according the files array on the item
    let files = config[elementType][_index][name]['files'];
    files.map((f, idx) => {
        //console.log(f, name);
        
        let p = document.createElement('p');
        p.classList.add('bubble-item');

        //add attributes
        p.setAttribute('data-type', elementType);
        p.setAttribute('data-file', f);
        p.setAttribute('data-name', name);
        p.setAttribute('data-index', parseInt(_index));
        p.setAttribute('data-inner-index', idx);

        /*
        //process the name of the file
        let noSlashes = f.split("/").pop();
        let noExtension = noSlashes.split(".pdf").shift();
        let noUnderscores = noExtension.replaceAll("_", " "); 
        */

        //let text = document.createTextNode("+ " + noUnderscores);
        let text = document.createTextNode("+ " + config[elementType][_index][name]['content'][idx]['title']);
        p.appendChild(text);
        bubble.appendChild(p);
        
    });

    
    //add coords to bubble
    if(name == "Distributed Energy Resources"){
        bubble.style.right = (x/100) + 40 + "px"; 
    }else{
        bubble.style.left = x + "px";
    }
   
    bubble.style.top = (y + 35) + "px";
    //append the bubble
    //zone.appendChild(bubble);
    document.body.append(bubble);

    let bubbleItems = document.querySelectorAll('.bubble-item');
    let bItemsArr = Array.from(bubbleItems); 
   
    //add event to the items
    bItemsArr.map((bi) => {
        bi.addEventListener(evHandler, (e) => {
            e.stopPropagation();
            let name = e.target.getAttribute('data-name');
            let index = e.target.getAttribute('data-index');
            let type = e.target.getAttribute('data-type');
            let innerIdx = e.target.getAttribute('data-inner-index');

            showModal(type, name, index, null, parseInt(innerIdx));
            let _bubble = document.querySelector(".bubble");
            if(_bubble){
                //remove if one is found
               _bubble.remove();
            }
        });
    });

}

//--- displays the modal on item click
async function showModal(type, name, index, configIndex, innerIdx){
  
    console.log(type, name, index, configIndex, innerIdx)
    
    toggleShowClass(modal); 
   
    let controls = _wrapper.querySelector(".controls");
    
    if(type == 'resources'){
        selectedAsset = type;
        controls.style.display = 'flex';
    }else{
        selectedAsset = '';
        controls.style.display = 'none';
    }

    let images = '';
    let filename = '';
    let content = '';
    let cartImage = '';   

    //extract the data
     
    images = config[type][index][name]['images'][innerIdx];
    filename = config[type][index][name]['files'][innerIdx];

    if(config[type][index][name]['content']){
        if(config[type][index][name]['content'].length == 1){
            content = config[type][index][name]['content'][0];
        }
        if(config[type][index][name]['content'].length > 1){
            content = config[type][index][name]['content'][innerIdx];
        }
    }

    let cartThumb = "";

    if(config[type][index][name]['cart']){
        //check index
        if(config[type][index][name]['cart'].length == 1){
            cartThumb = config[type][index][name]['cart'][0];
        }
        if(config[type][index][name]['cart'].length > 1){
            cartThumb = config[type][index][name]['cart'][innerIdx];
        }
    }else{
        cartThumb = images[0];
    }   

    //book pages content
    generateFlipbookContent(images, type, filename, innerIdx);
   
    currentImages = images;
    currentType = type;
    currentFilename = filename;

    if(type == 'resources'){
        //generate the text content
        currentCartThumb = cartThumb;
        currentContent = content;
        currentIndex = index;
        generateTextContent(type, filename, content, cartThumb, index);
      
        //mainTitle.innerHTML = config[type][index][name]['content'][innerIdx]['main_title'];

        console.log("MAIN TITLE --->", config[type][index][name]['content'][innerIdx]['main_title']);
        mainTitle.innerHTML = config[type][index][name]['content'][innerIdx]['main_title'];
 
    }else{
       
       // mainTitle.innerHTML = 'Case Study';
       //console.log("CASES: ", config[type][parseInt(index)][name]["titles"][parseInt(innerIdx)], index, innerIdx)
       mainTitle.innerHTML = config[type][index][name]["titles"][innerIdx];
       
    } 
    
}

//--- uses the images passed to create "pages" for turnjs, and a new turnjs instance
async function generateFlipbookContent(images, type, filename, innerIdx){
    //console.log(images, type, filename, innerIdx)
    
    //turn js displayMode
    let displayMode = 'single';
     let _flipbook = _wrapper.querySelector(".flipbook");
     if(_flipbook){
    console.log(_wrapper.querySelector(".flipbook"))
    _wrapper.removeChild(_flipbook);
     }
    
  
    //check if content was added
    let _content = _wrapper.querySelector(".modal-content");
    if(_content ){
        _wrapper.removeChild(_content);
    }
   
    //rebuild a flipbook element
    let _w = document.createElement('div');
    let randomN = Date.now();
    _w.setAttribute("id", randomN);
    _w.classList.add('flipbook')
    if(type == 'cases' || type == 'additional cases'){
        _w.classList.add('case-aspect-ratio');
    }else{
        _w.classList.add('instructions');
    }
    _w.style.pointerEvents = 'all';
    _wrapper.appendChild(_w);
    //check and change the display mode if needed
    if(images.length > 1 ){
        displayMode = 'double';
    }

       
    //process the images
    let contentImages = images;
    await Promise.all(
        contentImages.map(image => {
            //--- create a new page per image
            let div = document.createElement('div');
            //div.setAttribute("style", `background-image:url('./../public/assets/${type}/images/${filename}/${image}')`);
            div.setAttribute("style", `background-image:url('${filesPath}${image}')`);
            _w.appendChild(div);
        })
    );
    //create a new turnjs instance
    loadTurnjs(randomN, displayMode);
  
}

//--- generates the content for the resources
function generateTextContent(type, filename, content, thumbnail, idx, innerIdx){
    //console.log("CONTENT------->", content)
    //console.log("GENERATE CONTENT ---> ", filename, thumbnail)
    //create content outer wrapper
    let div = document.createElement('div');
    div.classList.add('modal-content');
    //create content inner wrapper
    let innerDiv = document.createElement('div');
    //create heading
    let textWrapper = document.createElement('div');
    let heading = document.createElement('h3');
    let headingText = document.createTextNode(content.title);
    heading.appendChild(headingText);
    textWrapper.appendChild(heading)
    /*
    //create the content
    let description = document.createElement('p');
    let descriptionText = document.createTextNode(content.content);
    description.appendChild(descriptionText);
    textWrapper.appendChild(description);
    */

    let description = document.createElement("div");
    description.classList.add("modal-content-description")
    description.innerHTML = content.content;
    textWrapper.appendChild(description);

    //create the button
    let button = document.createElement('button');
    let buttonText = document.createTextNode('Email to me');
    button.setAttribute('data-file', filename);
    button.setAttribute('data-thumbnail', thumbnail);
    button.setAttribute('data-name', content.title);
    button.setAttribute('data-index', idx)
    button.appendChild(buttonText);
    textWrapper.appendChild(button)
    innerDiv.appendChild(textWrapper);
    //create image - QR code
    let image = document.createElement('img');
    //let imageSrc = `./../public/assets/${type}/qr/${content.qr}.png`;
    let imageSrc = `${filesPath}${content.qr}`;
    //console.log(content.qr)
    image.setAttribute('src', imageSrc);
    innerDiv.appendChild(image);
    div.appendChild(innerDiv);
    //add event to the button
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        //add the item to the cart
        addToCart(e.target, type, filename);
    });
    //append the content to the wrapper element
    _wrapper.appendChild(div);
}

//--- add to cart
function addToCart(target, type, filename){
   
    //get the data attribute
    let index = target.getAttribute('data-index');
    let file = target.getAttribute('data-file');
    let pdf = `${filename}`;
   
    //check if the item exits on the cart
    if(!cart.includes(pdf)){
        //push to the cart array
        cart.push(pdf); 
        setCartItemIndexes(index)
        //create images using the files on the content
        generateCartItemThumbnail(target, type, file);
        //alert(`Item ${pdf} was added successfully to the cart`);
        //alert('Your item has been successfully to the cart');
        //console.log(cart);

        //close modal
        closeModal();
        //open cart
        cartBar.classList.add("show")

    }else{
        alert("The item is already in the cart");
    }
}

function setCartItemIndexes(indx){
    cartIndexes.push(indx);
    console.log(cartIndexes)
}


//--- generate the cart items thumbnail
function generateCartItemThumbnail(element, type, filename){
    //console.log(element)
    //get element attributes
    let file = element.getAttribute('data-file');
    let name = element.getAttribute('data-name');
    //create wrapper
    let thumbnailWrapper = document.createElement('div');
    thumbnailWrapper.classList.add('thumbnail-wrapper');
    //create thumbnail element
    let thumbnailSrc = element.getAttribute('data-thumbnail');
    let thumbnail = document.createElement('div');
    thumbnail.classList.add('cart-item');
    //console.log("CART FILE --->", filename)
    //thumbnail.setAttribute("style", `background-image:url('./../public/assets/${type}/images/${filename}/${thumbnailSrc}')`);
    thumbnail.setAttribute("style", `background-image:url('${filesPath}${thumbnailSrc}')`);

    //create remove handler element
    let removeButton = document.createElement('span');
    let removeButtonText = document.createTextNode('X');
    removeButton.classList.add('remove-cart-item');
    removeButton.setAttribute('data-file', `${file}`);
    removeButton.appendChild(removeButtonText);
    //append to the wrapper
    thumbnailWrapper.appendChild(removeButton);
    thumbnailWrapper.appendChild(thumbnail);
    //append to the items inside the cart element
    items.appendChild(thumbnailWrapper);
    //console.log(cart)
    //add event to the remove button
    removeButton.addEventListener('click', (e) => {
        //remove the cartItem wrapper from the DOM
        let grandParent = e.target.parentNode.parentNode;
        let parent = e.target.parentNode;
        grandParent.removeChild(parent);
        
        //filter out the file from the cart items        
        let _file = e.target.getAttribute('data-file');
        //console.log(_file);
        cart = cart.filter( item => item !== _file);         
        //console.log("FILTERED CART: ", cart);
    });
}

//
function addEventToBackArrow(){
    backArrow.addEventListener('click', (e) => {
        e.stopPropagation();

        sidebar.classList.remove('transformed');
        sidebar.classList.remove('widen');
        selectedAsset = '';
        sidebarTitle.innerHTML = 'Explore More'; 
        toggleSidebarOnAssetClick('hide', 300)
       
    });
}


//--- add event to the email button on the cart sidebar
function addEventToEmailButton(){
    emailButton.addEventListener('click', (e) => {
        console.log("CLICK EVENT")
        e.preventDefault();
        e.stopPropagation();
        keyboardWrapper.classList.add('show');
        toggleShowClass(overlay);   
        hideActiveSidebars();
        
    });
}

//--- add event to the close button on the keyboard modal
function addEventToCloseKeyboard(){
    closeKeyboard.addEventListener('click', (e) => {
        e.preventDefault();
        keyboardWrapper.classList.remove('show');
        toggleShowClass(overlay);   
    })
}

//--- add event to inputs
function addEventToInputs(){
    inputs.map(input => {
        input.addEventListener('click', (e) => {
            e.stopPropagation();
            //set the currentInput to add data to
            currentInput = e.target;
        })
    });
}

//--- add event to success button
function addEventToSuccessButton(){
    successButtonSubmit.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleShowClass(overlay);
        toggleShowClass(successMessage);
    })
}

//--- handle submit of the keyboard modal form
function addEventToCartSubmit(){
    cartSubmit.addEventListener('click', async(e) => {
        e.preventDefault();
         //get the form data
        let formData = new FormData(form);
        let userName = formData.get('name');
        let userEmail = formData.get('email');
        
        let cartObjects = [];
 
        cart.map((item, i) => {
           //break the book name
           let __item = item.split("/").pop();
           
           cartObjects.push({
            'title': Object.keys(config['resources'][cartIndexes[i]])[0],
            'document': __item
           });
        });

        //simple validation
        if(userName !== '' && userEmail !== ''){
            if(userEmail.includes('@')){
               //get the cart items for the user
               //console.log(cart);
               
               let request = {
                app: "Emerson Power Digital",
                name: userName,
                email: userEmail,
                files: cart,
                data: JSON.stringify(cartObjects)
               }

               console.log("REQUEST --------> ", request)

               //check if there are files to send
               if(request.files.length > 0){
                 //send the data
                 let response = await sendUserRequest(request);
               
                 if(response){
                    if(response.status == 200){
                        toggleShowClass(keyboardWrapper);
                        toggleShowClass(successMessage);    
                        resetApp();
                     }else{
                        alert("There was an error with the email service, please try again in a few moments...")
                     }
                 }else{
                    alert("Eloqua POD unreachable. Try again later");
                 }
                 
                 
               }else{
                alert('Your cart is empty, please add some files and try again');
               }
            }else{
                alert('Please verify the email is a valid email');
            }
        }else{
            //some field is empty
            alert("Please fill all fields on the form");
        }
    });
}

//--- handle request to server
function sendUserRequest(request){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };

    //check if theres an Eloqua POD available
    return fetch(EloquaUrl).then(response => response.json()).then((res) => {
        //console.log(res)
        if(res.response == '"Not authenticated."'){
            //not authenticated -- stop making calls
            return null;
        }else{
            //we are authenticated -- move on
            return fetch(url, requestOptions).then(response => response.json())
            .then(data => data);
        }
    });
}


//--- shows/hides the sidebars
function toggleSidebars(){
    handles.map(handle => {
        handle.addEventListener("click", (e) => {
            e.stopPropagation();
           let parent = e.target.parentNode;
           toggleShowClass(parent);
           resetMenubar();
             let _bubble = document.querySelector(".bubble");
            if(_bubble){
                //remove if one is found
               _bubble.remove();
            }
        });
    });
}

//--- hides the active sidebars when an item is selected on the map
function hideActiveSidebars(){
    bars.map(bar => {
        resetMenubar();
        bar.classList.remove('show');
    });
}

//--- adds events to the left sidebar elements
function addEventsToTypes(){
    types.map(type => {
        type.addEventListener('click', (e) => {
            e.stopPropagation();
           let currentType = type.getAttribute('data-type');    
           selectedAsset = currentType;    
           //console.log("SELECTED TYPE: ", selectedAsset)
           sidebar.classList.add('widen'); 
            if(selectedAsset == 'resources'){
                //sidebar.classList.add('widen'); 
                sidebarTitle.innerHTML = 'Resources'; 
            }
            if(selectedAsset == 'cases'){
                sidebarTitle.innerHTML = 'Case Studies'; 
            }

           toggleSidebarOnAssetClick('show', 300)
           generateContentForType(currentType);
        })
    });    
}

//---- get the fist five selected items from the datasource 
function getFirstFiveCases(){
   
    let _cases = config['cases']

    _cases.map((item) => {
        let key = Object.keys(item)[0];
        
        if(key == 'Coal Power Plant' || key == 'Nuclear Power Plant' || key == 'Gas Power Plant' || key == 'Solar Power' || key == 'Battery Energy Storage'){
            first_five.push(item);
        }
    });
  
}

//--- generates the content for the sidebar
function generateContentForType(currentType){
  
    typesAssets.innerHTML = '';
    //get the type data inside the config
    let dataItems = config[currentType];

    //console.log("------------>: ", dataItems)
    
   //set the first five selected items on the cases
    if(currentType == 'cases') {
        first_five.map((item, idx) => {
          let key = Object.keys(item)[0];
          //match the correct index on the config
          let index; 
          if(key == 'Coal Power Plant') {
            index = 1;
          }
          if(key == 'Nuclear Power Plant') {
            index = 2;
          }
          if(key == 'Gas Power Plant') {
            index = 5;
          }
          if(key == 'Solar Power') {
            index = 7;
          }
          if(key == 'Battery Energy Storage') {
            index = 11;
          }
                   
          let contents = item[key]['titles'];
          console.log(item[key])
          contents.map((c, i) => {
                let _n = c;
                typeText = _n;
                generateNavLinks(key, null, undefined, typeText, currentType, index, 0);
            })
               
        })
    }

    //add additional cases if the type is "cases" - old cases, still relevant
    if(currentType == 'cases') {
       
        //console.log("------------>: ", additional_cases)

        additional_cases.map((item, idx) => {
            console.log(item);
            //get the keys
            let key = Object.keys(item)[0];
            let contents = item[key]['titles'];
             contents.map((c, i) => {
                let _n = c;
                typeText = _n;
                
                generateNavLinks(key, null, undefined, typeText, "additional cases", idx, 0);
            })
        })
    }
    


    dataItems.map((item, idx) => {
     
        let typeText = '';
        //get the keys
        let key = Object.keys(item)[0];
        //get the properties
        let {files, book_type} = item[key];

        
        if(currentType == 'resources'){
           
            if(key == 'Waste-To-Energy' || key == 'Distribuited Energy Resources' || key == 'Geothermal Power Plant' ){
                console.log(`skipping ${key}`);
            }else{
                let contents = item[key]["content"];
                contents.map((c, i) => {
                    let n = c["title"];
                    typeText = `${n} `;
                    let file = files[i];
                    generateNavLinks(key, file, book_type, typeText, currentType, idx, i);
                });
            }
        }else{

            //skip the next items
            if(key == 'Coal Power Plant' || key == 'Nuclear Power Plant' || key == 'Gas Power Plant' || key == 'Solar Power' || key == 'Battery Energy Storage'){
               console.log(`skipping ${key}`);
            }else{
                //let caseIndex = (idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1);
                let contents = item[key]['titles'];
                //console.log("KEY ----------> ", key)

                contents.map((c, i) => {
                    let _n = c;
                    typeText = _n;
                    
                    generateNavLinks(key, null, book_type, typeText, currentType, idx, 0);
                })
            }

          
            
        }
    });
    
}

function generateNavLinks(key, file, book_type, typeText, currentType, idx, innerIdx){
    let pItem = document.createElement('p');
    let pItemText = document.createTextNode(typeText);
    pItem.setAttribute('data-name', key);
    pItem.setAttribute('data-type', currentType);
    pItem.setAttribute('data-index', idx);
    pItem.setAttribute('data-inner-index', innerIdx)
    pItem.appendChild(pItemText);
    
    if(currentType == 'resources'){
        let bookTypeText = document.createElement('span');
        let bookTypeTextNode = document.createTextNode("[" + book_type + "]");
        bookTypeText.appendChild(bookTypeTextNode);
        pItem.appendChild(bookTypeText)
    }

    typesAssets.appendChild(pItem);


    pItem.addEventListener('click', (e) => {
        e.stopPropagation();
        let name = e.target.getAttribute('data-name');
        let type = e.target.getAttribute('data-type');
        let index = e.target.getAttribute('data-index');
        let innerIdx = e.target.getAttribute('data-inner-index');
        //toggleSidebarWidth();
        hideActiveSidebars();
        toggleShowClass(overlay);   
        console.log(name, type, index, innerIdx)
        //    showModal(elementType, name, configIndex, null, 0);
        showModal(type, name, index, null, innerIdx);
    });
}


//--- adds the event to close the success modal after submit
function addEventToCloseSuccessModal() {
    closeSuccess.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleShowClass(successMessage);
        toggleShowClass(overlay);
      
    })
}


//--- adds the event to the close button on the modal
function addCloseEventToModalButton(){
    close.addEventListener(evHandler,(e) => {
        e.stopPropagation();
        closeModal();
       
    } );
}

function stopPropagationOnModal(){
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    })
}

//--- removes the show classes on modal and overlay
function closeModal(){
    modal.classList.remove('show');
    overlay.classList.remove('show'); 

    let _wrapperChild = document.querySelector("._wrapper .flipbook");
    _wrapperChild.style.pointerEvents = 'none';
  
    console.log(page.innerHTML, s, currentPage)
    console.log("RESET PAGES VALUES: ");
    page.innerHTML = 0 + "-" + 1;
    currentPage = 1;
  
    s = 0;
}

//--- HELPERS ----------------

function toggleSidebarOnAssetClick(action, time){

    if(action === 'hide'){
        typesSelector.classList.remove('hide');
            setTimeout(() => {
                typesSelector.style.display = 'block';  
            }, time);
           
            typesAssets.classList.remove('show');
            backArrow.classList.remove('show');
    }else{
        typesSelector.classList.add('hide');
        typesAssets.style.display = 'block';
        setTimeout(() => {
            //remove the types selector from the DOM
            typesSelector.style.display = 'none';
            //show the assets sidebar
            if(selectedAsset == 'resources'){
                sidebar.classList.add('widen');
            }
           
            typesAssets.classList.add('show');
            backArrow.classList.add('show');
        }, time);
    }
        
     let _bubble = document.querySelector(".bubble");
            if(_bubble){
                //remove if one is found
               _bubble.remove();
            }
}

function f(){
    typesAssets.addEventListener(evHandler, (e) => {
        e.stopPropagation();
    })

}


function addEventToMapHotspots(){
    
    mapResourcesHotspot.addEventListener(evHandler, (e) => {
        e.stopPropagation();
        //open the menu
        toggleShowClass(sidebar);
        //check the classes
        if(!sidebar.classList.contains('widen')){
            types[0].click();
            sidebar.classList.add('show')
        }else{
            resetMenubar();
        }
    });
    
    mapCasesHotspot.addEventListener(evHandler, (e) => {
        e.stopPropagation();
        //open the menu
        toggleShowClass(sidebar);
        if(!sidebar.classList.contains('widen')){
            types[1].click();
            sidebar.classList.add('show')
        }else{
            resetMenubar();
        }
    });
}

function formReset(){
    form.reset();
}

function resetMenubar(){
    if(sidebar.classList.contains('widen') && !sidebar.classList.contains('show')){
        //remove the class widen
        sidebar.classList.remove('widen')
        typesAssets.classList.remove('show');
        backArrow.classList.remove('show');
        typesSelector.classList.remove('hide'); 
        typesSelector.style.display = 'block';  
        sidebarTitle.innerHTML = 'Explore More'; 
     }
}

function toggleShowClass(__element){
    if(__element.classList.contains('show')){
        __element.classList.remove('show');
    }else{
        __element.classList.add('show');
    }
}

function clearOnDocumentClick(){
    document.addEventListener('click', () => {
        hideActiveSidebars();
        //check if there is a bubble already
        let _bubble = document.querySelector(".bubble");
        if(_bubble){
            //remove if one is found
        _bubble.remove();
        }
        //closeModal();
    });
}

