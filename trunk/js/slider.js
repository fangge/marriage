var Slider = (function() {
	var Slider = function Slider(config) {
		this.init(config);
		this._clickEventName = isWeixin() ? 'touchend' : 'click';
	};
	SliderPro = Slider.prototype;
	SliderPro.init = function(config) {
		this.config = config;
		this.dom = $(config.dom);
		this.thumbDom = $(config.thumbDom);
		this.interval = config.interval || 1000;
		this.imgUrlList = config.imgUrlList;
		this.thumbImgUrlList = config.thumbImgUrlList;
		this.length = config.imgUrlList.length;
		this.index = 0;
		this._render();
	};
	SliderPro._render = function() {
		this.imgs = [];
		var fragment = $(document.createDocumentFragment()),
			thumbFragment = $(document.createDocumentFragment());
		var img = null;
		for (var i = 0; i < this.imgUrlList.length; i++) {
			img = new Image();
			img.src = this.imgUrlList[i];
			fragment.append($('<div></div>').append($('<div class="img_container"></div>').append(img)));
			thumbImg = new Image();
			thumbImg.src = this.thumbImgUrlList[i];
			thumbFragment.append($('<div></div>').append($('<div class="img_container"></div>').append(thumbImg)));
		};
		fragment.append($('<span class="prev_btn"><i></i></span>'));
		fragment.append($('<span class="next_btn"><i></i></span>'));
		this.dom.append(fragment);
		this.thumbDom.width(100 * this.length).append(thumbFragment);
		this.dom.children('div').eq(0).addClass('current');
	};
	SliderPro.start = function() {
		console.log('slider---start');
		var self = this;
		if (self.length < 2) {
			return;
		};
		self.dom.on('swipeLeft', function() {
			self.next();
		}).on('swipeRight', function() {
			self.prev();
		});
		self.dom.find('.next_btn').on(self._clickEventName, function() {
			self.next();
		});
		self.dom.find('.prev_btn').on(self._clickEventName, function() {
			self.prev();
		});
		self.iscroll = new IScroll(self.thumbDom.parent()[0], {
			scrollX: true,
			scrollY: false
		});
		self.thumbDom.children('div').on(self._clickEventName, function() {
			self.switch($(this).index());
		});
	};
	SliderPro.stop = function() {
		console.log('slider---stop');
		this.dom.off('swipeLeft').off('swipeRight');
		this.dom.find('.next_btn').off(this._clickEventName);
		this.dom.find('.prev_btn').off(this._clickEventName);
		this.thumbDom.children('div').off(this._clickEventName);
		this.iscroll.destroy();
	};
	SliderPro.next = function() {
		this.switch(this.index + 1 < this.length ? this.index + 1 : 0);
	};
	SliderPro.prev = function() {
		this.switch(this.index - 1 >= 0 ? this.index - 1 : this.length - 1);
	};
	SliderPro.switch = function(index) {
		var current = this.dom.children('div').eq(this.index),
			next = this.dom.children('div').eq(index),
			randomIndex = this.animateList.animateOut.length * Math.random() | 0;
		this.index = index;
		animate(current, this.animateList.animateOut[randomIndex], function() {
			$(this).removeClass('current');
		}, .5);
		next.addClass('current');
		animate(next, this.animateList.animateIn[randomIndex], null, .5);
	};
	SliderPro.animateList = {
		animateOut: ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flipOutX', 'flipOutY', 'lightSpeedOut', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'rollOut', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp'],
		animateIn: ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'flipInX', 'flipInY', 'lightSpeedIn', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rollIn', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp']
	};
	return Slider;
})();