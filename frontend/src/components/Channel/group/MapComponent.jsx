// import React, { useEffect, useState, useRef, useCallback } from "react";
// import debounce from "lodash/debounce";

// const MapComponent = ({
//   data,
//   onMapChange,
//   searchKeyword,
//   setSearchResults,
// }) => {
//   const [map, setMap] = useState(null);
//   const [error, setError] = useState(null);
//   const [localSearchKeyword, setLocalSearchKeyword] = useState(searchKeyword);
//   const searchMarkers = useRef([]);
//   const mapContainerRef = useRef(null);

//   const loadKakaoMapsScript = useCallback(() => {
//     return new Promise((resolve, reject) => {
//       if (window.kakao && window.kakao.maps) {
//         resolve();
//         return;
//       }
//       const script = document.createElement("script");
//       script.type = "text/javascript";
//       // const apiKey = process.env.REACT_APP_KAKAO_MAPS_API_KEY;
//       // if (!apiKey) {
//       //   console.error("Kakao Maps API 키가 설정되지 않았습니다.");
//       //   setError("API 키 설정 오류");
//       //   return;
//       // }
//       script.src =
//         "https://dapi.kakao.com/v2/maps/sdk.js?appkey=9584401db12054d451fc9e18279c5719&autoload=false&libraries=services";
//       script.onload = () => {
//         window.kakao.maps.load(() => {
//           resolve();
//         });
//       };
//       script.onerror = (e) => {
//         console.error("Kakao Maps 스크립트 로드 실패:", e);
//         setError(
//           "Kakao Maps 스크립트를 불러오는 데 실패했습니다. 네트워크 연결을 확인해주세요."
//         );
//         reject(e);
//       };
//       document.head.appendChild(script);
//     });
//   }, []);

//   const initializeMap = useCallback(() => {
//     if (!data || !data.center || !window.kakao || !window.kakao.maps) {
//       setError(
//         "맵 데이터가 올바르지 않거나 Kakao Maps API가 로드되지 않았습니다."
//       );
//       return;
//     }

//     const options = {
//       center: new window.kakao.maps.LatLng(data.center.lat, data.center.lng),
//       level: data.level || 3,
//     };
//     const kakaoMap = new window.kakao.maps.Map(
//       mapContainerRef.current,
//       options
//     );
//     console.log("지도 생성 완료:", kakaoMap);
//     setMap(kakaoMap);

//     window.kakao.maps.event.addListener(kakaoMap, "center_changed", () => {
//       const center = kakaoMap.getCenter();
//       onMapChange(
//         { lat: center.getLat(), lng: center.getLng() },
//         kakaoMap.getLevel()
//       );
//     });

//     window.kakao.maps.event.addListener(kakaoMap, "zoom_changed", () => {
//       const center = kakaoMap.getCenter();
//       onMapChange(
//         { lat: center.getLat(), lng: center.getLng() },
//         kakaoMap.getLevel()
//       );
//     });
//   }, [data, onMapChange]);

//   useEffect(() => {
//     let isMounted = true;
//     loadKakaoMapsScript()
//       .then(() => {
//         if (isMounted) {
//           initializeMap();
//         }
//       })
//       .catch((err) => {
//         console.error("카카오 맵 초기화 실패:", err);
//         if (isMounted) {
//           setError("지도를 불러오는 데 실패했습니다. 에러: " + err.message);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, [loadKakaoMapsScript, initializeMap]);

//   const searchPlaces = useCallback(() => {
//     if (!map || !localSearchKeyword || !window.kakao || !window.kakao.maps)
//       return;

//     const places = new window.kakao.maps.services.Places();

//     places.keywordSearch(localSearchKeyword, (result, status) => {
//       if (status === window.kakao.maps.services.Status.OK) {
//         const bounds = new window.kakao.maps.LatLngBounds();

//         // 이전 검색 마커 제거
//         searchMarkers.current.forEach((marker) => marker.setMap(null));
//         searchMarkers.current = [];

//         const newSearchResults = result.map((place) => {
//           const marker = new window.kakao.maps.Marker({
//             map: map,
//             position: new window.kakao.maps.LatLng(place.y, place.x),
//           });

//           searchMarkers.current.push(marker);
//           bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));

//           return {
//             id: place.id,
//             place_name: place.place_name,
//             location: { lat: place.y, lng: place.x },
//           };
//         });

//         setSearchResults(newSearchResults);
//         map.setBounds(bounds);
//       } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
//         alert("검색 결과가 존재하지 않습니다.");
//         setSearchResults([]);
//       } else if (status === window.kakao.maps.services.Status.ERROR) {
//         alert("검색 중 오류가 발생했습니다.");
//         setSearchResults([]);
//       }
//     });
//   }, [map, localSearchKeyword, setSearchResults]);

//   // 디바운스된 검색 함수
//   const debouncedSearch = useCallback(
//     debounce(() => {
//       searchPlaces();
//     }, 300),
//     [searchPlaces]
//   );

//   useEffect(() => {
//     setLocalSearchKeyword(searchKeyword);
//   }, [searchKeyword]);

//   useEffect(() => {
//     if (localSearchKeyword.length >= 2) {
//       debouncedSearch();
//     }
//   }, [localSearchKeyword, debouncedSearch]);

//   const handleSearchInputChange = (e) => {
//     setLocalSearchKeyword(e.target.value);
//   };

//   const handleSearchButtonClick = () => {
//     if (localSearchKeyword.length >= 2) {
//       searchPlaces();
//     } else {
//       alert("검색어를 2글자 이상 입력해주세요.");
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           value={localSearchKeyword}
//           onChange={handleSearchInputChange}
//           placeholder="검색어를 입력하세요"
//         />
//         <button onClick={handleSearchButtonClick}>검색</button>
//       </div>
//       <div
//         ref={mapContainerRef}
//         style={{ width: "100%", height: "" }}
//       ></div>
//     </div>
//   );
// };

// export default MapComponent;
import React, { useEffect, useState, useRef, useCallback } from "react";
import debounce from "lodash/debounce";

const MapComponent = ({ data, onMapChange }) => {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState(null);
  const searchMarkers = useRef([]);
  const mapContainerRef = useRef(null);

  const loadKakaoMapsScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=9584401db12054d451fc9e18279c5719&autoload=false&libraries=services";
      script.onload = () => {
        window.kakao.maps.load(() => {
          resolve();
        });
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    loadKakaoMapsScript()
      .then(() => {
        if (!isMounted) return;

        const options = {
          center: new window.kakao.maps.LatLng(
            data.center.lat,
            data.center.lng
          ),
          level: data.level || 3,
        };
        const newMap = new window.kakao.maps.Map(
          mapContainerRef.current,
          options
        );
        setMap(newMap);

        window.kakao.maps.event.addListener(newMap, "center_changed", () => {
          const center = newMap.getCenter();
          onMapChange(
            { lat: center.getLat(), lng: center.getLng() },
            newMap.getLevel()
          );
        });

        window.kakao.maps.event.addListener(newMap, "zoom_changed", () => {
          const center = newMap.getCenter();
          onMapChange(
            { lat: center.getLat(), lng: center.getLng() },
            newMap.getLevel()
          );
        });
      })
      .catch((err) => {
        if (isMounted) {
          console.error("지도를 불러오는 데 실패했습니다:", err);
          setError("지도를 불러오는 데 실패했습니다: " + err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [loadKakaoMapsScript, data, onMapChange]);

  useEffect(() => {
    if (map) {
      map.setCenter(
        new window.kakao.maps.LatLng(data.center.lat, data.center.lng)
      );
      map.setLevel(data.level);
    }
  }, [map, data.center, data.level]);

  const searchPlaces = useCallback(
    (page) => {
      if (!map || !searchKeyword || searchKeyword.length < 2) return;

      const places = new window.kakao.maps.services.Places();

      places.keywordSearch(
        searchKeyword,
        (result, status, pagination) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const bounds = new window.kakao.maps.LatLngBounds();

            // Clear previous markers
            searchMarkers.current.forEach((marker) => marker.setMap(null));
            searchMarkers.current = [];

            const newSearchResults = result.map((place) => {
              const position = new window.kakao.maps.LatLng(place.y, place.x);
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: position,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
              });

              window.kakao.maps.event.addListener(marker, "mouseover", () => {
                infowindow.open(map, marker);
              });

              window.kakao.maps.event.addListener(marker, "mouseout", () => {
                infowindow.close();
              });

              searchMarkers.current.push(marker);
              bounds.extend(position);

              return {
                id: place.id,
                place_name: place.place_name,
                address_name: place.address_name,
                road_address_name: place.road_address_name,
                phone: place.phone,
                location: { lat: place.y, lng: place.x },
              };
            });

            setSearchResults(newSearchResults);
            setPagination(pagination);
            map.setBounds(bounds);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
            setSearchResults([]);
            setPagination(null);
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 중 오류가 발생했습니다.");
            setSearchResults([]);
            setPagination(null);
          }
        },
        { page }
      );
    },
    [map, searchKeyword]
  );

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchKeyword.length >= 2) {
      searchPlaces(1);
    } else {
      alert("검색어를 2글자 이상 입력해주세요.");
    }
  };

  const handlePageClick = (page) => {
    searchPlaces(page);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="map_wrap"
      style={{ width: "100%", height: "500px", position: "relative" }}
    >
      <div
        id="map"
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      />
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <input
              type="text"
              value={searchKeyword}
              onChange={handleSearchInputChange}
              id="keyword"
              size="15"
            />
            <button onClick={handleSearchButtonClick}>검색하기</button>
          </div>
        </div>
        <hr />
        <ul id="placesList">
          {searchResults.map((result, index) => (
            <li key={result.id} className="item">
              <span className={`markerbg marker_${index + 1}`} />
              <div className="info">
                <h5>{result.place_name}</h5>
                {result.road_address_name && (
                  <span>{result.road_address_name}</span>
                )}
                <span className="jibun gray">{result.address_name}</span>
                <span className="tel">{result.phone}</span>
              </div>
            </li>
          ))}
        </ul>
        {pagination && (
          <div id="pagination">
            {pagination.current > 1 && (
              <a
                href="#"
                onClick={() => handlePageClick(pagination.current - 1)}
              >
                &lt;
              </a>
            )}
            {Array.from({ length: pagination.last }, (_, i) => i + 1).map(
              (page) => (
                <a
                  key={page}
                  href="#"
                  onClick={() => handlePageClick(page)}
                  className={page === pagination.current ? "on" : ""}
                >
                  {page}
                </a>
              )
            )}
            {pagination.current < pagination.last && (
              <a
                href="#"
                onClick={() => handlePageClick(pagination.current + 1)}
              >
                &gt;
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
