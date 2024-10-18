import { useState } from "react";
import axios from "axios";

const CreateRule = () => {
    const [rule, setRule] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [ast, setAst] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            setError("");
            setResponseMessage("");
            setAst("");

            const res = await axios.post("http://localhost:3333/user/create_rule", {
                rule: rule
            });

            if (res.data.success) {
                setResponseMessage(res.data.msg);
                setAst(JSON.stringify(res.data.ast, null, 2)); 
            } else {
                setError("Failed to create rule.");
            }

        } catch (err) {
            setError("Failed to submit rule. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="bg-white shadow-lg rounded-lg p-8 m-5 text-center w-full max-w-lg">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Create Rule</h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={rule}
                        onChange={(e) => setRule(e.target.value)}
                        placeholder="Define your rule"
                        className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-800"
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800"
                    >
                        Submit Rule
                    </button>

                    {responseMessage && (
                        <div className="mt-6 bg-gray-50 border border-gray-300 p-4 rounded-lg text-gray-800">
                            {responseMessage}
                        </div>
                    )}
                    {ast && (
                        <div className="mt-6 bg-gray-50 border border-gray-300 p-4 rounded-lg text-gray-800">
                            <h2 className="text-lg font-semibold mb-2">AST:</h2>
                            <pre className="whitespace-pre-wrap text-left">{ast}</pre>
                        </div>
                    )}
                    {error && (
                        <div className="mt-6 bg-red-100 border border-red-300 p-4 rounded-lg text-red-800">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateRule;
