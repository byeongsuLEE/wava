import React, { useEffect, useState } from "react";

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

const MapComponent = ({ data }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    loadKakaoMapsScript()
      .then(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(
            data.center.lat,
            data.center.lng
          ),
          level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(kakaoMap);

        data.markers.forEach((marker) => {
          const markerPosition = new window.kakao.maps.LatLng(
            marker.lat,
            marker.lng
          );
          const kakaoMarker = new window.kakao.maps.Marker({
            position: markerPosition,
            title: marker.title,
          });
          kakaoMarker.setMap(kakaoMap);
        });
      })
      .catch((error) => console.error("카카오맵 로드 중 오류 발생:", error));
  }, [data]);

  return <div id="map" className="w-full h-full"></div>;
};

export default MapComponent;
