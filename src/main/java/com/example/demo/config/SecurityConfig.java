package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SimpleSavedRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

////Matt Raibles's Okta tutorial config https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
            .and()
//            .logout().logoutUrl("/api/logout").and()
            .logout().and()
                .csrf()
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                    .and()
            .authorizeRequests()
                .antMatchers("/v2/api-docs", "/configuration/**", "/swagger*/**", "/webjars/**").permitAll()
                .antMatchers("/**/*.{js,html,css}").permitAll()
                .antMatchers("/", "/api/user", "/api/logout").permitAll()
                .anyRequest().authenticated();
    }

//// Spring Security tutorial config https://spring.io/guides/tutorials/spring-boot-oauth2/
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//            .authorizeRequests(a -> a
//                    .antMatchers("/v2/api-docs", "/configuration/**", "/swagger*/**", "/", "/error", "/webjars/**", "/api/user").permitAll()
//                    .anyRequest().authenticated()
//            )
//            .exceptionHandling(e -> e
//                    .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
//            )
//            .csrf(c -> c
//                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//            )
//            .logout(l -> l
//                    .logoutSuccessUrl("/api/logout").permitAll()
//            )
//            .oauth2Login();
//        // @formatter:on
//    }

    @Bean
    public RequestCache refererRequestCache() {
        return new HttpSessionRequestCache() {
            @Override
            public void saveRequest(HttpServletRequest request, HttpServletResponse response) {
                String referrer = request.getHeader("referer");
                String queryString = request.getQueryString();
                System.out.println("referrer");
                System.out.println(referrer);
                System.out.println("queryString");
                System.out.println(queryString);


                if (referrer != null) {
                    if(queryString != null){
                        return;
                    } else {
                        request.getSession().setAttribute("SPRING_SECURITY_SAVED_REQUEST", new SimpleSavedRequest(referrer));
                    }

                }
            }
        };
    }
}
