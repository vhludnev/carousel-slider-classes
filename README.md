# Vanilla JS Carousel Slideshow

## Key Features

* Works for mobile and desktop devices
* Supports swipes (mobile versions)
* Works for any HTML content (just replace **img** tag in **class="gallery"** for any other)
* Animated, finger-following swipes
* Supports multiple slides on the screen
* Supports infinite option (for a single-slide-on-a-screen option)
* Supports scrolling to a selected slide

[Check demo](https://carousel-webpack.netlify.app/)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

1. Clone this repository
   	```sh
	git clone https://github.com/vhludnev/carousel-slider-webpack.git
	```

2. Go into the repository
	```sh
	cd carousel-slider-webpack
	```

3. Install dependencies
   	```sh
	npm install
	```

4. Run the app
	```sh
	npm start
	```

5. In index.html file paste your list of slides (your slider id and attribute [data-carousel] are required in the wrapper)

6. Activate your carousel slider by adding "new Slider('#YOURID').slide()" to index.js file;

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


Options and examples:

| Name						| Required/optional | Default values  | Aplication
| :---        		|    :----:   			|  	:----:				|	:---  
| slides()      	| Required       		| 1  							| new Slider('#slidesID').slide()
| noloop()   			| Optional        	| n/a			      	| new Slider('#slidesID').slide().noloop();
| auto()   				| Optional        	| 2000, 'right' 	|	new Slider('#slidesID').slide().auto();

Examples: 

new Slider('#slidesID').slide(); -> one slide on a screen, infinite loop
new Slider('#slidesID').slide(2).noloop(); -> two slides on a screen, **no** infinite loop
new Slider('#slidesID').slide().auto() -> one slide on a screen, infinite loop with auto scroll to the right every 2 seconds
new Slider('#slidesID').slide(3).auto(1000, 'left') -> three slides on a screen, infinite loop with auto scroll to the left every second

Enjoy!