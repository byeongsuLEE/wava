package com.wava.worcation.common.config.websocket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@Slf4j
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // chatting 소켓 엔드포인트
        registry.addEndpoint("/ws") // 웹소켓 엔드포인트
                .setAllowedOriginPatterns("*"); // CORS 허용
//                .withSockJS();
        // cursor 소켓 엔드포인트
        registry.addEndpoint("/cursor")
                .setAllowedOriginPatterns("*");
        // marker 소켓 엔드포인트
        registry.addEndpoint("/marker")
                .setAllowedOriginPatterns("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub"); // 구독자 Prefix
        registry.setApplicationDestinationPrefixes("/pub"); // 발행자 Prefix
    }

}