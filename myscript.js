import $ from "https://cdn.skypack.dev/jquery@3.6.4";

class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		document.querySelector('.et-hero-tab').click(function() { 
			self.onTabClick(event, document.querySelector(this)); 
		});
		document.querySelector(window).scroll(() => { this.onScroll(); });
		document.querySelector(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = document.querySelector(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		document.querySelector('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = document.querySelector('.et-hero-tabs').offset().top + document.querySelector('.et-hero-tabs').height() - this.tabContainerHeight;
		if(document.querySelector(window).scrollTop > offset) {
			document.querySelector('.et-hero-tabs-container').classList.add('et-hero-tabs-container--top');
		} 
		else {
			document.querySelector('.et-hero-tabs-container').classList.remove('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		document.querySelector('.et-hero-tab').each(function() {
			let id = document.querySelector(this).attr('href');
			let offsetTop = document.querySelector(id).offset().top - self.tabContainerHeight;
			let offsetBottom = document.querySelector(id).offset().top + document.querySelector(id).height() - self.tabContainerHeight;
			if(document.querySelector(window).scrollTop > offsetTop && document.querySelector(window).scrollTop < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = document.querySelector(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		document.querySelector('.et-hero-tab-slider').css('width', width);
		document.querySelector('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();

document.querySelector(document).ready(
  function(){
    setInterval(moveBalls, 50);
  }
);

function moveBalls() {
  document.querySelector('.circle').each(
    function(){
      var min = 0;
      var max = 1000;
      var x = Math.floor(Math.random() * (max - min + 1)) + min;
      var y = Math.floor(Math.random() * (max - min + 1)) + min;
      document.querySelector(this).animate({
        left: x,
        top: y
      }, 15000);
    });
}
