package com.wava.worcation.domain.chat.service;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.chat.dto.reqeust.ChatDto;
import com.wava.worcation.domain.chat.dto.response.ChatResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ChatService {
    void saveChat(final ChatDto chatDto, final String token);
    ResponseEntity<ApiResponse<List<ChatResponseDto>>> chatLogs(final Long ChannelId);

}
