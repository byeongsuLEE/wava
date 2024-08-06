import React, { useState } from "react";
import { Button } from "@headlessui/react";
import useDeviceStore from "../../../store/deviceStore";

function CreateGroupChannel({ onClose, onSubmit, isLoading, error }) {
  const isMobile = useDeviceStore((state) => state.isMobile);

  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");

  const handleSubmit = (e) => {
    console.log("서브밋핸들");
    e.preventDefault();
    onSubmit(channelName, channelDescription);
  };

  return (
    <div
      className={`${
        isMobile ? "scale-90 transform origin-top" : ""
      } select-none p-5`}
    >
      <p className="text-2xl text-center font-bold">채널 생성</p>

      <div className="divider" />
      <input
        type="text"
        onChange={(e) => setChannelName(e.target.value)}
        className="w-full mb-2 border-gray-300 py-1 px-2 border rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-mainBlue focus:border-mainBlue"
        value={channelName}
        placeholder="채널명을 입력해 주세요."
      />
      <textarea
        value={channelDescription}
        onChange={(e) => setChannelDescription(e.target.value)}
        className="w-full h-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-mainBlue focus:border-mainBlue"
        placeholder="설명을 입력하세요"
      />
      <div className="divider my-4" />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-wrap gap-2 mt-6">
        <Button
          className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-gray-200 py-2 px-4 text-sm font-semibold text-gray-700 shadow-md transition-colors duration-300 hover:bg-gray-300 focus:outline-none"
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-mainBlue py-2 px-4 text-sm font-semibold text-white shadow-md shadow-[#ff93ac]/20 transition-colors duration-300 hover:bg-subBlue focus:outline-none"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "생성 중..." : "생성"}
        </Button>
      </div>
    </div>
  );
}

export default CreateGroupChannel;
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">새 모임 채널 생성</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="channelName" className="block mb-2">
//             채널 이름
//           </label>
//           <input
//             type="text"
//             id="channelName"
//             value={channelName}
//             onChange={(e) => setChannelName(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="channelDescription" className="block mb-2">
//             채널 설명
//           </label>
//           <textarea
//             id="channelDescription"
//             value={channelDescription}
//             onChange={(e) => setChannelDescription(e.target.value)}
//             className="w-full p-2 border rounded"
//             rows="3"
//           />
//         </div>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="mr-2 px-4 py-2 bg-gray-200 rounded"
//           >
//             취소
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//             disabled={isLoading}
//           >
//             {isLoading ? "생성 중..." : "생성"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateGroupChannel;
