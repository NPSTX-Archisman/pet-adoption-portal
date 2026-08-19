package com.npst.petadoption.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI petAdoptionPortalAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Pet Adoption Portal API")
                        .version("1.0")
                        .description("REST APIs for managing pets and their adoption requests and process")
                        .contact(new Contact().name("Archisman Chakraborty").email("archisman.chakraborty@npstx.com"))
                );
    }
}