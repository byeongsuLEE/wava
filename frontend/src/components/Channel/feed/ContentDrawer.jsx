import React, { useEffect } from "react";
import useDeviceStore from "../../../store/deviceStore";
import {
  ChevronDoubleRightIcon,
  HeartIcon as EmptyHeart,
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FullHeart } from "@heroicons/react/24/solid";

const ContentDrawer = ({
  isOpen,
  onClose,
  content,
  onLeftClick,
  onRightClick,
}) => {
  const isMobile = useDeviceStore((state) => state.isMobile);

  useEffect(() => {
    // 여기서 데이터를 받아오는 로직을 구현합니다.
  }, [content]);

  return (
    <div className="drawer drawer-end z-20">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="drawer-side">
        <label
          className="drawer-overlay"
          style={{ backgroundColor: isOpen ? "#0003" : "transparent" }}
          onClick={onClose}
        />
        <div
          className={`${
            isMobile ? "w-11/12" : "w-2/3"
          } bg-white h-full p-6 flex flex-col`}
        >
          <button
            onClick={onClose}
            className="self-start mb-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronDoubleRightIcon className="h-6 w-6" />
          </button>

          {content && isOpen && (
            <div className="flex-grow flex flex-col items-center overflow-y-auto">
              <div className="w-full max-w-lg aspect-square relative mb-6">
                <img
                  src={content.imageUrl}
                  alt="Content"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={onLeftClick}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={onRightClick}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="w-full max-w-lg mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FullHeart className="w-6 h-6 text-red-500" />
                    <span>좋아요 수</span>
                    <ChatBubbleLeftIcon className="w-6 h-6" />
                    <span>댓글 수</span>
                  </div>
                  {content.isOwner && (
                    <div className="space-x-2">
                      <button className="text-toDoMid hover:underline">
                        수정
                      </button>
                      <button className="text-red-500 hover:underline">
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full max-w-lg">
                <h2 className="text-xl font-bold mb-2">{content.title}</h2>
                <p className="text-gray-600 mb-4">내용: {content.visitDate}</p>
                <p className="mb-6">{content.description}</p>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h3 className="font-semibold mb-2">댓글</h3>
                  {/* 여기에 댓글 목록을 렌더링합니다 */}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="댓글을 입력하세요..."
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-mainBlue focus:border-mainBlue"
                  />
                  <button className="bg-mainBlue text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors">
                    작성
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDrawer;
