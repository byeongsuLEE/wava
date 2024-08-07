// import React, { useEffect, useState, useRef, useCallback } from "react";
// import debounce from "lodash/debounce";

// const MapComponent = ({ data, onMapChange }) => {
//   const [map, setMap] = useState(null);
//   const [error, setError] = useState(null);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [pagination, setPagination] = useState(null);
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
//       script.src =
//         "https://dapi.kakao.com/v2/maps/sdk.js?appkey=9584401db12054d451fc9e18279c5719&autoload=false&libraries=services";
//       script.onload = () => {
//         window.kakao.maps.load(() => {
//           resolve();
//         });
//       };
//       script.onerror = reject;
//       document.head.appendChild(script);
//     });
//   }, []);

//   useEffect(() => {
//     let isMounted = true;
//     loadKakaoMapsScript()
//       .then(() => {
//         if (!isMounted) return;

//         const options = {
//           center: new window.kakao.maps.LatLng(
//             data.center.lat,
//             data.center.lng
//           ),
//           level: data.level || 3,
//         };
//         const newMap = new window.kakao.maps.Map(
//           mapContainerRef.current,
//           options
//         );
//         setMap(newMap);

//         window.kakao.maps.event.addListener(newMap, "center_changed", () => {
//           const center = newMap.getCenter();
//           onMapChange(
//             { lat: center.getLat(), lng: center.getLng() },
//             newMap.getLevel()
//           );
//         });

//         window.kakao.maps.event.addListener(newMap, "zoom_changed", () => {
//           const center = newMap.getCenter();
//           onMapChange(
//             { lat: center.getLat(), lng: center.getLng() },
//             newMap.getLevel()
//           );
//         });
//       })
//       .catch((err) => {
//         if (isMounted) {
//           console.error("지도를 불러오는 데 실패했습니다:", err);
//           setError("지도를 불러오는 데 실패했습니다: " + err.message);
//         }
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [loadKakaoMapsScript, data, onMapChange]);

//   useEffect(() => {
//     if (map) {
//       map.setCenter(
//         new window.kakao.maps.LatLng(data.center.lat, data.center.lng)
//       );
//       map.setLevel(data.level);
//     }
//   }, [map, data.center, data.level]);

//   const searchPlaces = useCallback(
//     (page) => {
//       if (!map || !searchKeyword || searchKeyword.length < 2) return;

//       const places = new window.kakao.maps.services.Places();

//       places.keywordSearch(
//         searchKeyword,
//         (result, status, pagination) => {
//           if (status === window.kakao.maps.services.Status.OK) {
//             const bounds = new window.kakao.maps.LatLngBounds();

//             // Clear previous markers
//             searchMarkers.current.forEach((marker) => marker.setMap(null));
//             searchMarkers.current = [];

//             const newSearchResults = result.map((place) => {
//               const position = new window.kakao.maps.LatLng(place.y, place.x);
//               const marker = new window.kakao.maps.Marker({
//                 map: map,
//                 position: position,
//               });

//               const infowindow = new window.kakao.maps.InfoWindow({
//                 content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
//               });

//               window.kakao.maps.event.addListener(marker, "mouseover", () => {
//                 infowindow.open(map, marker);
//               });

//               window.kakao.maps.event.addListener(marker, "mouseout", () => {
//                 infowindow.close();
//               });

//               searchMarkers.current.push(marker);
//               bounds.extend(position);

//               return {
//                 id: place.id,
//                 place_name: place.place_name,
//                 address_name: place.address_name,
//                 road_address_name: place.road_address_name,
//                 phone: place.phone,
//                 location: { lat: place.y, lng: place.x },
//               };
//             });

//             setSearchResults(newSearchResults);
//             setPagination(pagination);
//             map.setBounds(bounds);
//           } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
//             alert("검색 결과가 존재하지 않습니다.");
//             setSearchResults([]);
//             setPagination(null);
//           } else if (status === window.kakao.maps.services.Status.ERROR) {
//             alert("검색 중 오류가 발생했습니다.");
//             setSearchResults([]);
//             setPagination(null);
//           }
//         },
//         { page }
//       );
//     },
//     [map, searchKeyword]
//   );

//   const handleSearchInputChange = (e) => {
//     setSearchKeyword(e.target.value);
//   };

//   const handleSearchButtonClick = () => {
//     if (searchKeyword.length >= 2) {
//       searchPlaces(1);
//     } else {
//       alert("검색어를 2글자 이상 입력해주세요.");
//     }
//   };

//   const handlePageClick = (page) => {
//     searchPlaces(page);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div
//       className="map_wrap"
//       style={{ width: "100%", height: "500px", position: "relative" }}
//     >
//       <div
//         id="map"
//         ref={mapContainerRef}
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           top: "0",
//           left: "0",
//         }}
//       />
//       <div id="menu_wrap" className="bg_white">
//         <div className="option">
//           <div>
//             <input
//               type="text"
//               value={searchKeyword}
//               onChange={handleSearchInputChange}
//               id="keyword"
//               size="15"
//             />
//             <button onClick={handleSearchButtonClick}>검색하기</button>
//           </div>
//         </div>
//         <hr />
//         <ul id="placesList">
//           {searchResults.map((result, index) => (
//             <li key={result.id} className="item">
//               <span className={`markerbg marker_${index + 1}`} />
//               <div className="info">
//                 <h5>{result.place_name}</h5>
//                 {result.road_address_name && (
//                   <span>{result.road_address_name}</span>
//                 )}
//                 <span className="jibun gray">{result.address_name}</span>
//                 <span className="tel">{result.phone}</span>
//               </div>
//             </li>
//           ))}
//         </ul>
//         {pagination && (
//           <div id="pagination">
//             {pagination.current > 1 && (
//               <a
//                 href="#"
//                 onClick={() => handlePageClick(pagination.current - 1)}
//               >
//                 &lt;
//               </a>
//             )}
//             {Array.from({ length: pagination.last }, (_, i) => i + 1).map(
//               (page) => (
//                 <a
//                   key={page}
//                   href="#"
//                   onClick={() => handlePageClick(page)}
//                   className={page === pagination.current ? "on" : ""}
//                 >
//                   {page}
//                 </a>
//               )
//             )}
//             {pagination.current < pagination.last && (
//               <a
//                 href="#"
//                 onClick={() => handlePageClick(pagination.current + 1)}
//               >
//                 &gt;
//               </a>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MapComponent;

// 검색, 검색결과, 검색결과창마우스오버인포출력, 검색결과마커초기화, 초기화후지도뷰유지, 드로잉매니저
import React, { useEffect, useRef, useState, useCallback } from "react";
import swal from "sweetalert2";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [lastSearchBounds, setLastSearchBounds] = useState(null);
  const [markers, setMarkers] = useState([]);
  const infowindow = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9584401db12054d451fc9e18279c5719&libraries=services,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        const createdMap = new window.kakao.maps.Map(
          mapContainer.current,
          mapOption
        );
        setMap(createdMap);

        infowindow.current = new window.kakao.maps.InfoWindow({
          zIndex: 1,
          removable: true,
        });

        // 도형 관리자 생성
        const manager = new window.kakao.maps.drawing.DrawingManager({
          map: createdMap,
          drawingMode: [
            window.kakao.maps.drawing.OverlayType.MARKER,
            window.kakao.maps.drawing.OverlayType.POLYLINE,
            window.kakao.maps.drawing.OverlayType.RECTANGLE,
            window.kakao.maps.drawing.OverlayType.CIRCLE,
            window.kakao.maps.drawing.OverlayType.POLYGON,
          ],
          guideTooltip: ["draw", "drag", "edit"],
          markerOptions: {
            draggable: true,
            removable: true,
          },
          polylineOptions: {
            draggable: true,
            removable: true,
            editable: true,
          },
          rectangleOptions: {
            draggable: true,
            removable: true,
            editable: true,
          },
          circleOptions: {
            draggable: true,
            removable: true,
            editable: true,
          },
          polygonOptions: {
            draggable: true,
            removable: true,
            editable: true,
          },
        });
        setDrawingManager(manager);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const searchPlaces = useCallback(() => {
    if (!map) return;

    const ps = new window.kakao.maps.services.Places();

    if (!keyword.trim()) {
      setPlaces([]);
      return;
    }

    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);

        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers = [];

        data.forEach((place, i) => {
          const marker = displayMarker(place);
          newMarkers.push(marker);
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
        });

        setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
        map.setBounds(bounds);
        setLastSearchBounds(bounds);
      } else {
        setPlaces([]);
        swal.fire({
          title: "검색 결과가 없습니다.",
          icon: "warning",
        });
      }
    });
  }, [map, keyword]);

  const displayMarker = useCallback(
    (place) => {
      if (!map) return null;

      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.current.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.current.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, place.place_name);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.current.close();
      });

      return marker;
    },
    [map]
  );

  const displayInfowindow = (marker, title) => {
    infowindow.current.setContent(
      '<div style="padding:5px;font-size:12px;">' + title + "</div>"
    );
    infowindow.current.open(map, marker);
  };

  useEffect(() => {
    if (map && lastSearchBounds) {
      map.setBounds(lastSearchBounds);
    }
  }, [map, lastSearchBounds]);

  const handleDrawingModeChange = useCallback(
    (mode) => {
      if (drawingManager) {
        drawingManager.cancel();
        drawingManager.select(window.kakao.maps.drawing.OverlayType[mode]);
      }
    },
    [drawingManager]
  );

  const resetMap = useCallback(() => {
    if (!map) return;

    // 모든 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    // 검색 결과 초기화
    setPlaces([]);
    setKeyword("");

    // 마지막 검색 경계 초기화
    setLastSearchBounds(null);

    // 현재 지도 뷰는 유지
  }, [map, markers]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex space-x-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색할 키워드를 입력하세요"
          className="p-2 border rounded flex-grow"
        />
        <button
          onClick={searchPlaces}
          className="p-2 bg-blue-500 text-white rounded"
        >
          검색하기
        </button>
        <button
          onClick={resetMap}
          className="p-2 bg-red-500 text-white rounded"
        >
          초기화
        </button>
      </div>
      <div className="p-2 flex space-x-2">
        <button
          onClick={() => handleDrawingModeChange("MARKER")}
          className="p-2 bg-green-500 text-white rounded"
        >
          마커
        </button>
        <button
          onClick={() => handleDrawingModeChange("POLYLINE")}
          className="p-2 bg-green-500 text-white rounded"
        >
          선
        </button>
        <button
          onClick={() => handleDrawingModeChange("RECTANGLE")}
          className="p-2 bg-green-500 text-white rounded"
        >
          사각형
        </button>
        <button
          onClick={() => handleDrawingModeChange("CIRCLE")}
          className="p-2 bg-green-500 text-white rounded"
        >
          원
        </button>
        <button
          onClick={() => handleDrawingModeChange("POLYGON")}
          className="p-2 bg-green-500 text-white rounded"
        >
          다각형
        </button>
      </div>
      <div ref={mapContainer} className="flex-grow"></div>
      <div className="p-4 overflow-y-auto max-h-40">
        <ul>
          {places.map((place, index) => (
            <li
              id={`place-item-${index}`}
              key={index}
              className="mb-2"
              onMouseOver={() =>
                displayInfowindow(markers[index], place.place_name)
              }
              onMouseOut={() => infowindow.current.close()}
            >
              <span className="font-bold">{place.place_name}</span>
              {place.road_address_name && (
                <span className="block text-sm text-gray-600">
                  {place.road_address_name}
                </span>
              )}
              <span className="block text-sm text-gray-600">
                {place.address_name}
              </span>
              <span className="block text-sm text-gray-600">{place.phone}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
