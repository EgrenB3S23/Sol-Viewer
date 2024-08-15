const apiUrl = "https://api.le-systeme-solaire.net/rest/bodies";
// const planetsUrl = "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Planet";
// const moonsUrl = "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Moon";
// const sunUrl = "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Star";

async function fetchCelestialsOfType(type = null) {
	try {
		let response = await fetch(`${apiUrl}/?filter[]=bodyType,eq,${type}`, {
			method: "GET",
		});

		const data = await response.json();
		// console.log(" Data:", data); // Logga data om planeter
		console.log(" Data:", data.bodies); // Logga data om planeter
		return data.bodies;
	} catch (error) {
		console.log(error);
		return error;
	}
}

async function storeSun() {
	console.log("F: storeSun");
	let starList = [];
	const stars = await fetchCelestialsOfType("star");
	if (typeof stars === "object") {
		for (let i = 0; i < stars.length; i++) {
			//add planet to list
			starList.push(stars[i]);
		}
		localStorage.setItem("stars", JSON.stringify(starList));
	}
}

async function storePlanets() {
	console.log("F: storePlanets");
	let planetList = [, , , , , , ,];
	const planets = await fetchCelestialsOfType("planet");

	console.log(planets);
	if (typeof planets === "object") {
		for (let i = 0; i < planets.length; i++) {
			//add planet to list
			// planetList.push(planets[i]);
			order = nameToIndex(planets[i].id);
			planetList[order] = planets[i];
		}
		localStorage.setItem("planets", JSON.stringify(planetList));
	}

	// console.log(`planetList before sorting:`, planetList);
	// let planetListSorted = [];
	// for (let i = 0; i < planetList.length; i++) {
	// 	const planetToAdd = planetList.; // wip 240814-1921
	// }
	// console.log(`planetList after sorting:`, planetList);
}

async function storeMoons() {
	console.log("F: storeMoons");
	let moonList = [];
	const moons = await fetchCelestialsOfType("moon");

	console.log("Moons:", moons);
	if (typeof moons === "object") {
		for (let i = 0; i < moons.length; i++) {
			//add moon to list
			moonList.push(moons[i]);
		}
		localStorage.setItem("moons", JSON.stringify(moonList));
	}
}

function setupLocalStorage() {
	// fetches data on celestial bodies
	console.log("Setting up celestial bodiy data...");
	const stars = localStorage.getItem("stars");
	const planets = localStorage.getItem("planets");
	const moons = localStorage.getItem("moons");
	let errorsList = [];

	// Sun:
	try {
		if (stars === null) {
			console.log("Sun not found locally. Fetching sun...");
			storeSun();
			console.log("Sun fetched!");
		} else {
			console.log("Sun found locally, no need to fetch.");
		}
	} catch (error) {
		console.log("Error during stars list creation:", error);
		errorsList.push(error);
	}

	// Planets:
	try {
		if (planets === null) {
			console.log("Planets not found locally. Fetching planets...");
			storePlanets();
			console.log("Planets fetched!");
		} else {
			console.log("Planets found locally, no need to fetch.");
		}
	} catch (error) {
		console.log("Error during planet list creation:", error);
		errorsList.push(error);
	}

	// Moons:
	try {
		if (moons === null) {
			console.log("Moons not found locally. Fetching moons...");
			storeMoons();
			console.log("Moons fetched!");
		}
		console.log("Moons found locally, no need to fetch.");
	} catch (error) {
		console.log("Error during moon list creation:", error);
		errorsList.push(error);
	}

	// log any errors caught
	if (errorsList.length === 0) {
		console.log("localStorage setup completed without errors.");
	} else {
		console.log("localStorage setup encountered the following errors:", errorsList);
	}
}

function createSunElement() {
	console.log("F: createSunElements.");
	let stars = JSON.parse(localStorage.getItem("stars"));

	const solarSystemHTML = document.getElementById("solarSystem");

	if (typeof stars === "object") {
		for (let i = 0; i < stars.length; i++) {
			// code here = "for each star": (although there is only one, let's match the format of the planet- and moon lists)

			// create html tag
			let newStar = document.createElement("div");
			newStar.id = stars[i].id.toLowerCase();
			newStar.classList.add("star");
			newStar.style = `--radius-star: ${stars[i].meanRadius}`;

			// add newly created HTML tag to document
			solarSystemHTML.appendChild(newStar);
		}
	}
}

function createPlanetElements() {
	console.log("F: createPlanetElements.");
	let planets = JSON.parse(localStorage.getItem("planets"));

	// console.log(planets);

	const sunHTML = document.getElementById("soleil");

	if (typeof planets === "object") {
		for (let i = 0; i < planets.length; i++) {
			// code here = "for each planet":

			// create html tag
			let newPlanet = document.createElement("div");
			newPlanet.id = planets[i].id.toLowerCase();
			newPlanet.classList.add("planet");
			newPlanet.style = `
			--i-planet: ${i}; 
			--radius-planet: ${planets[i].meanRadius};
			--orbit-planet: ${planets[i].sideralOrbit};
			--distance-planet: ${planets[i].semimajorAxis};
			background-color: ${planetColors[i]}`;

			addHoverListenerFor(newPlanet);

			// add newly created HTML tag to document
			sunHTML.appendChild(newPlanet);

			// add moons
			if (planets[i].moons !== null) {
				// "if planet has moons..."
				createMoonElements(planets[i].id);
			}
		}
	}
}

function createMoonElements(planetId = null) {
	console.log("F: createMoonElements:", planetId);

	let moons = JSON.parse(localStorage.getItem("moons"));
	// console.log("moons:", moons);
	const myMoons = moons.filter((moon) => moon.aroundPlanet.planet === planetId); // from list of all moons, grab only the given planet's moons
	console.log("myMoons:", myMoons);

	const planetHTML = document.getElementById(planetId);

	if (typeof myMoons === "object") {
		for (let i = 0; i < myMoons.length; i++) {
			// code here = "for each moon":

			// create html tag
			let newMoon = document.createElement("div");
			newMoon.id = myMoons[i].id.toLowerCase();
			newMoon.classList.add("moon");
			newMoon.style = `--i-moon: ${i}; 
			--radius-moon: ${myMoons[i].meanRadius};
			--orbit-moon: ${myMoons[i].sideralOrbit};
			--distance-moon: ${myMoons[i].semimajorAxis};
			`;

			// add newly created HTML tag to document
			planetHTML.appendChild(newMoon);
			console.log(`Added moon "${myMoons[i].id}"`);
		}
	}
}

function getScaleFactor() {
	const elem = document.querySelector(".zoomable");
	// fetches the value of the inline css "transform: scale(#)".
	// without this, the first zoom event always starts out from scale 1, potentially causing a massive jump.
	let scaleFactorStr = elem.style.transform; // -> scaleFactor example value: "scale(1)"
	// let scaleFactorStr2 = Number(document.querySelector(".zoomable").style.scale);
	console.log("scaleFactorStr:", scaleFactorStr, typeof scaleFactorStr);
	// console.log("scaleFactorStr2:", scaleFactorStr2, typeof scaleFactorStr2);
	// let scaleFactor = Number(document.querySelector(".zoomable").style.scale);

	let startIndex = 6; // -> scaleFactor example value: "1)"
	let endIndex = scaleFactorStr.length - 1; // -> scaleFactor example value: "1"
	let scaleFactor = Number(scaleFactorStr.substring(startIndex, endIndex));
	console.log("scaleFactor:", scaleFactor, typeof scaleFactor);

	if (typeof scaleFactor === "number" && scaleFactor > 0) {
		return scaleFactor;
	} else {
		return 1;
	}

	/*
	if (typeof scaleFactorStr2 === "number" && scaleFactorStr2 > 0) {
		return scaleFactorStr2;
	} else {
		return 1;
	}
	*/
}

function zoom() {
	// let zoom = 1;
	let zoom = getScaleFactor();
	const zoomSpeed = 1.2;
	const zoomElement = document.querySelector(".zoomable");

	document.addEventListener("wheel", function (e) {
		if (e.deltaY > 0) {
			zoomElement.style.transform = `scale(${(zoom /= zoomSpeed)})`;
			// zoom /= zoomSpeed;
			// zoomElement.style.scale = zoom;
		} else {
			zoomElement.style.transform = `scale(${(zoom *= zoomSpeed)})`;
			// zoom *= zoomSpeed;
			// zoomElement.style.scale = zoom;
		}
	});
}

function dragElement(elmnt) {
	//enable "drag-and-drop" movement.

	let deltaX = 0;
	let deltaY = 0;
	let lastX = 0;
	let lastY = 0;
	if (document.querySelector(".drag-handle")) {
		/* if there is an element with class ".drag-handle", that's the handle...*/
		document.querySelector(".drag-handle").onmousedown = dragMouseDown;
	} else {
		/* ...Otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		lastX = e.clientX;
		lastY = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();

		let scaleFactor = getScaleFactor();
		// console.log("scaleFactor:", scaleFactor, typeof scaleFactor);

		// deltaX & deltaY need to scale inversely with zoom
		deltaX = (lastX - e.clientX) / scaleFactor;
		deltaY = (lastY - e.clientY) / scaleFactor;
		lastX = e.clientX;
		lastY = e.clientY;

		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - deltaY + "px";
		elmnt.style.left = elmnt.offsetLeft - deltaX + "px";
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function addHoverListenerFor(celestial) {
	// celestial.addEventListener("click", () => {
	// 	window.location.href = `singlePlanet.html?planet=${planetName.toLowerCase()}`;
	// });

	celestial.addEventListener("mouseenter", () => {
		document.querySelector("#nameHeader").textContent = celestial.id; // Visa planetens namn vid hover
	});
	celestial.addEventListener("mouseleave", () => {
		document.querySelector("#nameHeader").textContent = "Sol-viewer"; // Dölj planetens namn när muspekaren lämnar
	});
}

function init() {
	setupLocalStorage(); // api request + save data to localstorage
	createSunElement(); // generate sun html element
	createPlanetElements(); // generate planet (and moon) html elements
	zoom(); // listener - zoom on scroll
	dragElement(document.querySelector(".draggable")); // listener - pan on drag
}

init();
