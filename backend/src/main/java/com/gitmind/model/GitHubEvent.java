package com.gitmind.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.Instant;

/**
 * Represents a GitHub public event.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GitHubEvent {

    private String id;
    private String type;
    private Actor actor;
    private Repo repo;
    private Payload payload;
    private Boolean isPublic;
    private Instant createdAt;

    @JsonProperty("public")
    public void setPublicFromJson(Boolean isPublic) {
        this.isPublic = isPublic;
    }

    @JsonProperty("created_at")
    public void setCreatedAtFromJson(Instant createdAt) {
        this.createdAt = createdAt;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Actor {
        private Long id;
        private String login;
        private String displayLogin;
        private String gravatarId;
        private String avatarUrl;

        @JsonProperty("display_login")
        public void setDisplayLoginFromJson(String displayLogin) {
            this.displayLogin = displayLogin;
        }

        @JsonProperty("gravatar_id")
        public void setGravatarIdFromJson(String gravatarId) {
            this.gravatarId = gravatarId;
        }

        @JsonProperty("avatar_url")
        public void setAvatarUrlFromJson(String avatarUrl) {
            this.avatarUrl = avatarUrl;
        }
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Repo {
        private Long id;
        private String name;
        private String url;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Payload {
        private String ref;
        private String refType;
        private String masterBranch;
        private String description;
        private String pusherType;
        private Long pushId;
        private Integer size;
        private Integer distinctSize;
        private String before;
        private String head;

        @JsonProperty("ref_type")
        public void setRefTypeFromJson(String refType) {
            this.refType = refType;
        }

        @JsonProperty("master_branch")
        public void setMasterBranchFromJson(String masterBranch) {
            this.masterBranch = masterBranch;
        }

        @JsonProperty("pusher_type")
        public void setPusherTypeFromJson(String pusherType) {
            this.pusherType = pusherType;
        }

        @JsonProperty("push_id")
        public void setPushIdFromJson(Long pushId) {
            this.pushId = pushId;
        }

        @JsonProperty("distinct_size")
        public void setDistinctSizeFromJson(Integer distinctSize) {
            this.distinctSize = distinctSize;
        }
    }
}
