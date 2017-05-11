(function($){
	$.PicSwitchEffect = function(){
        var self = this;

        // init itemNo
        var itemNo = 0;

        // timer
        var turnLeftTimer;
        var turnRightTimer;

        this.init = function(strTargetId, obj){
            var strHtml = '\
                <div id="switchBox" class="switchBox_cls">\
                    <div id="turnBtn" class="turnBtn_cls">\
                        <div id="btnLeft" class="btnLeft_cls btn_cls"><p>&#139</p></div>\
                        <div id="btnRight" class="btnRight_cls btn_cls"><p>&#155</p></div>\
                    </div>\
                    <div id="itemBox" class="itemBox_cls"></div>\
                    <div id="orderBox" class="orderBox_cls"></div>\
                </div>\
            ';

            $("#" + strTargetId).append(strHtml);
            $("#itemBox").css("width", obj.length + "00%");
            var itemH = $("#" + strTargetId).width();

            obj.forEach(function(item, index){
                console.log(item, index);

                $("#itemBox").append('\
                    <div id=' + item.id + ' class="item_cls"></div>\
                ');
                $("#" + item.id).css("width", 100/obj.length + "%");
                self.addContent(item, index);

                $("#orderBox").append('\
                    <div id=' + item.id + "Order" + ' class="itemOrder_cls"><img src=' + item.img + ' /></div>\
                ');

                // order click
                $("#" + item.id + "Order").click(function(){
                    console.log(itemNo );
                });
            });

            // turn left right
            self.turnByOrder(obj);
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
                <div id="itemInfo" class="itemInfo_cls">' + item.link + '</div>\
            </div>';

             $("#" + item.id).append(strHtml);
        };

        this.turnByOrder = function(obj){
            var targetW = Math.floor($("#itemBox").width()/obj.length);

            // turn left
            $("#btnLeft").click(function(){
                var targetL = $("#itemBox").position().left;
                var speed = 0;

                if(Math.abs(targetL)+1 < targetW*(obj.length-1)){
                    turnLeftTimer = setInterval(function(){
                        speed-=10;
                        $("#itemBox").css("left", targetL + speed + "px");

                        if(speed <= -targetW){
                            $("#itemBox").css("left", targetL - targetW + "px");
                            clearInterval(turnLeftTimer);
                            itemNo++;
                            console.log("stop turn left ");
                        }
                    }, 10);
                    console.log("xixixi");
                }
                else{
                    console.log("dadada");
                }
               
            });

            // turn right
            $("#btnRight").click(function(){
                var targetL = $("#itemBox").position().left;
                var speed = 0;

                if(targetL+1 < 0){
                    turnRightTimer = setInterval(function(){
                        speed+=10;
                        console.log(targetL)
                        $("#itemBox").css("left", targetL + speed + "px");

                        if(speed >= targetW){
                            $("#itemBox").css("left", targetL + targetW + "px");
                            clearInterval(turnRightTimer);
                            itemNo--;
                            console.log("stop turn right ");
                        }
                    }, 10);
                }
                else{
                    console.log("dadada");
                }
                
            });
        };
    };
})(jQuery);