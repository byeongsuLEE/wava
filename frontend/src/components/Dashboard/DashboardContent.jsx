// import React, { useState } from "react";
// import GraphView from "./Graph/GraphView";

// const DashboardContent = ({ calendarChange }) => {
//   const [category, setCategory] = useState("WORQ"); // 카테고리 WORQ, important

//   const categoryChangeHandle = (evt) => {
//     // 이분법
//     // true면 important, false면 WORK/VACATION
//     console.log(evt.target.value);
//     setCategory((state) => (state === "WORQ" ? "important" : "WORQ"));
//   };
//   return (
//     <>
//       <div className="bg-white text-mainTxt text-center flex flex-col h-full">
//         {/* <button onClick={() => calendarChange("dayGridMonth")}>asdf</button> */}
//         {/* dayGridMonth,timeGridWeek,threeDays,timeGridDay */}
//         <div className="shadow-md rounded-lg p-2 flex-shrink-0">
//           <span className="text-xl inline-block my-4">나의 워케이션 정보</span>
//           <p>여기다가 내 워케이션 정보 카드 보여주면 될 듯 ㅇㅇ</p>
//         </div>

//         <div className="w-full flex-shrink-0 flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3">
//           <GraphView category={category} />
//         </div>
//         <div className="w-full flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3 overflow-auto min-h-[50px]">
//           <h4>필터 옵션</h4>
//         </div>
//         <div className="w-full flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3 flex-grow overflow-auto min-h-[200px]">
//           <p>AI 출력 부분</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardContent;

import React, { useState } from "react";
import GraphView from "./Graph/GraphView";
import Filters from "./Calendar/Filters";
import Calendar from "./Calendar";

import callAssistant from "../../util/gpt";

const DashboardContent = ({ calendarChange }) => {
  const [filter, setFilter] = useState({ type: "ALL", important: "ALL" });
  const [category, setCategory] = useState("WORQ"); // 카테고리 WORQ, important
  // console.log("Current Filter:", filter);
  const categoryChangeHandle = (evt) => {
    // 이분법
    // true면 important, false면 WORK/VACATION
    setCategory((state) => (state === "WORQ" ? "important" : "WORQ"));
  };

  const [answer, setAnswer] = useState(null);
  const ai_test = async() => {
    const prompt = "안녕 Assistant?"
    const comment = await callAssistant(prompt);
    setAnswer(comment);
  }
  return (
    <>
      <div className="bg-white text-mainTxt text-center flex flex-col h-full">
        {/* <button onClick={() => calendarChange("dayGridMonth")}>asdf</button> */}
        {/* dayGridMonth,timeGridWeek,threeDays,timeGridDay */}
        <div className="shadow-md rounded-lg p-2 flex-shrink-0">
          <span className="text-xl inline-block my-4">나의 워케이션 정보</span>
          <p>여기다가 내 워케이션 정보 카드 보여주면 될 듯 ㅇㅇ</p>
        </div>

        <div className="w-full flex-shrink-0 flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3">
          <GraphView category={category} />
        </div>
        {/* <div className="w-full flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3 overflow-auto min-h-[50px]">
          <h4>필터 옵션</h4>
          <Filters filter={filter} setFilter={setFilter} />
        </div> */}
        <div className="w-full flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3 flex-grow overflow-auto min-h-[200px]">
          <p>AI 출력 부분</p>
           <button
              type="button"
              onClick={ai_test}
              className="w-full h-10 border rounded-[10px] mt-3 mb-1 drop-shadow-md bg-[#1c77c3] text-white"
            >
              ai 호출
          </button>
          <p>{answer?.choices[0]?.message?.content}</p>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
