/*
* @Author: HuangXinxin
* @Date:   2017-01-17 08:56:47
* @Last Modified by:   HuangXinxin
* @Last Modified time: 2017-01-19 19:27:38
*/

$(document).ready(function(){
	// 卖家促销下拉列表效果
	$(".on-sale-div").mouseover(function(){
		$(this).find(".drop-div").stop(true,true).slideDown("fast");
	});
	$(".on-sale-div").mouseout(function(){
		$(this).find(".drop-div").stop(true,true).slideUp("fast");
	});

	//计算价格函数
	function getPrice(){
		var $counts=0;
		var $price=0;
		$(".goods-list input[type='checkbox']").each(function(index,ele){
			if ($(this).prop("checked")) {
				var $inputCounts=parseInt($(this).parents(".goods-list").find("[type='text']").val());
				// console.log($inputCounts);
				var $dealPrice=$(this).parents(".goods-list").find(".price").text();
				for (var i = 0; i < $inputCounts+$(this).length-1; i++) {
					$counts+=1;
					$price+=parseInt($dealPrice.substr(1,$dealPrice.length-1));
				}
			}
		});
		$(".goodCounts").text($counts);
		$(".totalPrice").text(($price).toFixed(2));
	}

	//优化bug
	function cancelSelect(){
		if ($(".goods-store input[type='checkbox']").length === $(".goods-store input[type='checkbox']:checked").length) {
			$("[name='all-choice']").prop("checked",true);
		} else {
			$("[name='all-choice']").prop("checked",false);
		}
	}

	//优化bug
	function cancelCul(){
		if ($("input[type='checkbox']:checked").length===0) {
			$("button").css("background","#aaa");
		}else{
			$("button").css("background","#f40");
		}
	}

	// 全选效果
	$("[name='all-choice']").bind("click",function(){
		if ($(this).prop("checked")) {
			$("[type='checkbox']").prop("checked",true);
			$(".goods-list").css("background","#fff8e1"); 
			$("button").css("background","#f40");                                              
		}else{
			$("[type='checkbox']").prop("checked",false);
			$(".goods-list").css("background","#fff");
			$("button").css("background","#aaa");
		}
		getPrice();
	})

	//点击店铺，选中商品
	var $storeCheckbox=$(".store-name").find("[type='checkbox']");
		$storeCheckbox.bind("click",function(){
			if ($(this).prop("checked")) {
				$(this).parents(".goods-store").find(".goods-list input").prop("checked",true);
				$("button").css("background","#f40");
				$(this).parents(".goods-store").find(".goods-list").css("background","#fff8e1");
			}else{
				$(this).parents(".goods-store").find(".goods-list input").prop("checked",false);
				$("button").css("background","#aaa");
				$(this).parents(".goods-store").find(".goods-list").css("background","#fff");
			}
			getPrice();
			cancelSelect();
			cancelCul();
		})

	//点击商品，选中店铺
	var $goodsCheckbox=$(".goods-list").find("[type='checkbox']");
		$goodsCheckbox.bind("click",function(){
			if ($(this).prop("checked")) {
				$(this).parents(".goods-store").find(".store-name input").prop("checked",true);
				$("button").css("background","#f40");
				$(this).parents(".goods-list").css("background","#fff8e1"); 
			}else{
				$(this).parents(".goods-store").find(".store-name input").prop("checked",false);
				$("button").css("background","#aaa");
				$(this).parents(".goods-list").css("background","#fff");
			}
			getPrice();
			cancelSelect();
			cancelCul();
		})

	//增减数量按钮
	$(".minus").click(function(){
		var $num=parseInt($(this).parent().find("input").val());
		if ($num<=1) {
			alert("数量不能少于1");
		}else{
			$num--;
			$(this).parent().find("input").val($num);
		}
		getPrice();
	})
	$(".plus").click(function(){
		var $num=parseInt($(this).parent().find("input").val());
		if ($num>=5) {
			alert("每人限购5件");
		}else{
			$num++;
			$(this).parent().find("input").val($num);
		}
		getPrice();
	})

	// 删除商品
	var $thisInfo;
	var $previous;
	var $next;
	$("body").on("click",".delete",function(event){
		var $this=$(event.target);
		$thisInfo=$this.parents('.goods-store');
		$previous=$thisInfo.prev();
		$next=$thisInfo.next();
		var html=template("delete");
		if ($(".goods-store").first()) {
			$next.before(html);
		}else{
			$previous.after(html);
		}
		$thisInfo.detach();
		return false;
	})

	//恢复商品
	$('body').on('click','.turnBack',function(event){
		$previous.after($thisInfo);
		$('.delete-wrap').hide();
		return false;
	})

	//模拟支付功能
	$('#pay').on('click',function(){
		var con = confirm('您确认支付'+$(".totalPrice").html()+'元吗？');
		if(con === true){
			alert('您已支付成功');
		}else{
			alert('您已取消支付');
		}
	})
})