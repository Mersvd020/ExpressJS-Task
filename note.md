//packages


npm i express nodemon dotenv jsonwebtoken bcrypt express-validator multer


## for database :

//prisma
npm i prisma@7.10.0 @prisma/client@7.10.0 @prisma/adapter-better-sqlite3

npx  prisma init --datasource-provider sqlite --output ../prisma/generated

*1. generate prisma client :*

*project is javascript in sqlite, you must=> open schema.prisma*
generator client {
  provider = "prisma-client-js" <= (add -js)
  output   = "../prisma/generated"
}
*after that*

`npx prisma generate`

model User{
  id String @id @default(uuid())
  userName String
  email String @unique
  password String 
  role  Role @default(user)
  images UserImage[]
  favorites Favorite[]

}

after you write model you must run this order to database add this model :

you must run this order:

`npx prisma migrate dev --name User` *(for adding all model in one order write init rather than name of the model)*

if you change code of prisma you must run this order:
`npx prisma generate`

////all installed ///




-----------------------------

## api structure :

----User-----
main route : /user

get all User :
   method : get,
   role:(admin),
   route : /
   query:search,page=1,limit=5,
   status code : 200 (success) , 404(not found) , 500(server error)

get user with id :
    method : get,
    role:(admin),
    route : /:id ,
    params: id,
    status code : 200 (success) , 404(not found) , 500(server error)  

sign up user :
   method : post,
   role : (no need),
   route: /register,
   body : {
      "userName" : string,
      "password" : string,
      "email" :string@gmail.com
    },
    status code : 201 (created) , 400(bad request),409(conflict) , 500(server error)

login user :
   mothod : post,
   role : (no need),
   route : /login,
   body:{
    "email": string@gmail.com,
    "password" : string
   },
   status code : 200 (success) , 400(bad request),404(not found) , 500(server error)
