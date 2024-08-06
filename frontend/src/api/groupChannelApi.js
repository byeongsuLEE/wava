import { localAxios as local } from "../util/http-commons";

const createGroupChannelAPI = async (channelName, success, fail) => {
  try {
    const response = await local.post("/api/channels/group", {
      name: channelName,
    });
    success(response.data);
  } catch (error) {
    console.error("그룹 채널 생성 중 오류 발생:", error);
    fail(error);
  }
};

export { createGroupChannelAPI };
