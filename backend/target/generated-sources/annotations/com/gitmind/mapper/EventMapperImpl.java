package com.gitmind.mapper;

import com.gitmind.dto.EventDto;
import com.gitmind.model.GitHubEvent;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class EventMapperImpl implements EventMapper {

    @Override
    public EventDto toDto(GitHubEvent event) {
        if ( event == null ) {
            return null;
        }

        EventDto.EventDtoBuilder eventDto = EventDto.builder();

        eventDto.isPublic( event.getIsPublic() );
        eventDto.createdAt( event.getCreatedAt() );
        eventDto.id( event.getId() );
        eventDto.type( event.getType() );

        eventDto.actorLogin( event.getActor() != null ? event.getActor().getLogin() : null );
        eventDto.actorAvatarUrl( event.getActor() != null ? event.getActor().getAvatarUrl() : null );
        eventDto.repoName( event.getRepo() != null ? event.getRepo().getName() : null );
        eventDto.repoUrl( event.getRepo() != null ? event.getRepo().getUrl() : null );
        eventDto.ref( event.getPayload() != null ? event.getPayload().getRef() : null );
        eventDto.refType( event.getPayload() != null ? event.getPayload().getRefType() : null );
        eventDto.description( event.getPayload() != null ? event.getPayload().getDescription() : null );
        eventDto.pushSize( event.getPayload() != null ? event.getPayload().getSize() : null );

        return eventDto.build();
    }
}
