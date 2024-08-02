// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import ContentDrawer from "../../../components/Channel/feed/ContentDrawer";
// import ContentItemGrid from "../../../components/Channel/feed/ContentItemGrid";
// import CreateContentDrawer from "../../../components/Channel/feed/CreateContentDrawer";
// import FeedHeader from "../../../components/Channel/feed/FeedHeader";
// import { get_feedData } from "../../../api/dummy";

// function FeedPersonalPage() {
//   const { userId } = useParams(); // URL에서 userId를 가져옵니다
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [selectedContent, setSelectedContent] = useState(null);
//   const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

//   // 더미 데이터를 현재 페이지 소유자의 정보로 수정합니다
//   const contents = get_feedData.map((content) => ({
//     ...content,
//     authorId: userId,
//     authorName: `User ${userId}`, // 실제로는 사용자 이름을 가져오는 로직이 필요합니다
//     isOwner: true, // 모든 컨텐츠가 현재 사용자의 것임을 표시
//   }));

//   const handleSelectContent = (content) => {
//     setSelectedContent(content);
//     setIsDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setIsDrawerOpen(false);
//     setSelectedContent(null);
//   };

//   return (
//     <>
//       <div className="flex h-full">
//         <div className="flex flex-col flex-1">
//           <FeedHeader openCreateDrawer={() => setIsCreateDrawerOpen(true)} />
//           <ContentItemGrid
//             contents={contents}
//             onSelectContent={handleSelectContent}
//           />
//           <ContentDrawer
//             isOpen={isDrawerOpen}
//             onClose={handleCloseDrawer}
//             content={selectedContent}
//           />
//           <CreateContentDrawer
//             onClose={() => setIsCreateDrawerOpen(false)}
//             isOpen={isCreateDrawerOpen}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default FeedPersonalPage;

import { useState } from "react";
import { useParams } from "react-router-dom";
import ContentDrawer from "../../../components/Channel/feed/ContentDrawer";
import ContentItemGrid from "../../../components/Channel/feed/ContentItemGrid";
import CreateContentDrawer from "../../../components/Channel/feed/CreateContentDrawer";
import FeedHeader from "../../../components/Channel/feed/FeedHeader";
import { get_feedData } from "../../../api/dummy";

function FeedPersonalPage() {
  const { userId } = useParams(); // URL에서 userId를 가져옵니다
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

  // // 더미 데이터를 현재 페이지 소유자의 정보로 수정합니다
  // const contents = get_feedData.map((content) => ({
  //   ...content,
  //   authorId: userId,
  //   authorName: `User ${userId}`, // 실제로는 사용자 이름을 가져오는 로직이 필요합니다
  //   isOwner: true, // 모든 컨텐츠가 현재 사용자의 것임을 표시
  // }));
  const [contents, setContents] = useState(
    get_feedData.map((content) => ({
      ...content,
      authorId: userId,
      authorName: `User ${userId}`,
      isOwner: true,
    }))
  );

  const handleSelectContent = (content) => {
    setSelectedContent(content);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedContent(null);
  };

  const handleEditContent = (editedContent) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === editedContent.id ? editedContent : content
      )
    );
    setSelectedContent(editedContent);
  };

  const handleDeleteContent = (contentId) => {
    setContents((prevContents) =>
      prevContents.filter((content) => content.id !== contentId)
    );
  };

  const handleLike = (contentId, isLiked) => {
    // API 호출을 통해 서버에 좋아요 상태 업데이트
    // 예: api.updateLike(contentId, isLiked)
    //     .then(() => {
    //       // 필요한 경우 로컬 상태 업데이트
    //     })
    //     .catch(error => {
    //       console.error("Failed to update like:", error);
    //       // 에러 처리 로직
    //     });
  };

  return (
    <>
      <div className="flex h-full">
        <div className="flex flex-col flex-1">
          <FeedHeader openCreateDrawer={() => setIsCreateDrawerOpen(true)} />
          <ContentItemGrid
            contents={contents}
            onSelectContent={handleSelectContent}
          />
          <ContentDrawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            content={selectedContent}
            onEdit={handleEditContent}
            onDelete={handleDeleteContent}
            onLike={handleLike}
          />
          <CreateContentDrawer
            onClose={() => setIsCreateDrawerOpen(false)}
            isOpen={isCreateDrawerOpen}
          />
        </div>
      </div>
    </>
  );
}

export default FeedPersonalPage;
