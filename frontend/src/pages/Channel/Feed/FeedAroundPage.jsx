import { useState } from "react";
import ContentDrawer from "../../../components/Channel/feed/ContentDrawer";
import ContentItemGrid from "../../../components/Channel/feed/ContentItemGrid";
import FeedSearchBar from "../../../components/Channel/feed/FeedSearchbar";
import { get_feedData } from "../../../api/dummy";

const contents = get_feedData;
// 임시 더미 데이터, api연결되면 바꿀것

function FeedAroundPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedContent(null);
  };

  const handleSelectContent = (content) => {
    setSelectedContent(content);
    setIsDrawerOpen(true);
  };

  const searchHandle = (searchText) => {};

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1">
        <FeedSearchBar searchHandle={searchHandle} />
        <ContentItemGrid
          contents={contents}
          onSelectContent={handleSelectContent}
        />
        <ContentDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          content={selectedContent}
        />
      </div>
    </div>
  );
}

export default FeedAroundPage;
