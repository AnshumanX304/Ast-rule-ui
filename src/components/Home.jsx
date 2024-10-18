import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8">AST RULE ENGINE</h1>
                <div className="space-y-4">
                    <button
                        className="w-full border border-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-100"
                        onClick={() => navigate('/create-rule')}
                    >
                        RULE TO AST (CREATE RULE)
                    </button>
                    <button className="w-full border border-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-100"
                        onClick={() => navigate('/combine-rule')}>
                        COMBINE RULE
                    </button>
                    <button className="w-full border border-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-100"
                    onClick={() => navigate('/evaluate-rule')}>
                        EVALUATE DATA AGAINST RULE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
