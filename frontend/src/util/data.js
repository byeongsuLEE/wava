const datas = [
    {
        "id": 15,
        "userId": 1,
        "content": "출장 준비",
        "start": "2024-07-30 04:20:33",
        "end": "2024-07-30 05:20:33",
        "important": "중",
        "type": "REST",
        "className": "class_lmhkh",
        "isFinish": false
    },
    {
        "id": 14,
        "userId": 1,
        "content": "휴식 시간",
        "start": "2024-07-30 05:10:59",
        "end": "2024-07-30 08:10:59",
        "important": "중",
        "type": "WORK",
        "className": "class_loqxv",
        "isFinish": true
    },
    {
        "id": 10,
        "userId": 1,
        "content": "회계 정리",
        "start": "2024-07-30 05:23:40",
        "end": "2024-07-30 08:23:40",
        "important": "하",
        "type": "WORK",
        "className": "class_dvycg",
        "isFinish": false
    },
    {
        "id": 18,
        "userId": 1,
        "content": "업무 정리",
        "start": "2024-07-30 06:38:38",
        "end": "2024-07-30 08:38:38",
        "important": "중",
        "type": "REST",
        "className": "class_icekm",
        "isFinish": false
    },
    {
        "id": 28,
        "userId": 1,
        "content": "고객 지원",
        "start": "2024-07-30 07:15:38",
        "end": "2024-07-30 10:15:38",
        "important": "중",
        "type": "WORK",
        "className": "class_skrem",
        "isFinish": false
    },
    {
        "id": 6,
        "userId": 1,
        "content": "점심 식사",
        "start": "2024-07-30 08:47:09",
        "end": "2024-07-30 11:47:09",
        "important": "중",
        "type": "WORK",
        "className": "class_tyret",
        "isFinish": false
    },
    {
        "id": 21,
        "userId": 1,
        "content": "개발 작업",
        "start": "2024-07-30 19:26:47",
        "end": "2024-07-30 22:26:47",
        "important": "중",
        "type": "REST",
        "className": "class_wmaqu",
        "isFinish": true
    },
    {
        "id": 17,
        "userId": 1,
        "content": "프로젝트 마감",
        "start": "2024-07-30 19:37:30",
        "end": "2024-07-30 22:37:30",
        "important": "상",
        "type": "REST",
        "className": "class_nlhzl",
        "isFinish": false
    },
    {
        "id": 8,
        "userId": 1,
        "content": "프로젝트 마감",
        "start": "2024-07-30 19:58:29",
        "end": "2024-07-30 20:58:29",
        "important": "하",
        "type": "REST",
        "className": "class_sdwmw",
        "isFinish": false
    },
    {
        "id": 2,
        "userId": 1,
        "content": "휴식 시간",
        "start": "2024-07-30 20:18:39",
        "end": "2024-07-30 22:18:39",
        "important": "중",
        "type": "REST",
        "className": "class_imimj",
        "isFinish": false
    },
    {
        "id": 3,
        "userId": 1,
        "content": "고객 미팅",
        "start": "2024-07-30 20:47:41",
        "end": "2024-07-30 23:47:41",
        "important": "중",
        "type": "WORK",
        "className": "class_ozspv",
        "isFinish": false
    },
    {
        "id": 27,
        "userId": 1,
        "content": "팀 회의",
        "start": "2024-07-30 21:07:41",
        "end": "2024-07-30 22:07:41",
        "important": "하",
        "type": "REST",
        "className": "class_qnzaf",
        "isFinish": true
    },
    {
        "id": 25,
        "userId": 1,
        "content": "전략 회의",
        "start": "2024-07-31 02:03:53",
        "end": "2024-07-31 04:03:53",
        "important": "상",
        "type": "WORK",
        "className": "class_iyghn",
        "isFinish": false
    },
    {
        "id": 12,
        "userId": 1,
        "content": "팀 회의",
        "start": "2024-07-31 04:07:55",
        "end": "2024-07-31 07:07:55",
        "important": "상",
        "type": "REST",
        "className": "class_fiqup",
        "isFinish": false
    },
    {
        "id": 16,
        "userId": 1,
        "content": "점심 식사",
        "start": "2024-07-31 05:36:34",
        "end": "2024-07-31 08:36:34",
        "important": "하",
        "type": "WORK",
        "className": "class_dbrqx",
        "isFinish": false
    },
    {
        "id": 9,
        "userId": 1,
        "content": "보고서 작성",
        "start": "2024-07-31 05:52:36",
        "end": "2024-07-31 07:52:36",
        "important": "상",
        "type": "WORK",
        "className": "class_qfksg",
        "isFinish": true
    },
    {
        "id": 4,
        "userId": 1,
        "content": "기술 조사",
        "start": "2024-07-31 10:40:04",
        "end": "2024-07-31 13:40:04",
        "important": "중",
        "type": "REST",
        "className": "class_ucfrh",
        "isFinish": false
    },
    {
        "id": 23,
        "userId": 1,
        "content": "코드 리뷰",
        "start": "2024-07-31 12:17:26",
        "end": "2024-07-31 15:17:26",
        "important": "하",
        "type": "REST",
        "className": "class_kmmld",
        "isFinish": true
    },
    {
        "id": 30,
        "userId": 1,
        "content": "업무 협의",
        "start": "2024-07-31 15:23:44",
        "end": "2024-07-31 16:23:44",
        "important": "상",
        "type": "WORK",
        "className": "class_qxztl",
        "isFinish": true
    },
    {
        "id": 19,
        "userId": 1,
        "content": "프레젠테이션 준비",
        "start": "2024-07-31 16:03:24",
        "end": "2024-07-31 17:03:24",
        "important": "상",
        "type": "REST",
        "className": "class_gduwv",
        "isFinish": true
    },
    {
        "id": 13,
        "userId": 1,
        "content": "디자인 검토",
        "start": "2024-07-31 16:11:41",
        "end": "2024-07-31 17:11:41",
        "important": "상",
        "type": "REST",
        "className": "class_lphgs",
        "isFinish": false
    },
    {
        "id": 7,
        "userId": 1,
        "content": "업무 협의",
        "start": "2024-07-31 18:55:56",
        "end": "2024-07-31 21:55:56",
        "important": "중",
        "type": "WORK",
        "className": "class_vhjhs",
        "isFinish": true
    },
    {
        "id": 24,
        "userId": 1,
        "content": "회식",
        "start": "2024-07-31 19:38:43",
        "end": "2024-07-31 22:38:43",
        "important": "상",
        "type": "WORK",
        "className": "class_hukyn",
        "isFinish": true
    },
    {
        "id": 11,
        "userId": 1,
        "content": "출장 준비",
        "start": "2024-07-31 20:09:02",
        "end": "2024-07-31 23:09:02",
        "important": "하",
        "type": "WORK",
        "className": "class_ujxhp",
        "isFinish": false
    },
    {
        "id": 1,
        "userId": 1,
        "content": "교육 참석",
        "start": "2024-07-31 20:50:57",
        "end": "2024-07-31 23:50:57",
        "important": "중",
        "type": "REST",
        "className": "class_ltgwv",
        "isFinish": true
    },
    {
        "id": 20,
        "userId": 1,
        "content": "프레젠테이션 준비",
        "start": "2024-07-31 23:53:21",
        "end": "2024-08-01 02:53:21",
        "important": "중",
        "type": "WORK",
        "className": "class_ejtqt",
        "isFinish": true
    }
]

export default datas;



