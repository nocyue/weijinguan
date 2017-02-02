$(function() {
	function resize() {
		var windowWidth = $(window).width();
		var isSmallScreen = windowWidth < 768;
		$('#home_slide .item-image').each(function(i,item) {
			var $item = $(item);
			var imgSrc = $item.data(isSmallScreen ? 'image-small' : 'image-large');
			var imgAlt = $item.data('image-alt');
			$item.css('backgroundImage', 'url(' + imgSrc + ')');
			if (isSmallScreen) {
				$item.html('<img src="' + imgSrc + '" alt="' + imgAlt + '"/>');
			}else {
				$item.empty();
			}
		});

    var $tabs = $('.nav-tabs');
    $tabs.each(function(i, item) {
      var $tab = $(this);
      var width = 20;
      $tab.children().each(function(ci, citem) {
        width += $(citem).width();
      });
      if (width > $tab.parent().width()) {
        $tab.css('width', width);
        $tabs.parent().css('overflow-x', 'scroll');
      } else {
        $tab.css('width', 'auto');
        $tabs.parent().css('overflow-x', 'hidden');
      }
    });		
	}

  var OFFSET = 50;
  // 轮播图触摸
  $('.carousel').each(function(i, item) {
    var startX, endX;
    item.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchmove', function(e) {
      endX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchend', function(e) {
      var offsetX = endX - startX;
      if (offsetX > OFFSET) {
        // 上一张
        $(this).carousel('prev');
      } else if (offsetX < -OFFSET) {
        // 上一张
        $(this).carousel('next');
      }
      e.preventDefault();
    });
  });	

	$(window).on('resize', resize).trigger('resize');
});