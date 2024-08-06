// import React, { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
// import { debounce } from "lodash";
// import ChatComponent from "../components/Chat/ChatComponent";
// import FeedSearchBar from "../components/Channel/feed/FeedSearchbar";

// // Kakao Maps API 스크립트를 동적으로 로드하는 함수
// const loadKakaoMapsScript = () => {
//   return new Promise((resolve, reject) => {
//     if (window.kakao && window.kakao.maps) {
//       resolve();
//       return;
//     }
//     const script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAPS_API_KEY&autoload=false`;
//     script.onload = () => window.kakao.maps.load(resolve);
//     script.onerror = reject;
//     document.head.appendChild(script);
//   });
// };

// function GroupChannelPage() {
//   const { channelId } = useParams();
//   const [map, setMap] = useState(null);
//   const [isViewSyncEnabled, setIsViewSyncEnabled] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);

//   // Yjs 문서 및 WebSocket 프로바이더 설정
//   const [ydoc] = useState(() => new Y.Doc());
//   const [provider] = useState(
//     () => new WebsocketProvider("ws://localhost:1234", channelId, ydoc)
//   );
//   const [yviewState] = useState(() => ydoc.getMap("viewState"));

//   useEffect(() => {
//     loadKakaoMapsScript().then(() => {
//       const mapContainer = document.getElementById("map");
//       const mapOption = {
//         center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
//         level: 3,
//       };
//       const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
//       setMap(kakaoMap);
//     });

//     // 키보드 이벤트 리스너 추가
//     const handleKeyDown = (e) => {
//       if (e.code === "Space") {
//         e.preventDefault();
//         setIsViewSyncEnabled((prev) => !prev);
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const updateViewState = useCallback(
//     debounce((center, level) => {
//       yviewState.set("center", { lat: center.getLat(), lng: center.getLng() });
//       yviewState.set("level", level);
//     }, 1000),
//     [yviewState]
//   );

//   useEffect(() => {
//     if (map) {
//       window.kakao.maps.event.addListener(map, "center_changed", () => {
//         updateViewState(map.getCenter(), map.getLevel());
//       });
//       window.kakao.maps.event.addListener(map, "zoom_changed", () => {
//         updateViewState(map.getCenter(), map.getLevel());
//       });
//     }
//   }, [map, updateViewState]);

//   useEffect(() => {
//     const handleViewStateChange = () => {
//       if (isViewSyncEnabled && map) {
//         const center = yviewState.get("center");
//         const level = yviewState.get("level");
//         if (center && level) {
//           map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
//           map.setLevel(level);
//         }
//       }
//     };

//     yviewState.observe(handleViewStateChange);
//     return () => yviewState.unobserve(handleViewStateChange);
//   }, [isViewSyncEnabled, map, yviewState]);

//   const handleSearch = (searchText) => {
//     // 실제 검색 로직 구현 필요
//     console.log("Searching for:", searchText);
//     // 임시 검색 결과
//     setSearchResults([
//       { id: 1, name: "검색 결과 1", location: { lat: 37.5665, lng: 126.978 } },
//       { id: 2, name: "검색 결과 2", location: { lat: 37.5667, lng: 126.9783 } },
//     ]);
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-3/4 relative">
//         <div id="map" className="w-full h-full"></div>
//         <div className="absolute top-4 left-4 z-10">
//           <FeedSearchBar searchHandle={handleSearch} />
//         </div>
//         <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded shadow">
//           <span
//             className={`px-2 py-1 rounded ${
//               isViewSyncEnabled
//                 ? "bg-green-500 text-white"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             {isViewSyncEnabled ? "동기화 ON" : "동기화 OFF"}
//           </span>
//         </div>
//         {searchResults.length > 0 && (
//           <div className="absolute bottom-4 left-4 z-10 bg-white p-2 rounded shadow max-h-40 overflow-y-auto">
//             <h3 className="font-bold mb-2">검색 결과</h3>
//             <ul>
//               {searchResults.map((result) => (
//                 <li
//                   key={result.id}
//                   className="cursor-pointer hover:bg-gray-100 p-1"
//                   onClick={() =>
//                     map.setCenter(
//                       new window.kakao.maps.LatLng(
//                         result.location.lat,
//                         result.location.lng
//                       )
//                     )
//                   }
//                 >
//                   {result.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//       <div className="w-1/4">
//         <ChatComponent channelId={channelId} />
//       </div>
//     </div>
//   );
// }

// export default GroupChannelPage;

import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import MapComponent from "../components/Channel/group/MapComponent";
import ChatComponent from "../components/Chat/ChatComponent";

const VideoChatComponent = lazy(() =>
  import("../components/Channel/group/VideoChatComponent")
);

// 더미 데이터 생성 함수
const generateDummyMapData = () => {
  return {
    center: { lat: 37.5665, lng: 126.978 },
    markers: [
      { id: 1, lat: 37.5665, lng: 126.978, title: "서울시청" },
      { id: 2, lat: 37.5707, lng: 126.9762, title: "경복궁" },
      // 추가 마커...
    ],
  };
};

const generateDummyChatMessages = () => {
  return [
    {
      id: 1,
      sender: "User1",
      message: "안녕하세요!",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      sender: "User2",
      message: "반갑습니다!",
      timestamp: new Date().toISOString(),
    },
    // 추가 메시지...
  ];
};

function GroupChannelComponent() {
  const { channelId } = useParams();
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [ydoc] = useState(() => new Y.Doc());
  const [provider, setProvider] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // 실제 WebSocket 연결 대신 사용할 더미 프로바이더
    const dummyProvider = {
      connect: () => console.log("더미 WebSocket 연결됨"),
      disconnect: () => console.log("더미 WebSocket 연결 해제됨"),
      on: (event, callback) => {
        console.log(`이벤트 ${event} 리스너 등록됨`);
        // 실제로는 여기서 이벤트 리스너를 등록합니다.
      },
    };

    // 비동기 작업을 시뮬레이션하는 함수
    const simulateAsyncOperation = (data, delay) => {
      return new Promise((resolve) => setTimeout(() => resolve(data), delay));
    };

    const initializeChannel = async () => {
      try {
        // 실제 연결 대신 더미 프로바이더 사용
        setProvider(dummyProvider);
        dummyProvider.connect();

        // 맵 데이터 로드 시뮬레이션
        const dummyMapData = await simulateAsyncOperation(
          generateDummyMapData(),
          1000
        );
        setMapData(dummyMapData);

        // 채팅 메시지 로드 시뮬레이션
        const dummyChatMessages = await simulateAsyncOperation(
          generateDummyChatMessages(),
          800
        );
        setChatMessages(dummyChatMessages);

        // 실시간 업데이트 시뮬레이션
        const intervalId = setInterval(() => {
          setChatMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              sender: `User${Math.floor(Math.random() * 5) + 1}`,
              message: `새로운 메시지 ${Math.random()
                .toString(36)
                .substring(7)}`,
              timestamp: new Date().toISOString(),
            },
          ]);
        }, 5000); // 5초마다 새 메시지 추가

        // 클린업 함수 반환
        return () => {
          clearInterval(intervalId);
          dummyProvider.disconnect();
        };
      } catch (error) {
        console.error("채널 초기화 중 오류 발생:", error);
      }
    };

    const cleanup = initializeChannel();

    // 컴포넌트 언마운트 시 클린업 함수 실행
    return () => {
      if (cleanup) cleanup.then((cleanupFn) => cleanupFn());
    };
  }, [channelId]); // channelId가 변경될 때마다 효과 재실행

  const toggleVideoChat = () => {
    setIsVideoEnabled((prev) => !prev);
  };

  if (!mapData || chatMessages.length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-3/4">
        <MapComponent data={mapData} />
      </div>
      <div className="w-1/4 flex flex-col">
        <ChatComponent messages={chatMessages} />
        <button
          onClick={toggleVideoChat}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          {isVideoEnabled ? "비디오 통화 종료" : "비디오 통화 시작"}
        </button>
        {isVideoEnabled && (
          <Suspense fallback={<div>비디오 통화 로딩 중...</div>}>
            <VideoChatComponent channelId={channelId} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default GroupChannelComponent;
