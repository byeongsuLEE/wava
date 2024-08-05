package com.worq.worcation.domain.chat.dto.reqeust;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatDto {
    private Long channelId;
    private String nickName;
    private String message;
}
