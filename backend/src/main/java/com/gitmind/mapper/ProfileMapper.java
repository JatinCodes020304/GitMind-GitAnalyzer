package com.gitmind.mapper;

import com.gitmind.dto.ProfileDto;
import com.gitmind.model.GitHubProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

/**
 * MapStruct mapper for GitHub profile conversions.
 */
@Mapper(componentModel = "spring")
public interface ProfileMapper {

    @Mapping(target = "avatarUrl", source = "avatarUrl")
    @Mapping(target = "htmlUrl", source = "htmlUrl")
    @Mapping(target = "twitterUsername", source = "twitterUsername")
    @Mapping(target = "publicRepos", source = "publicRepos")
    @Mapping(target = "publicGists", source = "publicGists")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "updatedAt", source = "updatedAt")
    ProfileDto toDto(GitHubProfile profile);
}
