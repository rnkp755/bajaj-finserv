import asyncHandler from "../utils/AsyncHandler.js";
import { APIError } from "../utils/APIError.js";

const handlePost = asyncHandler(async (req, res) => {
	// Controller to handle request
	const { data } = req.body;
	if (!Array.isArray(data)) {
		throw new APIError(400, "Invalid Input format. Array Expected");
	}
	let numbers = [],
		alphabets = [],
		highest_alphabet = [];

	// Find greatest alphabet
	data.forEach((element) => {
		element.trim(); // Remove unwanted spaces from end
		if (element !== "") {
			if (isNaN(Number(element))) {
				alphabets.push(element);
			} else {
				numbers.push(element);
			}
		}
	});

	// Find the highest alphabet (case insensitive)
	if (alphabets.length > 0) {
		highest_alphabet.push(
			alphabets.reduce((max, current) =>
				current.toLowerCase() > max.toLowerCase()
					? current
					: max
			)
		);
	}
	const response = {
		is_success: true,
		user_id: "Raushan_Kumar_Thakur_01012004",
		email: "rnkp755@gmail.com",
		roll_number: "22BCS50121",
		numbers,
		alphabets,
		highest_alphabet,
	};
	return res.status(200).json(response);
});

const handleGet = asyncHandler(async (req, res) => {
	return res.status(200).json({
		operation_code: 1,
	});
});

export { handlePost, handleGet };
