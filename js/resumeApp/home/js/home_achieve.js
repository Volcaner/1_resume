(function($){
	$.HomeAchieve = function(Parent){
		var self = this;
		var parent = Parent;

		// obj cache
		var objCache = {};

		// timer
		var infoTimer;
		var poetryTimer;
		var resizeTimer;

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

		this.dispose = function(){
			// obj cache
			objCache = {};

			// timer
			infoTimer;
			poetryTimer;
			resizeTimer;

			// object 封装 可更新的数据
			targetTop = {
				top: 0
			};

			// object 封装 可更新的数据
			bIsWheel = {
				bool: true
			};

			// object 封装 可更新的数据
			pageNum = {
				num: 0
			};
		};
		
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
					<div id="callMe" class="callMe_cls homeChild_cls"></div>\
				</div>\
				<div id="homePageLst" class="homePageLst_cls">\
					<div id="briefIntro_lst" class="homeLstChild_cls"><div></div></div>\
					<div id="aboutMe_lst" class="homeLstChild_cls"><div></div></div>\
					<div id="skill_lst" class="homeLstChild_cls"><div></div></div>\
					<div id="exper_lst" class="homeLstChild_cls"><div></div></div>\
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

			$(document).bind({
				mousewheel: function(ev){  // other browser
					// console.log("other browser");
					var upOrDown = undefined;
					var wheelDelta = ev.originalEvent.wheelDelta;
					if(wheelDelta && wheelDelta>0){
						upOrDown = "UP";
						self.mouseWheelUp("homePages", "homePageLst", upOrDown);

					}
					else if(wheelDelta && wheelDelta<0){
						upOrDown = "DOWN";
						self.mouseWheelDown("homePages", "homePageLst", upOrDown);

					}
				},
				DOMMouseScroll: function(ev){  // firefox browser
					// console.log("firefox browser");

					var upOrDown = undefined;
					var wheelDelta = ev.originalEvent.wheelDelta;
					if(wheelDelta && wheelDelta>0){
						upOrDown = "UP";
						self.mouseWheelUp("homePages", "homePageLst", upOrDown);

					}
					else if(wheelDelta && wheelDelta<0){
						upOrDown = "DOWN";
						self.mouseWheelDown("homePages", "homePageLst", upOrDown);

					}
				}
			});
		};

		this.drawHead = function(strHomeHead){
			var strHtml = '\
				<div id="headIntro" class="headIntro_cls"></div>\
				<div id="headList" class="headList_cls">\</div>\
				<div id="popOrderBox" class="popOrderBox_cls">\
					<img src="./js/resumeApp/home/img/arrowup.png">\
					<img src="./js/resumeApp/home/img/arrowdown.png">\
				</div>\
			';
			$("#" + strHomeHead).append(strHtml);

			$("#headIntro").css({"background":"url(./js/resumeApp/home/img/briefIntro.png)", "background-size":"20px 20px"});
			$("#headList").css({"background":"url(./js/resumeApp/home/img/order0.png)", "background-size":"20px 20px"});

			// headIntro:link to github
			$("#headIntro").click(function(){
				window.open('https://github.com/Volcaner');
			});

			// order
			var bIsShowOrder = true;
			$("#headList").click(function(){
				if(bIsShowOrder){
					bIsShowOrder = false;
					$(".popOrderBox_cls").css({"visibility": "visible"});
					$("#headList").css({"background":"url(./js/resumeApp/home/img/order1.png)", "background-size":"20px 20px"});
				}
				else{
					bIsShowOrder = true;
					$(".popOrderBox_cls").css({"visibility": "hidden"});
					$("#headList").css({"background":"url(./js/resumeApp/home/img/order0.png)", "background-size":"20px 20px"});
				}
			});

			// find img order
			$("#popOrderBox").find("img").eq(0).click(function(){
				self.mouseWheelUp("homePages", "homePageLst", "UP");
			});

			$("#popOrderBox").find("img").eq(1).click(function(){
				self.mouseWheelDown("homePages", "homePageLst", "DOWN");
			});
		};

		this.mouseWheelUp = function(strHomePages, strHomePageLst, upOrDown){
			if(bIsWheel.bool){
				if(pageNum.num>0){
					pageNum.num--;

					self.controlWheel(bIsWheel);

					// console.log(upOrDown);
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
						// console.log(WindowInf.getWindowWidthAndHeight().width);
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

		this.mouseWheelDown = function(strHomePages, strHomePageLst, upOrDown){
			if(bIsWheel.bool){
				var lstCount = $("#" + strHomePageLst + ">div").length;
				if(pageNum.num<lstCount-1){
					pageNum.num++;

					self.controlWheel(bIsWheel);

					// console.log(upOrDown);
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
					// $(window).resize(function(){	
					// 	clearTimeout(resizeTimer, poetryTimer);
					// 	resizeTimer = setTimeout(function(){
					// 		var strPageId = $("#" + strHomePages + ">div:eq(" + pageNum.num + ")").get(0).id;
					// 		self.drawPage(strPageId);
					// 	}, 1000);
					// });
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
						<p>Email：kaican93@163.com</p>\
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
					<div id="aboutMeTheme" class="title_cls">\
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
				<div id="skillPage" class="skillPage_cls">\
					<div id="skillTitle" class="title_cls">\
						<p>-技能栈-</p>\
					</div>\
				</div>\
			';
			$("#" + strPageId).append(strHtml);
			self.pageBounceEffect(strPageId)

			var obj = [
				{
					id: "html"
				},
				{
					id: "css"
				},
				{
					id: "js"
				},
				{
					id: "jQuery"
				},
				{
					id: "webpack"
				},
				{
					id: "npm"
				},
				{
					id: "json"
				},
				{
					id: "Ajax"
				},
				{
					id: "Vuejs"
				},
				{
					id: "Reactjs"
				},
				{
					id: "HTTP"
				},
				{
					id: "Nodejs"
				},
				{
					id: "PHP"
				},
				{
					id: "JSP"
				},
				{
					id: "Bootstrap"
				},
				{
					id: "Grunt"
				}
			];
			self.skillPageScatter("skillPage", obj);
			$(window).resize(function(){	
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function(){
					$("#scatterBox").remove();
					self.skillPageScatter("skillPage", obj);
				}, 200);
			});
		};

		this.skillPageScatter = function(strSkillPage, obj){
			var strHtml = '<div id="scatterBox" class="scatterBox_cls"></div>';
			$("#" + strSkillPage).append(strHtml);

			// bilud pic area: can scatter pictures
			var windowW = window.WindowInf.getWindowWidthAndHeight().width;
			var windowH = window.WindowInf.getWindowWidthAndHeight().height;

			var leftAreaLMin = 0;
			var leftAreaLMax = windowW/2 - 100 - 100;

			var rightAreaLMin = windowW/2 + 100;
			var rightAreaLMax = windowW - 100;

			var topMin = 0;
			var topMax = windowH - 100;

			// colors
			var colors = ["#20B2AA", "#8B8878", "#A020F0", "#CD3700", "#218868", "#9A32CD", "#CD0000", "#D02090", "#FF7F00"];
			var colors1 = ["#00B38C", "#00B0F0", "#82ABBA", "#A2B4BA", "#373E40"];

			// cache for click item
			var clickItem = undefined;

			// splice now clickitem
			var scatterObj = [];

			obj.forEach(function(item, index){
				$("#scatterBox").append('<div id=' + item.id + ' class="scatterPicBox_cls">\
						<p>' + item.id + '</p>\
					</div>');
				// $("#" + item.id).css({"border-color": colors1[Math.floor(colors1.length*Math.random())]});
				$("#" + item.id + ">p").css({"background": colors1[Math.floor(colors1.length*Math.random())]});



				// clack event
				$("#" + item.id + ">p").click(function(){
					// console.log(index + " : " + item.id);
					
					// cache for scatterObj
					scatterObj = [];
					obj.forEach(function(item, index){
						scatterObj.push(item);
					});

					// splice now clickitem
					scatterObj.splice(index, 1);

					// rescatter
					drawScatterPic(scatterObj);
					$("#" + item.id).animate({
						"border-radius": "5px", 
						"border-width": "5px", 
						"left": windowW/2 - 50 + "px",
						"top":  windowH/2 + "px",
						"width": "100px",
						"height": "100px"

					});
					$("#" + item.id + ">p").animate({
						"width": "80px",
						"height": "80px",
						"line-height": "80px"
					});
				});
			});

			// draw scatter
			var drawScatterPic = function(scatterObj){
				scatterObj.forEach(function(item, index){
					var itemTop = Math.floor(Math.random()*(topMax - topMin));
					var itemLALeft = Math.floor(Math.random()*(leftAreaLMax - leftAreaLMin));
					var itemRALeft = Math.floor(Math.random()*(rightAreaLMax - rightAreaLMin)) + rightAreaLMin;
					var itemW = Math.floor(Math.random()*30 + 80);
					var itemH = itemW;
					if(Math.random() < 0.5){
						$("#" + item.id).animate({
							"left": itemLALeft + "px", 
							"top": itemTop + "px", 
							"border-radius": "100px", 
							"border-width": "1px",
							"width": itemW + "px",
							"height": itemH + "px"
						});
						$("#" + item.id + ">p").animate({
							"width": itemW - 20 + "px",
							"height": itemH - 20 + "px",
							"line-height": itemH - 20 + "px"
						});
					}
					else{
						$("#" + item.id).animate({
							"left": itemRALeft + "px", 
							"top": itemTop + "px", 
							"border-radius": "100px", 
							"border-width": "1px",
							"width": itemW + "px",
							"height": itemH + "px"
						});
						$("#" + item.id + ">p").animate({
							"width": itemW - 20 + "px",
							"height": itemH - 20 + "px",
							"line-height": itemH - 20 + "px"
						});
					}
				});
			}
			drawScatterPic(obj);
		};

		this.drawExperPage = function(strPageId){
			var strHtml = '\
				<div ID="experPage" class="experPage_cls">\
					<div id="experTheme" class="title_cls">\
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
						// console.log(absClickCount + " " + obj.items[absClickCount].id);

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
						// console.log(absClickCount + " " + obj.items[absClickCount].id);

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
	            // console.log(mouseDown.x, mouseDown.y);
			}, 300, true));
			$("#itemBox").mouseup(self.debounce(function(e){
				var mouseDownX = mouseDown.x;
				var mouseDownY = mouseDown.y;
				e = e || window.event;
	            mouseUp.x = e.pageX || e.clientX + e.scrollLeft - e.clientLeft;
	            mouseUp.y = e.pageY || e.clientY + e.scrollTop - e.clientTop;
	            // console.log(mouseUp.x, mouseUp.y);
	            // console.log(mouseDownX, mouseDownY);
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
							// console.log(absClickCount + " " + obj.items[absClickCount].id);

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
							// console.log(absClickCount + " " + obj.items[absClickCount].id);

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

		// TODO:delete this method
		this.drawProductPage = function(strPageId){
			var strHtml = '\
				<div id="fff">fff</div>\
			';
			$("#" + strPageId).append(strHtml);
			self.pageBounceEffect(strPageId)
		};

		this.drawCallMePage = function(strPageId){
			var strHtml = '\
				<div id="callMePage" class="callMePage_cls">\
					<div id="callMeTitle" class="title_cls">\
						<p>-联系我-</p>\
					</div>\
					<div id="callMePoetry" class="callMePoetry_cls"></div>\
					<div id="callMeFoot" class="callMeFoot_cls">\
						<span>contact me</span>\
					</div>\
				</div>\
			';
			$("#" + strPageId).append(strHtml);
			self.pageBounceEffect(strPageId)

			// 已"。"结尾
			var obj = {
				title: "将进酒",
				content: "\
					君不见，黄河之水天上来，奔流到海不复回。\
					君不见，高堂明镜悲白发，朝如青丝暮成雪。\
					人生得意须尽欢，莫使金樽空对月。\
					天生我材必有用，千金散尽还复来。\
					烹羊宰牛且为乐，会须一饮三百杯。\
					岑夫子，丹丘生，将进酒，杯莫停。\
					与君歌一曲，请君为我倾耳听。\
					钟鼓馔玉不足贵，但愿长醉不复醒。\
					古来圣贤皆寂寞，惟有饮者留其名。\
					陈王昔时宴平乐，斗酒十千恣欢谑。\
					主人何为言少钱，径须沽取对君酌。\
					五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。"
			}
			self.addPoetry("callMePoetry", obj);

			// foot
			self.addCallFoot("callMeFoot", "callMeTitle", "callMePoetry");
		};

		this.addPoetry = function(strPageId, obj){
			// clear timer
			clearInterval(poetryTimer);

			var strHtml = '\
				<div id="poetryArea" class="poetryArea_cls">\
					<h3>' + obj.title + '</h3>\
					<ul></ul>\
				</div>\
			';

			$("#poetryArea>span").html(obj.title);
			$("#" + strPageId).append(strHtml);

			var arrContent = obj.content.split("。");
			var index = 0;
			if(arrContent.length > 0){
				arrContent.splice(arrContent.length-1, 1);
				// arrContent
				var _poetryFun = function(){
					var item = arrContent[index] + "。";
					// console.log(item);
					$("#poetryArea>ul:eq(0)").append('<li></li>');
					var curLength = 0;
					poetryTimer = setInterval(function(){
						if(curLength>item.length){
							clearInterval(poetryTimer);
							index++;
							if(index < arrContent.length){
								_poetryFun();
							}
						}
						else{
							curLength++;
							$("#poetryArea>ul:eq(0)>li:eq(" + index + ")").append(item.substring(curLength-1,curLength));
						}
					}, 20);
				};
				_poetryFun();
			}
		};

		this.addCallFoot = function(strFoot, strTitle, strPoetry){
			var bIsUpClick = true;
			$("#" + strFoot).click(function(){
				if(bIsUpClick){
					$("#" + strTitle).animate({top:"-12%"}, 1500);
					$("#" + strPoetry).animate({top:"-12%"}, 1500);
					$("#" + strFoot).animate({height:"50%"}, 500);

					// add qq weixin tel email
					$("#" + strFoot).append('<div id="tel" class="tel_cls"></div>');
					self.addTel("tel");

					bIsUpClick = false;
				}
				else{
					$("#" + strTitle).animate({top:"0px"}, 500);
					$("#" + strPoetry).animate({top:"0px"}, 500);
					$("#" + strFoot).animate({height:"30px"}, 500);

					// del qq weixin tel email
					$("#" + strFoot + ">div#tel").remove();

					bIsUpClick = true;
				}
			});
		};

		this.addTel = function(strTel){
			var strHtml = '\
				<ul>\
					<li>\
						<div id="qq" class="logo_cls"><img data-src="./js/resumeApp/home/img/qqpic.jpg" src="./js/resumeApp/home/img/qqLogo.jpg" /></div>\
						<strong>496310028</strong>\
					</li>\
					<li>\
						<div id="wechat" class="logo_cls"><img data-src="./js/resumeApp/home/img/wechatpic.jpg" src="./js/resumeApp/home/img/wechatLogo.jpg" /></div>\
						<strong>DAAIYG7777777</strong>\
					</li>\
					<li>\
						<div id="tel" class="logo_cls"><img data-src="" src="./js/resumeApp/home/img/telLogo.jpg" /></div>\
						<strong>15372016272</strong>\
					</li>\
					<li>\
						<div id="email" class="logo_cls"><img data-src="" src="./js/resumeApp/home/img/emailLogo.jpg" /></div>\
						<strong>kaican93@163.com</strong>\
					</li>\
				</ul>\
				<div id="QR_area" class="QR_cls"></div>\
			';
			$("#" + strTel).append(strHtml);

			$("#" + strTel).find("li").each(function(index, item){
				var target = $("#QR_area");
				var bIsUp = false;
				$("#" + strTel).find("li").eq(index).mousemove(function(){
					if(!bIsUp){
						// bIsUp
						bIsUp = true;

						// loading pic
						target.append('<img src="./js/resumeApp/home/img/loading.gif" />');
						target.css({visibility: "visible"});

						// change pic
						var tergetImg = target.find("img").eq(0);
						var img = new Image();
						img.onload = function(){
							tergetImg.attr("src", img.src);
						};
						var targetId = $("#" + strTel).find("li").eq(index).find(".logo_cls").attr("id");

						// var strUrl = "./js/resumeApp/home/img/" + targetId + "pic.jpg";
						// strUrl = strUrl.match(/http:\/\/.+/);
						var strUrl = $("#" + strTel).find("li").eq(index).find(".logo_cls>img").data("src");
						if(strUrl == null){
							return;
						}
						else{
							img.src = strUrl;
						}
					}
					else{
						return;
					}
				});
				$("#" + strTel).find("li").eq(index).mouseout(function(){
					if(bIsUp){
						// bIsUp
						bIsUp = false;

						// empty target
						target.empty();
						target.css({visibility: "hidden"});
					}
					else{
						return;
					}
				});
			});
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