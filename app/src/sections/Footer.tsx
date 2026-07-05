import { BarChart3, Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/60 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <BarChart3 className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white">
                GitMind <span className="text-indigo-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              GitHub Profile Analyzer — understand your impact, analyze
              repositories, and visualize your coding journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Analyze Profile", path: "/search" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://docs.github.com/en/rest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            Built with <Heart className="h-3 w-3 inline text-rose-500" /> using Spring Boot & React
          </p>
          <p className="text-xs text-slate-600">
            Data provided by the GitHub REST API
          </p>
        </div>
      </div>
    </footer>
  );
}
