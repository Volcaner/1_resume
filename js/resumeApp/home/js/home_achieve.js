(function($){
	$.HomeAchieve = function(Parent){
		var self = this;
		var parent = Parent;

		// obj cache
		var objCache = {};

		// timer
		var infoTimer;
		
		this.initLayout = function(obj){
			// cache
			objCache = obj;

			// id
			var strHomeId = "home";

			var strHtml = '\
				<div id=' + strHomeId + ' class="home_cls"></div>\
			';
			$("#" + objCache.parentId).append(strHtml);

			self.slidePages(strHomeId);
		};

		this.slidePages = function(strHomeId){
			var strHtml = '\
				<div id="homePages" class="homePages_cls">\
					<div id="briefIntro" class="briefIntro_cls homeChild_cls"></div>\
					<div id="aboutMe" class="aboutMe_cls homeChild_cls"></div>\
					<div id="skill" class="skill_cls homeChild_cls"></div>\
					<div id="exper" class="exper_cls homeChild_cls"></div>\
					<div id="product" class="product_cls homeChild_cls"></div>\
					<div id="callMe" class="callMe_cls homeChild_cls"></div>\
				</div>\
				<div id="homePageLst" class="homePageLst_cls">\
					<div id="briefIntro_lst" class="homeLstChild_cls"><div></div></div>\
					<div id="aboutMe_lst" class="homeLstChild_cls"><div></div></div>\
					<div id="skill_lst" class="homeLstChild_cls"><div></div></div>\
					<div id="exper_lst" class="homeLstChild_cls"><div></div></div>\
					<div id="product_lst" class="homeLstChild_cls"><div></div></div>\
					<div id="callMe_lst" class="homeLstChild_cls"><div></div></div>\
				</div>\
				<div id="homeHead" class="homeHead_cls"></div>\
			';
			$("#" + strHomeId).append(strHtml);

			self.drawHead("homeHead");

			for(var i = 0; i < 6; i++){
				if(i == 0){
					$("#homePageLst>div:eq(" + i + ")>div").addClass("lstBg_cls");
					$("#homePageLst>div:eq(" + i + ")>div").css({
						"background":"url(./js/resumeApp/home/img/home_" + i + ".png)", 
						"background-size":"40px 40px", 
						"top":"0px"});	
					self.drawPage("briefIntro");
				}
				else{
					$("#homePageLst>div:eq(" + i + ")>div").addClass("lstBgDefault_cls");
				}
								
			};

			// object 封装 可更新的数据
			var targetTop = {
				top: 0
			};

			// object 封装 可更新的数据
			var bIsWheel = {
				bool: true
			};

			// object 封装 可更新的数据
			var pageNum = {
				num: 0
			};

			$(document).bind({
				mousewheel: function(ev){  // other browser
					// console.log("other browser");
					var upOrDown = undefined;
					var wheelDelta = ev.originalEvent.wheelDelta;
					if(wheelDelta && wheelDelta>0){
						upOrDown = "UP";
						self.mouseWheelUp("homePages", "homePageLst", upOrDown, bIsWheel, pageNum, targetTop);

					}
					else if(wheelDelta && wheelDelta<0){
						upOrDown = "DOWN";
						self.mouseWheelDown("homePages", "homePageLst", upOrDown, bIsWheel, pageNum, targetTop);

					}
				},
				DOMMouseScroll: function(ev){  // firefox browser
					// console.log("firefox browser");

					var upOrDown = undefined;
					var wheelDelta = ev.originalEvent.wheelDelta;
					if(wheelDelta && wheelDelta>0){
						upOrDown = "UP";
						self.mouseWheelUp("homePages", "homePageLst", upOrDown, bIsWheel, pageNum, targetTop);

					}
					else if(wheelDelta && wheelDelta<0){
						upOrDown = "DOWN";
						self.mouseWheelDown("homePages", "homePageLst", upOrDown, bIsWheel, pageNum, targetTop);

					}
				}
			});
		};

		this.drawHead = function(strHomeHead){
			var strHtml = '\
				<div id="headIntro" class="headIntro_cls"></div>\
				<div id="headList" class="headList_cls"></div>\
			';
			$("#" + strHomeHead).append(strHtml);

			$("#headIntro").css({"background":"url(./js/resumeApp/home/img/briefIntro.png)", "background-size":"20px 20px"});
			$("#headList").css({"background":"url(./js/resumeApp/home/img/order.png)", "background-size":"20px 20px"});
		};

		this.mouseWheelUp = function(strHomePages, strHomePageLst, upOrDown, bIsWheel, pageNum, targetTop){
			if(bIsWheel.bool){
				if(pageNum.num>0){
					pageNum.num--;

					self.controlWheel(bIsWheel);

					console.log(upOrDown);
					if(upOrDown=="UP"){
						// lst
						$("#" + strHomePageLst + ">div:eq(" + (pageNum.num+1) + ")>div").removeAttr("style");
						$("#" + strHomePageLst + ">div:eq(" + (pageNum.num+1) + ")>div").removeClass("lstBg_cls");
						$("#" + strHomePageLst + ">div:eq(" + (pageNum.num+1) + ")>div").addClass("lstBgDefault_cls");
						$("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").removeClass("lstBgDefault_cls");
						$("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").addClass("lstBg_cls");
						$("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").css({
							"background":"url(./js/resumeApp/home/img/home_" + pageNum.num + ".png)", 
							"background-size":"40px 40px", 
							"top":"40px"});	

						var delta = 2;
						var upTop = $("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").position().top;

						var upLstSet = setInterval(function(){
							upTop -= delta;
							if(upTop<=40 && upTop>=0){
								$("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").css("top", upTop);
							}
							else{
								clearInterval(upLstSet);
							}
						}, 10);

						// pages
						var speed = 10;
						var WindowH = WindowInf.getWindowWidthAndHeight().height;
						console.log(WindowInf.getWindowWidthAndHeight().width);
						// var WindowH = 40;
						var upPageTop = $("#" + strHomePages).position().top;

						if(upPageTop<0){
							var upPageH = targetTop.top + WindowH;
							var upPageSet = setInterval(function(){
								targetTop.top+=speed;
								if(targetTop.top<=upPageH){
									$("#" + strHomePages).css("top", targetTop.top);
								}
								else if(targetTop.top+speed>upPageH){
									targetTop.top = upPageH;
									$("#" + strHomePages).css("top", upPageH);
									clearInterval(upPageSet);
									
									var strLastPageId = $("#" + strHomePages + ">div:eq(" + (pageNum.num+1) + ")").get(0).id;
									$("#" + strLastPageId).empty();
									var strPageId = $("#" + strHomePages + ">div:eq(" + pageNum.num + ")").get(0).id;
									self.drawPage(strPageId);
								}
							}, 5);
							
						}
					}
				}
			}
		};

		this.mouseWheelDown = function(strHomePages, strHomePageLst, upOrDown, bIsWheel, pageNum, targetTop){
			if(bIsWheel.bool){
				var lstCount = $("#" + strHomePageLst + ">div").length;
				if(pageNum.num<lstCount-1){
					pageNum.num++;

					self.controlWheel(bIsWheel);

					console.log(upOrDown);
					if(upOrDown=="DOWN"){
						// Lst
						$("#" + strHomePageLst + ">div:eq(" + (pageNum.num-1) + ")>div").removeAttr("style");
						$("#" + strHomePageLst + ">div:eq(" + (pageNum.num-1) + ")>div").removeClass("lstBg_cls");
						$("#" + strHomePageLst + ">div:eq(" + (pageNum.num-1) + ")>div").addClass("lstBgDefault_cls");
						$("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").removeClass("lstBgDefault_cls");
						$("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").addClass("lstBg_cls");
						$("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").css({
							"background":"url(./js/resumeApp/home/img/home_" + pageNum.num + ".png)", 
							"background-size":"40px 40px", 
							"top":"-40px"});
						
						var deltaLst = 2;
						var downLstTop = $("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").position().top;

						var downLstSet = setInterval(function(){
							downLstTop += deltaLst;
							if(downLstTop<=0 && downLstTop>=-40){
								$("#" + strHomePageLst + ">div:eq(" + pageNum.num + ")>div").css("top", downLstTop);
							}
							else{
								clearInterval(downLstSet);
							}
						}, 10);

						// pages
						var speed = 10;
						var WindowH = WindowInf.getWindowWidthAndHeight().height;
						// var WindowH = 40;
						var downPageTop = $("#" + strHomePages).position().top;

						if(downPageTop>-WindowH*5){
							var downPageH = targetTop.top - WindowH;
							var downPageSet = setInterval(function(){
								targetTop.top-=speed;
								if(targetTop.top>=downPageH){
									$("#" + strHomePages).css("top", targetTop.top);
								}
								else if(targetTop.top-speed<downPageH){
									targetTop.top = downPageH;
									$("#" + strHomePages).css("top", downPageH);
									clearInterval(downPageSet);
									
									var strLastPageId = $("#" + strHomePages + ">div:eq(" + (pageNum.num-1) + ")").get(0).id;
									$("#" + strLastPageId).empty();
									var strPageId = $("#" + strHomePages + ">div:eq(" + pageNum.num + ")").get(0).id;
									self.drawPage(strPageId);
								}
							}, 5);
						}
					}
				}
			};
		};

		this.controlWheel = function(bIsWheel){
			bIsWheel.bool = false;
			setTimeout(function(){
				bIsWheel.bool = true;
			}, 500);
		};

		this.drawPage = function(strPageId){
			switch(strPageId){
				case "briefIntro":
					self.drawBriefIntroPage(strPageId);
					break;
				case "aboutMe":
					self.drawAboutMePage(strPageId);
					break;
				case "skill":
					self.drawSkillPage(strPageId);
					break;
				case "exper":
					self.drawExperPage(strPageId);
					break;
				case "product":
					self.drawProductPage(strPageId);
					break;
				case "callMe":
					self.drawCallMePage(strPageId);
					break;
				default: 
					break;
			}
		};

		this.drawBriefIntroPage = function(strPageId){
			var strHtml = '\
				<div id="briefIntroPage" class="page_cls">\
					<div id="briefIntroPic" class="briefIntroPic_cls">\
						<img src="./js/resumeApp/home/img/myself_0.png"/>\
					</div>\
					<div id="character" class="character_cls">\
						<p>工作态度好，轻微强迫症；好奇，爱问，有钻研精神；责任心，不干完活不撒手；团队合作意识强</p>\
						<p class="underline_cls">______________________________________________________________________________________</p>\
					</div>\
					<div id="information" class="information_cls">\
						<p>开灿 兰州大学本科</p>\
						<p>web前端 2年工作经验</p>\
						<p>TEL：15372016272</p>\
					</div>\
				</div>\
			';
			$("#" + strPageId).append(strHtml);
			self.pageBounceEffect(strPageId)

			var myselfPic = '';
			$("#briefIntroPic").append(myselfPic);
		};

		this.drawAboutMePage = function(strPageId){
			var strHtml = '\
				<div id="aboutMePage" class="page_cls">\
					<div id="aboutMeTheme" class="aboutMeTheme_cls">\
						<p>-关于我-</p>\
					</div>\
					<div id="aboutMeChart" class="aboutMeChart_cls">\
						<div id="aboutConcent" class="aboutConcent_cls">\
							<div id="aboutAge" class="aboutAge_cls contentChild_cls">\
								<img src="./js/resumeApp/home/img/age.png"/>\
								<p>年龄/23岁</p>\
							</div>\
							<div id="aboutDegree" class="aboutDegree_cls contentChild_cls">\
								<img src="./js/resumeApp/home/img/degree.png"/>\
								<p>学校/兰州大学本科</p>\
							</div>\
							<div id="aboutLoc" class="aboutLoc_cls contentChild_cls">\
								<img src="./js/resumeApp/home/img/location.png"/>\
								<p>坐标/杭州滨江</p>\
							</div>\
							<div id="aboutStatus" class="aboutStatus_cls contentChild_cls">\
								<img src="./js/resumeApp/home/img/status.png"/>\
								<p>状态/随时入职</p>\
							</div>\
						</div>\
					</div>\
					<div id="aboutMeDetail" class="aboutMeDetail_cls">\
						<p>基础知识牢固，华为工作一年， 从事前后台开发， 熟练使用 jQuery， 熟悉 Java</p>\
						<p>业务熟悉能力较强，毕业入职一周后就融入项目组中，开始代码整改、维护等工作</p>\
						<p>项目经验充足，多次完成独立模块的开发、联调、验收，问题单能日清日结，组织参与自动化测试工作</p>\
						<p>学习能力强， 能迅速适应新框架，喜欢钻研代码逻辑及业务知识</p>\
					</div>\
				</div>\
			';
			$("#" + strPageId).append(strHtml);
			self.pageBounceEffect(strPageId)
		};

		this.drawSkillPage = function(strPageId){
			var strHtml = '\
				<div id="hhh">hhh</div>\
			';
			$("#" + strPageId).append(strHtml);
			self.pageBounceEffect(strPageId)
		};

		this.drawExperPage = function(strPageId){
			var strHtml = '\
				<div ID="experPage" class="experPage_cls">\
					<div id="experTheme" class="experTheme_cls">\
						<p>-项目经验-</p>\
					</div>\
					<div id="experItem" class="experItem_cls"></div>\
				</div>\
			';
			$("#" + strPageId).append(strHtml);
			self.pageBounceEffect(strPageId)

			var obj = {
				itemWidth: 80,
				items: [
					{	
						id: "ipcrystal",
						img: "./js/resumeApp/home/img/ipcrystal0.png",
						itemName: "IPCrystal",
						info: "华为",
						link: '\
							<h3>IPCrystal</h3>\
							<p>将全球各地路由、站点等设备数据导入该系统，通过仿真在页面上展示设备、线路及负载等相关信息，来预测未来。</p>\
						'
					},
					{
						id: "jingning",
						img: "./js/resumeApp/home/img/jingning0.png",	
						itemName: "静宁精准扶贫系统",
						info: "静宁扶贫办",
						link: '\
							<h3>静宁精准扶贫系统</h3>\
							<p>帮助甘肃省静宁县制作全县扶贫网站，包括网站所有页面设计，以及录入和分类贫困户信息等。</p>\
						'
					},
					{
						id: "pengyang",
						img: "./js/resumeApp/home/img/pengyang0.png",
						itemName: "彭阳精准扶贫系统",
						info: "彭阳扶贫办",
						link: '\
							<h3>彭阳精准扶贫系统</h3>\
							<p>运用html+css、JS、ps、Sublimetext、excel等；网页中添加js等动态效果；输入数据量较大。</p>\
						'
					}
				]
			};

			if(GetBrowser.getBrowser().type == "IE"){
				var strHtml = '\
					<div id="rotateBySwitch" class="rotateBySwitch_cls"></div>\
				';
				$("#experItem").append(strHtml);
				var PicSwitchEffect = new $.PicSwitchEffect();
				PicSwitchEffect.init("rotateBySwitch", obj.items);
			}
			else{
				self.experItemSlide("experItem", obj);
			}
		};

		this.experItemSlide = function(strExperItem, obj){
			var strHtml = '\
				<div id="rotateBy3D" class="rotateBy3D_cls">\
					<div id="turningPics" class="turningPics_cls">\
						<div id="turningBtn" class="turningBtn_cls">\
							<div id="btnLeft" class="btnLeft_cls turnBtn_cls">&#8630</div>\
							<div id="btnRight" class="btnRight_cls turnBtn_cls">&#8631</div>\
						</div>\
						<div id="itemBox" class="itemBox_cls"></div>\
					</div>\
					<div id="itemInfo" class="itemInfo_cls"></div>\
				</div>\
			';
			$("#" + strExperItem).append(strHtml);

			// var _loop = function(i){
			// 	$("#itemBox").append('<div id=' + obj.items[i].id + ' class="item_cls"></div>');
			// 	$("#" + obj.items[i].id).css("transform-origin", "100px 100px -350px");
			// 	$("#" + obj.items[i].id).css("transform", "rotateY(" + (360/obj.items.length*i) + "deg)");
			// 	$("#" + obj.items[i].id).append(i+"0123456789");
			// 	$("#" + obj.items[i].id).click(function(){
			// 		console.log(i);
			// 	});
			// };

			if(obj.items && obj.items.length != 0){
				for(var i = 0; i < obj.items.length; i++){
					// _loop(i);
					with({b:i}){  // with
						$("#itemBox").append('<div id=' + obj.items[b].id + ' class="item_cls"></div>');
						$("#" + obj.items[b].id).css("transform", "rotateY(" + (360/obj.items.length*b) + "deg)");

						$("#" + obj.items[b].id).append('<div id="itempic" class="itempic_cls">\
								<img src=' + obj.items[b].img + ' />\
							</div>\
							<div id="itemtheme" class="itemtheme_cls">\
								<h5>' + obj.items[b].itemName + '</h5>\
								<p>' + obj.items[b].info + '</p>\
							</div>');

						// $("#" + obj.items[b].id).mouseover(function(){
						// 	$("#" + obj.items[b].id + ">div#itemtheme>h5").css({"color":"#00A0E9"});
						// 	// $("#" + obj.items[b].id + ">div#itemtheme>p").slideDown("slow");
						// });
						// $("#" + obj.items[b].id).mouseout(function(){
						// 	$("#" + obj.items[b].id + ">div#itemtheme>h5").css({"color":"#fff"});
						// 	// $("#" + obj.items[b].id + ">div#itemtheme>p").slideUp("slow");
						// 	// $("#" + obj.items[b].id + ">div#itemtheme>p").css({"dislplay":"none"});
						// });

						// $("#" + obj.items[b].id).click(function(){
						// 	console.log(b);
						// });
					}
				};
			}

			// 3D rotate
			var speed = 0;
			var clickCount = 0;
			$("#itemBox").css("transform", "rotateY(" + speed + "deg)");

			$("#itemInfo").append(obj.items[0].link);
			self.infoTimerEvent("#itemInfo");

			$("#btnLeft").click(self.debounce(function(){
				clickCount--;
				var itemSetInt = setInterval(function(){
					speed-=2;
					if(speed<=360/obj.items.length*clickCount){
						speed=360/obj.items.length*clickCount;
						clearInterval(itemSetInt);

						//
						if(clickCount <= -obj.items.length){
							clickCount = 0;
							speed = 0;
						}

						// clickCount
						if(clickCount > 0){
							var absClickCount = obj.items.length - clickCount;
						}
						else{
							var absClickCount = Math.abs(clickCount);
						}
						console.log(absClickCount + " " + obj.items[absClickCount].id);

						$("#itemInfo").empty();
						$("#itemInfo").append(obj.items[absClickCount].link);
						self.infoTimerEvent("#itemInfo");

					}
					$("#itemBox").css("transform", "rotateY(" + speed + "deg)");
				}, 10);
			}, 500, true));

			$("#btnRight").click(self.debounce(function(){
				clickCount++;
				var itemSetInt = setInterval(function(){
					speed+=2;
					if(speed>=360/obj.items.length*clickCount){
						speed=360/obj.items.length*clickCount;
						clearInterval(itemSetInt);

						//
						if(clickCount >= obj.items.length){
							clickCount = 0;
							speed = 0;
						}

						// clickCount
						if(clickCount > 0){
							var absClickCount = obj.items.length - clickCount;
						}
						else{
							var absClickCount = Math.abs(clickCount);
						}
						console.log(absClickCount + " " + obj.items[absClickCount].id);

						$("#itemInfo").empty();
						$("#itemInfo").append(obj.items[absClickCount].link);
						self.infoTimerEvent("#itemInfo");
					}
					$("#itemBox").css("transform", "rotateY(" + speed + "deg)");
				}, 10);
			}, 500, true));

			var mouseDown = {x: 0, y: 0};
			var mouseUp = {x: 0, y: 0};
			$("#itemBox").mousedown(self.debounce(function(e){
				e = e || window.event;
	            mouseDown.x = e.pageX || e.clientX + e.scrollLeft - e.clientLeft;
	            mouseDown.y = e.pageY || e.clientY + e.scrollTop - e.clientTop;
	            console.log(mouseDown.x, mouseDown.y);
			}, 300, true));
			$("#itemBox").mouseup(self.debounce(function(e){
				var mouseDownX = mouseDown.x;
				var mouseDownY = mouseDown.y;
				e = e || window.event;
	            mouseUp.x = e.pageX || e.clientX + e.scrollLeft - e.clientLeft;
	            mouseUp.y = e.pageY || e.clientY + e.scrollTop - e.clientTop;
	            console.log(mouseUp.x, mouseUp.y);
	            console.log(mouseDownX, mouseDownY);
	            if(mouseUp.x-mouseDownX>0){
					clickCount++;
					var itemSetInt = setInterval(function(){
						speed+=2;
						if(speed>=360/obj.items.length*clickCount){
							speed=360/obj.items.length*clickCount;
							clearInterval(itemSetInt);

							//
							if(clickCount >= obj.items.length){
								clickCount = 0;
								speed = 0;
							}

							// clickCount
							if(clickCount > 0){
								var absClickCount = obj.items.length - clickCount;
							}
							else{
								var absClickCount = Math.abs(clickCount);
							}
							console.log(absClickCount + " " + obj.items[absClickCount].id);

							$("#itemInfo").empty();
							$("#itemInfo").append(obj.items[absClickCount].link);
							self.infoTimerEvent("#itemInfo");
						}
						$("#itemBox").css("transform", "rotateY(" + speed + "deg)");
					}, 10);
	            }
	            else if(mouseUp.x-mouseDownX<0){
					clickCount--;
					var itemSetInt = setInterval(function(){
						speed-=2;
						if(speed<=360/obj.items.length*clickCount){
							speed=360/obj.items.length*clickCount;
							clearInterval(itemSetInt);

							//
							if(clickCount <= -obj.items.length){
								clickCount = 0;
								speed = 0;
							}

							// clickCount
							if(clickCount > 0){
								var absClickCount = obj.items.length - clickCount;
							}
							else{
								var absClickCount = Math.abs(clickCount);
							}
							console.log(absClickCount + " " + obj.items[absClickCount].id);

							$("#itemInfo").empty();
							$("#itemInfo").append(obj.items[absClickCount].link);
							self.infoTimerEvent("#itemInfo");

						}
						$("#itemBox").css("transform", "rotateY(" + speed + "deg)");
					}, 10);
	            }
			}, 300, true));
		};

		this.infoTimerEvent = function(strPid){
			["", "-ms-", "-moz-", "-webkit-", "-o-"].forEach(function(value, index){
				var infoSpeed = 0;
				var infoW = $(strPid).width();
				clearInterval(infoTimer);
				infoTimer = setInterval(function(){
					infoSpeed+=2;
					if(infoSpeed<=360){
						// $(strPid).css(value + "transform", "rotateY(" + infoSpeed + "deg)");
						$(strPid).css("opacity", infoSpeed/360);
						// $(strPid).css("left", Math.sin(Math.PI*infoSpeed/360)*infoW);
					}
					else{
						// $(strPid).css(value + "transform", "rotateY(" + 360 + "deg)");
						$(strPid).css("opacity", 1);
						// $(strPid).css("left", 0);
						clearInterval(infoTimer);
					}
				}, 10);
				
			});
		};

		this.drawProductPage = function(strPageId){
			var strHtml = '\
				<div id="fff">fff</div>\
			';
			$("#" + strPageId).append(strHtml);
			self.pageBounceEffect(strPageId)
		};

		this.drawCallMePage = function(strPageId){
			var strHtml = '\
				<div id="ddd">ddd</div>\
			';
			$("#" + strPageId).append(strHtml);
			self.pageBounceEffect(strPageId)
		};

		this.pageBounceEffect = function(strPageId){
			var strPageChildId = $("#" + strPageId + ">div:eq(0)").attr("id");
			$("#" + strPageChildId).css("top", "-100px");
			var DropDownEffect = new $.DropDownEffect();
			DropDownEffect.dropDownById(strPageChildId);
		};

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