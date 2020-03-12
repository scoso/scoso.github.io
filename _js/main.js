$(function(){
  
  /*
     ___                          _ 
    / _ \___ _ __   ___ _ __ __ _| |
   / /_\/ _ \ '_ \ / _ \ '__/ _` | |
  / /_\\  __/ | | |  __/ | | (_| | |
  \____/\___|_| |_|\___|_|  \__,_|_|
                                  
  General/Global
  */

  // Get window width
  var windowWidth = $(window).width();
   
  $(window).resize(function() {
    windowWidth = $(window).width();
  });

  // Opening the alert on homepage - prototype only

  $('.alert').removeClass('closed');


	// Smooth Scrolling

  $('nav a[href*=#]:not([href=#]), #page_nav a[href*=#]:not([href=#]), .hphc-banner_highlight a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });


  // Expanding Links

  $('.expand-link').click(function(e){
    event.preventDefault();
    $(this).toggleClass('expand').children().toggleClass('rotate180');
  });


  // Location Services Links - prototype only

  $('.hphc-locator a').click(function(e){
    e.preventDefault();
    if ($(this).html == 'Use your current location') {

    } else {
      $('input[id="location"]').val('48 Main St., Newmarket, NH');
    }
  });


  // Load More Links - prototype only

  $('#load-more').click(function(e){
    e.preventDefault();
    var cards = $('.hphc-activity_card-wrapper .hphc-activity_card.hide');
    cards.slice( 0,6 ).removeClass('hide');
    var remainingCards = $('.hphc-activity_card-wrapper .hphc-activity_card.hide');
    if (remainingCards.length === 0) {
      $('#load-more').removeClass('carat-d');
      $('#load-more').html('No More Claims To Find').css({'cursor':'default', 'text-decoration':'none'});
    }
  });


  // Switch View Links

  $('.switch-view').click(function(e){
    e.preventDefault();
    if($(this).closest('section').attr('id') == "deductibles") {
      $('#deductibles').addClass('hide');
      $('#outofpocket').removeClass('hide');
      $(".switch-view").parent().toggleClass('active');
    } else if($(this).closest('section').attr('id') == "outofpocket") {
      $('#outofpocket').addClass('hide');
      $('#deductibles').removeClass('hide');
      $(".switch-view").parent().toggleClass('active');
    }
  });


  /*
       __            
    /\ \ \__ ___   __
   /  \/ / _` \ \ / /
  / /\  / (_| |\ V / 
  \_\ \/ \__,_| \_/  

  Navigation                  
  */
  
  
  // Main site nav

  $('#show-menu span').click(function(){
    $('#mobile_search').addClass('hide');
    $('#show-search').removeClass('search-open');
    $('body').removeClass('overlay-light fixed');
    $('.mobile_menu').toggleClass('hide');
    $('body').toggleClass('overlay fixed');
    $(this).parent().toggleClass('menu-open');
  });


  // Sidebar Fixed/Scrolling Navigation

  function checkOffset() {
    var navHeight = $('.hphc-side_rail').offset().top,
        pageSections = $('section[id]'),
        footer = $('.hphc-content_rail').offset().top + $('.hphc-content_rail').height(),
        headerHeight = $('nav').height() + $('.hphc-header').height() + 20;
        
    // as right nav scrolls to footer, once it is 10px above it will add css classes to the nav
    if($(window).scrollTop() >= headerHeight) {
      $('.hphc-side_rail').addClass('fixed');
    } 
    if (navHeight >= footer - $('.hphc-side_rail').height()) {
      $('.hphc-side_rail').removeClass('fixed');
      $('.hphc-side_rail').addClass('bottom');
    }

    // restore right nav styles when you scroll up
    if ($(window).scrollTop() <= headerHeight) {
      $('.hphc-side_rail').removeClass('fixed');
    }
    if ($('.hphc-side_rail').hasClass('bottom') && $(window).scrollTop() <= $('.hphc-side_rail').offset().top) {
      $('.hphc-side_rail').removeClass('bottom'); 
      $('.hphc-side_rail').addClass('fixed');
    }
    
    // checks each section to see if right nav has passed the top of it. If it has, add a selected class to that list item
    // and remove any others that were present.
    $(pageSections).each(function(index) {
      var id = '#' + $(this).attr('id');
      if(navHeight >= $(this).offset().top ) {
        $('#page_nav li').removeClass('selected');
        $('#page_nav a[href='+ id +']').parent().addClass('selected');
      }
    });   
  } 

  if ($('body').hasClass('jump-nav')) {
    $(document).scroll(function() {
      checkOffset();
    });
  }

  /*
    Navigation Search
  */

  // Desktop
  $('#search-bar').click(function(){
    $('.searchbox').animate({
      width: 'toggle',
    }, 300, function() {
      $('.searchbox-input').focus();
    });
    $('.search-container').addClass('open');
  });

  $( ".searchbox" ).submit(function( event ) {
    if ($('.searchbox-input').val() === '') {
      event.preventDefault();
      $('.searchbox').animate({
        width: 'toggle',
      }, 300, function() {
        $('.search-container').removeClass('open');
      });
    }
  });

  // Mobile

  $('#show-search').click(function(){
    $('#mobile_search').toggleClass('hide');
    $('#show-search').toggleClass('search-open');
    $('body').removeClass('overlay fixed');
    $('.mobile_menu').addClass('hide');
    $('#show-menu').removeClass('menu-open');
    $('body').toggleClass('overlay-light fixed');
  });

  /*
     __             _        
    / /  ___   __ _(_)_ __   
   / /  / _ \ / _` | | '_ \  
  / /__| (_) | (_| | | | | | 
  \____/\___/ \__, |_|_| |_| 
              |___/          
    
  Login Form
  */

  //Show password
    var $input = $("#password");
    $("#showpass").click(function () {
    	event.preventDefault();
      var change = "";
      if ($(this).hasClass('checked')) {
        $(this).html('Show password <span class="screen-reader-text">– this unmasks the password for mobile users</span>');
        $(this).removeClass('checked');
        change = "password";
      } else {
        $(this).addClass('checked');
        $(this).html('Hide password <span class="screen-reader-text">– this masks the password for mobile users</span>');
        change = "text";   
      }
      var rep = $("<input type='" + change + "' />")
        .attr("id", $input.attr("id"))
        .attr("name", $input.attr("name"))
        .attr('class', $input.attr('class'))
        .val($input.val())
        .insertBefore($input);
      $input.remove();
      $input = rep;
    }).insertAfter($input);

  /*
     _                         _ _             
    /_\   ___ ___ ___  _ __ __| (_) ___  _ __  
   //_\\ / __/ __/ _ \| '__/ _` | |/ _ \| '_ \ 
  /  _  \ (_| (_| (_) | | | (_| | | (_) | | | |
  \_/ \_/\___\___\___/|_|  \__,_|_|\___/|_| |_|

  Accordion (Discounts Page)
  */

  if ($('body').hasClass('discounts')) {
    if (windowWidth < 850) {
      $(".accordion > ul").remove();
      $(".accordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content",
        autoHeight: false,
      });
    } else {
      $(".tabs > h3").remove();
      $( ".tabs" ).tabs({
        active: 0
      }).addClass( "ui-tabs-vertical ui-helper-clearfix" );
      $( ".tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    }

    // adding and removing active states for sections
    
    var accordionHeader = $('.ui-accordion-header');
    $(accordionHeader).click(function(){
      $(accordionHeader).removeClass('rotate180');
      $(this).toggleClass('rotate180');
    });

    $(document).on('click', function(event) {
      if (!$(event.target).closest('.ui-accordion-header-active').length && !$(event.target).closest('.ui-accordion-content-active').length && !$(event.target).closest('#hphc-right_nav').length) {
        $(accordionHeader).removeClass('rotate180');
        $( ".accordion" ).accordion( "option", "active", false );
      } 
    });
  }

  $('#hphc-left_nav li a').click(function(e){
    e.preventDefault();
    return false;
  });

  /*
     ___                _           _               
    / __\___  _ __ ___ | |__   ___ | |__   _____  __
   / /  / _ \| '_ ` _ \| '_ \ / _ \| '_ \ / _ \ \/ /
  / /__| (_) | | | | | | |_) | (_) | |_) | (_) >  < 
  \____/\___/|_| |_| |_|_.__/ \___/|_.__/ \___/_/\_\

  Combobox - Dropdown/Typeahead
  */

  $('.combobox').select2({
    placeholder: "Type to search",
  });

  /*
     ___ _ _ _                                      
    / __(_) | |_ ___ _ __    /\/\   ___ _ __  _   _ 
   / _\ | | | __/ _ \ '__|  /    \ / _ \ '_ \| | | |
  / /   | | | ||  __/ |    / /\/\ \  __/ | | | |_| |
  \/    |_|_|\__\___|_|    \/    \/\___|_| |_|\__,_|
                                                    
  Filter Menu
  */

  // Slideout Animation
  
  $("#filter").click(function() {
    $(".hphc-filter_menu").addClass('slideOut');
    $('body, html').addClass('fixed');
  });

  // Clear all fields
  $("#clear").click(function() {
    $('form').trigger("reset");
  });

  // "Apply" Filters (Close menu)
  $("#apply").click(function() {
    $(".hphc-filter_menu").removeClass('slideOut');
    $('body, html').removeClass('fixed');
  });

   /*
   _____            _ _   _            
  /__   \___   ___ | | |_(_)_ __  ___  
    / /\/ _ \ / _ \| | __| | '_ \/ __| 
   / / | (_) | (_) | | |_| | |_) \__ \ 
   \/   \___/ \___/|_|\__|_| .__/|___/ 
                           |_|         
  Tooltips
  */

  $(".tooltip-link").mouseover(function(){
    $(this).find(".tooltip").attr("aria-hidden","false");
  });
  
  $(".tooltip-link").mouseleave(function(){
    $(this).find(".tooltip").attr("aria-hidden","true");
  });
  
  $(".tooltip-link").focus(function(){
    $(this).find(".tooltip").attr("aria-hidden","false");
  });
  
  $(".tooltip-link").focusout(function(){
    $(this).find(".tooltip").attr("aria-hidden","true");
  });
  
  $(".tooltip-link").keydown(function(ev){
    if (ev.which ==27) {
    $(this).find(".tooltip").attr("aria-hidden","true");
    ev.preventDefault(); 
    return false;
    }
  });

   /*
     __             _                  _____            _  
    / /  ___   ___ | | ___   _ _ __   /__   \___   ___ | | 
   / /  / _ \ / _ \| |/ / | | | '_ \    / /\/ _ \ / _ \| | 
  / /__| (_) | (_) |   <| |_| | |_) |  / / | (_) | (_) | | 
  \____/\___/ \___/|_|\_\\__,_| .__/   \/   \___/ \___/|_| 
                              |_|                         
  */

  // Mobile
  $('.lookup-form > div:first-of-type').click(function(){
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
    } else {
      $('.lookup-form > div:first-of-type').removeClass('active');
      $('.lookup-form').removeClass('active');
      $(this).parent().addClass('active');
    }
  });

  $('.lookup-form > div:first-of-type').keydown(function(event){
    if (event.keyCode == 32) {
      var pressed = event.target.getAttribute("aria-pressed") == "true";
      event.target.setAttribute("aria-pressed", pressed ? "false" : "true");
      event.preventDefault();
      if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
      } else {
        $('.lookup-form > div:first-of-type').removeClass('active');
        $('.lookup-form').removeClass('active');
        $(this).parent().addClass('active');
        $('.active form input').focus();
      }
    }
  });

  //Desktop
  $('.topic-tags div').click(function(){
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('.lookup-forms .form').removeClass('active');
    } else {
      $('.topic-tags div').removeClass('active');
      var formClass = $(this).attr('id');
      $(this).addClass('active');
      $('.lookup-forms .form').removeClass('active');
      $('.lookup-forms .form.'+formClass+'').addClass('active');
    }
  });

  $('.topic-tags div').keydown(function(event){
    if (event.keyCode == 32) {
      var pressed = event.target.getAttribute("aria-pressed") == "true";
      event.target.setAttribute("aria-pressed", pressed ? "false" : "true");
      event.preventDefault();
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('.lookup-forms .form').removeClass('active');
      } else {
        $('.topic-tags div').removeClass('active');
        var formClass = $(this).attr('id');
        $(this).addClass('active');
        $('.lookup-forms .form').removeClass('active');
        $('.lookup-forms .form.'+formClass+'').addClass('active');
        $('.lookup-forms .form.active input').focus();
      }
    }
  });


  // Drug Lookup
  $('.drug-lookup').submit(function( event ) {
    $('.drug-results').css({'display':'block', 'visibility':'visible'});
    return false;
  });

  $('.drug-results span').click(function(){
    $('.drug-results').removeAttr('style');
  });

  // Filter Form
  $('#filter_form').submit(function(event){
    event.preventDefault();
    $('.filter-results').addClass('active');
  });

   $('.filter-results .result a').click(function(e){
    e.preventDefault();
    $('.hphc-filter_block').hide();
    $('.filter-results').removeClass('active');
    $('#applied-filter').addClass('active');
   });

   $('#applied-filter a').click(function(e){
    e.preventDefault();
    $('.hphc-filter_block').show();
    $('#applied-filter').removeClass('active');
   });


});