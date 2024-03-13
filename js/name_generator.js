import { hex_to_hsl, hsl_to_hex } from "./hsl_color.js";

const namePrefixes = [
	"Ae",
	"Da",
	"El",
	"Ma",
	"Ra",
	"Sa",
	"Ta",
	"Va",
	"Za",
	"Ki",
	"Si",
	"Li",
	"Ga",
];
const nameSuffixes = [
	"dor",
	"lan",
	"nor",
	"rian",
	"thar",
	"thir",
	"var",
	"von",
];

function getRandomElement(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

function RandomName() {
	const prefix = getRandomElement(namePrefixes);
	const suffix = getRandomElement(nameSuffixes);
	return `${prefix}${suffix}`;
}

function RandomColor() {
	let random_hue_hsl = Math.floor(Math.random() * 360);
	let hsl = hex_to_hsl("#40bf80");
	return hsl_to_hex(random_hue_hsl, hsl.s, hsl.l);
}

export { RandomName, RandomColor };
