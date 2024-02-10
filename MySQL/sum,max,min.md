### 가격이 제일 비싼 식품의 정보 출력하기

https://school.programmers.co.kr/learn/courses/30/lessons/131115

- ORDER BY 사용
  SELECT \*
  FROM FOOD_PRODUCT
  ORDER BY PRICE DESC
  LIMIT 1;

- 서브쿼리 사용
  SELECT \*
  FROM FOOD_PRODUCT
  WHERE PRICE = (SELECT MAX(PRICE) FROM FOOD_PRODUCT);

### 가장 비싼 상품 구하기

https://school.programmers.co.kr/learn/courses/30/lessons/131697

SELECT PRICE as MAX_PRICE
FROM PRODUCT
ORDER BY PRICE DESC
LIMIT 1;

### 최댓값 구하기

https://school.programmers.co.kr/learn/courses/30/lessons/59415

- ORDER BY 사용
  SELECT DATETIME as 시간
  FROM ANIMAL_INS
  ORDER BY DATETIME DESC
  LIMIT 1

- MAX 사용
  SELECT MAX(DATETIME) as 시간
  FROM ANIMAL_INS;

### 최솟값 구하기

https://school.programmers.co.kr/learn/courses/30/lessons/59038

- MIN 사용
  SELECT MIN(DATETIME) as 시간
  FROM ANIMAL_INS

- ORDER BY, LIMIT 사용
  SELECT DATETIME as 시간
  FROM ANIMAL_INS
  ORDER BY DATETIME ASC
  LIMIT 1

### 동물 수 구하기

https://school.programmers.co.kr/learn/courses/30/lessons/59406

SELECT COUNT(ANIMAL_ID) as count
FROM ANIMAL_INS

### 중복 제거하기

https://school.programmers.co.kr/learn/courses/30/lessons/59408

- DISTINCT 사용(중복 제거)
  SELECT COUNT(DISTINCT NAME) as count
  FROM ANIMAL_INS
