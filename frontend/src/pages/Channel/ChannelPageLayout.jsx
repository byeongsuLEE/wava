import Explorer from "../../components/common/Explorer";
import React, { useLayoutEffect, useRef, useState } from "react";
import MobileExplorer from "../../components/common/MobileExplorer";
import useDeviceStore from "../../store/deviceStore";
import ChannelSubExplorer from "../../components/Channel/ChannelSubExplorer";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { GlobeAltIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import CustomModal from "../../components/common/customModal";
import CreateGroupChannel from "../../components/Channel/group/CreateGroupChannel";
import useUserStore from "../../store/userStore";
import { createGroupChannelAPI } from "../../api/groupChannelApi";

function ChannelPage() {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const userInfo = useUserStore((state) => state.userInfo);

  const myChannelRef = useRef(null);
  const groupChannelsRef = useRef(null);
  const infoChannelsRef = useRef(null);

  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useLayoutEffect(() => {
  //   // 현재 경로가 정확히 '/channel'일 때만 리다이렉트
  //   if (location.pathname?.replaceAll("/", "") === "channel") {
  //     const userId = "12345"; // 여기에 실제 접속자 ID를 넣으세요
  //     navigate(`/channel/feed/${userId}`);
  //   }
  // }, [location.pathname, navigate, userId]);
  useLayoutEffect(() => {
    if (location.pathname === "/channel") {
      navigate(`/channel/feed/${userInfo?.id || "guest"}`);
    }
  }, [location.pathname, navigate, userInfo]);

  const handleMouseEvents = (ref) => {
    let isDown = false;
    let startY;
    let scrollTop;

    const onMouseDown = (e) => {
      isDown = true;
      startY = e.pageY - ref.current.offsetTop;
      scrollTop = ref.current.scrollTop;
    };

    const onMouseLeave = () => {
      isDown = false;
    };

    const onMouseUp = () => {
      isDown = false;
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      // e.preventDefault();
      const y = e.pageY - ref.current.offsetTop;
      const walk = (y - startY) * 2;
      ref.current.scrollTop = scrollTop - walk;
    };

    ref.current.addEventListener("mousedown", onMouseDown, { passive: true });
    ref.current.addEventListener("mouseleave", onMouseLeave, { passive: true });
    ref.current.addEventListener("mouseup", onMouseUp, { passive: true });
    ref.current.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      ref.current.removeEventListener("mousedown", onMouseDown, {
        passive: true,
      });
      ref.current.removeEventListener("mouseleave", onMouseLeave, {
        passive: true,
      });
      ref.current.removeEventListener("mouseup", onMouseUp, { passive: true });
      ref.current.removeEventListener("mousemove", onMouseMove, {
        passive: true,
      });
    };
  };

  const handleTouchEvents = (ref) => {
    let isDown = false;
    let startY;
    let scrollTop;

    const onTouchStart = (e) => {
      isDown = true;
      startY = e.touches[0].pageY - ref.current.offsetTop;
      scrollTop = ref.current.scrollTop;
    };

    const onTouchEnd = () => {
      isDown = false;
    };

    const onTouchMove = (e) => {
      if (!isDown) return;
      // e.preventDefault();
      const y = e.touches[0].pageY - ref.current.offsetTop;
      const walk = (y - startY) * 2;
      ref.current.scrollTop = scrollTop - walk;
    };

    ref.current.addEventListener("touchstart", onTouchStart, { passive: true });
    ref.current.addEventListener("touchend", onTouchEnd, { passive: true });
    ref.current.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      ref.current.removeEventListener("touchstart", onTouchStart, {
        passive: true,
      });
      ref.current.removeEventListener("touchend", onTouchEnd, {
        passive: true,
      });
      ref.current.removeEventListener("touchmove", onTouchMove, {
        passive: true,
      });
    };
  };

  React.useEffect(() => {
    handleMouseEvents(myChannelRef);
    handleMouseEvents(groupChannelsRef);
    handleMouseEvents(infoChannelsRef);
    handleTouchEvents(myChannelRef);
    handleTouchEvents(groupChannelsRef);
    handleTouchEvents(infoChannelsRef);
  }, []);

  // 채널 생성 포탈 오픈
  const handleChannelPortalOpen = () => {
    setIsCreateChannelOpen(true);
  };

  // 채널 생성 포탈 닫기
  const handleChannelPortalClose = () => {
    setIsCreateChannelOpen(false);
  };

  // 그룹 채널 생성 함수
  const createGroupChannel = async (channelName) => {
    setIsLoading(true);
    setError(null);

    const success = (newChannel) => {
      console.log(`그룹 채널 "${channelName}"이(가) 생성되었습니다.`);
      handleChannelPortalClose();
      // 새로 생성된 채널로 이동
      navigate(`/channel/group/${newChannel.id}`);
    };

    const fail = (error) => {
      console.error("채널 생성 실패:", error);
      setError(
        error.response?.data?.message || "채널 생성 중 오류가 발생했습니다."
      );
    };

    try {
      await createGroupChannelAPI(channelName, success, fail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen ">
        {/* navbar */}
        <Explorer />

        {/* 여기부터 채널 탐색기 */}
        <div className="flex flex-col w-16 bg-white shadow-lg h-screen">
          <div className="flex-shrink-0 text-center"></div>

          {/* 내채널 */}
          <div ref={myChannelRef} className="flex-shrink-0 text-center">
            <div>
              {isMobile && <MobileExplorer />}
              <div className="sticky top-0 bg-white z-10">
                <span>내 채널</span>
              </div>
            </div>
            <div className="my-0.5">
              <NavLink to={`/channel/feed/${"내아이디"}`}>
                {userInfo?.profile ? (
                  <img
                    src={userInfo?.profile}
                    className="w-10 h-10 mx-auto my-0.5 bg-gray-300 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-10 h-10 mx-auto my-0.5 rounded-full" />
                )}
              </NavLink>
            </div>
            {/* </ChannelSubExplorer> */}
          </div>

          <div className="divider my-1 mx-2" />
          {/* 정보채널 */}
          <div ref={infoChannelsRef} className="overflow-y-auto text-center">
            <div className="sticky top-0 bg-white z-10">
              <span className="text-sm">정보 채널</span>
            </div>

            <div>
              <NavLink to={`/channel/feed`}>
                <GlobeAltIcon className="w-10 h-10 mx-auto my-2 border border-gray-300 rounded-full " />
              </NavLink>
            </div>
          </div>
          <div className="divider my-1 mx-2" />

          {/* 모임채널 */}
          <div
            ref={groupChannelsRef}
            className=" flex-1 overflow-y-auto text-center mb-2"
          >
            <ChannelSubExplorer
              // 그룹 생성 버튼(플러스버튼)
              addBtn={
                <div
                  onClick={handleChannelPortalOpen}
                  className="sticky top-0 bg-white flex items-center justify-center"
                >
                  <div className="border cursor-pointer rounded-full h-10 w-10 hover border-gray-300 hover:bg-gray-100 transition-colors duration-200 ">
                    <PlusIcon className="w-6 h-6 m-4 mx-auto my-2 " />
                  </div>
                </div>
              }
              type="group"
              data={[
                { id: 2 },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "1`23" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
                { id: "asdf" },
              ]}
            >
              <div className="sticky top-0 bg-white z-10">
                <span className="text-sm">모임 채널</span>
              </div>
            </ChannelSubExplorer>
          </div>
        </div>

        {/* 채널 탐색기 끝, 하단은 콘텐츠 영역 */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      {/* 채널 생성 포탈 */}
      <CustomModal
        styles={"backdrop-blur-sm"}
        isOpen={isCreateChannelOpen}
        onClose={handleChannelPortalClose}
      >
        <CreateGroupChannel
          onClose={handleChannelPortalClose}
          onSubmit={createGroupChannel}
          isLoading={isLoading}
          error={error}
        />
      </CustomModal>
    </>
  );
}

export default ChannelPage;
