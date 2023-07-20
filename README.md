# cow-hut-admin


## Live Link: https://cow-hut-admin-ruby.vercel.app

# Application Routes:

## Auth (User)
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/auth/login (POST)
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/auth/signup (POST)
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/auth/refresh-token (POST)

## Auth (Admin)
* Route: https://cow-hut-admin-ruby.vercel.app/api/v1/admins/create-admin (POST)
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/admins/login (POST)

## User
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/users (GET) Include an id that is saved in your database
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/users/64a74f763be5df417c061116 (Single GET) Include an id that is saved in your database
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/users/64a74f763be5df417c061116 (PATCH) Include an id that is saved in your database
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/users/64a74f763be5df417c061116 (DELETE) Include an id that is saved in your database


## Cows
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/cows (POST)
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/cows (GET)
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/cows/64a753223be5df417c061128 (Single GET) Include an id that is saved in your database
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/cows/64a753223be5df417c061128 (PATCH) Include an id that is saved in your database
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/cows/64a753223be5df417c061128 (DELETE) Include an id that is saved in your database

## Orders

* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/orders (POST)
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/orders (GET)

##  /api/v1/orders (POST) Body

```
{
  "cow":"64a753223be5df417c061128", 
  "buyer":"64a74f763be5df417c061116"
}
```

## Bonus Part

#### Admin
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/admins/create-admin (POST)

#### My Profile
* Route:  https://cow-hut-admin-ruby.vercel.app/api/v1/users/my-profile (GET)