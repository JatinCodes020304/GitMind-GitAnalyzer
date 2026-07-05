import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Github, AlertCircle, ArrowRight } from "lucide-react";

export default function SearchPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateUsername = (value: string): boolean => {
    if (!value.trim()) {
      setError("Please enter a GitHub username");
      return false;
    }
    if (value.length > 39) {
      setError("GitHub username cannot exceed 39 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(value)) {
      setError("Invalid GitHub username format");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUsername(username.trim())) {
      navigate(`/dashboard/${username.trim()}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (error) setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-6">
              <Github className="h-8 w-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Analyze GitHub Profile
            </h1>
            <p className="text-slate-400">
              Enter a GitHub username to get a comprehensive analysis
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                value={username}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter GitHub username..."
                className={`w-full pl-12 pr-4 py-4 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 text-base ${
                  error
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-slate-700/50 focus:border-indigo-500/50"
                }`}
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <button
                  type="submit"
                  disabled={!username.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-all duration-200"
                >
                  <span className="hidden sm:inline">Analyze</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </form>

          {/* Suggestions */}
          <div className="mt-8">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium">
              Try these usernames
            </p>
            <div className="flex flex-wrap gap-2">
              {["torvalds", "gaearon", "sindresorhus", "yyx990803"].map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setUsername(name);
                    setError("");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-600 text-sm transition-all duration-200"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
