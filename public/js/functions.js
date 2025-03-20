document.addEventListener("DOMContentLoaded", async() => {
    await fetchConfig();
    await fetchAssets();
    await bgPath();
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
    addNextEvent();
    addPrevEvent();
    inactiveTime();
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
    clearCart();
}


function setFullscreen(){
    fullscreen.addEventListener("click", () => {
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
}

//--- load turnjs
function loadTurnjs(id, displayMode){
    let oTurn = $(`#${id}`).turn({
        display: displayMode,
        acceleration: true,
        gradients: !$.isTouch,
        elevation:90,
        when: {
            turned: function(e, _page) {
                //console.log('Current view: ', $(this).turn('view'), _page);
                //page.innerHTML = $(this).turn('view')[0] + "-" + $(this).turn('view')[1];
                //
                //page.innerHTML = _page -1 + "-" + (parseInt(_page) + 1);
                //currentPage = _page;
                
                totalPages.innerHTML = currentImages.length;
                if($(this).turn('view')[0] == 0){
                    prevArrow.style.opacity = 0;
                }else{
                    prevArrow.style.opacity = 1;
                }

                //console.log(currentImages.length)

                if($(this).turn('view')[1] == currentImages.length){
                    nextArrow.style.opacity = 0;
                }else{
                    nextArrow.style.opacity = 1;
                }
            }   
        }
    });

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
        console.log("EVENT: ", e)
        e.preventDefault();
        oTurn.turn("previous");
    });

    nextArrow.addEventListener(evHandler, (e) => {
        console.log("EVENT: ", e)
        e.preventDefault();
        oTurn.turn("next");
    });
}


function addPrevEvent(){
    
    let prev = document.querySelector(".prev-page");
    prev.addEventListener(evHandler, () => {
        if(currentPage == 1) {
            page.innerHTML = 0 + "-" + 1;
        }else{
           s = s - 2;
           console.log("_____>: ", s)
           page.innerHTML = s + "-" + (s+ 1);
         
        }
        currentPage--;
    })
   

    prevArrow.addEventListener(evHandler, () => {
        if(currentPage == 1) {
            page.innerHTML = 0 + "-" + 1;
        }else{
           s = s - 2;
           console.log("_____>: ", s)
           page.innerHTML = s + "-" + (s+ 1);
         
        }
        currentPage--;
    })
}

function addNextEvent(){
    let next = document.querySelector(".next-page");
    next.addEventListener(evHandler, () => {
        let total = totalPages.innerHTML;
        console.log(currentPage, s)
        if(currentPage == 1) {
            s = 2;
            page.innerHTML = s + "-" + (s+1);
        }else{
          
           s = s + 2;
           //console.log(s+1, "TOTAL: ", total)
           if((s+1) == parseInt(total) || (s) == parseInt(total)){
             console.log("TOTAL: ", s);
             page.innerHTML = total;
           }else{
             page.innerHTML = s + "-" + (s+ 1);
           }
          
        }
        currentPage++;
    });

    nextArrow.addEventListener(evHandler, () => {
        let total = totalPages.innerHTML;
        console.log(currentPage, s)
        if(currentPage == 1) {
            s = 2;
            page.innerHTML = s + "-" + (s+1);
        }else{
          
           s = s + 2;
           //console.log(s+1, "TOTAL: ", total)
           if((s+1) == parseInt(total) || (s) == parseInt(total)){
             console.log("TOTAL: ", s);
             page.innerHTML = total;
           }else{
             page.innerHTML = s + "-" + (s+ 1);
           }
          
        }
        currentPage++;
    })
  
}


//--- init digital keyboard
function initKeyboard(){
    const Keyboard = window.SimpleKeyboard.default;

    const myKeyboard = new Keyboard({
      onKeyPress: (button) => onKeyPress(button),
    });
    
    function onKeyPress(button) {
        console.log(button)

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
  
        element.addEventListener(evHandler, (e) => {
            console.log("CLICKED HOTSPOT")
            e.stopPropagation();
            hideActiveSidebars();
            toggleShowClass(overlay);   
           if(elementType == 'resources'){
            selectedAsset = elementType;
            controls.style.display = 'flex';
           }else{
            selectedAsset = '';
             controls.style.display = 'none';
            }
            showModal(elementType, name, index, configIndex);
        });
    
}

//--- displays the modal on item click
async function showModal(type, name, index, configIndex){
  
    toggleShowClass(modal); 
    console.log(type, name, index)
    
    let _index = index;
    if(configIndex){
       let cases = config['cases'];
       await Promise.all(  
        cases.map((c,i) => {
            let key = Object.keys(c);
            //get the reference index
            if(configIndex== c[key]['index']){
                _index = i;
                console.log(configIndex, i)
            }
        })
     )
    }

    let controls = _wrapper.querySelector(".controls");
    if(type == 'resources'){
        selectedAsset = type;
        controls.style.display = 'flex';
       }else{
        selectedAsset = '';
        controls.style.display = 'none';
       }
    
    //extract the data
    let images = config[type][_index][name]['images'];
    let filename = config[type][_index][name]['file'];
    let content = config[type][_index][name]['content'];
    let cartImage = config[type][_index][name]['cart'];

    let cartThumb = "";

    if(cartImage){
        cartThumb = cartImage;
        
    }else{
        cartThumb = images[0];
    }

    //content
    generateFlipbookContent(images, type, filename);
    currentImages = images;
    currentType = type;
    currentFilename = filename;

    if(type == 'resources'){
        //generate the text content
        currentCartThumb = cartThumb;
        currentContent = content;
        currentIndex = index;
        generateTextContent(type, filename, content, cartThumb, index);
        mainTitle.innerHTML = config[type][index][name]['content']['main_title'];
    }else{
       // mainTitle.innerHTML = 'Case Study';
       console.log("CASES: ", config[type][_index][name]["title"])
       mainTitle.innerHTML = config[type][_index][name]["title"];
    } 
}

//--- uses the images passed to create "pages" for turnjs, and a new turnjs instance
async function generateFlipbookContent(images, type, filename){
    //turn js displayMode
    let displayMode = 'single';
    let _flipbook = _wrapper.querySelector(".flipbook");
    console.log(_wrapper.querySelector(".flipbook"))
    _wrapper.removeChild(_flipbook);
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
    if(type == 'cases'){
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
function generateTextContent(type, filename, content, thumbnail, idx){
    console.log("GENERATE CONTENT ---> ", filename, thumbnail)
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
    console.log(content.qr)
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
    let file = target.getAttribute('data-file');
    let pdf = `${filename}`;
    //check if the item exits on the cart
    if(!cart.includes(pdf)){
        //push to the cart array
        cart.push(pdf); 
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
        //alert("The item is already in the cart");
    }
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
    console.log("CART FILE --->", filename)
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
    console.log(cart)
    //add event to the remove button
    removeButton.addEventListener('click', (e) => {
        //remove the cartItem wrapper from the DOM
        let grandParent = e.target.parentNode.parentNode;
        let parent = e.target.parentNode;
        grandParent.removeChild(parent);
        
        //filter out the file from the cart items        
        let _file = e.target.getAttribute('data-file');
        console.log(_file);
        cart = cart.filter( item => item !== _file);         
        console.log("FILTERED CART: ", cart);
    });
}

//
function addEventToBackArrow(){
    backArrow.addEventListener('click', (e) => {
        e.stopPropagation();
       

        /*
        if(selectedAsset == 'resources'){
            sidebar.classList.remove('transformed');
            sidebar.classList.remove('widen');
            //selectedAsset = '';
        }
            */

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

        //simple validation
        if(userName !== '' && userEmail !== ''){
            if(userEmail.includes('@')){
               //get the cart items for the user
               console.log(cart);
               
               let request = {
                name: userName,
                email: userEmail,
                files: cart
               }
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

    /*
    //check if theres an Eloqua POD available
    return fetch(EloquaUrl).then(response => response.json()).then((res) => {
        console.log(res)
        if(res.response == '"Not authenticated."'){
            //not authenticated -- stop making calls
            return null;
        }else{
            //we are authenticated -- move on
            return fetch(url, requestOptions).then(response => response.json())
            .then(data => data);
        }
    });
    */
    return fetch(url, requestOptions).then(response => response.json())
            .then(data => data);
   
}


//--- shows/hides the sidebars
function toggleSidebars(){
    handles.map(handle => {
        handle.addEventListener("click", (e) => {
            e.stopPropagation();
           let parent = e.target.parentNode;
           toggleShowClass(parent);
           resetMenubar();
           

           /*
           if(sidebar.classList.contains('widen') && !sidebar.classList.contains('show')){
                sidebar.classList.add('transformed')
           }
           if(sidebar.classList.contains('widen') && sidebar.classList.contains('show')){
            sidebar.classList.remove('transformed')
           }
            */
           /*
            if(selectedAsset == 'resources'){
               if(sidebar.classList.contains('widen') && !sidebar.classList.contains('show')){
                sidebar.classList.add('transformed')
               }
               if(sidebar.classList.contains('widen') && sidebar.classList.contains('show')){
                sidebar.classList.remove('transformed')
               }
            }
            */
            
        });
    });
}

//--- hides the active sidebars when an item is selected on the map
function hideActiveSidebars(){
    bars.map(bar => {
       /*
        //if(selectedAsset == 'resources'){
            if(sidebar.classList.contains('widen') && !sidebar.classList.contains('show')){
                sidebar.classList.add('transformed')
            }
            if(sidebar.classList.contains('widen') && sidebar.classList.contains('show')){
                sidebar.classList.remove('transformed')
            }
        //}
*/
        resetMenubar();
        bar.classList.remove('show');
    });
}

//--- adds events to the left sidebar elements
function addEventsToTypes(){
    types.map(type => {
        type.addEventListener("click", (e) => {
            e.stopPropagation();
           let currentType = type.getAttribute('data-type');    
           selectedAsset = currentType;    
           console.log("SELECTED TYPE: ", selectedAsset)
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

//--- generates the content for the sidebar
function generateContentForType(currentType){
    
    typesAssets.innerHTML = '';
    //get the type data inside the config
    let dataItems = config[currentType];

    dataItems.map((item, idx) => {
        let typeText = '';
        //get the keys
        let key = Object.keys(item)[0];
        //get the properties
        let {file, book_type} = item[key];
       
        //generate the elements
        let pItem = document.createElement('p');
        //generate the text based on the type of asset
      
        if(currentType == 'resources'){
            let n = item[key]["content"]["title"];
            typeText = `${n} `;
        }else{
            //let caseIndex = (idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1);
            let _n = item[key]["title"];
            console.log(_n)
            //typeText= `Case Study ${caseIndex}`;
            typeText = _n;
        }
        let pItemText = document.createTextNode(typeText);
        pItem.setAttribute('data-name', key);
        pItem.setAttribute('data-type', currentType);
        pItem.setAttribute('data-index', idx)
        pItem.appendChild(pItemText);
        
        if(currentType == 'resources'){
            let bookTypeText = document.createElement('span');
            let bookTypeTextNode = document.createTextNode("[" + book_type + "]");
            bookTypeText.appendChild(bookTypeTextNode);
            pItem.appendChild(bookTypeText)
        }

        typesAssets.appendChild(pItem);
        //add event to the item
        pItem.addEventListener('click', (e) => {
            e.stopPropagation();
            let name = e.target.getAttribute('data-name');
            let type = e.target.getAttribute('data-type');
            let index = e.target.getAttribute('data-index');
            //toggleSidebarWidth();
            hideActiveSidebars();
            toggleShowClass(overlay);   
            showModal(type, name, index);
        });
        
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
    close.addEventListener("click",(e) => {
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

/*
    page.innerHTML = 0 + "-" + 1;
    s = 0;
    currentPage = 1;
    console.log("---------->", s);
*/

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
              //  sidebar.classList.add('widen');
            }
           
            typesAssets.classList.add('show');
            backArrow.classList.add('show');
        }, time);
    }
        
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
        //closeModal();
    });
}

