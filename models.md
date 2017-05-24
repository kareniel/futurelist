
```postgresql

create table users (
  id               serial,
  username         varchar(32),
  hashed_password  varchar(60)
);

create table posts (
  id        serial,
  user_id   integer,
  url       text
);

create table votes (
  id       serial,
  post_id  integer,
  user_id  integer
);

```
