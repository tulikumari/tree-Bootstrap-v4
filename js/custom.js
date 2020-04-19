(function($){
	$(document).ready(function(){
		
		// Scrollspy initiation
		$('body').scrollspy({ 
			target: '#scroll-spy',
			offset: 145
		});
	
		// On render, adjust body padding to ensure last Scroll target can reach top of screen
		var height = $('#howto').innerHeight();
		var windowHeight = $(window).height();
		var navHeight = $('nav.navbar').innerHeight();
		var siblingHeight = $('#howto').nextAll().innerHeight();
	
	
		if(height < windowHeight){
			$('body').css("padding-bottom", windowHeight-navHeight-height-siblingHeight + "px");
		}
	
		// On window resize, adjust body padding to ensure last Scroll target can reach top of screen
		$(window).resize(function(event){
			var height = $('#howto').innerHeight();
			var windowHeight = $(window).height();
			var navHeight = $('nav.navbar').innerHeight();
			var siblingHeight = $('#howto').nextAll().innerHeight();
			
			
			if(height < windowHeight){
				$('body').css("padding-bottom", windowHeight-navHeight-height-siblingHeight + "px");
			}
		});
		
		$('nav.navbar a, .scrollTop').click(function(event){
			// Make sure this.hash has a value before overriding default behavior
			if (this.hash !== "") {
				// Prevent default anchor click behavior
				event.preventDefault();
	
				// Store hash (#)
				var hash = this.hash;
				
				// Ensure no section has relevant class
				$('section').removeClass("focus");
	
				// Add class to target
				$(hash).addClass("focus");
	
				// Remove thy class after timeout
				setTimeout(function(){
					$(hash).removeClass("focus");
				}, 2000);			
				
		// Using jQuery's animate() method to add smooth page scroll
		// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
				$('html, body').animate({
					scrollTop: $(hash).offset().top - 100
				}, 600, function(){
					
					// Add hash (#) to URL when done scrolling (default click behavior)
					//window.location.hash = hash;				
				});
						
				// Collapse Navbar for mobile view
				$(".navbar-collapse").collapse('hide');			
			}
	
		});
		$(window).scroll(function(){
			var scrollPos = $(window).scrollTop();
			if(scrollPos > 0){
				$('header').addClass('sticky-header');
			} else{
				$('header').removeClass('sticky-header');
			}
			
		});

		function validateEmail(email) {
			var emailID = email;
			atpos = emailID.indexOf("@");
			dotpos = emailID.lastIndexOf(".");
			
			if (atpos < 1 || ( dotpos - atpos < 2 )) {            
			   return false;
			}
			return( true );
	   }
		
	    if($('#Book_form').length > 0) {
				$('#Book_form').submit(function(e){
				e.preventDefault();	
				
				var name = $(this).find("#full_name").val();
				var email = $(this).find("#email_add").val();
				var question = $(this).find("#question").val();
				
				var error = 0;
				
				filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				console.log("email2",name)
				if(email == " ") {
					error = 1;   
					$(this).find("#email_add").addClass("error_field");
				}
				if(!validateEmail(email)) {
					error = 1;   
					$(this).find("#email_add").addClass("error_field");
				} else $(this).find("#email_add").removeClass("error_field"); 
				
				if(error == 0) {
					$.ajax({
						context: this,
						type: "POST",
						url: "request_info_form.php",
						data: { 'name': name, 'email': email, 'question': question },
						success: function (data) {
						console.log("suc",data)
							if (data == "success"){
								$(this).find(".thankyou_txt").show();
								$(this).find('#full_name').val("");
								$(this).find('#email_add').val("");
								$(this).find('#question').val("");
							}
							
						}
					});
				}
				
			});
			
			$('#Book_form #email_add').focus(function(){
				console.log("focus");
				$(this).removeClass("error_field");
			});
		}

		if($('.signup_form').length > 0) {
			$('.signup_form').submit(function(e){
			e.preventDefault();	
			var fullName = $(this).find("#full_name").val();
			var email = $(this).find("#email_add1").val();
			var last_name = $(this).find("#last_name").val();
			
			var error = 0;
			
			filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			console.log("fullName",fullName)

			if(fullName == "") {
				error = 1;   
				$(this).find("#full_name").addClass("error_field");
			} else $(this).find("#full_name").removeClass("error_field"); 

			if(email == "") {
				error = 1;   
				$(this).find("#email_add1").addClass("error_field");
			}
			if(!validateEmail(email)) {
				error = 1;   
				$(this).find("#email_add1").addClass("error_field");
			} else $(this).find("#email_add1").removeClass("error_field"); 
			
			
			if(error == 0) {
				$.ajax({
					context: this,
					type: "POST",
					url: "signup_form.php",
					data: { 'name': fullName, 'email': email, 'last_name': last_name},
					success: (data) => {
					console.log("suc",data)
						if (data == "success"){
							$(this).find('.signup_error').html("");
							$(this).find(".thankyou_txt").show();
							$(this).find('#full_name').val("");
							$(this).find('#email_add1').val("");							
							$(this).find('#last_name').val("");
						} else {
							$(this).find('.signup_error').html(data);
						}
						
					}
				});
			}
			
		});	
		$('.signup_form #email_add1').focus(function(){
			console.log("focus");
			$(this).removeClass("error_field");
		});
	}
	   

	});
})(jQuery);