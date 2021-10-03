
export const sliderBody = () => {
	const allSliders = document.querySelectorAll('[data-carousel]');
	for (let i = allSliders.length - 1; i >= 0; i--) {
		const sliderParts = `
			<div class="slider">
				<div class="wrapper">
					<div class="selectors">
						<label for="choice">Select your favorite slide:</label>
						<select id="choice">
							<option hidden selected></option>			
						</select>						
					</div>

					<div class="dots"> </div>
				</div>
				<button id="prev" class="control prev"><img src="icons/left.svg" alt="left"></button>
				<button id="next" class="control next"><img src="icons/right.svg" alt="right"></button>
			</div>
		`;
		
		document.body.children[0].insertAdjacentHTML('afterbegin', sliderParts);	
		document.querySelector('.wrapper').insertBefore(allSliders[i], document.querySelector('.wrapper').children[1])
	}
}


export class Slider {
	constructor(selector) {

		this.sliderItems = document.querySelector(selector),
		this.wrapper = this.sliderItems.parentElement,
		this.sliderSelectors = this.sliderItems.previousElementSibling,
		this.sliderSelect = this.sliderSelectors.children[1],
		this.dots = this.sliderItems.nextElementSibling,
		this.prev = this.wrapper.nextElementSibling,
		this.next = this.prev.nextElementSibling,
		this.slides = this.sliderItems.children,
		this.slidesLength = this.slides.length,
		this.slideSize = this.sliderItems.children[0].offsetWidth,
		this.posX1 = 0,
		this.posX2 = 0,
		this.posInitial,
		this.posFinal,
		this.threshold = 100,
		this.number = 1,
		this.index = 0,
		this.infinite = true;

		
	// Mouse event
		this.sliderItems.addEventListener('mousedown', this.dragStart);
		
	// Touch events
		this.sliderItems.addEventListener('touchstart', this.dragStart);
		this.sliderItems.addEventListener('touchend', this.dragEnd);
		this.sliderItems.addEventListener('touchmove', this.dragAction);
		
	// Click events
		this.prev.addEventListener('click', e => !e.detail || e.detail == 1 && this.shiftSlide(-1));
		this.next.addEventListener('click', e => !e.detail || e.detail == 1 && this.shiftSlide(1));
	
	// Selecting a slide event
		this.sliderSelect.addEventListener('change', this.slideSelect);
	
	// Transition event
		this.sliderItems.addEventListener('transitionend', this.checkIndex);
	};
	
  dragStart = (e) => {
    e.preventDefault();
    this.posInitial = this.sliderItems.offsetLeft;
    if (e.type == 'touchstart') {
      this.posX1 = e.touches[0].clientX;
    } else {
      this.posX1 = e.clientX;

			document.addEventListener('mouseup', this.dragEnd);
			document.addEventListener('mousemove', this.dragAction);
    }
  }

	dragAction = (e) => {  
    if (e.type == 'touchmove') {
      this.posX2 = this.posX1 - e.touches[0].clientX;
      this.posX1 = e.touches[0].clientX;
    } else {
      this.posX2 = this.posX1 - e.clientX;
      this.posX1 = e.clientX;
    }
    this.sliderItems.style.left = (this.sliderItems.offsetLeft - this.posX2) + "px";

		if (!this.infinite && this.sliderItems.offsetLeft - this.posX2 >= 0) {
			this.sliderItems.style.left = "0px";
		} else if (!this.infinite && -this.sliderItems.offsetLeft + this.posX2 > this.sliderItems.offsetWidth - this.number * this.slideSize) {
			this.sliderItems.style.left = this.slideSize * this.number - this.sliderItems.offsetWidth + "px";
		}
	}
  
  dragEnd = () => {
    this.posFinal = this.sliderItems.offsetLeft;
    if (this.posFinal - this.posInitial < -this.threshold) {
      this.shiftSlide(1, 'drag');
    } else if (this.posFinal - this.posInitial > this.threshold) {
      this.shiftSlide(-1, 'drag');
    } else {
      this.sliderItems.style.left = (this.posInitial) + "px";
    }

		document.removeEventListener('mouseup', this.dragEnd);
		document.removeEventListener('mousemove', this.dragAction);
  }
  
  shiftSlide = (dir, action) => {
    this.sliderItems.classList.add('shifting');

		if (!action) { this.posInitial = this.sliderItems.offsetLeft; }
		let slidesDragged = Math.round((this.posInitial - this.posFinal) / this.slideSize);
		if (!action) { slidesDragged = dir === 1 ? 1 : -1 }

		if (dir == 1) {				
			if (slidesDragged >= this.number) {
				this.sliderItems.style.left = (this.posInitial - this.slideSize * (this.number)) + "px";
				this.index = this.index + this.number;
			} else if (slidesDragged < this.number){
				this.sliderItems.style.left = (this.posInitial - this.slideSize * slidesDragged) + "px";
				this.index += slidesDragged; 
			} else if (!this.infinite && this.posInitial <= this.slideSize*this.number - this.sliderItems.offsetWidth) {
				this.sliderItems.style.left = this.posInitial + "px";
				this.index = this.slidesLength - 1; 
			}
		} else if (dir == -1) {
			if (-slidesDragged >= this.number) {
				this.sliderItems.style.left = (this.posInitial + this.slideSize * (this.number)) + "px";
				this.index = this.index - this.number; 
			} else if (-slidesDragged < this.number){
				this.sliderItems.style.left = (this.posInitial + this.slideSize * -slidesDragged) + "px";
				this.index = this.index - (-slidesDragged);  
			} else if (!this.infinite && this.posInitial > -this.slideSize) { 
				this.sliderItems.style.left = "0px";
				this.index = 0;   
			}
		}

		this.hideArrows();
		this.sliderSelect.selectedIndex = 0;
  }
    
  checkIndex = (e) => {
    this.sliderItems.classList.remove('shifting');
		
		if (this.infinite) { 
			if (this.index < 0) {
				this.index = this.index + this.slidesLength
				this.sliderItems.style.left = (this.index + 1) * -this.slideSize + "px" 
			}	else if (this.index >= this.slidesLength) {
				this.index = this.index - 1 - (this.slidesLength - 1)
				this.sliderItems.style.left = (this.index + 1) * -this.slideSize + "px" 
			}
		}

		if (!this.infinite && this.index == -1) {
				this.sliderItems.style.left = -this.slidesLength * this.slideSize + "px";
				this.index = this.slidesLength - 1; 
		} else if (!this.infinite && this.index == this.slidesLength) {
				this.sliderItems.style.left = -this.slideSize + "px";
				this.index = 0;				
		}

		this.dotsShift(this.index/this.number)
		this.hideArrows()
  }

	hideArrows = () => {
		if (!this.infinite) {
			this.sliderItems.offsetLeft === 0 ? this.prev.classList.add('hidden') : this.prev.classList.remove('hidden') 
			this.index === this.slidesLength - 1 ? this.next.classList.add('hidden') : this.next.classList.remove('hidden') 
		}
	}

	dotsShift = (idx) => {
		const dotsArray = [...this.dots.children];
		dotsArray.forEach((dot, i) => {
			dotsArray[i].classList.remove('active'); 
			dot.classList.toggle('active', i === Math.floor(idx));
		});
	}

	slideSelect = () => {
		let choice = this.sliderSelect.selectedIndex,
				choiceValue = +this.sliderSelect.options[choice].value,
				matchingItem;

		matchingItem = this.infinite ? this.sliderItems.children[choiceValue] : this.sliderItems.children[choiceValue - 1];
		this.sliderItems.classList.add('shifting');	

		if (!this.infinite && this.number > 1 && -matchingItem.offsetLeft > -this.number * this.slideSize) {
			this.sliderItems.style.left = "0px";
			this.index = choiceValue - 1 + this.number  - 1;
		} else if (!this.infinite && this.number > 1) {
			this.sliderItems.style.left = -matchingItem.offsetLeft + this.slideSize * (this.number-1)  + "px";
			this.index = choiceValue - 1;
		} else if (!this.infinite && this.number == 1) {
			this.sliderItems.style.left = -matchingItem.offsetLeft + "px";
			this.index = choiceValue - 1
		} else {
			this.sliderItems.style.left = -matchingItem.offsetLeft  + "px";
			this.index = choiceValue - 1;
		}
	}

	createClones = (number) => {
		let arr = Array.from({length: number}, (v, i) => i),
				arrBefore = [],
				arrAfter = [];

		for (let i = arr.length; i >= 1; i--) {
			let itemBefore = this.slides[this.slidesLength - i].cloneNode(true)
			arrBefore.push(itemBefore)
		}
		this.sliderItems.prepend(...arrBefore)

		for (let k = 0; k < arr.length; k++) {
			let itemAfter = this.slides[k + arr.length].cloneNode(true)
			arrAfter.push(itemAfter)
		}
		this.sliderItems.append(...arrAfter)

		this.sliderItems.style.left = -this.number * this.slideSize + "px";
	}

	// method to add auto scroll
	auto = (time = 2000, dir = 'right') => {
		[this.prev, this.next].forEach(el => { el.setAttribute('disabled', true), el.style.opacity = 0 })
		let interval = setInterval(() => {
			this.shiftSlide(dir == 'left' ? -1 : dir == 'right' ? 1 : 0)
			!this.infinite && this.index === this.slidesLength - 1 && clearInterval(interval);
		}, time);

		this.sliderItems.removeEventListener('mousedown', this.dragStart);
		this.sliderItems.removeEventListener('touchstart', this.dragStart);
		return this;
	}

	// method to remove infinite option
	noloop = () => {
		if (this.infinite) {
			this.infinite = false;
			this.sliderItems.style.left = '0px';
			return this;
		}
	}

	// method to choose a number of slides to show on a screen
	slide = (number = 1) => {
		this.number = number;
		this.index = this.index + number - 1;
		const getStyle = (value) => +getComputedStyle(document.querySelector(':root')).getPropertyValue(value).replace("px", "");
		let width = getStyle('--slider-width');

		// Adding id to each slide
		[...this.slides].forEach((el, i) => el.setAttribute('data-slideid', i));

		// Creating dots
		if (this.slidesLength/this.number > 3) {
			for (let i = 0; i < this.slidesLength/this.number; i++) {
				let div = document.createElement('div');			
				this.dots.appendChild(div);
				this.dots.children[0].classList.add('active');
			}
		};
		
		// Creating select options
		for (let j = 0; j < this.slidesLength; j++) {
			let optionChoice = document.createElement('option');
			optionChoice.value = j + 1;	
			optionChoice.textContent = this.slides[j].alt ? this.slides[j].alt : this.slides[j].src ? this.slides[j].src.split("/").pop().split(".")[0].slice(0, 12) : this.slides[j].textContent.slice(0, 12);
			this.sliderSelect.appendChild(optionChoice);
		};

		// responsive width change depending on number of slides to show
		if (number > 1) { 
			if (window.innerWidth < 992) {
				[...this.sliderItems.children].forEach(el => el.style.cssText = `
					min-width: ${window.innerWidth/number}px; 
					height: ${(window.innerWidth/number)*0.75}px;`
				);
				this.sliderItems.parentElement.style.setProperty('width', (window.innerWidth/number) * this.slidesLength + 'px');
				this.slideSize = window.innerWidth/number;
			} else {
				[...this.sliderItems.children].forEach(el => el.style.cssText = `
					min-width: ${width / number * 2 + 'px'}; 
					height: ${width / number * 2 * 0.75 + 'px'}`
				);
				this.sliderItems.parentElement.style.setProperty('width', (width / number * 2) * number + 'px');
				this.slideSize = width / number * 2
			}
			this.sliderItems.style.setProperty('width', `${this.slideSize * this.slidesLength}px`);		
		};

		// utils for creating clones and hidding arrow nav buttons
		setTimeout(()=> { this.infinite && number > 0 && this.createClones(number) }, 0) 
		setTimeout(() => { 
			if (this.infinite && number > 1) { 
				this.prev.classList.add('hidden'); 
				this.next.classList.add('hidden');
				this.prev.removeEventListener('click', () => this.shiftSlide(-1));
				this.next.removeEventListener('click', () => this.shiftSlide(1));
			} else if (!this.infinite) {
				this.prev.classList.add('hidden'); 
			} 
		}, 0)

		return this;
	}
}

