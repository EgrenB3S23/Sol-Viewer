const planetColors = ["#8d8b85", "#e7cccb", "#428ed5", "#f05f5f", "#e29468", "#c7aa72", "#c9d4f1", "#7a92a7"];

function nameToIndex(name = null) {
	// Omvandlar ett planetnamn till motsvarande index.
	// example:
	// nameToIndex("venus") returns 2

	switch (name) {
		case "soleil":
			return -1;
		case "mercure":
			return 0;
		case "venus":
			return 1;
		case "terre":
			return 2;
		case "mars":
			return 3;
		case "jupiter":
			return 4;
		case "saturne":
			return 5;
		case "uranus":
			return 6;
		case "neptune":
			return 7;
		default:
			return null;
	}
}

function indexToName(index = null) {
	// Omvandlar ett index till motsvarande planetnamn.
	// example:
	// nameToIndex(2) returns "venus"

	switch (index) {
		case -1:
			return "soleil";
		case 0:
			return "mercure";
		case 1:
			return "venus";
		case 2:
			return "terre";
		case 3:
			return "mars";
		case 4:
			return "jupiter";
		case 5:
			return "saturne";
		case 6:
			return "uranus";
		case 7:
			return "neptune";
		default:
			return null;
	}
}
