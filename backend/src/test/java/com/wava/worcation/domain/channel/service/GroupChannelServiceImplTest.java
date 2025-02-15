package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.ChannelUser;
import com.wava.worcation.domain.channel.dto.request.GroupChannelRequestDto;
import com.wava.worcation.domain.channel.dto.response.GroupChannelResponseDto;
import com.wava.worcation.domain.channel.dto.response.GroupChannelValidResponseDto;
import com.wava.worcation.domain.channel.dto.response.GroupDetailResponseDto;
import com.wava.worcation.domain.channel.enums.ChannelType;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.ChannelUserRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.dto.response.GroupUserResponseDto;
import com.wava.worcation.domain.worcation.repository.WorcationRepository;
import com.wava.worcation.domain.worcation.domain.Worcation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GroupChannelServiceImplTest {

    private static final Logger log = LoggerFactory.getLogger(GroupChannelServiceImplTest.class);
    @InjectMocks
    private GroupChannelServiceImpl groupChannelServiceImpl;

    @Mock
    private ChannelRepository channelRepository;
    @Mock
    private ChannelUserRepository channelUserRepository;
    @Mock
    private WorcationRepository worcationRepository;


    // 클래스 인스턴스 변수로 선언

    private User user;
    private GroupChannelRequestDto groupChannelRequestDto;
    private Channel channel ;
    private ChannelUser  channelUser;
    private Worcation worcation;



    @BeforeEach
    public void setUp() {
        // 공통적으로 필요한 설정
        user = User.builder()
                .id(63L)
                .email("test1586@test.com")
                .password("$2a$10$VJTDditUN6rD9Z4aWuwjb.KeKpcoU.Jj1JBHKKPXHBci0Ika9Q.T.")
                .phone("01022222345")
                .nickName("나는야퉁퉁이")
                .sido("서울특별시")
                .sigungu("강동구")
                .profileImg("https://worqbucket.s3.ap-northeast-2.amazonaws.com/53a16f79-ef6d-4809-98a0-2fe245f78c53.jpg")
                .build();

        groupChannelRequestDto = new GroupChannelRequestDto();
        groupChannelRequestDto.setChannelSido("서울");
        groupChannelRequestDto.setChannelSigungu("경기");
        groupChannelRequestDto.setChannelTitle("나는 바로 옵티머스 프라임 웅~치킨 웅~치킨");
        groupChannelRequestDto.setChannelDescription("no Transactional annotation");

         channel = Channel.builder()
                .id(56L)
                .user(User.builder().id(63L).build())
                .channelSido("서울특별시")
                .channelSigungu("강동구")
                .channelTitle("나는야퉁퉁이")
                .channelDescription("나는야퉁퉁이님의 채널 입니다.")
                .channelType("C002")
                .build();
        channelUser = ChannelUser.builder()
                .id(1L)
                .user(user)
                .build();


         worcation = Worcation.builder()
                .sido("서울특별시")
                .build();

    }
    /**
     * @작성자 : 이병수
     * @작성일 : 2024-08-10
     * @설명 : createGroupChannel 메서드를 테스트합니다.
     *         채널과 채널 사용자 객체를 저장하고, 메서드가 올바른 응답을 반환하는지 검증합니다.
     */
    @Test
    void createGroupChannel() {

        //given : 데이터설정
        Channel channel = Channel.builder()
                .user(user)
                .channelDescription(groupChannelRequestDto.getChannelDescription())
                .channelTitle(groupChannelRequestDto.getChannelTitle())
                .channelType(ChannelType.GROUP.getCode())
                .channelSido(groupChannelRequestDto.getChannelSido())
                .channelSigungu(groupChannelRequestDto.getChannelSigungu())
                .build();

        ChannelUser channelUser = ChannelUser.builder()
                .channel(channel)
                .user(user)
                .build();

        // Mockito를 사용하여 메서드 호출 시 예상되는 결과를 설정
        when(channelRepository.save(any(Channel.class))).thenReturn(channel);
        when(channelUserRepository.save(any(ChannelUser.class))).thenReturn(channelUser);

        // When: 메서드 실행
        ResponseEntity<ApiResponse<GroupChannelResponseDto>> response = groupChannelServiceImpl.createGroupChannel(groupChannelRequestDto, user);

        // Then: 결과 검증

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody().getData());
        assertEquals(groupChannelRequestDto.getChannelTitle(), response.getBody().getData().getChannelTitle());
        verify(channelRepository, times(1)).save(any(Channel.class));
        verify(channelUserRepository, times(1)).save(any(ChannelUser.class));

    }



    @Test
    void showAllGroupChannel(){


        //given
        Channel expectedChannel1 = Channel.builder()
                .id(56L)
                .user(User.builder().id(63L).build())
                .channelSido("서울특별시")
                .channelSigungu("강동구")
                .channelTitle("나는야퉁퉁이")
                .channelDescription("나는야퉁퉁이님의 채널 입니다.")
                .channelType("C002")
                .build();

        Worcation worcation = Worcation.builder()
                .sido("서울특별시")
                .build();

        Channel expectedChannel2 = Channel.builder()
                .id(60L)
                .user(User.builder().id(63L).build())
                .channelSido("서울특별시")
                .channelSigungu("강남구")
                .channelTitle("안녕")
                .channelDescription("안녕님의 채널 입니다.")
                .channelType("C002")
                .build();

        List<Channel> channelList = new ArrayList<>();
        channelList.add(expectedChannel1);
        channelList.add(expectedChannel2);


        //when
        when(worcationRepository.findByUserId(user.getId())).thenReturn(worcation);
        when(channelRepository.findAllByChannelType(ChannelType.GROUP.getCode(), worcation.getSido())).thenReturn(channelList);
        ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> response = groupChannelServiceImpl.showAllGroupChannel(user);



        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().getData().size());
        assertEquals(expectedChannel1.getId(), response.getBody().getData().get(0).getChannelId());
        assertEquals(expectedChannel2.getId(), response.getBody().getData().get(1).getChannelId());

    }

    @Test
    void getGroupInfo(){

        //given
        Channel expectedChannel = Channel.builder()
                .id(56L)
                .user(User.builder().id(63L).build())
                .channelSido("서울특별시")
                .channelSigungu("강동구")
                .channelTitle("나는야퉁퉁이")
                .channelDescription("나는야퉁퉁이님의 채널 입니다.")
                .channelType("C002")
                .build();

        User user = User.builder()
                .id(1L)
                .nickName("이병수")
                .profileImg("testProfile.jpg")
                .worcation(Worcation.builder().job("Developer").build())
                .build();

        ChannelUser channelUser = ChannelUser.builder()
                .id(1L)
                .user(user)
                .build();


        List<ChannelUser> channelUserList = Collections.singletonList(channelUser);
        when(channelRepository.findById(expectedChannel.getId())).thenReturn(Optional.of(expectedChannel));
        when(channelUserRepository.findByChannelId(expectedChannel.getId())).thenReturn(channelUserList);

        //when
        ResponseEntity<ApiResponse<GroupDetailResponseDto>> groupInfo = groupChannelServiceImpl.getGroupInfo(expectedChannel.getId());

        GroupDetailResponseDto expectedResponse = GroupDetailResponseDto.builder()
                .channelId(expectedChannel.getId())
                .channelTitle(expectedChannel.getChannelTitle())
                .channelDescription(expectedChannel.getChannelDescription())
                .channelMemo(expectedChannel.getChannelMemo())
                .user(Collections.singletonList(
                        GroupUserResponseDto.builder()
                                .userId(user.getId())
                                .nickName(user.getNickName())
                                .profile(user.getProfileImg())
                                .job(user.getWorcation().getJob())
                                .build()
                ))
                .build();



        //then
        assertEquals(HttpStatus.OK , groupInfo.getStatusCode());
        assertNotNull(groupInfo.getBody().getData());

        assertEquals(expectedResponse, groupInfo.getBody().getData());


    }


    @Test
    void updateMemo(){

        //given
        String memo = "채널 업데이트 테스트입니다.";
        Channel expectedChannel = Channel.builder()
                .id(56L)
                .user(User.builder().id(63L).build())
                .channelSido("서울특별시")
                .channelSigungu("강동구")
                .channelTitle("나는야퉁퉁이")
                .channelDescription("나는야퉁퉁이님의 채널 입니다.")
                .channelType("C002")
                .channelMemo(memo)
                .build();


        ChannelUser channelUser = ChannelUser.builder()
                .id(1L)
                .user(user)
                .build();


        List<ChannelUser> channelList = Collections.singletonList(channelUser);
        when(channelUserRepository.countByChannelId(expectedChannel.getId())).thenReturn(1);
        when(channelRepository.findById(expectedChannel.getId())).thenReturn(Optional.of(expectedChannel));

        //when
        ResponseEntity<ApiResponse<GroupChannelResponseDto>> response = groupChannelServiceImpl.updateMemo(expectedChannel.getId(), memo);

        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().getData());
        assertEquals(memo, response.getBody().getData().getChannelMemo());
    }

    @Test
    void serachChannel(){

        //given
        String content = "서울특별시";
        List<Channel> channelList = Collections.singletonList(channel);

        when(worcationRepository.findByUserId(user.getId())).thenReturn(worcation);
        when(channelUserRepository.countByChannelId(channel.getId())).thenReturn(3);
        when(channelRepository.searchChannelByInsert(content,ChannelType.GROUP.getCode(),worcationRepository.findByUserId(user.getId()).getSido() )).thenReturn(channelList);

        //when
        ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> response = groupChannelServiceImpl.searchChannel(user, content);

        //then
        log.info("channelList : " + channelList.get(0) );
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().getData());
        assertEquals(3,response.getBody().getData().get(0).getUserCount());
    }

    @Test
    void initiateJoinChannel(){
        //given
        when(channelRepository.findById(channel.getId())).thenReturn(Optional.of(channel));
        when(channelUserRepository.existsChannelUserByChannelIdAndUserId(channel.getId(),user.getId())).thenReturn(false);
        when(channelUserRepository.save(any(ChannelUser.class))).thenReturn(channelUser);
        when(channelUserRepository.countByChannelId(channel.getId()))
                .thenReturn(3)  // 3명인 경우
                .thenReturn(4); // 가입 후 4명으로 증가

        //when
        ResponseEntity<ApiResponse<GroupChannelResponseDto>> response = groupChannelServiceImpl.initiateJoinChannel(user, channel.getId());

        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().getData());
        assertEquals(4,response.getBody().getData().getUserCount());
        assertEquals("나는야퉁퉁이", response.getBody().getData().getChannelTitle());

        // Verify: save 메서드가 한 번 호출되었는지 확인
        verify(channelUserRepository, times(1)).save(any(ChannelUser.class));
        verify(channelUserRepository, times(2)).countByChannelId(channel.getId()); // count 호출이 2번 발생했는지 확인

    }

    @Test
    void channelJoinUserValidate(){
        //given
        when(channelUserRepository.existsChannelUserByChannelIdAndUserId(channel.getId(),user.getId())).thenReturn(true);
        when(channelRepository.findById(channel.getId())).thenReturn(Optional.of(channel));
        //when
        ResponseEntity<ApiResponse<GroupChannelValidResponseDto>> response = groupChannelServiceImpl.channelJoinUserValidate(channel.getId(), user);

        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().getData());
        assertEquals(true,response.getBody().getData().getIsJoin());
    }

    @Test
    void validateChannel(){
        //given
        when(channelRepository.findById(channel.getId())).thenReturn(Optional.empty());

        //when
        // When & Then: 예외가 발생하는지 확인
        // when & then: 예외가 발생하는지 확인
        CustomException exception = assertThrows(CustomException.class, () -> {
            groupChannelServiceImpl.getGroupInfo(channel.getId());
        });


        assertEquals(exception.getErrorCode(), ErrorCode.CHANNEL_NOT_FOUND);
    }


}