//Lazayload images
function ImgLazyLoad() {
	lazyImages = document.querySelectorAll('.fs_cm_pic.fs_lazy');
	[].slice.call(lazyImages).forEach(function (elm) {
		var src = elm.getAttribute('data-original');
		elm.setAttribute('src', src);
		elm.classList.remove('fs_lazy');
	});

	lazyBgs = window.innerWidth > 1100 ? document.querySelectorAll('.fs_bg_pc.fs_lazy, .fs_bg_cm.fs_lazy') : document.querySelectorAll('.fs_bg_sp.fs_lazy, .fs_bg_cm.fs_lazy');
	[].slice.call(lazyBgs).forEach(function (elm) {
		var src = elm.getAttribute('data-original');
		elm.style.backgroundImage = 'url(' + src + ')';
		elm.classList.remove('fs_lazy');
	});
}

function inputHolder() {

	$('.fs_form_box input[type="text"]').focus(function (e) {
		$(this).parent().removeClass('fs_show_error');
	});

}

function fseVents() {

	$('.fs_select_header').on('click', function (e) {
		var box = $(this).parent();
		box.parent().parent().parent().removeClass('fs_show_error');

		if (box.hasClass('open')) {
			box.removeClass('open');
		} else {
			$('.fs_select').removeClass('open');
			box.addClass('open');
		}
	});

	$(document).on('click', '.fs_select_box li', function (e) {
		var that = $(this);
		var box = $(this).parent().parent().parent();

		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('open');
			box.find('.fs_select_header p').html(that.text());
		}

	});

	$(document).on('click', '.fs_check_box li', function (e) {
		$(this).removeClass('fs_check_error');
	});

	//Refister but (Open Popup)
	// $(document).on('click', '#fs_btn_register', function (e) {
	// 	$('html,body').animate({scrollTop: 0}, 500);
	// 	$('.fs_thanks').removeClass('fs_hide');
	// 	$('.fs_form_popup').addClass('fs_active');
	// });

	//Close Popup
	$(document).on('click', '.fs_close_pop', function (e) {
		$('.fs_form_popup').removeClass('fs_active');
		setTimeout(function () {
			$('.fs_form_inner').addClass('fs_hide');
		}, 250);
	});

	$(document).on('click touchstart', function (event) {
		if ($(".fs_select").has(event.target).length == 0 && !$(".fs_select").is(event.target)) {
			$(".fs_select").removeClass("open");
		}
	});


	inputHolder();

}

function fsScroll() {
	ImgLazyLoad();
}

function fsResize() {
	ImgLazyLoad();
}

function Rotate() {
	ImgLazyLoad();
}


$(window).on('scroll', fsScroll);
$(window).on('resize', fsResize);
$(window).on("orientationchange", Rotate);

$(window).on('load', function () {
	ImgLazyLoad();
});


/////////// Start Cuong Code////////////////

function showErrorSystem() {
	// $("#spnErrorSummaryMsg").html("<h2>Rất tiếc, đã có lỗi xảy ra <br>Vui lòng quay lại sau.</h2>");
	// var $fsCurBox = $('.fs_show');
	// $('.fs_overlay_inr > div').attr('style', '');

	// $fsCurBox.fadeOut(500, function () {
	// 	$fsCurBox.removeClass('fs_show');
	// 	$('#errorSummary').addClass('fs_show');
	// });
}

function findFromErrorArray(arr, valueCheck) {
	var result = null;
	arr.find(function (value, index) {
		if (value.Type == valueCheck) {
			result = value;
		}
	});
	return result;
}
var widgetId1;
var isProcess = false;
//Send info 
$('#fs_btn_register').on('click', function () { //Succcess 
	if (isProcess == true) {
		return;
	}
	isProcess = true;
	$("#fs_btn_register").addClass("is-sending");
	var name = $("#fs_txt_username").val();
	var phone = $("#fs_txt_phone").val();
	var email = $("#fs_txt_email").val();
	var address = $("#fs_txt_address").val();

	var chkTerm = $("#fs_chk_condition:checked").val();
	var chkSendEmail = $("#fs_chk_send_message_for_me:checked").val();
	var day = $("#fs_date li.selected").attr("data-target");
	var month = $("#fs_month li.selected").attr("data-target");
	var year = $("#fs_year li.selected").attr("data-target");
	var cityId = $("#fs_city li.selected").attr("data-target");
	var answerId = $("#fs_reasion li.selected").attr("data-target");
	var urlParams = location.search;
	var browser = navigator.appCodeName + ", " + navigator.appName;
	email = email.toLowerCase();
	var Custom1="Không";
	if(chkSendEmail){
		Custom1="Có";
	}
	var data = {
		FullName: name,
		Phone: phone,
		Email: email,
		HttpRequestString: urlParams,
		Browser: browser,
		Address: address,
		CityId: cityId,
		AnswerId: answerId,
		Day: day,
		Month: month,
		Year: year,
		Custom1:Custom1,
		CapchaKey:capchaKey
	};
	$("#grpName").removeClass("fs_show_error");
	$("#grpEmail").removeClass("fs_show_error");
	$("#grpPhone").removeClass("fs_show_error");
	$("#grpDob").removeClass("fs_show_error");
	$("#grpAddress").removeClass("fs_show_error");
	$("#grpCity").removeClass("fs_show_error");
	$("#grpCapcha").removeClass("fs_show_error");
	$("#grpReason").removeClass("fs_show_error");
	$("#grpCheckCondition").removeClass("fs_check_error");
	$('#divSuccess').addClass('fs_hide');
	$('#divErrorSummary').addClass('fs_hide');
	$('.fs_form_popup').removeClass('fs_active');
	var isErrorWithControl = false;
	var errorMesStr = "";
	if (name == undefined || name == null || name == "") {
		$("#grpName").addClass("fs_show_error");
		$("#spnErrorNameMess").html("<p>Bạn phải nhập vào họ tên</p>");
		isErrorWithControl = true;
	}

	if (phone == undefined || phone == null || phone == "") {
		$("#grpPhone").addClass("fs_show_error");
		$("#spnErrorPhoneMess").html("<p>Bạn phải nhập vào số điện thoại</p>");
		isErrorWithControl = true;
	}

	if (email == undefined || email == null || email == "") {
		$("#grpEmail").addClass("fs_show_error");
		$("#spnErrorEmailMess").html("<p>Bạn phải nhập vào email</p>");
		isErrorWithControl = true;
	}

	if (day == undefined || day == null || day == ""
		|| month == undefined || month == null || month == ""
		|| year == undefined || year == null || year == "") {
		$("#grpDob").addClass("fs_show_error");
		$("#spnErrorDobMess").html("<p>Bạn phải nhập vào ngày sinh</p>");
		isErrorWithControl = true;
	}

	if (address == undefined || address == null || address == "") {
		$("#grpAddress").addClass("fs_show_error");
		$("#spnErrorAddressMess").html("<p>Bạn phải nhập vào địa chỉ</p>");
		isErrorWithControl = true;
	}

	if (cityId == undefined || cityId == null || cityId == "") {
		$("#grpCity").addClass("fs_show_error");
		$("#spnErrorCityMess").html("<p>Bạn phải nhập vào tỉnh/thành phố</p>");
		isErrorWithControl = true;
	}
	console.log(answerId);
	if (answerId == undefined || answerId == null || answerId == ""||answerId==0) {
		$("#grpReason").addClass("fs_show_error");
		$("#spnErrorReasonMess").html("<p>Bạn phải nhập vào lý do</p>");
		isErrorWithControl = true;
	}
	if (chkTerm == undefined || chkTerm == null || chkTerm == false) {
		//$("#divErrorEmail").addClass("fs_show_error");
		$("#grpCheckCondition").addClass("fs_check_error");
		isErrorWithControl = true;
	}
	if (!isCheckCall) {
		$("#grpCapcha").addClass("fs_show_error");
		$("#spnErrorCapchaMess").html("<p>Captcha không hợp lệ</p>");
		isErrorWithControl = true;
	}
	if (isErrorWithControl) {
		// $("#errorMsg").html(errorMesStr);
		// $("#divErrorSummary").show(); 
		isProcess = false;
		$("#fs_btn_register").removeClass("is-sending");
		return;
	}
	isErrorWithControl = false;
	errorMesStr = "";
	// Cuong code
	
	grecaptcha.reset();
	$.ajax({
		cache: false,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		type: 'POST',
		url: webURLAjax + "/Register/Register",
		data: JSON.stringify(data),
		success: function (result) {
			if (result.Error != null && result.Error.length > 0) {
				isErrorWithControl = false;
				errorMesStr = "";
				var isNameError = findFromErrorArray(result.Error, 1);
				if (isNameError != undefined && isNameError != null) {
					$("#grpName").addClass("fs_show_error");
					$("#spnErrorNameMess").html("<p>" + isNameError.Error + "</p>");
					isErrorWithControl = true;
				}

				var isPhoneError = findFromErrorArray(result.Error, 2);
				if (isPhoneError != undefined && isPhoneError != null) {
					$("#grpPhone").addClass("fs_show_error");
					$("#spnErrorPhoneMess").html("<p>" + isPhoneError.Error + "</p>");
					isErrorWithControl = true;
				}
				var isEmailError = findFromErrorArray(result.Error, 3);
				if (isEmailError != undefined && isEmailError != null) {
					$("#grpEmail").addClass("fs_show_error");
					$("#spnErrorEmailMess").html("<p>" + isEmailError.Error + "</p>");
					isErrorWithControl = true;
				}

				var isDobError = findFromErrorArray(result.Error, 4);
				if (isDobError != undefined && isDobError != null) {
					$("#grpDob").addClass("fs_show_error");
					$("#spnErrorDobMess").html("<p>" + isDobError.Error + "</p>");
					isErrorWithControl = true;
				}

				var isAddressError = findFromErrorArray(result.Error, 5);
				if (isAddressError != undefined && isAddressError != null) {
					$("#grpAddress").addClass("fs_show_error");
					$("#spnErrorAddressMess").html("<p>" + isAddressError.Error + "</p>");
					isErrorWithControl = true;
				}

				var isCityError = findFromErrorArray(result.Error, 6);
				if (isCityError != undefined && isCityError != null) {
					$("#grpCity").addClass("fs_show_error");
					$("#spnErrorCityMess").html("<p>" + isCityError.Error + "</p>");
					isErrorWithControl = true;
				}

				if (!isErrorWithControl) {
					var isSystemError = findFromErrorArray(result.Error, -1);
					if (isSystemError != undefined && isSystemError != null) {
						var isSummaryError = false;
						var errMsg = "";
						if (isSystemError.Error == "SystemError") {
							errMsg = "Rất tiếc, đã có lỗi xảy ra <br>Vui lòng quay lại sau.";
							isSummaryError = true;
						}
						else if (isSystemError.Error == "CapchaError") {
							errMsg = "Rất tiếc, capcha không hợp lệ <br>Vui lòng quay lại sau.";
							isSummaryError = true;
						}
						if (isSummaryError) {
							$("#spnErrorSummaryMsg").html(errMsg);
							$('html,body').animate({ scrollTop: 0 }, 500);
							$('#divErrorSummary').removeClass('fs_hide');
							$('.fs_form_popup').addClass('fs_active');
							isErrorWithControl = true;
						}
					}
				}
			}
			else {

				$('html,body').animate({ scrollTop: 0 }, 500);
				$('#divSuccess').removeClass('fs_hide');
				$('.fs_form_popup').addClass('fs_active');
			}
			$("#fs_btn_register").removeClass("is-sending");
			isProcess = false;
		},
		error: function (err) {
			$("#fs_btn_register").removeClass("is-sending");
			isProcess = false;
			showErrorSystem();
		}
	});

});

var isCheckCall = false;
var capchaKey="";
var verifyCallback = function (response) {
	capchaKey=response;
	$("#grpCapcha").removeClass("fs_show_error");
	$("#spnErrorCapchaMess").html("");
	isCheckCall = true;
};
var onloadCallback = function () {
	grecaptcha.render('capchaAreaId', {
		'sitekey': '6LfqO64UAAAAADpTRfc6H6DtJ4aXyivgTTMwhRrb',
		'callback': verifyCallback,
	});
};

////////// End Cuong Code //////////////////

(function () {
	ImgLazyLoad();
	fseVents();

	$.ajax({
		cache: false,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		type: 'GET',
		url: webURLAjax + "/Register/GetCities",
		success: function (result) {
			if (result.Error == null || result.Error.length == 0) {
				var buildLiStr = "";
				$.each(result, function (index, value) {
					buildLiStr += "<li data-target='" + value.Id + "'>" + value.Name + "</li>"
				});
				$("#divCity").html(buildLiStr);
			}
		},
		error: function (err) {
			showErrorSystem();
		}
	});
})();