# MySQL 강의

- MySQL 설치하기: • [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- 데이터베이스 서버 구조

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/e27046f7-1b53-435a-97d7-cbc1b47dd464/Untitled.png)

저 표들을 그룹핑 한것을 데이터베이스라고 한다. 

그것을 다른말로 스키마(schema)라고 하는데, 표들을 그룹핑 하는 일종의 폴더 라고 생각하면됨. 스키마는 서로 연관된 폴더들을 그룹핑 해준다.

표 → 데이터베이스(스키마) → 데이터베이스 서버 

- MySQL 에서 데이터 베이스 만들기:
CREATE DATABASE 데이터베이스이름; (명령이 끝난 후 꼭 세미콜론 달아주기)
- 삭제하기:
DROP DATABASE 데이터베이스이름;

구글링할때 (여기서 데이터베이스 리트스 보고싶을때):
how to show database list in mysql 
이런식으로 구글링하면 좋다.

- 데이터베이스 확인하기:
SHOW DATABASES;   (복수형으로 써주기)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/10de3860-1d23-4d68-ba95-e01362fa6648/Untitled.png)

이런식으로 데이터베이스가 생성이 되었으면 저 opentutorials 에 들어가서 표를 만들려고 한다면, 
명령어: USE opentutorials;

하면 된다. 이 명령어는 이제 내가 스키마에 있는opentutorials라는 스키마에 있는 표를 대상으로 명령을 내리겠다고 하는것이다.

- SQL:
    - Structured:구조화된
    - Query: 질의, 질문한다.
    - Language:

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/ff2fd365-8c5f-4ff6-8ebb-a1db5d1573df/Untitled.png)

- mysql cheat sheet  들어가서 예제 봐라. 어떻게 만드는지 나와있음.

### < MySQL 테이블 생성 >

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/2caca6aa-f39d-407b-91cc-5ae9a7bbcd53/Untitled.png)

이런 테이블을 만든다고 하면, 우선 create table,

```sql
CREATE TABLE topic(
	-> id INT(11) NOT NULL AUTO INCREMENT,
	-> title VARCHAR(100) NOT NULL,
	-> description TEXT NULL,
	-> created DATETIME NOT NULL,
	-> author VARCHAR(15) NULL,
	-> profile VARCHAR(200) NULL,
	-> PRIMARY KEY(id)
	-> );
// 여기서 -> 는 엔터했을때 생겨나는 표시임(원래는 없는 문자)
```

첫줄: 검색같은것을 할때, id를 11개까지만 노출시킬것이라고 명시한것. 정수여야 하고, Null 이 아니어야 하고, 자동으로 1씩 증가된다는 표시를 한것.

두번째: 100글자 이하만 가능하게. 넘어가면 문자를 자르고 100글자까지만 저장. (VAR: variable, CHAR: charactor)

네번째: (구글에 mysql data type date and time 으로 검색해보고 문서 찾아보고 하는 습관)

NOT NULL 과 NULL: not null 은 null 인것을 허용하지 않는다. null인것을 허용한다. 라는 뜻

PRIMARY KEY(id)

저렇게 작성하고 enter 치면, 쿼리 ok 가 뜬다.

SHOW TABLES 입력하면 테이블 잘 뜨는지 확인할 수 있다.

password 관련 에러 뜨면, SET PASSWORD = PASSWORD(’내가 설정할 비밀번호’) 입력후 다시 create table 해야 한다. 그때그때 나오는 에러 검색해보기

테이블 생성하는것 찾아볼때  검색어:

create table in mysql cheat sheet (cheat sheet 빼고 검색해보면 복잡한 코드들 나옴. 검색을 잘하는것이 중요)

터미널에서 cd /usr/local/mysql/bin 하면 bin 으로 이동.

./mysql -uroot -p 

(-u: 유저라는 뜻, root: 유저이름 -p: password입력할거다)

로 mysql 데이터베이스 서버에 로그인 했다면,  mysql  USE opentutorials (opentutorials는 만들어준 데이터베이스 이름) 라고 명령어 입력한다. 

```sql
CREATE TABLE topic(
	-> id INT(11) NOT NULL AUTO INCREMENT,
	-> title VARCHAR(100) NOT NULL,
	-> description TEXT NULL,
	-> created DATETIME NOT NULL,
	-> author VARCHAR(15) NULL,
	-> profile VARCHAR(200) NULL,
	-> PRIMARY KEY(id)
	-> );
```

이렇게 테이블 만들때,  오른쪽 끝에서 세미콜론을 적고 엔터를 쳐야 저렇게 명령문이 끝난다

```sql
rumi@munjeong-eun-ui-MacBookPro ~ % cd /usr/local/mysql/bin
rumi@munjeong-eun-ui-MacBookPro bin % ./mysql -uroot -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.3.0 MySQL Community Server - GPL

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> CREATE DATABASE opentutorials;
Query OK, 1 row affected (0.01 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| opentutorials      |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

mysql> USE opentutorials
Database changed

mysql> CREATE TABLE topic(
    -> id INT(11) NOT NULL AUTO_INCREMENT,
    -> title VARCHAR(100) NOT NULL,
    -> description TEXT NULL,
    -> created DATETIME NOT NULL,
    -> author VARCHAR(15) NULL,
    -> profile VARCHAR(200) NULL,
    -> PRIMARY KEY(id)
    -> );
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> SHOW TABLES;
+-------------------------+
| Tables_in_opentutorials |
+-------------------------+
| topic                   |
+-------------------------+
1 row in set (0.00 sec)
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/b4625aab-bc8b-4c48-aae2-b7409ef2aa84/Untitled.png)

저거 보기 괜찮으니깐 검색해서 정보볼때 저거 봐보기.

tech on the net 사이트임.

### <MySQL CRUD>

DESC topic;   (DESC <테이블명>)

하고 나오는 표를 가지고 참고해서 INSERT 문을 작성하면 된다.

```sql
mysql> USE opentutorials
Database changed

mysql> DESC topic;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| title       | varchar(100) | NO   |     | NULL    |                |
| description | text         | YES  |     | NULL    |                |
| created     | datetime     | NO   |     | NULL    |                |
| author      | varchar(15)  | YES  |     | NULL    |                |
| profile     | varchar(200) | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
6 rows in set (0.00 sec)

mysql> INSERT INTO topic (title,description,created,author,profile) VALUES('MySQL','MySQL is ...', NOW(), 'rumi','developer');
Query OK, 1 row affected (0.01 sec)

mysql> SELECT * FROM topic;+----+---------+----------------+---------------------+--------+-----------+
| id | title   | description    | created             | author | profile   |
+----+---------+----------------+---------------------+--------+-----------+
|  1 | MySQL   | MySQL is ...   | 2024-02-15 11:10:21 | rumi   | developer |
|  2 | Oracle  | Oracle is ...  | 2024-02-15 11:14:44 | rumi2  | developer |
|  3 | MongoDB | MongoDB is ... | 2024-02-15 11:16:04 | rumi3  | developer |
+----+---------+----------------+---------------------+--------+-----------+
3 rows in set (0.00 sec)
```

INSERT INTO topic (title,description,created,author,profile) VALUES('MySQL','MySQL is ...', NOW(), 'rumi','developer'); 

id 값은 auto_increment 라서 따로 명시하지 않았고, 나머지 값들은 순서대로, values 안에도 순서대로 작성해준다.  select로 insert된 데이터를 확인했다.

create로 테이블 자체를 만드는 일은 많이없는데, 이렇게 insert 로 데이터를 추가한다거나, select 로 테이블을 확인한다거나 할일은 매우 많음.

```sql
mysql> SELECT id,title,created,author FROM topic WHERE author='rumi2';
+----+--------+---------------------+--------+
| id | title  | created             | author |
+----+--------+---------------------+--------+
|  2 | Oracle | 2024-02-15 11:14:44 | rumi2  |
+----+--------+---------------------+--------+
1 row in set (0.00 sec)
```

SELECT id,title,created,author FROM topic WHERE author='rumi2'; 이렇게 WHERE 뒤에 조건 넣어주기.

UPDATE 하기

UPDATE topic SET description=’Oracle2 is…’, title=’Oracle2’

까지만 하면 모든 description, title이 바뀜.
WHERE절을 빠뜨리면, 재앙이올수 있다. 주의.

where절을 넣어 조건을 넣어준다. id=2

UPDATE topic SET description='Oracle2 is...', title='Oracle2' WHERE id=2;

```sql
mysql> UPDATE topic SET description='Oracle2 is...', title='Oracle2' WHERE id=2;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM topic;
+----+---------+----------------+---------------------+--------+-----------+
| id | title   | description    | created             | author | profile   |
+----+---------+----------------+---------------------+--------+-----------+
|  1 | MySQL   | MySQL is ...   | 2024-02-15 11:10:21 | rumi   | developer |
|  2 | Oracle2 | Oracle2 is...  | 2024-02-15 11:14:44 | rumi2  | developer |
|  3 | MongoDB | MongoDB is ... | 2024-02-15 11:16:04 | rumi3  | developer |
+----+---------+----------------+---------------------+--------+-----------+
3 rows in set (0.00 sec)
```

이렇게 값이 바뀌었다.

DELETE 하기

DELETE FROM topic WHERE id=3;

id 가 3인 행만 삭제된다. WHERE 안쓰면 모든 행이 삭제. 대재앙.

JOIN 

SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id;

topic 테이블에 author 테이블을 합칠 수 있다. ON 조건절을 기준으로.

https://opentutorials.org/module/3300/19521 이곳에서 코드 볼수있다. 

- topic 테이블의 이름을 topic_backup으로 바꿔주고(RENAME 사용) , author 테이블을 하나 더 생성해서 join 해주기

```sql
-- ``부분은 다 빼준다. 

RENAME TABLE topic TO topic_backup;
mysql> SELECT * FROM topic_backup;
+----+---------+----------------+---------------------+--------+-----------+
| id | title   | description    | created             | author | profile   |
+----+---------+----------------+---------------------+--------+-----------+
|  1 | MySQL   | MySQL is ...   | 2024-02-15 11:10:21 | rumi   | developer |
|  2 | Oracle2 | Oracle2 is...  | 2024-02-15 11:14:44 | rumi2  | developer |
|  3 | MongoDB | MongoDB is ... | 2024-02-15 11:16:04 | rumi3  | developer |
+----+---------+----------------+---------------------+--------+-----------+
3 rows in set (0.00 sec)

-- Table structure for table `author`
  
CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
-- Dumping data for table `author`
 
INSERT INTO `author` VALUES (1,'egoing','developer');
INSERT INTO `author` VALUES (2,'duru','database administrator');
INSERT INTO `author` VALUES (3,'taeho','data scientist, developer');
 
-- Table structure for table `topic`

CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
-- Dumping data for table `topic`
 
INSERT INTO `topic` VALUES (1,'MySQL','MySQL is...','2018-01-01 12:10:11',1);
INSERT INTO `topic` VALUES (2,'Oracle','Oracle is ...','2018-01-03 13:01:10',1);
INSERT INTO `topic` VALUES (3,'SQL Server','SQL Server is ...','2018-01-20 11:01:10',2);
INSERT INTO `topic` VALUES (4,'PostgreSQL','PostgreSQL is ...','2018-01-23 01:03:03',3);
INSERT INTO `topic` VALUES (5,'MongoDB','MongoDB is ...','2018-01-30 12:31:03',1);
```

```sql
mysql> SELECT * FROM topic;
+----+------------+-------------------+---------------------+-----------+
| id | title      | description       | created             | author_id |
+----+------------+-------------------+---------------------+-----------+
|  1 | MySQL      | MySQL is...       | 2018-01-01 12:10:11 |         1 |
|  2 | Oracle     | Oracle is ...     | 2018-01-03 13:01:10 |         1 |
|  3 | SQL Server | SQL Server is ... | 2018-01-20 11:01:10 |         2 |
|  4 | PostgreSQL | PostgreSQL is ... | 2018-01-23 01:03:03 |         3 |
|  5 | MongoDB    | MongoDB is ...    | 2018-01-30 12:31:03 |         1 |
+----+------------+-------------------+---------------------+-----------+
5 rows in set (0.00 sec)

mysql> SELECT * FROM author;
+----+--------+---------------------------+
| id | name   | profile                   |
+----+--------+---------------------------+
|  1 | egoing | developer                 |
|  2 | duru   | database administrator    |
|  3 | taeho  | data scientist, developer |
+----+--------+---------------------------+
3 rows in set (0.00 sec)
```

이런 테이블이 나온다. 이것을 author id를 기준으로  LEFT JOIN 해주면 이렇게 테이블이 합쳐진다. 

```sql
mysql> SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id;
+----+------------+-------------------+---------------------+-----------+------+--------+---------------------------+
| id | title      | description       | created             | author_id | id   | name   | profile                   |
+----+------------+-------------------+---------------------+-----------+------+--------+---------------------------+
|  1 | MySQL      | MySQL is...       | 2018-01-01 12:10:11 |         1 |    1 | egoing | developer                 |
|  2 | Oracle     | Oracle is ...     | 2018-01-03 13:01:10 |         1 |    1 | egoing | developer                 |
|  3 | SQL Server | SQL Server is ... | 2018-01-20 11:01:10 |         2 |    2 | duru   | database administrator    |
|  4 | PostgreSQL | PostgreSQL is ... | 2018-01-23 01:03:03 |         3 |    3 | taeho  | data scientist, developer |
|  5 | MongoDB    | MongoDB is ...    | 2018-01-30 12:31:03 |         1 |    1 | egoing | developer                 |
+----+------------+-------------------+---------------------+-----------+------+--------+---------------------------+
5 rows in set (0.00 sec)
```

JOIN 은 관계형 데이터베이스를 관계형 데이터베이스 답게하는 매우 중요한 기능!

MySQL Workbench 사용하기

gui 기반. database client.

다운로드: https://dev.mysql.com/downloads/workbench/

index (인덱스)

: 사용자들이 사용을 자주하는 column 에다가 index를 걸어놓으면 데이터가 들어올때, 데이터베이스가 그 컬럼의 데이터를 잘 정리정돈한다.  데이터를 찾기 쉽게 만들어줌. 성능향상에 좋다. 

modeling (모델링)

데이터베이스 모델링 하는거 찾아보기

** backup(백업)
데이터 백업!! 데이터를 복제해서 보관한다. 아주중요

mysqldump, binary log

cloud 서비스로 데이터를 보관할수 있다.