package com.gitmind.mapper;

import com.gitmind.dto.RepositoryDto;
import com.gitmind.model.GitHubRepository;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class RepositoryMapperImpl implements RepositoryMapper {

    @Override
    public RepositoryDto toDto(GitHubRepository repository) {
        if ( repository == null ) {
            return null;
        }

        RepositoryDto.RepositoryDtoBuilder repositoryDto = RepositoryDto.builder();

        repositoryDto.fullName( repository.getFullName() );
        repositoryDto.htmlUrl( repository.getHtmlUrl() );
        repositoryDto.forksCount( repository.getForksCount() );
        repositoryDto.stargazersCount( repository.getStargazersCount() );
        repositoryDto.watchersCount( repository.getWatchersCount() );
        repositoryDto.openIssuesCount( repository.getOpenIssuesCount() );
        repositoryDto.createdAt( repository.getCreatedAt() );
        repositoryDto.updatedAt( repository.getUpdatedAt() );
        repositoryDto.pushedAt( repository.getPushedAt() );
        repositoryDto.defaultBranch( repository.getDefaultBranch() );
        repositoryDto.archived( repository.getArchived() );
        repositoryDto.description( repository.getDescription() );
        repositoryDto.fork( repository.getFork() );
        repositoryDto.id( repository.getId() );
        repositoryDto.language( repository.getLanguage() );
        repositoryDto.name( repository.getName() );
        repositoryDto.size( repository.getSize() );

        repositoryDto.licenseName( repository.getLicense() != null ? repository.getLicense().getName() : null );
        repositoryDto.ownerLogin( repository.getOwner() != null ? repository.getOwner().getLogin() : null );

        return repositoryDto.build();
    }
}
