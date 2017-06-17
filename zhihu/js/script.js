/*
* @Author: HuangXinxin
* @Date:   2017-01-31 13:46:37
* @Last Modified by:   HuangXinxin
* @Last Modified time: 2017-02-04 19:57:02
*/

'use strict';
window.onload=function(){
	var mess=document.getElementById("mess");
	var messageBox=document.getElementById("message-box");
	var divButton=document.getElementById("tab-head").getElementsByTagName("div");
	var tabContent=document.getElementsByClassName("tab-content");
	var backTop=document.getElementById("backTop");
	var zanCount=document.getElementsByClassName("zan-count");

	//点击消息按钮显示/隐藏消息框
	mess.onclick=function(event){
		if (messageBox.style.display=="block") {
			messageBox.style.display="none";
		}else{
			messageBox.style.display="block";
		}
		event.stopPropagation();
	}

	document.body.onclick=function(){
		if (messageBox.style.display=="block") {
			messageBox.style.display="none";
		}
	}
	//需要阻止事件冒泡
	for (var i = 0; i < divButton.length; i++) {
		divButton[i].index=i;
		divButton[i].onclick=function (event) {
			for (var j = 0; j< divButton.length; j++) {
				divButton[j].className="";
				tabContent[j].style.display="none";
			}
			this.className="cur";
			tabContent[this.index].style.display="block";
			//阻止事件冒泡至mess父元素
			event.stopPropagation();
		}
	}

	//简单点赞功能
	for (var i = 0; i < zanCount.length; i++) {
		zanCount[i].onclick=function(){
			this.innerText++;
		}
	}

	
	//返回顶端效果
	function scroll(){
		if (document.documentElement.scrollTop>800||document.body.scrollTop>800) {
			backTop.style.display="block";
		}else{
			backTop.style.display="none";
		}
	}

	function toTop(){
		var timer=setInterval(function(){
			if(document.documentElement.scrollTop==0&&document.body.scrollTop==0){
				clearInterval(timer);
			}
			else if (document.documentElement.scrollTop!=0) {
				document.documentElement.scrollTop-=100;
			}else if(document.body.scrollTop!=0){
				document.body.scrollTop-=100;
			}
		},20)
	}
	window.onscroll=scroll;
	backTop.onclick=toTop;
	
}