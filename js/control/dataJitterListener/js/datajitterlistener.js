/*
* 监听数值抖动, 以比被监听的计时器时间多一秒较准确（验证得出的结论）；被监听数值最好是等差缩小
*/
(function($){
	$.DataJitterListener = function(){
		var self = this;

		this.dataJitterListener = function(data, timer, callback){
			var watchBIsKill = false;
			var watchCount = 0;
			var watchData_last_last = data;
			var watchData_last = data;
			var watchData_now = data;
			var wacthVTimer = setInterval(function(){
				watchData_last_last = watchData_last;
				watchData_last = watchData_now;
				watchData_now = data;
				if(watchData_last_last == watchData_now){
					watchCount++;
					if(watchCount > 8){
						clearInterval(timer);
						clearInterval(wacthVTimer);
						callback();
					}
				}
				else{
					watchCount = 0;
				}
			}, 11);
		};
	};
})(jQuery);
window.DataJitterListener = new $.DataJitterListener();