import { useState } from "react";
import axios from "axios";

const CombineRule = () => {
    const [rules, setRules] = useState([""]);
    const [responseMessage, setResponseMessage] = useState("");
    const [combinedRule, setCombinedRule] = useState(null);
    const [error, setError] = useState("");

    const handleAddRule = () => {
        setRules([...rules, ""]);
    };

    const handleRemoveRule = (index) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    const handleRuleChange = (index, value) => {
        const newRules = [...rules];
        newRules[index] = value;
        setRules(newRules);
    };

    const handleSubmit = async () => {
        try {
            setError("");
            setResponseMessage("");
            setCombinedRule(null);

            const res = await axios.post("http://localhost:3333/user/combine_rules", {
                rules: rules.filter(rule => rule.trim() !== "")
            });

            if (res.data.success) {
                setResponseMessage(res.data.msg);
                setCombinedRule(res.data.combinedRule);
            } else {
                setError("Failed to combine rules.");
            }
        } catch (err) {
            setError("Failed to submit rules. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full max-w-lg m-5">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Combine Rules</h1>
                <div className="space-y-4">
                    {rules.map((rule, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={rule}
                                onChange={(e) => handleRuleChange(index, e.target.value)}
                                placeholder={`Rule ${index + 1}`}
                                className="flex-grow border border-gray-300 rounded-lg py-3 px-4 text-gray-800"
                            />
                            {rules.length > 1 && (
                                <button
                                    onClick={() => handleRemoveRule(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={handleAddRule}
                        className="w-full border border-gray-300 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-100"
                    >
                        Add Another Rule
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800"
                    >
                        Submit Rules
                    </button>

                   
                    {combinedRule && (
                        <div className="mt-6 bg-gray-50 border border-gray-300 p-2 rounded-lg text-gray-800">
                            <h2 className="font-bold mb-1">Combined Rule AST:</h2>
                            <pre className="whitespace-pre-wrap text-left">{JSON.stringify(combinedRule, null, 2)}</pre>
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

export default CombineRule;
