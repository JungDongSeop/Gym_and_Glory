package com.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        System.out.println("소켓 올라오나?");
        registry.addEndpoint("/ws-connection")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/subscribe");
        //해당 경로로 SimpleBroker를 등록한다. SimpleBroker는 해당하는 경로를
        // SUBSCRIBE하는 client에게 메시지를 전달하는 간단한 작업을 수행한다.
        registry.setApplicationDestinationPrefixes("/publish");
        // client에서 SEND 요청을 처리한다.
        //Spring Reference에서는 /topic, /queue가
        // 주로 등장하는데 여기서는 이해를 돕기 위해 /publish로 지정하였다
    }


}