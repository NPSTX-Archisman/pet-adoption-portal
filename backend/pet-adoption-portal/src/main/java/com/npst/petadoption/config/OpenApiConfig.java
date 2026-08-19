package com.npst.petadoption.config;


import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI petAdoptionPortalAPI() {

        Server localServer = new Server()
                .url("http://localhost:8080")
                .description("Local Development Server");

        final String securityScheme = "bearerAuth";
        return new OpenAPI()
                .servers(List.of(localServer))
                .addSecurityItem(new SecurityRequirement().addList(securityScheme))
                .components(new Components()
                        .addSecuritySchemes(
                                securityScheme,
                                new SecurityScheme()
                                        .name(securityScheme)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        ))
                .info(new Info()
                        .title("Pet Adoption Portal API")
                        .version("1.0")
                        .description("REST APIs for managing pets and their adoption requests and process")
                        .contact(new Contact().name("Archisman Chakraborty").email("archisman.chakraborty@npstx.com"))
                );
    }
}