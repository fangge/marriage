(function() {
	//$('.tab_content_container li').css('min-height', window.innerHeight - $('#header').height()  - $('#main .tab_header').height() - 10);
	// 启用地图
	var set_map = _.once(function() {
			var map = new AMap.Map('map_container', {
				resizeEnable: true,
				center: [113.326274,23.13286],
				zoom: 17
			});
			map.clearMap();
		var markers = [{
			content:'正佳万豪酒店',
			position:[113.326274,23.13286]
		},{
			content:'正佳万豪酒店停车场',
			position:[113.326115,23.132423]
		}];
		markers.forEach(function(marker) {
			var t =new AMap.Marker({
				map: map,
				position: [marker.position[0], marker.position[1]]
			});
			t.setLabel({
				offset: new AMap.Pixel(20, 20),
				content:marker.content
			})
		})


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
		dMinute = cutTime.getMinutes() - currentTime.getMinutes();
	if (+cutTime - currentTime >= 0) {
		if (dDay == 0) {
			timeDom.find('.tip').text('就是今天!!');
		} else {
			timeDom.find('.tip').text('距离婚礼还有:');
			timeDom.find('.d_day').text(dDay + '天');
		}
	} else {
		timeDom.text('婚礼时间都过啦!');
	}
})();