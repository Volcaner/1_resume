(function($){
	$.HomeProcess = function(){
		var self = this;
		var achieve = new $.HomeAchieve(self);

		// obj cache
		this.objCache = {};
		
		this.init = function(obj){
			// cache
			self.objCache = obj;

			// initlayout
			achieve.initLayout(obj);
		};
	};
})(jQuery);