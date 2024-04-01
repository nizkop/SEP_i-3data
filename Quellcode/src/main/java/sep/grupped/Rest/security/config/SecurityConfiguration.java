package sep.grupped.Rest.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static sep.grupped.Rest.User.Permission.*;
import static sep.grupped.Rest.User.UserRole.ADMIN;
import static sep.grupped.Rest.User.UserRole.USER;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  private final LogoutHandler logoutHandler;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .cors().and()
      .csrf()
      .disable()
      .headers()
      .frameOptions()
      .disable()
      .and()
      .authorizeHttpRequests()
      .antMatchers("/h2-console/**","/auth/**","/api/**","/user/**","/chat/**", "/thread/**","/chat-bot/**").permitAll()
      .antMatchers(
        "/User/token/*",
        "/User/get/*",
        "/User/update/*",
        "/User/delete/image/*",
        "/User/get/image/*",
        "/User/update/image/*",
        "/User/token/*",
        "/Datensaetze/*",
        "/Datensaetze/*/get/*",
        "/User/*/request",
        "/User/*/acceptrequest",
        "/User/*/declinerequest",
        "/User/*/deletefriend",
        "/User/*/friends",
        "/User/togglefriends",
        "/User/*/friendsprivacy",
        "/ticket/post",
        "/chat/**/**",
        "/User/save/**",
        "/User/like/**",
        "/chat/**/**",
        "/thread/newThread",
        "/thread/get/allThreads",
        "/thread/get/*",
        "/thread/*/likeThread",
        "/thread/*/dislikeThread",
        "/thread/*/sendArticle",
        "/thread/*/deleteArticle",
        "/thread/*/postFavUser",
        "/thread/*/removeFavUser",
        "/chat-bot/**"
        ).hasAnyRole(USER.name(),ADMIN.name())

      .antMatchers("/Datensaetze/*/**","/User/*/**","/Datensaetze/*/upload").hasRole(ADMIN.name())
      .antMatchers(HttpMethod.GET, "geo/**").hasAuthority(ADMIN_READ.name())
      .antMatchers("/messages/**").authenticated()
      .antMatchers(HttpMethod.GET, "/Datensaetze/*/**","/User/*/**").hasAuthority(ADMIN_READ.name())
      .antMatchers(HttpMethod.POST, "/Datensaetze/*/**","User/*/**","/Datensaetze/*/upload").hasAuthority(ADMIN_CREATE.name())
      .antMatchers(HttpMethod.PUT, "/Datensaetze/*/**","/User/*/**").hasAuthority(ADMIN_UPDATE.name())
      .antMatchers(HttpMethod.DELETE, "/Datensaetze/*/**","/User/*/**").hasAuthority(ADMIN_DELETE.name())

      .anyRequest()
      .authenticated()
      .and()
      .sessionManagement()
      .and()
      .authenticationProvider(authenticationProvider)
      .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
      .logout()
      .logoutUrl("/auth/logout")
      .addLogoutHandler(logoutHandler)
      .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
    ;

    return http.build();
  }
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    configuration.setAllowedMethods(Arrays.asList("GET","POST", "OPTIONS", "DELETE", "PUT"));
    configuration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Origin", "Content-Type", "Accept", "Authorization"));
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
