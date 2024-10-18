import { useState } from "react";
import axios from "axios";

const ValidateData = () => {
    const [astJson, setAstJson] = useState(""); 
    const [dataDict, setDataDict] = useState(""); 
    const [responseMessage, setResponseMessage] = useState(""); 
    const [result, setResult] = useState(null);
    const [error, setError] = useState(""); 

    const handleSubmit = async () => {
        try {
            setError("");
            setResponseMessage("");
            setResult(null); 

            
            if (!astJson || !dataDict) {
                setError("Both AST and data dictionary must be provided.");
                return;
            }

            
            const astObject = JSON.parse(astJson);
            const dataObject = JSON.parse(dataDict);

            const res = await axios.post("http://localhost:3333/user/evaluate_rule", {
                ast: astObject, 
                data: dataObject 
            });

            console.log(res);

            if (res.data.success) {
                setResponseMessage(res.data.msg);
                setResult(res.data.result); 
            } else {
                setError("Validation failed. Please check your inputs.");
            }
        } catch (err) {
            setError("Failed to validate data. Please check your inputs and try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full max-w-lg">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Validate Data</h1>
                <div className="space-y-4">
                    <div>
                        <textarea
                            value={astJson}
                            onChange={(e) => setAstJson(e.target.value)}
                            placeholder="Enter AST JSON structure as a string"
                            rows="4"
                            className="flex-grow border border-gray-300 rounded-lg py-2 px-4 text-gray-800 w-full"
                        />
                    </div>
                    <div>
                        <textarea
                            value={dataDict}
                            onChange={(e) => setDataDict(e.target.value)}
                            placeholder="Enter data dictionary as a string (e.g., { 'age': 25, 'department': 'Sales', 'experience': 2, 'salary': 50000 })"
                            rows="4"
                            className="flex-grow border border-gray-300 rounded-lg py-2 px-4 text-gray-800 w-full"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800"
                    >
                        Validate Data
                    </button>

                    {result !== null && (
                        <div
                            className={`mt-6 p-4 rounded-lg text-center text-white ${result ? "bg-green-500" : "bg-red-500"}`}
                        >
                            <h2 className="font-bold mb-1">Evaluation Result:</h2>
                            <p>{result ? "True" : "False"}</p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 bg-red-100 border border-red-300 p-2 rounded-lg text-red-800">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ValidateData;
