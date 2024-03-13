const keycodes_input_number = [
	// Numeric keypad
	96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
	// Number keys (top row)
	48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
	// Backspace and Delete keys
	8, 46,
	// Arrow keys
	37, 38, 39, 40,
	// decimal point
	110, 190,
];
const input_numeric_validate = (event) => {
	if (!keycodes_input_number.includes(event.keyCode)) {
		event.preventDefault();
	}
};

export default input_numeric_validate;
