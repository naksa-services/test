$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top -50
        }, 1000);
        return false;
      }
    }
  });
});
    var lastScroll = 0;
var isScrolled = false;
window.addEventListener("scroll", function () {
  var topHeader = document.querySelector(".topheader");
  var currentScroll =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  var scrollDirection = currentScroll < lastScroll;
  var shouldToggle = isScrolled && scrollDirection;
  isScrolled = currentScroll > 100;
  topHeader.classList.toggle("activefx", shouldToggle);
  lastScroll = currentScroll;
});

$(".Click-here").on('click', function() {
  $(".custom-model-main").addClass('model-open');
}); 
$(".close-btn, .bg-overlay").click(function(){
  $(".custom-model-main").removeClass('model-open');
});














// TAB
// $(document).on('click', '.tab-wrap ul li a', function (e) {
//     var curTabContentId = $(this).attr('href');
//     $(this).parents('.tab-wrap').find('ul li').removeClass('active');
//     $(this).parents('li').addClass('active');
//     $(this).parents('.tab-wrap').find('.tab-content-id').removeClass('active');
//     $(curTabContentId).addClass("active");
//     e.preventDefault();
// });

// tabbed content
    // http://www.entheosweb.com/tutorials/css/tabs.asp
    $(".tab_content").hide();
    $(".tab_content:first").show();

  /* if in tab mode */
    $("ul.tabs li").click(function() {
    
      $(".tab_content").hide();
      var activeTab = $(this).attr("rel"); 
      $("#"+activeTab).fadeIn();    
    
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
    
    });
  /* if in drawer mode */
  $(".tab_drawer_heading").click(function() {
      
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).fadeIn();
    
    $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
    
    $("ul.tabs li").removeClass("active");
    $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
    });
  
  
  /* Extra class "tab_last" 
     to add border to right side
     of last tab */
  $('ul.tabs li').last().addClass("tab_last");

  // vars
'use strict'
var testim = document.getElementById("testim"),
    testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
    touchStartPos,
    touchEndPos,
    touchPosDiff,
    ignoreTouch = 30;
;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
    
    testim.addEventListener("touchstart", function(e) {
        touchStartPos = e.changedTouches[0].clientX;
    })
  
    testim.addEventListener("touchend", function(e) {
        touchEndPos = e.changedTouches[0].clientX;
      
        touchPosDiff = touchStartPos - touchEndPos;
      
        console.log(touchPosDiff);
        console.log(touchStartPos); 
        console.log(touchEndPos); 

      
        if (touchPosDiff > 0 + ignoreTouch) {
            testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
            testimRightArrow.click();
        } else {
          return;
        }
      
    })
}
function Listitemfilter(form){
  this.form = form;
  this.ele = this.form.querySelector('input');
  this.usetitles = (this.form.getAttribute('data-lif-use-titles') === 'true');
  this.needsPolyfillPlaceholder = (typeof this.ele.placeholder == 'undefined');

  var items = {
    eles: form.parentNode.getElementsByTagName('li'),
    text: []
  };

  this.init = function(){

    // Collect the list items
    if(items.eles.length > 0){

      // Pass search text from elements to a stored array
      for(var i = 0; i < items.eles.length; i++){

        var html = items.eles[i].innerHTML,
            main = '',
            title = '',
            all = [];

        // Isolate main element text
        main = html.replace(/<[^<>]+>/g,'');

        // Isolate title attribute text
        if(this.usetitles){

          // Isolate first title in html, replace commas with spaces, remove extra spaces
          title = html.match(/title="([^"]*)"/);
          if(title)
            title = title[1].replace(/\s*,\s*/g,' ').replace(/\s+/,' ');

        }

        // Combine text to be stored
        if(main != '')
          all.push(main);
        if(title != '')
          all.push(title);

        // Store text
        items.text.push(all.join(' '));

      }

      // Initialize the search box
      this.ele.addEventListener('keyup', this.handler);

      // Prevent the form from being submitted
      this.form.addEventListener('submit', this.preventSubmit);

      // Polyfill for IE9, input's placeholder attribute
      if(this.needsPolyfillPlaceholder){
        this.polyfillPlaceholder();
      }

    }
  };

  this.handler = function(e){
    
    var value = e.target.value,
        toShow = [],
        toHide = [],
        valuesToCheck = [];

    // Remove the commas and spaces at the ends of the search string
    value = value.replace(/^\s+/, '').replace(/\s+$/, '').replace(/,/g, '');

    if(value != ''){

      // Show only some items
      // If the search box has multiple words, search for them individually in addition to the whole value
      if(value.indexOf(' ') > 0){
        valuesToCheck = value.split(' ');
      }

      // Add the full value to the checked group
      valuesToCheck.push(value);

      // Loop through each stored item
      for(var i = 0; i < items.text.length; i++){

        var itemtext = items.text[i].toLowerCase(),
            found = false;

        // Compare each word in the search string to the item's searchable text
        for(var j = 0; j < valuesToCheck.length; j++){

          if(itemtext.indexOf(valuesToCheck[j]) > -1){

            // Show item
            toShow.push(items.eles[i]);
            found = true;
            break;

          }

        }

        // Hide unmatched stored items
        if(!found) {
          toHide.push(items.eles[i]);
        }

      }

    } else {

      // Show all items
      toShow = items.eles;

    }
    
    // Show and hide elements
    for(var i = 0; i < toShow.length; i++){
      toShow[i].style.display = '';
    }

    for(var i = 0; i < toHide.length; i++){
      toHide[i].style.display = 'none';
    }

  };

  this.preventSubmit = function(e){

    e.preventDefault();
    return false;

  };

  this.polyfillPlaceholder = function(){

    this.ele.value = this.ele.getAttribute('placeholder');
    this.ele.addEventListener('focus', this.polyfillPHFocus);
    this.ele.addEventListener('blur', this.polyfillPHBlur);

  };

  this.polyfillPHFocus = function(e){

    var placeholder = e.target.getAttribute('placeholder');
    if(e.target.value == placeholder){
      e.target.value = '';
    }

  };

  this.polyfillPHBlur = function(e){

    var placeholder = e.target.getAttribute('placeholder');
    if(e.target.value == ''){
      e.target.value = placeholder;
    }

  };

  this.init();
}

// For each instance of shortcode, create new list filter object
window.addEventListener('load', function(){

  var forms = document.querySelectorAll('form.listitem-filterbox');

  for(var i = 0; i < forms.length; i++){
    new Listitemfilter(forms[i]);
  }

});

$(window).on('load',function(){
  setTimeout(function(){ // allowing 3 secs to fade out loader
  $('.page-loader').fadeOut('slow');
  },4500);
});
function Listitemfilter(form){
  this.form = form;
  this.ele = this.form.querySelector('input');
  this.usetitles = (this.form.getAttribute('data-lif-use-titles') === 'true');
  this.needsPolyfillPlaceholder = (typeof this.ele.placeholder == 'undefined');

  var items = {
    eles: form.parentNode.getElementsByTagName('li'),
    text: []
  };

  this.init = function(){

    // Collect the list items
    if(items.eles.length > 0){

      // Pass search text from elements to a stored array
      for(var i = 0; i < items.eles.length; i++){

        var html = items.eles[i].innerHTML,
            main = '',
            title = '',
            all = [];

        // Isolate main element text
        main = html.replace(/<[^<>]+>/g,'');

        // Isolate title attribute text
        if(this.usetitles){

          // Isolate first title in html, replace commas with spaces, remove extra spaces
          title = html.match(/title="([^"]*)"/);
          if(title)
            title = title[1].replace(/\s*,\s*/g,' ').replace(/\s+/,' ');

        }

        // Combine text to be stored
        if(main != '')
          all.push(main);
        if(title != '')
          all.push(title);

        // Store text
        items.text.push(all.join(' '));

      }

      // Initialize the search box
      this.ele.addEventListener('keyup', this.handler);

      // Prevent the form from being submitted
      this.form.addEventListener('submit', this.preventSubmit);

      // Polyfill for IE9, input's placeholder attribute
      if(this.needsPolyfillPlaceholder){
        this.polyfillPlaceholder();
      }

    }
  };

  this.handler = function(e){
    
    var value = e.target.value,
        toShow = [],
        toHide = [],
        valuesToCheck = [];

    // Remove the commas and spaces at the ends of the search string
    value = value.replace(/^\s+/, '').replace(/\s+$/, '').replace(/,/g, '');

    if(value != ''){

      // Show only some items
      // If the search box has multiple words, search for them individually in addition to the whole value
      if(value.indexOf(' ') > 0){
        valuesToCheck = value.split(' ');
      }

      // Add the full value to the checked group
      valuesToCheck.push(value);

      // Loop through each stored item
      for(var i = 0; i < items.text.length; i++){

        var itemtext = items.text[i].toLowerCase(),
            found = false;

        // Compare each word in the search string to the item's searchable text
        for(var j = 0; j < valuesToCheck.length; j++){

          if(itemtext.indexOf(valuesToCheck[j]) > -1){

            // Show item
            toShow.push(items.eles[i]);
            found = true;
            break;

          }

        }

        // Hide unmatched stored items
        if(!found) {
          toHide.push(items.eles[i]);
        }

      }

    } else {

      // Show all items
      toShow = items.eles;

    }
    
    // Show and hide elements
    for(var i = 0; i < toShow.length; i++){
      toShow[i].style.display = '';
    }

    for(var i = 0; i < toHide.length; i++){
      toHide[i].style.display = 'none';
    }

  };

  this.preventSubmit = function(e){

    e.preventDefault();
    return false;

  };

  this.polyfillPlaceholder = function(){

    this.ele.value = this.ele.getAttribute('placeholder');
    this.ele.addEventListener('focus', this.polyfillPHFocus);
    this.ele.addEventListener('blur', this.polyfillPHBlur);

  };

  this.polyfillPHFocus = function(e){

    var placeholder = e.target.getAttribute('placeholder');
    if(e.target.value == placeholder){
      e.target.value = '';
    }

  };

  this.polyfillPHBlur = function(e){

    var placeholder = e.target.getAttribute('placeholder');
    if(e.target.value == ''){
      e.target.value = placeholder;
    }

  };

  this.init();
}
$(window).on('load',function(){
  setTimeout(function(){ // allowing 3 secs to fade out loader
  $('.page-loader').fadeOut('slow');
  },4000);
});

$('.showBtn').click(function() {
  if ($(this).hasClass('active')) {    
    $(this).removeClass('active');
    $('.hideme').slideUp();
  } else {
    $('.hideme').slideUp();
    $('.showBtn').removeClass('active');
    $(this).addClass('active');
    $(this).next().filter('.hideme').slideDown();
  }
});
// For each instance of shortcode, create new list filter object
window.addEventListener('load', function(){

  var forms = document.querySelectorAll('form.listitem-filterbox');

  for(var i = 0; i < forms.length; i++){
    new Listitemfilter(forms[i]);
  }

});


