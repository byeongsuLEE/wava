import React, { useEffect, useState } from "react";

const MapComponent = ({ data }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            data.center.lat,
            data.center.lng
          ),
          level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);

        data.markers.forEach((marker) => {
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(marker.lat, marker.lng),
            map: kakaoMap,
          });
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default MapComponent;
