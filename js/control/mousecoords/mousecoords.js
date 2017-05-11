/*
** 获取鼠标指针位置
** MouseCoords.getMouseCoords(ev).x
** MouseCoords.getMouseCoords(ev).y
** 
** 获取目标div位置
** $("#" + targetDivId).position().left
** $("#" + targetDivId).position().top
*/
(function($) {
	$.MouseCoords = function(){
		var self = this;

		this.getMouseCoords = function(ev){
			if(ev.pageX || ev.pageY){ 
				return {x:ev.pageX, y:ev.pageY}; 
			} 
			return { 
				x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
				y:ev.clientY + document.body.scrollTop - document.body.clientTop 
			}; 
		};
	};
})(jQuery);
// 全局变量，防止webpack构建后变成undefined
window.MouseCoords = new $.MouseCoords();