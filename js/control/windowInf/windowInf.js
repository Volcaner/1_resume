(function($) {
	$.WindowInf = function(){
		var self = this;
		this.ModuleName = "WindowInf";

		var windowWidth = $(document).width();
		var windowHeight = $(document).height();

		// $(window).resize(function(){
		// 	windowWidth = $(window).width();
		// 	windowHeight = $(window).height();
		// });

		this.getWindowWidthAndHeight = function(){
			var obj = {
				width: windowWidth,
				height: windowHeight
			};
			return obj;
		};

		this.getWindowWidth = function(){
			var obj = {
				width: windowWidth
			};
			return obj;
		};

		this.getWindowHeight = function(){
			var obj = {
				height: windowHeight
			};
			return obj;
		};
	};
})(jQuery);
window.WindowInf = new $.WindowInf();