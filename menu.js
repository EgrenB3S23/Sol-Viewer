// menu open toggle listener
document.querySelector(".toggle").addEventListener("click", (e) => {
	document.getElementById("menu").classList.toggle("open");
});

// animation toggle listener
document.getElementById("checkboxAnimate").addEventListener("change", (e) => {
	//toggle animation on sun (if there was any)
	document.getElementById("soleil").classList.toggle("pause");
});

// orbit ring toggle listener
document.getElementById("checkboxOrbitRings").addEventListener("change", (e) => {
	// toggle orbit ring on planets
	planets = document.getElementsByClassName("planet");
	for (const planet of planets) {
		planet.classList.toggle("hide-orbit-rings");
	}
	// toggle orbit ring on moons
	moons = document.getElementsByClassName("moon");
	for (const moon of moons) {
		moon.classList.toggle("hide-orbit-rings");
	}
});

// highlight ring toggle listener
document.getElementById("checkboxHighlightRings").addEventListener("change", (e) => {
	// toggle highlight ring on planets
	planets = document.getElementsByClassName("planet");
	for (const planet of planets) {
		planet.classList.toggle("hide-highlight-rings");
	}
	// toggle highlight ring on moons
	moons = document.getElementsByClassName("moon");
	for (const moon of moons) {
		moon.classList.toggle("hide-highlight-rings");
	}
});

// if clicking outside of menu, close menu

// document.addEventListener("click", (e) => {
// 	const menu = document.getElementById("menu");
// 	const toggler = document.querySelector(".toggle");
// 	if (!menu.contains(e.target) && !toggler.contains(e.target)) {
// 		menu.classList.remove("open");
// 	}
// });
