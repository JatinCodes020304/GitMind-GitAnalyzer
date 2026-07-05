import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorStateProps {
  error: Error;
  username: string;
  onRetry: () => void;
}

export default function ErrorState({ error, username, onRetry }: ErrorStateProps) {
  const navigate = useNavigate();

  const isNotFound = error.message?.toLowerCase().includes("not found");
  const isRateLimit = error.message?.toLowerCase().includes("rate limit");

  const getTitle = () => {
    if (isNotFound) return "User Not Found";
    if (isRateLimit) return "Rate Limit Exceeded";
    return "Something Went Wrong";
  };

  const getMessage = () => {
    if (isNotFound) {
      return `We couldn't find a GitHub user with the username "${username}". Please check the spelling and try again.`;
    }
    if (isRateLimit) {
      return "We've hit the GitHub API rate limit. Please wait a moment and try again.";
    }
    return error.message || "An unexpected error occurred while fetching the data.";
  };

  const getIconColor = () => {
    if (isNotFound) return "text-amber-400 bg-amber-500/10";
    if (isRateLimit) return "text-orange-400 bg-orange-500/10";
    return "text-red-400 bg-red-500/10";
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${getIconColor()}`}
        >
          <AlertCircle className="h-8 w-8" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">{getTitle()}</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">{getMessage()}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-slate-700/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );
}
