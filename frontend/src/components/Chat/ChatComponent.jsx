import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import fetchChat from "../../api/chatApi";
import MyMessageComponent from "./message/MyMessageComponent";
import OtherMessageComponent from "./message/OtherMessageComponent";
import ChatInputComponent from "./ChatInputComponent";
// zustand
import useUserStore from "../../store/userStore";
// axios 추가
import { Stomp } from "@stomp/stompjs";

function ChatComponent() {
  // URL에서 채팅방 ID를 가져옴
  // const { channelId } = useParams();
  const channelId = 1;
  // 채팅 메시지 상태
  const [messages, setMessages] = useState([]);
  // 메시지 입력 상태
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
  const stompClient = useRef(null);
  // 채팅 메시지 목록의 끝을 참조하는 ref. 이를 이용해 새 메시지가 추가될 때 스크롤을 이동
  const messagesEndRef = useRef(null);
  // 컴포넌트 마운트 시 실행. 웹소켓 연결 및 초기 메시지 로딩
  const [profileImg, setProfileImg] = useState(null);
  const [customerSeq, setCustomerSeq] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const nickName = useUserStore((state) => state.userInfo?.nickName);

  // const handleNameChange = (event) => {
  //     setName(event.target.value);
  // };

  useEffect(() => {
    connect();
    fetchMessages();
    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => disconnect();
  }, [channelId]);

  // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동시키는 함수
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 웹소켓 연결 설정
  const connect = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtajE1ODRAbmF2ZXIuY29tIiwiYXV0aCI6IlZJU0lUT1IiLCJleHAiOjE3MjI2Nzk2MDV9.g8ZTJn9l2_ysSphyeSHr_2LAQkj2JxEwko0uxr1Q8Xg`,
      },
      () => {
        stompClient.current.subscribe(
          `/sub/chatroom/${channelId}`,
          (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        );
      }
    );
    console.log("방 번호", channelId);
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  // 기존 채팅 메시지를 서버로부터 가져오는 함수
  const fetchMessages = () => {
    fetchChat(
      channelId,
      (response) => {
        console.log("메시지 목록", response.data);
        setMessages(response.data.data);
      },
      (error) => {
        console.error("failed to fetch chat", error);
      }
    );
  };

  // 새 메시지를 보내는 함수
  const sendMessage = () => {
    if (stompClient.current && inputValue) {
      console.log(name);
      const messageObj = {
        channelId: 1,
        nickName: nickName,
        message: inputValue,
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(messageObj));
      setInputValue("");
      // setName("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-end me-3">
        <div className="bg-blue-400 w-full flex flex-col rounded-t-lg overflow-y-auto min-h-screen max-h-screen">
          {messages.map((item, index) => (
            <div key={index} className="m-4">
              {nickName}
              {item.nickName === nickName ? (
                <MyMessageComponent item={item} index={index} />
              ) : (
                <OtherMessageComponent item={item} index={index} />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInputComponent
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
}

export default ChatComponent;
