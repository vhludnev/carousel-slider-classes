import './css/styles.css';
import { sliderBody , Slider } from './js/main';


window.addEventListener("DOMContentLoaded", () => {
	sliderBody();



	new Slider('#slides1').slide();
	new Slider('#slides2').slide(2);

	
});
