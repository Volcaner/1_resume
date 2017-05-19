(function($){
	$.PicSwitchEffect = function(){
        var self = this;

        // init curItemNo
        var curItemNo = 0;

        // timer
        var turnLeftTimer;
        var turnRightTimer;

        // 点击事件的防抖动
        var bIsClick = true;

        this.init = function(strTargetId, obj){
            var strHtml = '\
                <div id="switchBox" class="switchBox_cls">\
                    <div id="switchBtn" class="switchBtn_cls">\
                        <div id="switchBtnLeft" class="switchBtnLeft_cls defaultBtn_cls"><a>&lt</a></div>\
                        <div id="switchBtnRight" class="switchBtnRight_cls defaultBtn_cls"><a>&gt</a></div>\
                    </div>\
                    <div id="switchItemBox" class="switchItemBox_cls"></div>\
                    <div id="orderBox" class="orderBox_cls"></div>\
                </div>\
            ';

            $("#" + strTargetId).append(strHtml);

            var orderNum = 1;
            var switchBoxW = $("#switchBox").width();
            $("#orderBox").append('\
                <div id=' + "orderBox_" + orderNum + '>\
                    <div id=' + "orderBox_" + orderNum + "_Interlayer" + ' class="orderBox_interLayer_cls"></div>\
                </div>\
            ');
            $("#orderBox_" + orderNum).css({"width":switchBoxW + "px"});
            $("#orderBox_" + orderNum).addClass("orderBox_num_cls");
            obj.forEach(function(item, index){
                //item
                $("#switchItemBox").append('\
                    <div id=' + item.id + ' class="switchItem_cls"></div>\
                ');
                $("#" + item.id).css("width", 100/obj.length + "%");
                self.addContent(item, index);

                // order
                var orderW = $("#orderBox").width();
                var interLayerW = $("#orderBox_" + orderNum + "_Interlayer").width();
                var orderMarginL = parseInt($(".itemOrder_cls").css("marginLeft"));
                var childrenLength = 62*Math.floor((index+1)/orderNum);
                if(childrenLength > interLayerW){
                    $("#orderBox").css("width", "calc(100% + " + orderW + "px)");
                    orderNum++;
                    $("#orderBox").append('\
                        <div id=' + "orderBox_" + orderNum + '>\
                            <div id=' + "orderBox_" + orderNum + "_Interlayer" + ' class="orderBox_interLayer_cls"></div>\
                        </div>\
                    ');
                    $("#orderBox_" + orderNum).css({"width":switchBoxW + "px"});
                    $("#orderBox_" + orderNum).addClass("orderBox_num_cls");
                }

                // append order children
                $("#orderBox_" + orderNum + "_Interlayer").append('\
                    <div id=' + item.id + "Order" + ' class="itemOrder_cls"><img src=' + item.img + ' /></div>\
                ');

                // order click
                $("#" + item.id + "Order").click(function(){
                    if(bIsClick){
                        bIsClick = false;
                        setTimeout(function(){
                            bIsClick = true;
                        }, 800);

                        // turn after click order
                        self.turnByOrder(obj, index);
                    }
                });
            });

            // init status
            $("#switchItemBox").css("width", obj.length + "00%");
            $("#" + obj[curItemNo].id + "Order").addClass("OrderBeCheck_cls");

            // turn left right
            self.turnByBtn(obj);
        };

        this.addContent = function(item, index){
            var strHtml = '<div id="contentBox" class="contentBox_cls">\
                <div id="titlePic" class="titlePic_cls">\
                    <div id="picCon" class="picCon_cls">\
                        <img src=' + item.img + ' />\
                    </div>\
                    <div id="titleCon" class="titleCon_cls">\
                        <h3>' + item.info + '</h3>\
                    </div>\
                </div>\
                <div id="itemInfo" class="switchItemInfo_cls">' + item.link + '</div>\
            </div>';

             $("#" + item.id).append(strHtml);
        };

        this.turnByBtn = function(obj){
            var targetW = Math.floor($("#switchItemBox").width()/obj.length);
            
            // turn left
            $("#switchBtnRight").click(function(){
                if(bIsClick){
                    bIsClick = false;
                    setTimeout(function(){
                        bIsClick = true;
                    }, 800);

                    var count = 1;
                    self.turnRight(obj, targetW, count);
                }
            });

            // turn right
            $("#switchBtnLeft").click(function(){
                if(bIsClick){
                    bIsClick = false;
                    setTimeout(function(){
                        bIsClick = true;
                    }, 800);

                    var count = 1;
                    self.turnLeft(obj, targetW, count);
                }
               
            });
        };

        this.turnByOrder = function(obj, index){
            var targetW = Math.floor($("#switchItemBox").width()/obj.length);
            // var targetL = $("#switchItemBox").position().left;
            var count = Math.abs(index-curItemNo);

            if(index > curItemNo){ // turn right
                self.turnRight(obj, targetW, count);
            }
            else if(index < curItemNo){ // turn left
                self.turnLeft(obj, targetW, count);
            }
            else{
                // do nothing
            }
        };

        this.turnLeft = function(obj, targetW, count){
            var targetL = $("#switchItemBox").position().left;
            var speed = 0;

            if(targetL+1 < 0){
                $("#" + obj[curItemNo].id + "Order").removeClass("OrderBeCheck_cls");
                turnLeftTimer = setInterval(function(){
                    speed+=(10*count);
                    $("#switchItemBox").css("left", targetL + speed + "px");

                    if(speed >= targetW*count){
                        $("#switchItemBox").css("left", targetL + targetW*count + "px");
                        clearInterval(turnLeftTimer);
                        curItemNo-=count;
                        $("#" + obj[curItemNo].id + "Order").addClass("OrderBeCheck_cls");
                        console.log("stop turn right ");
                    }
                }, 10);
            }
            else{
                console.log("dadada");
            }
        };

        this.turnRight = function(obj, targetW, count){
            var targetL = $("#switchItemBox").position().left;
            var speed = 0;

            if(Math.abs(targetL)+1 < targetW*(obj.length-1)){
                $("#" + obj[curItemNo].id + "Order").removeClass("OrderBeCheck_cls");
                turnRightTimer = setInterval(function(){
                    speed-=(10*count);
                    $("#switchItemBox").css("left", targetL + speed + "px");

                    if(Math.abs(speed) >= count*targetW){
                        $("#switchItemBox").css("left", targetL - targetW*count + "px");
                        clearInterval(turnRightTimer);
                        curItemNo+=count;
                        $("#" + obj[curItemNo].id + "Order").addClass("OrderBeCheck_cls");
                        console.log("stop turn right ");
                    }
                }, 10);
                console.log("xixixi");
            }
            else{
                console.log("dadada");
            }
        } ;

        // 科学防抖，你值得拥有
        this.debounce = function(func, wait, immediate){  
            var timeout;  
            return function(){  
                var context = this,  
                      args = arguments;  
                var later = function(){  
                    timeout = null;  
                    if(!immediate) func.apply(context, args);  
                };  
                var callNow = immediate && !timeout;  
                if(!timeout){  
                    clearTimeout(timeout);  
                    timeout = setTimeout(later, wait);  
                }  
                if(callNow) func.apply(context, args);  
            };  
        };
    };
})(jQuery);