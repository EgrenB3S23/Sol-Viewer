// document.getElementById("menuToggle").addEventListener("click", () => {
// 	const menuElem = document.getElementById("menu");
// 	menuElem.classList.toggle("open");
// 	// window.location.href = `singlePlanet.html?planet=${planetName.toLowerCase()}`;
// });
document.querySelector(".toggle").addEventListener("click", (e) => {
	document.querySelector("nav").classList.toggle("open");
});

document.addEventListener("click", (e) => {
	const nav = document.querySelector("nav");
	const toggler = document.querySelector(".toggle");
	if (!nav.contains(e.target) && !toggler.contains(e.target)) {
		// alert("!!!");
		nav.classList.remove("open");
	}
});
