

### 테이블 하나로 GROUP BY 테스트해보기.
https://school.programmers.co.kr/learn/courses/30/lessons/59041
이 테이블 기준으로

- 동물 타입 및 성별별로 개수 세기:
SELECT ANIMAL_TYPE, SEX_UPON_INTAKE, COUNT(*) AS count
FROM ANIMAL_INS
GROUP BY ANIMAL_TYPE, SEX_UPON_INTAKE;

- 같은 년도와 월에 들어온 동물들을 같은 달로 묶어서 개수 세기:
SELECT DATE_FORMAT(DATETIME, '%Y-%m') AS intake_month, COUNT(*) AS count
FROM ANIMAL_INS
GROUP BY DATE_FORMAT(DATETIME, '%Y-%m');

### 동명 동물 수 찾기
https://school.programmers.co.kr/learn/courses/30/lessons/59041

SELECT NAME, COUNT(*) as COUNT
FROM ANIMAL_INS
WHERE NAME IS NOT NULL
GROUP BY NAME 
HAVING COUNT>= 2
ORDER BY NAME;

### 성분으로 구분한 아이스크림 총 주문량
https://school.programmers.co.kr/learn/courses/30/lessons/133026

SELECT INGREDIENT_TYPE, SUM(TOTAL_ORDER) as TOTAL_ORDER
FROM FIRST_HALF fh
LEFT JOIN ICECREAM_INFO ii
ON fh.FLAVOR = ii.FLAVOR
GROUP BY INGREDIENT_TYPE
ORDER BY TOTAL_ORDER ASC

### 고양이와 개는 몇 마리 있을까
https://school.programmers.co.kr/learn/courses/30/lessons/59040

SELECT ANIMAL_TYPE, COUNT(*) AS count
FROM ANIMAL_INS
GROUP BY ANIMAL_TYPE
ORDER BY ANIMAL_TYPE ASC;
고양이를 개보다 먼저 조회해 줘야 하기 때문에 정렬해줘야함.
