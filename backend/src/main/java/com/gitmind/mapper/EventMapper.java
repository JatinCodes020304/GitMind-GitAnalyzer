package com.gitmind.mapper;

import com.gitmind.dto.EventDto;
import com.gitmind.model.GitHubEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * MapStruct mapper for GitHub event conversions.
 */
@Mapper(componentModel = "spring")
public interface EventMapper {

    @Mapping(target = "actorLogin", expression = "java(event.getActor() != null ? event.getActor().getLogin() : null)")
    @Mapping(target = "actorAvatarUrl", expression = "java(event.getActor() != null ? event.getActor().getAvatarUrl() : null)")
    @Mapping(target = "repoName", expression = "java(event.getRepo() != null ? event.getRepo().getName() : null)")
    @Mapping(target = "repoUrl", expression = "java(event.getRepo() != null ? event.getRepo().getUrl() : null)")
    @Mapping(target = "ref", expression = "java(event.getPayload() != null ? event.getPayload().getRef() : null)")
    @Mapping(target = "refType", expression = "java(event.getPayload() != null ? event.getPayload().getRefType() : null)")
    @Mapping(target = "description", expression = "java(event.getPayload() != null ? event.getPayload().getDescription() : null)")
    @Mapping(target = "pushSize", expression = "java(event.getPayload() != null ? event.getPayload().getSize() : null)")
    @Mapping(target = "isPublic", source = "isPublic")
    @Mapping(target = "createdAt", source = "createdAt")
    EventDto toDto(GitHubEvent event);
}
