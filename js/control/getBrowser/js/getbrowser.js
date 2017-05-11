(function($){
	$.GetBrowser = function(){
		var self = this;

		this.getBrowser = function(){    
		     //判断浏览器版本  
		    var userAgent = window.navigator.userAgent;
		    var info = {
		    	type: "",
		    	version: ""
		    }; 
            var isOpera = userAgent.indexOf("Opera") > -1;  //判断是否Opera浏览器  
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;  //判断是否IE浏览器  
            var isEdge = userAgent.toLowerCase().indexOf("edge") > -1 && !isIE;  //判断是否IE的Edge浏览器  
            var isIE11 = (userAgent.toLowerCase().indexOf("trident") > -1 && userAgent.indexOf("rv") > -1);  
  
            if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {  
                tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);  
                info.type = tempArray[1];
                info.version = tempArray[2];  
            } 
            else if (isIE) {  
                var version = "";  
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");  
                reIE.test(userAgent);  
                var fIEVersion = parseFloat(RegExp["$1"]);  
                if (fIEVersion == 7) { 
                	version = "7"; 
                }  
                else if (fIEVersion == 8) { 
                	version = "8"; 
                }  
                else if (fIEVersion == 9) { 
                	version = "9"; 
                }  
                else if (fIEVersion == 10) { 
                	version = "10"; 
                }  
                else { 
                	version = "0" 
                }  

                info.type = "IE";
                info.version = version;

            } 
            else if (isEdge) {  
            	info.type = "Edge";
                info.version = null;
            } 
            else if (isIE11) {  
            	info.type = "IE";
                info.version = "11";
            } 
            else if (/[Cc]hrome\/\d+/.test(userAgent)) {  
                tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);  
                info.type = tempArray[1];
                info.version = tempArray[2];  
            } 
            else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {  
                tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);  
                info.type = tempArray[3];
                info.version = tempArray[1];  
            } 
            else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {  
                tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);  
                info.type = tempArray[1];
                info.version = tempArray[2];  
            } 
            else {  
                info += "unknown";  
            }  
            return info;  
        };   
	};
})(jQuery);
window.GetBrowser = new $.GetBrowser();