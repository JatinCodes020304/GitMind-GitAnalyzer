import { MapPin, Link as LinkIcon, Calendar, Users, BookOpen, Star } from "lucide-react";
import type { Profile } from "@/types/github";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm p-6">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <img
            src={profile.avatarUrl || "https://github.com/ghost.png"}
            alt={profile.login}
            className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-slate-700/50 object-cover"
          />
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-slate-900" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <h2 className="text-2xl font-bold text-white truncate">
              {profile.name || profile.login}
            </h2>
            <a
              href={profile.htmlUrl || `#`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors inline-flex items-center gap-1"
            >
              @{profile.login}
            </a>
          </div>

          {profile.bio && (
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">{profile.bio}</p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
            {profile.company && (
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {profile.company}
              </span>
            )}
            {profile.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </span>
            )}
            {profile.blog && (
              <a
                href={
                  profile.blog.startsWith("http")
                    ? profile.blog
                    : `https://${profile.blog}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <LinkIcon className="h-3.5 w-3.5" />
                {profile.blog}
              </a>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Joined {formatDate(profile.createdAt)}
            </span>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4 text-slate-500" />
              <span className="font-semibold text-white">{profile.followers.toLocaleString()}</span>
              <span className="text-slate-500">followers</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4 text-slate-500" />
              <span className="font-semibold text-white">{profile.following.toLocaleString()}</span>
              <span className="text-slate-500">following</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <BookOpen className="h-4 w-4 text-slate-500" />
              <span className="font-semibold text-white">{profile.publicRepos.toLocaleString()}</span>
              <span className="text-slate-500">repositories</span>
            </div>
            {profile.publicGists > 0 && (
              <div className="flex items-center gap-1.5 text-sm">
                <Star className="h-4 w-4 text-slate-500" />
                <span className="font-semibold text-white">{profile.publicGists.toLocaleString()}</span>
                <span className="text-slate-500">gists</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
