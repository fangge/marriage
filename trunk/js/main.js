(function() {
	//$('.tab_content_container li').css('min-height', window.innerHeight - $('#header').height()  - $('#main .tab_header').height() - 10);
	// 启用地图
	var set_map = _.once(function() {
			var center = new qq.maps.LatLng(23.132730,113.326090),
				stop = new qq.maps.LatLng(23.132270,113.326217);
			var map = new qq.maps.Map(document.getElementById('map_container'),{
				center: center,
				zoom: 20
			});
			var infoWin = new qq.maps.InfoWindow({
				map: map
			});
			var infoWin2 = new qq.maps.InfoWindow({
				map: map
			});
			infoWin.open();
			infoWin2.open();
			//tips  自定义内容
			infoWin.setContent('<div style="width:180px;padding-top:10px;color:#000">正佳万豪酒店</div>');
			infoWin.setPosition(center);
			infoWin2.setContent('<div style="width:180px;padding-top:10px;color:#000">正佳万豪酒店停车场</div>');
			infoWin2.setPosition(stop);
		}),
		slider;

	// tab切换
	$('.tab_header span').on('click', function(e) {
		var current_index = $(this).index(),
			pre_index = $('.tab_header span.current').index();
		if (current_index == pre_index) {
			return;
		}
		$('.tab_header span').eq(pre_index).trigger('zx-tab-out');
		$('.tab_header span').eq(current_index).trigger('zx-tab-in');
		$('.tab_content_container li').eq(pre_index).trigger('zx-tab-out');
		$('.tab_content_container li').eq(current_index).trigger('zx-tab-in');
	});
	$('.tab_header span').on('zx-tab-in', function() {
		$(this).addClass('current');
	})
	$('.tab_header span').on('zx-tab-out', function() {
		$(this).removeClass('current');
	})
	$('.tab_content_container li').on('zx-tab-in', function() {
		$(this).addClass('current');
		animate(this, 'zoomIn', null, .5);
	})
	$('.tab_content_container li').on('zx-tab-out', function() {
		animate(this, 'zoomOut', function() {
			$(this).removeClass('current');
		}, .5);
	})
	$('.tab_content_container li').eq(2).one('zx-tab-in', function() {
		// 创建幻灯片
		slider = new Slider({
			dom: $('#slider'),
			thumbDom: $('#sliderThumb>div'),
			interval: 800,
			imgUrlList: ['./img/slider/origin/1.jpg', './img/slider/origin/2.jpg', './img/slider/origin/3.jpg', './img/slider/origin/4.jpg'],
			thumbImgUrlList: ['./img/slider/thumb/1.jpg', './img/slider/thumb/2.jpg', './img/slider/thumb/3.jpg', './img/slider/thumb/4.jpg']
		});
	})
	$('.tab_content_container li').eq(2).on('zx-tab-in', function() {
		slider.start();
	})
	$('.tab_content_container li').eq(2).on('zx-tab-out', function() {
		slider.stop();
	})
	$('.tab_content_container li').eq(1).on('zx-tab-in', set_map);

	// 二维码
	$('.js_QR_btn').on('click', function(e) {
		$('#QR_container').show();
		animate($('#QR_container'), 'zoomIn', null, .5);
	});
	$('#QR_container').on('click', function(e) {
		animate($('#QR_container'), 'zoomOut', function() {
			$(this).hide();
		}, .5);
	});
	// music
	var bgAudio = $('#bg_audio')[0],
		bgAudioBtn = $('#bg_audio_btn');
	bgAudio.play();
	bgAudioBtn.click(function() {
		if (bgAudio.paused) {
			bgAudio.play();
			$(this).removeClass('off');
		} else {
			bgAudio.pause();
			$(this).addClass('off');
		}
	});
	// 倒计时
	var timeDom = $('.current_time'),
		currentTime = new Date,
		cutTime = new Date('2016/1/24 12:0:0'),
		dDay = (+cutTime - currentTime) / 1000 / 60 / 60 / 24 | 0,
		dHour = cutTime.getHours() - currentTime.getHours(),
		dMinute = cutTime.getMinutes() - currentTime.getMinutes();
	if (+cutTime - currentTime >= 0) {
		dMinute < 0 ? (dMinute = 60 + dMinute, dHour--) : null;
		dHour < 0 ? dHour = 24 + dHour : null;
		if (dDay == 0) {
			timeDom.find('.tip').text('就是今天,倒计时:');
			timeDom.find('.d_hour').text(dHour + '小时');
		} else {
			timeDom.find('.tip').text('距离婚礼还有:');
			timeDom.find('.d_day').text(dDay + '天');
		}
	} else {
		timeDom.text('婚礼时间都过啦!');
	}
	console.log(dDay, dHour, dMinute);
})();