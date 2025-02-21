"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Send, RefreshCw, Check } from "lucide-react";
import axios from "axios";
import { SERVER_URL } from "../constant.js";

interface ApiResponse {
	is_success?: boolean;
	user_id?: string;
	email?: string;
	roll_number?: string;
	numbers?: string[];
	alphabets?: string[];
	highest_alphabet?: string[];
	operation_code?: number;
}

const POST_FIELDS = [
	{ id: "is_success", label: "Success Status" },
	{ id: "user_id", label: "User ID" },
	{ id: "email", label: "Email" },
	{ id: "roll_number", label: "Roll Number" },
	{ id: "numbers", label: "Numbers" },
	{ id: "alphabets", label: "Alphabets" },
	{ id: "highest_alphabet", label: "Highest Alphabet" },
];

function App() {
	const [inputText, setInputText] = useState(
		'{"data": ["M", "1", "334", "4", "B", "P"]}'
	);
	const [loading, setLoading] = useState(false);
	const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
	const [selectedFields, setSelectedFields] = useState<string[]>(
		POST_FIELDS.map((f) => f.id)
	);

	const handleRequest = async (method: "GET" | "POST") => {
		setLoading(true);
		try {
			let parsedInput;
			try {
				parsedInput = JSON.parse(inputText);
				if (
					!parsedInput.data ||
					!Array.isArray(parsedInput.data)
				) {
					throw new Error(
						"Invalid JSON format. 'data' should be an array."
					);
				}
			} catch (error) {
				alert("Invalid JSON input! Please correct it.");
				setLoading(false);
				return;
			}

			if (method === "POST") {
				const apiResponse = await axios.post(
					SERVER_URL,
					parsedInput
				);
				setApiResponse(apiResponse.data);
			} else {
				setApiResponse({ operation_code: 1 });
			}
		} catch (error) {
			console.error("API Error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleFieldToggle = (fieldId: string) => {
		setSelectedFields((prev) =>
			prev.includes(fieldId)
				? prev.filter((id) => id !== fieldId)
				: [...prev, fieldId]
		);
	};

	const getFilteredResponse = () => {
		if (!apiResponse) return "By default, all fields are selected.";
		return Object.entries(apiResponse)
			.filter(([key]) => selectedFields.includes(key))
			.map(([key, value]) => {
				const label =
					POST_FIELDS.find((f) => f.id === key)?.label ||
					key;
				return `${label}: ${
					Array.isArray(value) ? value.join(", ") : value
				}`;
			})
			.join("\n");
	};

	return (
		<div className="min-h-screen bg-slate-900 text-white p-6 flex gap-6">
			{/* Left Section (Forms) */}
			<div className="w-1/2 space-y-8">
				{/* GET Request Section */}
				<div className="bg-slate-800 p-6 rounded-lg">
					<h2 className="text-xl font-semibold mb-4 text-blue-400">
						GET Request
					</h2>
					<button
						onClick={() => handleRequest("GET")}
						disabled={loading}
						className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? (
							<Loader2
								className="animate-spin"
								size={20}
							/>
						) : (
							<RefreshCw size={20} />
						)}
						Send GET Request
					</button>
				</div>

				{/* POST Request Section */}
				<div className="bg-slate-800 p-6 rounded-lg space-y-6">
					<h2 className="text-xl font-semibold text-blue-400">
						POST Request
					</h2>

					{/* Input Field */}
					<textarea
						value={inputText}
						onChange={(e) =>
							setInputText(e.target.value)
						}
						className="w-full p-4 h-[160px] rounded-lg bg-slate-900 border border-slate-700 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                       placeholder-slate-400 text-white transition-all duration-200"
						placeholder='Enter JSON input here, e.g. {"data": ["M", "1", "334", "4", "B", "P"]}'
					/>

					{/* Field Selection */}
					<div className="space-y-2">
						<h3 className="text-sm font-medium text-slate-300">
							Select fields to display:
						</h3>
						<div className="flex flex-wrap gap-2">
							{POST_FIELDS.map((field) => (
								<button
									key={field.id}
									onClick={() =>
										handleFieldToggle(
											field.id
										)
									}
									className={`flex items-center px-3 py-2 rounded-full text-sm transition-colors ${
										selectedFields.includes(
											field.id
										)
											? "bg-blue-600 text-white"
											: "bg-slate-700 text-slate-300 hover:bg-slate-600"
									}`}
								>
									{selectedFields.includes(
										field.id
									) && (
										<Check
											size={14}
											className="mr-1"
										/>
									)}
									{field.label}
								</button>
							))}
						</div>
					</div>

					{/* POST Button */}
					<button
						onClick={() => handleRequest("POST")}
						disabled={loading}
						className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? (
							<Loader2
								className="animate-spin"
								size={20}
							/>
						) : (
							<Send size={20} />
						)}
						Send POST Request
					</button>
				</div>
			</div>

			{/* Right Section (Response) */}
			<div className="w-1/2 h-full">
				<div className="bg-slate-800 rounded-lg p-6 h-full overflow-auto">
					<h2 className="text-xl font-semibold mb-4 text-blue-400">
						Response
					</h2>
					<pre className="font-mono text-sm whitespace-pre-wrap">
						{getFilteredResponse()}
					</pre>
				</div>
			</div>
		</div>
	);
}

export default App;
