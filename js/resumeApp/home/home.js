(function($){
	$.Home = function(){
		var self = this;
		var HomeProcess = new $.HomeProcess();

		this.init = function(obj){
			// entry
			HomeProcess.init(obj);
		};
	};
})(jQuery);