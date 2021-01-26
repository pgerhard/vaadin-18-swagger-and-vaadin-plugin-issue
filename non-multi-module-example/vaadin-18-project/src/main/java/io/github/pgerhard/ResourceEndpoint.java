package io.github.pgerhard;

import javax.annotation.security.PermitAll;

import com.vaadin.flow.server.connect.Endpoint;
import io.github.pgerhard.rest.v1.dto.ResourceContainer;

@Endpoint
public class ResourceEndpoint {

    @PermitAll
    public ResourceContainer loadResourceContainer () {
        return new ResourceContainer ();
    }
}
