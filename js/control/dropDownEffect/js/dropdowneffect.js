(function($){
	$.DropDownEffect = function(){
		var self = this;

		this.dropDownById = function(strId){
			var windowH = Math.floor(window.WindowInf.getWindowHeight().height);
			var top = $("#" + strId).position().top;
			var strTargetH = $("#" + strId).height();
			
			var v = 0;
			var t = 10;
			var g = 0.005;
			var timer = setInterval(function(){
				top = top + v*t + 0.5*g*t*t;
				v = v + g*t;
				if(top+strTargetH >= windowH){
					v = -(v-0.3);
					top = windowH - strTargetH;
				}
				$("#" + strId).css("top", top + "px");
				console.log(v);
			}, t);

			// 监听数值抖动, 以比被监听的计时器时间多一秒较准确（验证得出的结论）；被监听数值最好是等差缩小
			var watchBIsKill = false;
			var watchCount = 0;
			var watchData_last_last = v;
			var watchData_last = v;
			var watchData_now = v;
			var wacthVTimer = setInterval(function(){
				watchData_last_last = watchData_last;
				watchData_last = watchData_now;
				watchData_now = v;
				if(watchData_last_last == watchData_now){
					watchCount++;
					if(watchCount > 1){
						clearInterval(timer);
						clearInterval(wacthVTimer);
					}
				}
				else{
					watchCount = 0;
				}
			}, 11);
		};
	};
})(jQuery);