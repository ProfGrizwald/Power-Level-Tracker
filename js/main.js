import numerize from "./number_input.js";
import { RandomName, RandomColor } from "./name_generator.js";

let div_dim_screen = document.getElementById("dim-screen");
let div_characters = document.getElementById("characters");
let div_new_character = document.getElementById("character-new");
let div_calculator_names_list = document.getElementById(
	"character-active-name"
);
let div_calculator = document.getElementById("calculator");
let div_calculator_stat_range = document.getElementById(
	"calculator-stat-range"
);
let div_calculator_stat_type = document.getElementById("calculator-stat-type");
let div_calculator_operator = document.getElementById("calculator-operator");
let div_calculator_value = document.getElementById("calculator-value");
let div_calculator_is_percent = document.getElementById(
	"calculator-is-percent"
);
let div_calculator_apply = document.getElementById("calculator-apply");

div_dim_screen.addEventListener("click", () =>
	div_dim_screen.classList.remove("active")
);

div_new_character.addEventListener("click", () => new Character());

const calculate_new_value = (outdated_value, value) => {
	let is_percent = div_calculator_is_percent.checked;

	let selected_operator = div_calculator_operator.querySelector("li.selected");
	let operator = selected_operator.textContent;

	if (is_percent) {
		switch (operator) {
			case "+":
				return outdated_value + (outdated_value * value) / 100;
			case "-":
				return outdated_value - (outdated_value * value) / 100;
			case "*":
				return (outdated_value * (outdated_value * value)) / 100;
			case "/":
				return outdated_value / (outdated_value * value) / 100;
		}
	} else {
		switch (operator) {
			case "+":
				return outdated_value + value;
			case "-":
				return outdated_value - value;
			case "*":
				return outdated_value * value;
			case "/":
				return outdated_value / value;
		}
	}
};

div_calculator_apply.addEventListener("click", () => {
	let value = parseFloat(div_calculator_value.value);
	if (value === 0 || isNaN(value)) return;

	let selected_stat_range =
		div_calculator_stat_range.querySelector("li.selected");
	let stat_range = selected_stat_range.textContent;

	let selected_stat_type =
		div_calculator_stat_type.querySelector("li.selected");
	let stat_type = selected_stat_type.textContent;

	let new_value;

	switch (stat_type) {
		case "power":
			switch (stat_range) {
				case "min":
					new_value = calculate_new_value(
						characters[character_selected_UUID].power_min,
						value
					);
					characters[character_selected_UUID].update_power_min(new_value);
					break;
				case "current":
					new_value = calculate_new_value(
						characters[character_selected_UUID].power_current,
						value
					);
					characters[character_selected_UUID].update_power_current(new_value);
					break;
				case "max":
					new_value = calculate_new_value(
						characters[character_selected_UUID].power_max,
						value
					);
					characters[character_selected_UUID].update_power_max(new_value);
					break;
			}
			break;
	}
});

let divs_dropdown_array = document.querySelectorAll(".dropdown");

divs_dropdown_array.forEach(function (dropdown) {
	dropdown.addEventListener("click", function () {
		dropdown.classList.toggle("active");
		div_dim_screen.classList.toggle("active");

		if (dropdown.classList.contains("active")) {
			div_dim_screen.addEventListener("click", () =>
				dropdown.classList.remove("active")
			);

			let li_array = dropdown.querySelectorAll("li");

			li_array.forEach(function (li) {
				li.addEventListener("click", function () {
					li_array.forEach(function (li) {
						li.classList.remove("selected");
					});

					li.classList.add("selected");
				});
			});
		}
	});
});

let divs_radios_array = document.querySelectorAll(".radios");

divs_radios_array.forEach(function (radios) {
	let li_array = radios.querySelectorAll("li");

	li_array.forEach(function (li) {
		li.addEventListener("click", function () {
			li_array.forEach(function (li) {
				li.classList.remove("selected");
			});

			li.classList.add("selected");
		});
	});
});

div_calculator_value.addEventListener("keydown", (e) => numerize(e));

const DEFAULTS = {
	power_min: 0,
	power_current: 50,
	power_max: 100,
};

let characters = {};
let character_selected_UUID = null;

class Character {
	constructor() {
		let self = this;

		this.UUID = Math.random().toString(36).substring(2, 15);

		this.name = RandomName();
		this.color = RandomColor();

		this.power_min = DEFAULTS.power_min;
		this.power_max = DEFAULTS.power_max;
		this.power_current = DEFAULTS.power_current;

		this.main_div = document.createElement("div");
		this.main_div.classList.add("character");
		this.main_div.setAttribute("data-uuid", this.UUID);

		this.remove_div = document.createElement("button");
		this.remove_div.classList.add("remove");
		this.remove_div.innerText = "X";

		this.color_and_name_div = document.createElement("div");
		this.color_and_name_div.classList.add("color-and-name");

		this.name_div = document.createElement("input");
		this.name_div.classList.add("name");
		this.name_div.setAttribute("type", "text");
		this.name_div.setAttribute("spellcheck", "false");
		this.name_div.setAttribute("placeholder", "Character Name");
		this.name_div.setAttribute("value", this.name);

		this.color_div = document.createElement("input");
		this.color_div.classList.add("color");
		this.color_div.setAttribute("type", "color");
		this.color_div.setAttribute("value", this.color);

		this.power_div = document.createElement("input");
		this.power_div.classList.add("bar");
		this.power_div.setAttribute("type", "range");
		this.power_div.setAttribute("title", "Spell Power");
		this.power_div.setAttribute("min", this.power_min);
		this.power_div.setAttribute("value", this.power_current);
		this.power_div.setAttribute("max", this.power_max);

		this.bar_stats_div = document.createElement("div");
		this.bar_stats_div.classList.add("bar-stats");

		this.power_min_div = document.createElement("input");
		this.power_min_div.classList.add("min");
		this.power_min_div.setAttribute("type", "number");
		this.power_min_div.setAttribute("placeholder", "0");
		this.power_min_div.setAttribute("title", "Minimum Power");
		this.power_min_div.setAttribute("value", this.power_min);

		this.power_current_div = document.createElement("input");
		this.power_current_div.classList.add("current");
		this.power_current_div.setAttribute("type", "number");
		this.power_current_div.setAttribute("placeholder", "0");
		this.power_current_div.setAttribute("title", "Current Power");
		this.power_current_div.setAttribute("value", this.power_current);

		this.power_max_div = document.createElement("input");
		this.power_max_div.classList.add("max");
		this.power_max_div.setAttribute("type", "number");
		this.power_max_div.setAttribute("placeholder", "100");
		this.power_max_div.setAttribute("title", "Maximum Power");
		this.power_max_div.setAttribute("value", this.power_max);

		this.bar_stats_div.appendChild(this.power_min_div);
		this.bar_stats_div.appendChild(this.power_current_div);
		this.bar_stats_div.appendChild(this.power_max_div);

		this.color_and_name_div.appendChild(this.remove_div);
		this.color_and_name_div.appendChild(this.name_div);
		this.color_and_name_div.appendChild(this.color_div);

		this.main_div.appendChild(this.color_and_name_div);
		this.main_div.appendChild(this.power_div);
		this.main_div.appendChild(this.bar_stats_div);

		this.update_power_div();

		this.remove_div.addEventListener("click", () => self.delete());

		this.name_div.addEventListener("input", () => self.rename());

		this.color_div.addEventListener("input", () => self.update_color());

		this.power_div.addEventListener("input", function () {
			self.update_power_current(parseInt(self.power_div.value));
		});

		this.power_min_div.addEventListener("input", () =>
			self.update_power_min(parseInt(self.power_min_div.value))
		);
		this.power_min_div.addEventListener("keydown", (e) => numerize(e));

		this.power_current_div.addEventListener("input", () =>
			self.update_power_current(parseInt(self.power_current_div.value))
		);
		this.power_current_div.addEventListener("keydown", (e) => numerize(e));

		this.power_max_div.addEventListener("input", () =>
			self.update_power_max(parseInt(self.power_max_div.value))
		);
		this.power_max_div.addEventListener("keydown", (e) => numerize(e));

		characters[this.UUID] = this;

		if (character_selected_UUID === null) {
			this.select();
		}

		div_characters.insertBefore(this.main_div, div_new_character);
		dispatchEvent(new CustomEvent("calculator_update", {}));
	}

	update_color() {
		this.color = this.color_div.value;
		this.update_power_div();
	}

	update_power_min(value) {
		this.power_min = Math.round(value * 100) / 100;
		this.power_min_div.value = this.power_min;
		this.power_div.setAttribute("min", this.power_min);
		this.update_power_div();
	}

	update_power_current(value) {
		this.power_current = Math.round(value * 100) / 100;
		this.power_div.value = this.power_current;
		this.power_current_div.value = this.power_current;
		this.update_power_div();
	}

	update_power_max(value) {
		this.power_max = Math.round(value * 100) / 100;
		this.power_max_div.value = value;
		this.power_div.setAttribute("max", this.power_max);
		this.update_power_div();
	}

	update_power_div() {
		let percent =
			((this.power_current - this.power_min) /
				(this.power_max - this.power_min)) *
			100;
		let grad = `linear-gradient(to right, ${this.color} 0%, ${this.color} ${percent}%, var(--primary-level-2) ${percent}%, var(--primary-level-2) 100%)`;
		this.power_div.style.background = grad;
	}

	select() {
		character_selected_UUID = this.UUID;
		dispatchEvent(new CustomEvent("calculator_update", {}));
	}

	rename() {
		this.name = this.name_div.value;
		dispatchEvent(new CustomEvent("calculator_update", {}));
	}

	delete() {
		this.main_div.remove();
		delete characters[this.UUID];

		if (Object.keys(characters).length > 0) {
			character_selected_UUID = Object.keys(characters)[0];
		} else {
			character_selected_UUID = null;
		}
		dispatchEvent(new CustomEvent("calculator_update", {}));
	}
}

addEventListener("calculator_update", () => {
	if (Object.keys(characters).length < 1) {
		div_calculator.classList.remove("active");
		return;
	}

	div_calculator.classList.add("active");
	div_calculator_names_list.innerHTML = "";

	for (const key in characters) {
		let name = document.createElement("li");
		name.setAttribute("data-uuid", key);
		name.textContent = characters[key].name;
		name.addEventListener("click", function () {
			characters[key].select();
		});
		if (key === character_selected_UUID) name.classList.add("selected");
		div_calculator_names_list.appendChild(name);
	}
});
