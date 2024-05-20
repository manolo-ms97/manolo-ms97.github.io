// Trigger CSS Animations when elements are scrolled into view

// This JS uses the Intersection Observer API to determine if objects are within the viewport
// It addes an 'in-view' class to elements when they come into view (and removes the class when not on screen)
// Use to add @keyframe or transition animations to elements so they animate once they are on screen

//TO USE
// Simply add the .animate class to those HTML elements that you wish to animate. For example, <h1 class="animate">
// Once in the viewport, the JS will add the 'in-view' class to those elements. For example, <h1 class="animate in-view">
// Define your CSS to enable animations once that element is in view. For example, h1.in-view { }

//Check if the document is loaded (so that this script can be placed in the <head>)
document.addEventListener("DOMContentLoaded", () => {

	// Use Intersection Observer to determine if objects are within the viewport
	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.classList.add('in-view');
		  return;
		}
		// entry.target.classList.remove('in-view');
	  });
	});

	// Get all the elements with the .animate class applied
	const allAnimatedElements = document.querySelectorAll('.animate');

	// Add the observer to each of those elements
	allAnimatedElements.forEach((element) => observer.observe(element));

}); 

const button = document.querySelector('.show-btn');

button.addEventListener('click', () => {
  const content = document.querySelector('.collapsible');
  expandElement(content, 'collapsed');
});

function expandElement(elem, collapseClass) {
  // debugger;
  elem.style.height = '';
  elem.style.transition = 'none';
  
  const startHeight = window.getComputedStyle(elem).height;
  
  // Remove the collapse class, and force a layout calculation to get the final height
  elem.classList.toggle(collapseClass);
  const height = window.getComputedStyle(elem).height;
  
  // Set the start height to begin the transition
  elem.style.height = startHeight;
  
  // wait until the next frame so that everything has time to update before starting the transition
  requestAnimationFrame(() => {
    elem.style.transition = '';
    
    requestAnimationFrame(() => {
        elem.style.height = height
    })
  })
  
  // Clear the saved height values after the transition
  elem.addEventListener('transitionend', () => {
    elem.style.height = '';
    elem.removeEventListener('transitionend', arguments.callee);
  }); 
}

