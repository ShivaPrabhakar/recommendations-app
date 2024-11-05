# recommendations-app
An app which stores and fetches the recommendations of the users.

## Installation

### Steps to run service

1. make sure you have installed NodeJs if not install it.
2. install redis in local.
3. open terminal
4. clone the repository
5. type cd recommendation-app/recommendation-app
6. type npm i to install the dependencies
7. type npm start to run the application
8. To import csv data of users and recommendations in DB


### To import csv data of users and recommendations in DB

1. make sure you have installed NodeJs if not install it.
2. open terminal
3. type cd recommendation-app/recommendation-app
4. type node ./queries/import_data.js to import


### SQL scripts to create db schema

#### USERS

CREATE TABLE public.users ( id BIGSERIAL PRIMARY KEY, fname VARCHAR(255) NOT NULL, sname VARCHAR(255) NOT NULL, profile_picture TEXT, bio TEXT, created_at TIMESTAMP DEFAULT NOW() );

#### RECOMMENDATIONS

CREATE TABLE public.recommendations ( id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL, title TEXT, caption TEXT, category VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW(), FOREIGN KEY (user_id) REFERENCES public.users(id) );

#### COLLECTIONS

CREATE TABLE public.collections ( id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT, created_at TIMESTAMP DEFAULT NOW(), FOREIGN KEY (user_id) REFERENCES public.users(id) );

#### COLLECTION_RECOMMENDATIONS

CREATE TABLE public.collection_recommendations ( id BIGSERIAL PRIMARY KEY, collection_id BIGINT NOT NULL, recommendation_id BIGINT NOT NULL, FOREIGN KEY (collection_id) REFERENCES public.collections(id) ON DELETE CASCADE, FOREIGN KEY (recommendation_id) REFERENCES public.recommendations(id) ON DELETE CASCADE );


## API endpoint testing

Please check the 
recommendations-app/curl-requests.txt
file the run the APIs
    
