// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useDeviceStore from "../../../store/deviceStore";
// import {
//   ChevronDoubleRightIcon,
//   HeartIcon as EmptyHeart,
//   ChatBubbleLeftIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   UserCircleIcon,
// } from "@heroicons/react/24/outline";
// import { HeartIcon as FullHeart } from "@heroicons/react/24/solid";

// const ContentDrawer = ({
//   isOpen,
//   onClose,
//   content,
//   onLeftClick,
//   onRightClick,
// }) => {
//   const isMobile = useDeviceStore((state) => state.isMobile);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 여기서 데이터를 받아오는 로직을 구현합니다.
//   }, [content]);

//   const handleAuthorClick = () => {
//     if (content && content.authorId) {
//       navigate(`/personal/${content.authorId}`);
//       onClose();
//     }
//   };

//   return (
//     <div className="drawer drawer-end z-20">
//       <input
//         type="checkbox"
//         className="drawer-toggle"
//         checked={isOpen}
//         readOnly
//       />
//       <div className="drawer-side">
//         <label
//           className="drawer-overlay"
//           style={{ backgroundColor: isOpen ? "#0003" : "transparent" }}
//           onClick={onClose}
//         />
//         <div
//           className={`${
//             isMobile ? "w-11/12" : "w-2/3"
//           } bg-white h-full p-6 flex flex-col`}
//         >
//           <button
//             onClick={onClose}
//             className="self-start mb-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
//           >
//             <ChevronDoubleRightIcon className="h-6 w-6" />
//           </button>

//           {content && isOpen && (
//             <div className="flex-grow flex flex-col items-center overflow-y-auto">
//               <div className="w-full max-w-lg aspect-square relative mb-6">
//                 <img
//                   src={content.imageUrl}
//                   alt="Content"
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//                 <button
//                   onClick={onLeftClick}
//                   className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
//                 >
//                   <ChevronLeftIcon className="h-6 w-6" />
//                 </button>
//                 <button
//                   onClick={onRightClick}
//                   className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
//                 >
//                   <ChevronRightIcon className="h-6 w-6" />
//                 </button>
//               </div>

//               <div className="w-full max-w-lg mb-4">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center space-x-2">
//                     <FullHeart className="w-6 h-6 text-red-500" />
//                     <span>좋아요 수</span>
//                     <ChatBubbleLeftIcon className="w-6 h-6" />
//                     <span>댓글 수</span>
//                   </div>
//                   {content.isOwner && (
//                     <div className="space-x-2">
//                       <button className="text-toDoMid hover:underline">
//                         수정
//                       </button>
//                       <button className="text-red-500 hover:underline">
//                         삭제
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="w-full max-w-lg">
//                 <div className="flex items-center space-x-2 mb-4">
//                   <UserCircleIcon className="h-10 w-10 text-gray-400" />
//                   <button
//                     onClick={handleAuthorClick}
//                     className="text-lg font-semibold hover:underline"
//                   >
//                     {content.authorName}
//                   </button>
//                 </div>
//                 <h2 className="text-xl font-bold mb-2">{content.title}</h2>
//                 <p className="text-gray-600 mb-4">내용: {content.visitDate}</p>
//                 <p className="mb-6">{content.description}</p>

//                 <div className="border-t border-gray-200 pt-4 mb-4">
//                   <h3 className="font-semibold mb-2">댓글</h3>
//                   {/* 여기에 댓글 목록을 렌더링합니다 */}
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     placeholder="댓글을 입력하세요..."
//                     className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-mainBlue focus:border-mainBlue"
//                   />
//                   <button className="bg-mainBlue text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors">
//                     작성
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentDrawer;

// 수정 및 삭제 기능 간단 구현 -> 수정 필요 위는 수정 삭제 없는 클린 코드
// 댓글, 프로필 클릭->이동, 게시글 수정/삭제,
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useDeviceStore from "../../../store/deviceStore";
import {
  ChevronDoubleRightIcon,
  HeartIcon as EmptyHeart,
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FullHeart } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

const ContentDrawer = ({
  isOpen,
  onClose,
  content,
  onLeftClick,
  onRightClick,
  onEdit,
  onDelete,
  onLike,
}) => {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgInput = useRef(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // 여기서 데이터를 받아오는 로직을 구현합니다.
    // 임시
    if (content) {
      setEditedContent({ ...content });
      setImages([{ url: content.imageUrl }]);
      setIsLiked(content.isLiked || false);
    }
  }, [content]);

  const handleAuthorClick = () => {
    if (content && content.authorId) {
      navigate(`/personal/${content.authorId}`);
      onClose();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // 여기에 API 호출 로직을 추가해야 합니다.
    // 예: api.updateContent(editedContent.id, { ...editedContent, images })
    //     .then(() => {
    //       onEdit({ ...editedContent, images });
    //       setIsEditing(false);
    //     })
    //     .catch(error => {
    //       console.error("Failed to update content:", error);
    //       // 에러 처리 로직
    //     });

    // 임시로 프론트엔드에서만 변경을 반영
    onEdit({ ...editedContent, images });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent({ ...content });
    setImages([{ url: content.imageUrl }]);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm("정말로 이 컨텐츠를 삭제하시겠습니까?")) {
      onDelete(content.id);
      onClose();
    }
  };

  const handleImageChange = (e) => {
    if (!e.target?.files) return;

    const newFiles = Array.from(e.target.files);
    if (newFiles.length + images.length > 10) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "이미지는 최대 10장까지 가능합니다.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const newImages = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setCurrentIndex(images.length);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const navigateImage = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "next") return prev < images.length - 1 ? prev + 1 : 0;
      return prev > 0 ? prev - 1 : images.length - 1;
    });
  };

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setEditedContent((prev) => ({
      ...prev,
      likes: newLikedState ? (prev.likes || 0) + 1 : (prev.likes || 1) - 1,
    }));
    onLike(editedContent.id, newLikedState);
  };

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

          {editedContent && isOpen && (
            <div className="flex-grow flex flex-col items-center overflow-y-auto">
              <div className="w-full max-w-lg mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {editedContent.profileImage ? (
                      <img
                        src={editedContent.profileImage}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    )}
                    <button
                      onClick={handleAuthorClick}
                      className="text-lg font-semibold hover:underline"
                    >
                      {editedContent.authorName}
                    </button>
                  </div>
                  {editedContent.isOwner && !isEditing && (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleEditClick}
                        className="text-mainBlue hover:bg-mainBlue hover:text-white px-3 py-1 rounded transition-colors duration-200 flex items-center"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        수정
                      </button>
                      <button
                        onClick={handleDeleteClick}
                        className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded transition-colors duration-200 flex items-center"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full max-w-lg aspect-square relative mb-6">
                {images.length === 0 ? (
                  <div
                    onClick={() => imgInput.current.click()}
                    className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <span className="text-gray-500">이미지 등록</span>
                  </div>
                ) : (
                  <>
                    <img
                      src={images[currentIndex]?.url}
                      alt={`Content ${currentIndex + 1}`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => navigateImage("prev")}
                          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                        >
                          <ChevronLeftIcon className="h-6 w-6" />
                        </button>
                        <button
                          onClick={() => navigateImage("next")}
                          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                        >
                          <ChevronRightIcon className="h-6 w-6" />
                        </button>
                      </>
                    )}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveImage(currentIndex)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                      {currentIndex + 1}/{images.length}
                    </span>
                  </>
                )}
                {isEditing && (
                  <button
                    onClick={() => imgInput.current.click()}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-toDoMid text-white rounded-full p-2 shadow-lg"
                  >
                    <PlusCircleIcon className="h-6 w-6" />
                  </button>
                )}
              </div>

              <div className="w-full max-w-lg mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLikeClick}
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    {isLiked ? (
                      <FullHeart className="w-6 h-6 text-red-500" />
                    ) : (
                      <EmptyHeart className="w-6 h-6 text-gray-500 hover:text-red-500" />
                    )}
                    <span>{editedContent.likes || 0}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <ChatBubbleLeftIcon className="w-6 h-6" />
                    <span>{editedContent.comments?.length || 0}</span>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-lg">
                {isEditing ? (
                  <>
                    <textarea
                      value={editedContent.description}
                      onChange={(e) =>
                        setEditedContent({
                          ...editedContent,
                          description: e.target.value,
                        })
                      }
                      className="mb-6 w-full p-2 border rounded"
                      rows="4"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        취소
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-mainBlue text-white rounded hover:bg-blue-600"
                      >
                        저장
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-2">
                      {editedContent.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {editedContent.authorName} {editedContent.visitDate}
                    </p>
                    <p className="mb-6">{editedContent.description}</p>

                    {/* 댓글 섹션 - 편집 모드가 아닐 때만 표시 */}
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
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <input
        ref={imgInput}
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ContentDrawer;
