# Vanilla Javascript Carousel Slideshow

## Key Features

* Works on mobile and desktop devices
* Works for any HTML content
* Supports swipes
* Supports multiple slides on the screen
* Supports infinite loop
* Supports scrolling to a selected slide
* Supports auto scroll

[Check demo](https://carousel-classes.netlify.app/)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

1. Clone this repository
   	```sh
	git clone https://github.com/vhludnev/carousel-slider-classes.git
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

5. In index.html file paste your list of slides (your slider **id** and attribute **[data-carousel]** are required in the wrapper)

6. Activate your carousel slider by adding "new Slider('#YourSliderID').slide()" to index.js file;

\
Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.
\

### Options and examples:

| Methods			| Required/optional 	| Default values  	| Notes
| :---        		|    :----:   		|  	:----:		|	:---  
| slides()      	| Required       	| 1  			| Number of slides to show
| noloop()   		| Optional        	| n/a			| No infinite loop
| auto()   		| Optional        	| 2000, 'right' 	| Auto scroll (in ms, direction)


**Examples:**

1) new Slider('#YourSlidesID').slide() --> one slide on a screen, infinite loop
2) new Slider('#YourSlidesID').slide(2).noloop() --> two slides on a screen, without infinite loop
3) new Slider('#YourSlidesID').slide().auto() --> one slide on a screen, infinite loop with auto scroll to the right every 2 seconds
4) new Slider('#YourSlidesID').slide(3).auto(1000, 'left') --> three slides on a screen, infinite loop with auto scroll to the left every second

Enjoy!