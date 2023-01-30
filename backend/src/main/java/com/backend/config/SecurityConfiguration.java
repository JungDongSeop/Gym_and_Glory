package com.backend.config;

import com.backend.jwt.filter.JwtFilter;
import com.google.firebase.auth.FirebaseAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
//@EnableWebSecurity//스프링 시큐리티 필터가 스프링 필터체인에 등록이 됩니다.
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private FirebaseAuth firebaseAuth;
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest().authenticated().and()
                .addFilterBefore(new JwtFilter(userDetailsService, firebaseAuth),
                        UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        // 회원가입, 메인페이지, 리소스
        web.ignoring().antMatchers(HttpMethod.POST, "/api")
                .antMatchers("/")
                .antMatchers("/resources/**");
    }
//이전 버젼-----------------------------------------------------------------------------
//    @Bean
//    public WebSecurityCustomizer configure(){
//        return (web) ->web.ignoring().mvcMatchers();
//    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.authorizeRequests()
//                .antMatchers("/**").permitAll()
//                .antMatchers("/signup").permitAll();
//        http.csrf().disable();
////    @Bean
////    PasswordEncoder passwordEncoder(){
////        return new BCryptPasswordEncoder();
////    }
//        return http.build();
//    }

}

