package sep.grupped.Rest;

import com.fasterxml.jackson.dataformat.xml.JacksonXmlModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import sep.grupped.Rest.User.UserRepository;
import sep.grupped.Rest.security.auth.AuthenticationService;
import sep.grupped.Rest.security.auth.RegisterRequest;

import static sep.grupped.Rest.User.UserRole.ADMIN;
import static sep.grupped.Rest.User.UserRole.USER;

@SpringBootApplication
public class RestApplication {

  @Autowired
  private UserRepository userRepository;

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
    if(userRepository.findByEmail("admin@mail.com").isPresent()) {
      return null;
    }
    return args -> {
      var admin = RegisterRequest.builder()
        .firstName("Admin")
        .lastName("Admin")
        .userName("admin")
        .birthDate("22.01.1999")
        .email("admin@mail.com")
        .password("password")
        .prfPicture("")
        .favData("")
        .role(ADMIN)
        .build();
      System.out.println("Admin token: " + service.register(admin).getAccessToken());
    };
  }
  @Bean
  public CommandLineRunner commandLineRunner1(
    AuthenticationService service
  ) {
    if(userRepository.findByEmail("nizkop@gmx.de").isPresent()) {
      return null;
    }
    return args -> {
      var user1 = RegisterRequest.builder()
        .firstName("Joe")
        .lastName("Bama")
        .userName("joeB")
        .birthDate("01.08.1990")
        .email("nizkop@gmx.de")
        .password("password")
        .prfPicture("")
        .favData("")
        .role(USER)
        .build();
      System.out.println("User 1 token: " + service.register(user1).getAccessToken());
    };
  }
  @Bean
  public CommandLineRunner commandLineRunner2(
    AuthenticationService service
  ) {
    if(userRepository.findByEmail("user2@mail.com").isPresent()) {
      return null;
    }
    return args -> {
      var user2 = RegisterRequest.builder()
        .firstName("Max")
        .lastName("Inton")
        .userName("MaxI")
        .birthDate("10.05.1985")
        .email("user2@mail.com")
        .password("password")
        .prfPicture("")
        .favData("")
        .role(USER)
        .build();
      System.out.println("User 2 token: " + service.register(user2).getAccessToken());
    };
  }



}
