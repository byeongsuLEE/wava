import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

async function callAssistant(todoList, prompt) {
    const completion = await openai.chat.completions.create({
        messages: [
            { "role": "system", "content": "당신은 사용자의 일정 관리를 돕는 비서입니다. 요청에 대한 답변은 한국어로 해주세요." },
            { "role": "user", "content": prompt },
            { "role":"user", content: todoList }
        ],
        model: "gpt-4o-mini"
    });
    console.log(completion);
    return completion;
}


export default callAssistant;