var animate = function(dom, animateName, callback, animateTime) {
	var animateEventNames = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	dom = $(dom);
	if (dom[0]._animating == true) {
		dom[0]._animating = false;
		dom.off(animateEventNames).removeClass(dom[0]._animateClass).css({
			'-webkit-animation-duration': '',
			'-animation-duration': ''
		});
	};
	var _animate = function() {
		dom[0]._animating = true;
		dom[0]._animateClass = animateName + ' animated';
		dom.addClass(dom[0]._animateClass).css({
			'-webkit-animation-duration': animateTime + 's',
			'-animation-duration': animateTime + 's'
		}).one(animateEventNames, function() {
			$(this).off(animateEventNames).removeClass(dom[0]._animateClass).css({
				'-webkit-animation-duration': '',
				'-animation-duration': ''
			});
			callback && _.bind(callback, this)();
		});
	};
	_animate();
};