/*!
 * Plugin do jQuery slideMosaic
 * Arrisco - Publicidade e Design, Lda
 * Copyright (c) Arrisco - Publicidade e Design, Lda
 * Version: 0.01 (21-10-2010)
 * Licenciado em MIT e GPL3.
 * Testado: jQuery v1.4.4 ou superior
 */


(function($){
	jQuery.fn.zoomover = function(settings){
		// Settings default
		
		var element = this;
		var img = new Image();
		var imageWidth;
		var imageHeight;
		var widthRatio = 1;
		var heightRatio = 1;
		var thumbWidth;
		var thumbHeight;
		var thumbLeft;
		var thumbTop;
		
		settings = jQuery.extend({
                                            currentImage: '',
                                            animationUp: 100,
                                            maxImageWidth: 300,
                                            maxImageHeight: 300
                                            },
                                            settings);


		var createDelegate = function(object, method){
		    return function(){
		        return method.apply(object, arguments);
		    };
		};

		var img_onload = function(){
			imageWidth = this.width;
			imageHeight = this.height;
			
			if(imageWidth > settings.maxImageWidth){
				widthRatio = settings.maxImageWidth / imageWidth;
			}
			
			if(imageHeight > settings.maxImageHeight){
				heightRatio = settings.maxImageHeight / imageHeight;
			}
			
			if(widthRatio < heightRatio){
				imageWidth = parseInt(imageWidth * widthRatio);
				imageHeight = parseInt(imageHeight * widthRatio);
			}else{
				imageWidth = parseInt(imageWidth * heightRatio);
				imageHeight = parseInt(imageHeight * heightRatio);
			}
			
			
			
			imageZoom();
			
		};


		var imageDimensions = function(){
			img.onload = createDelegate(img, img_onload);
			img.src = settings.currentImage;
		};
		
		var imageZoom = function(){
			
			$('.zoomOverContainer').remove();
			
			$('body').stop().prepend('<img class="zoomOverContainer" src="'+settings.currentImage+'" alt="zoom" width="'+thumbWidth+'" height="'+thumbHeight+'" />');
			
			$('.zoomOverContainer').mouseout(function(){
				$('.zoomOverContainer').remove();
			});
			
			$('.zoomOverContainer').css('top', thumbTop);
			$('.zoomOverContainer').css('left', thumbLeft);
			
			var widthDiference = parseInt((imageWidth - thumbWidth) /2);
			var toTheLeft = parseInt(thumbLeft - widthDiference);
			
			var heightDiference = parseInt((imageHeight - thumbHeight) /2);
			var fromTheTop = parseInt(thumbTop - heightDiference);
			
			$('.zoomOverContainer').animate({'height': imageHeight, 'width': imageWidth, 'left': toTheLeft, 'top': fromTheTop}, settings.animationUp);
			
		};

		element.each(function(i){

			
			
			$(this).hover(function(){
				settings.currentImage = $(this).attr('data-bigimage');
				thumbWidth  = $(this).width();
				thumbHeight = $(this).height();
				
				thumbLeft = $(this).position().left;
				thumbTop = $(this).position().top;
				imageDimensions();
			});
			
		});

		return jQuery;
	};
})(jQuery);
