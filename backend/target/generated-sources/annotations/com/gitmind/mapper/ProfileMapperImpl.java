package com.gitmind.mapper;

import com.gitmind.dto.ProfileDto;
import com.gitmind.model.GitHubProfile;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public ProfileDto toDto(GitHubProfile profile) {
        if ( profile == null ) {
            return null;
        }

        ProfileDto.ProfileDtoBuilder profileDto = ProfileDto.builder();

        profileDto.avatarUrl( profile.getAvatarUrl() );
        profileDto.htmlUrl( profile.getHtmlUrl() );
        profileDto.twitterUsername( profile.getTwitterUsername() );
        profileDto.publicRepos( profile.getPublicRepos() );
        profileDto.publicGists( profile.getPublicGists() );
        profileDto.createdAt( profile.getCreatedAt() );
        profileDto.updatedAt( profile.getUpdatedAt() );
        profileDto.bio( profile.getBio() );
        profileDto.blog( profile.getBlog() );
        profileDto.company( profile.getCompany() );
        profileDto.followers( profile.getFollowers() );
        profileDto.following( profile.getFollowing() );
        profileDto.id( profile.getId() );
        profileDto.location( profile.getLocation() );
        profileDto.login( profile.getLogin() );
        profileDto.name( profile.getName() );

        return profileDto.build();
    }
}
