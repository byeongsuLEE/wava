import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { debounce } from "lodash";
import ChatComponent from "../components/Chat/ChatComponent";
import FeedSearchBar from "../components/Channel/feed/FeedSearchbar";

// Kakao Maps API 스크립트를 동적으로 로드하는 함수
const loadKakaoMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAPS_API_KEY&autoload=false`;
    script.onload = () => window.kakao.maps.load(resolve);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

function GroupChannelPage() {
  const { channelId } = useParams();
  const [map, setMap] = useState(null);
  const [isViewSyncEnabled, setIsViewSyncEnabled] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Yjs 문서 및 WebSocket 프로바이더 설정
  const [ydoc] = useState(() => new Y.Doc());
  const [provider] = useState(
    () => new WebsocketProvider("ws://localhost:1234", channelId, ydoc)
  );
  const [yviewState] = useState(() => ydoc.getMap("viewState"));

  useEffect(() => {
    loadKakaoMapsScript().then(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(kakaoMap);
    });

    // 키보드 이벤트 리스너 추가
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsViewSyncEnabled((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const updateViewState = useCallback(
    debounce((center, level) => {
      yviewState.set("center", { lat: center.getLat(), lng: center.getLng() });
      yviewState.set("level", level);
    }, 1000),
    [yviewState]
  );

  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, "center_changed", () => {
        updateViewState(map.getCenter(), map.getLevel());
      });
      window.kakao.maps.event.addListener(map, "zoom_changed", () => {
        updateViewState(map.getCenter(), map.getLevel());
      });
    }
  }, [map, updateViewState]);

  useEffect(() => {
    const handleViewStateChange = () => {
      if (isViewSyncEnabled && map) {
        const center = yviewState.get("center");
        const level = yviewState.get("level");
        if (center && level) {
          map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
          map.setLevel(level);
        }
      }
    };

    yviewState.observe(handleViewStateChange);
    return () => yviewState.unobserve(handleViewStateChange);
  }, [isViewSyncEnabled, map, yviewState]);

  const handleSearch = (searchText) => {
    // 실제 검색 로직 구현 필요
    console.log("Searching for:", searchText);
    // 임시 검색 결과
    setSearchResults([
      { id: 1, name: "검색 결과 1", location: { lat: 37.5665, lng: 126.978 } },
      { id: 2, name: "검색 결과 2", location: { lat: 37.5667, lng: 126.9783 } },
    ]);
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/4 relative">
        <div id="map" className="w-full h-full"></div>
        <div className="absolute top-4 left-4 z-10">
          <FeedSearchBar searchHandle={handleSearch} />
        </div>
        <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded shadow">
          <span
            className={`px-2 py-1 rounded ${
              isViewSyncEnabled
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {isViewSyncEnabled ? "동기화 ON" : "동기화 OFF"}
          </span>
        </div>
        {searchResults.length > 0 && (
          <div className="absolute bottom-4 left-4 z-10 bg-white p-2 rounded shadow max-h-40 overflow-y-auto">
            <h3 className="font-bold mb-2">검색 결과</h3>
            <ul>
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  className="cursor-pointer hover:bg-gray-100 p-1"
                  onClick={() =>
                    map.setCenter(
                      new window.kakao.maps.LatLng(
                        result.location.lat,
                        result.location.lng
                      )
                    )
                  }
                >
                  {result.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-1/4">
        <ChatComponent channelId={channelId} />
      </div>
    </div>
  );
}

export default GroupChannelPage;
