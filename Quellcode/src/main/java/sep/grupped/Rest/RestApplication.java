package sep.grupped.Rest;

import com.fasterxml.jackson.dataformat.xml.JacksonXmlModule;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import sep.grupped.Rest.security.auth.AuthenticationService;
import sep.grupped.Rest.security.auth.RegisterRequest;

import static sep.grupped.Rest.User.UserRole.ADMIN;

@SpringBootApplication
public class RestApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext applicationContext =
				SpringApplication.run(RestApplication.class, args);


	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:4200")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
			}
		};
	}
  @Configuration
  public class XmlConfig {

    @Bean
    public Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder() {
      return new Jackson2ObjectMapperBuilder()
        .indentOutput(true)
        .modulesToInstall(new JacksonXmlModule())
        .modules(new JacksonXmlModule());
    }
  }
  @Bean
  public CommandLineRunner commandLineRunner(
    AuthenticationService service
  ) {
    return args -> {
      var admin = RegisterRequest.builder()
        .firstName("Admin")
        .lastName("Admin")
        .userName("admin")
        .birthDate("22.01.1999")
        .email("admin@mail.com")
        .password("password")
        .prfPicture("")
        .favData("$")
        .role(ADMIN)
        .build();
      System.out.println("Admin token: " + service.register(admin).getAccessToken());
    };
  }


}
