# Marketplacehub platform

The Marketplacehub Platform is a comprehensive application designed to facilitate seamless interactions between buyers and sellers.
It provides a user-friendly interface for users to register, create stores, and post products while offering extensive tools for communication and engagement.
This platform ensures a secure and dynamic marketplace experience, fostering a vibrant online buying and selling community.

![Screenshot (147)](https://github.com/user-attachments/assets/97b0ba46-cbfe-4b74-ab8a-2bd882f09e90)
![Screenshot (165)](https://github.com/user-attachments/assets/19dbe8a3-a17a-4c66-88be-8d6ecf422edb)
![Screenshot (166)](https://github.com/user-attachments/assets/8848bb04-d434-47a2-a5ec-3ea062f66712)
![Screenshot (167)](https://github.com/user-attachments/assets/bd23feae-eb0e-49a0-81dd-e727c94d5d19)

## Admin Features

### Dashboard
![Screenshot (137)](https://github.com/user-attachments/assets/c41ef99d-05f6-468f-a00e-d239d1cb9971)
1. Total Products Posted in the Last 7 Months  
2. Total Products Posted  
3. Recently Joined Users  
4. Recently Posted Products


## User Management
![Screenshot (138)](https://github.com/user-attachments/assets/fc4c70de-aa52-496f-b720-ed0a22b0820d)
1. View all registered users.
2. Delete user accounts if necessary.


## Product Management
![Screenshot (139)](https://github.com/user-attachments/assets/a78d52ad-bc47-4b82-9c65-3abd9e72b21d)
![Screenshot (140)](https://github.com/user-attachments/assets/5eebce0c-55d8-4f2e-8d97-3db6d40c5067)
1. View reported products and take action (delete or keep).
2. View pending products and decide whether to accept or delete them.


## Category Management
![Screenshot (141)](https://github.com/user-attachments/assets/197e6a0f-11de-40e8-8e46-810af9bafdce)
1. View all product categories.
2. Delete categories as required.


## Store Management
![Screenshot (142)](https://github.com/user-attachments/assets/fb71b217-655d-4c97-88f6-d1aa04c9afd4)

1. View all stores and their creators.

## Team Management
![Screenshot (143)](https://github.com/user-attachments/assets/edfd05c0-4c28-4209-8e0b-47374630dfaf)

1. View the admin team.
### Super Admins:
1. Add new admins.
2. Delete existing admins.
3. Regular admins cannot add or delete other admins.


## SuperAdmin/Admin profile
![Screenshot (145)](https://github.com/user-attachments/assets/3bd1d68c-13b8-465b-8d63-919ebf8f9ec8)



## User Features

## Authentication

1. Sign Up: Register a new account, and enter a verification code sended to the email provided.
![Screenshot (163)](https://github.com/user-attachments/assets/ddb8d9a3-f67f-4267-9ac1-502a08b198fd)

2. Login: Access the platform with valid credentials.
![Screenshot (162)](https://github.com/user-attachments/assets/9378e248-6f8e-421b-a889-1d74c1f2d548)

4. Reset Password: Recover account access using email verification.
![Screenshot (164)](https://github.com/user-attachments/assets/00af209d-b62a-4888-90da-abe6d3f8342b)

## Profile Management
![Screenshot (148)](https://github.com/user-attachments/assets/384c7d33-0795-49e0-b2a5-afdfdcbbda09)

1. Update personal profile information such us fullName, username, profilePicture, birthday, bio
2. Create stores or delete them or update stores data


## Product Interaction

### View Products:

Browse products posted by other users.
Flag inappropriate or suspicious products.
Add products and wait for admin to accept them.
![Screenshot (153)](https://github.com/user-attachments/assets/236f26fb-9076-47c0-b73d-8e70882e1f17)
![Screenshot (149)](https://github.com/user-attachments/assets/54026ca0-76af-48d5-bbdb-ad004c401677)


Search for products or users based on keywords or filters.
![Screenshot (150)](https://github.com/user-attachments/assets/19a1bdac-e1cb-47b3-a5f3-9c76ff81db92)


View the history of previously searched products or users.
![Screenshot (151)](https://github.com/user-attachments/assets/93bf3351-05bf-4fec-a005-7d21ad18726b)



Mark products as favorites.
![Screenshot (159)](https://github.com/user-attachments/assets/4f2628d2-2cb1-48b4-9949-4d74231825a1)


View a products details.
Engage with product posts by leaving comments.
Like products.
copy the product url.
Ask seller if the product is available.
![Screenshot (155)](https://github.com/user-attachments/assets/cae504f0-c9aa-46ff-91d7-33050e6ac44f)


## Notifications
Receive real-time updates, including:
1. Liked your product.
2. Commented on your product.
3. Accepted your product
![Screenshot (156)](https://github.com/user-attachments/assets/6b4cd755-ca17-43d0-999d-867c43d60bbf)

## Messages (Real-time)
1. Send messages to product sellers.
2. Respond to inquiries from other users.
![Screenshot (158)](https://github.com/user-attachments/assets/b93643a5-3964-47bd-8291-33a0fa37ee61)



## View users details (stores, product posted)
![Screenshot (160)](https://github.com/user-attachments/assets/29c9e91d-0ca9-4b3d-8bd5-c1df30ef95ad)
![Screenshot (161)](https://github.com/user-attachments/assets/2bd6c107-c90b-48bd-b99a-5eb987a71239)





# Tech stack
## Technologies used in this app developement
#### Front-end : React js, Tailiwnd css
#### Back-end : Laravel php, express js
#### Databases : MySQL, mongoDB



# Installation
### Set up the laravel backend app
1. Clone the repository
   ```
   git clone https://github.com/sofyanBoukir/Marketplace-hub.git
   ```
2. laravel backend Setup
   ```
   cd back-end/laravel
   composer install
   php artisan migrate --seed
   php artisan storage:link
   ```
3. Setup .env file
Change the name from .env.example to .env, 
Make you smtp email informations in the .env laravel file, make the databasename as 'marketplace' and setup the username and password and host and DB_CONNECTION=mysql not sqllite
also make sure that the .env file of laravel have the same API_KEY and SECRET_KEY like express if it's not add it.

4. Note!! for betterExperience
   Install a product default image name it productDefaultImage.png and set it in public/storage/products
   Install a user default image userDefaultImage.jpg and set it in public/storage/users
### Setup the express backend app
1. express backend setup
   ```
   cd backend/express
   npm install
   ```


### Set up the react frontend app
1. react frontend setup
   ```
   cd frontend
   npm install
   ```



## Run the application express then laravel then react
  ```
  npm start
  php artisan serve
  npm run dev
  ```
