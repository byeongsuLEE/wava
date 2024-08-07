import { localAxios as local } from "../util/http-commons";

const address = "/channel";

// try-catch 헬퍼함수
const handleRequest = async (requestFunction) => {
  try {
    const response = await requestFunction();
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      return response.data;
    } else if (response?.data?.message) {
      throw new Error(response?.data?.message);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.error("feed Error" + error);
    return false;
  }
};

/**
 * @typedef {Object} Image
 * @property {string} imageName - 이미지의 이름
 * @property {string} imageUrl - 이미지의 URL

 * @typedef {Object} FeedItem
 * @property {number} id - 피드 항목의 고유 ID
 * @property {Image} image - 피드의 대표 이미지 정보
 * @property {number} likes - 피드 항목의 좋아요 수
 * @property {number} comments - 피드 항목의 댓글 수
 * @property {string} owner - 피드 소유자의 이메일 또는 이름

 * @typedef {Object} feedReturn
 * @property {boolean} hasMore - 다음 페이지가 존재하는지 여부
 * @property {number} currentPage - 현재 페이지 번호
 * @property {number} totalPages - 전체 페이지 수
 * @property {FeedItem[]} data - 피드 데이터 배열

 * 피드 콘텐츠(이미지들)를 가져오기 위한 요청을 처리합니다.
 *
 * @param {number} id - 가져올 피드의 ID
 * @returns {Promise<feedReturn>} 피드 콘텐츠를 포함한 객체를 반환합니다
 */
export const readFeedContentRequest = async (id, pageNo = 1) => {
  // return get_feedData;
  return await handleRequest(() =>
    local.get(address + "/personal/" + id + "/feed?pages=" + pageNo)
  );
};

// 개인 채널의  정보
export const readFeedInfoRequest = async (nickName) => {
  // return {
  //   email: "wava@wava.com",
  //   nickname: "전지훈",
  //   sido: "광주광역시",
  //   sigungu: "광산구",
  //   description: "전지훈의 개인 채널입니다.",
  //   profileImage:
  //     "https://fastly.picsum.photos/id/184/250/250.jpg?hmac=6ULGFzE9ycGK0cgb3NB9AJG6Jt0_w_Ez-QWFZpWEFRI",
  //   follow: 1,
  //   follower: 1,
  //   feedCount: 1,
  // };
  return await handleRequest(() =>
    local.get(address + "/personal/" + nickName + "/info")
  );
};

// 헤더 덮어씌워서 명시적으로 지정
// 피드 생성
export const createFeedRequest = async (data) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    return await handleRequest(() =>
      local.post(address + "/feed/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
    );
  } else {
    return false;
  }
};

// 피드 디테일 보기
export const readOneFeedDetailRequest = async (id) => {
  // return {
  //   id: 1,
  //   userId: 1,
  //   nickName: "닉네임위치",
  //   profile: "https://picsum.photos/250/250",
  //   content: "오늘날씨좋다",
  //   isLiked: true,
  //   heart: 222,

  //   image: [
  //     {
  //       imageName: nanoid(),
  //       imageUrl: "https://loremflickr.com/600/400",
  //     },
  //     {
  //       imageName: nanoid(),
  //       imageUrl: "https://loremflickr.com/600/400",
  //     },
  //   ],
  //   comment: [
  //     {
  //       id: 1,
  //       userId: 1234,
  //       nickName: "와바사용자2",
  //       profile: "https://loremflickr.com/600/400",
  //       comment: "와정말좋아요",
  //     },
  //     {
  //       id: 2,
  //       userId: 3324,
  //       nickName: "와바사용자3",
  //       profile: "https://loremflickr.com/600/400",
  //       comment: "와진짜대단해요",
  //     },
  //   ],
  // };
  return await handleRequest(() => local.get(address + "/feed/" + id));
};

// 피드에 코멘트 작성
export const createCommentFeedRequest = async (id, data) => {
  return await handleRequest(() =>
    local.post(`${address}/${id}/comment`, data)
  );
};

// 피드 좋아요
export const createLikeFeedRequest = async (id) => {
  return await handleRequest(() => local.post(`${address}/${id}/like`, {}));
};

// 피드 좋아요 취소
export const deleteLikeFeedRequest = async (id) => {
  return await handleRequest(() => local.delete(`${address}/${id}/dislike`));
};

// 피드 검색 -> 에러 핸들링 할 것 ->마지막페이지, 페이지아웃
export const searchFeedRequest = async (keyword = "") => {
  return await handleRequest(() => local.get(`${address}/search?q=${keyword}`));
};

// 팔로우 등록
export const followRequest = async (channelId) => {
  return await handleRequest(() =>
    local.post(`${address}/follow`, { channelId })
  );
};

// 팔로우 상세
export const readFollowUserRequest = async (nickName) => {
  return await handleRequest(() =>
    local.get(`${address}/${nickName}/follower`)
  );
};

// 팔로워 상세
export const readFollowerUserRequest = async (nickName) => {
  return await handleRequest(() =>
    local.get(`${address}/${nickName}/followering`)
  );
};

// 헤더 덮어씌워서 명시적으로 지정
// 프로필 이미지 저장
export const createProfileImageRequest = async (nickName, data) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    return await handleRequest(() =>
      local.post(`personal/${nickName}/profile`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
    );
  } else {
    return false;
  }
};
