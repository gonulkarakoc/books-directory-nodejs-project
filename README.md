# Books Directory

Books Directory made with Node.js express library

**Version**: 0.0.0.1\
**Constituent**: Gönül Cesur Karakoç <gonul.karakoc@naylalabs.com>\
**Email**: gonul.karakoc@naylalabs.com

What you can do with this project?

### Books
- Create a books list.
- List the books.
- Update books' information.
- Remove the book from books directory.
- Sort books' information by published date
- Get the number of books of author
- Get published books between defined years

### Users
- Create an users list.
- List the users.
- Get user and books information received by user
- Update users' information.
- Remove the user from user list.

#### Dependencies
- **Node.js** (v16.13.0+)
- **npm** (v8.1.0)
- **body-parser** (v1.19.1)
- **cookie-parser** (v1.4.6)
- **express** (v4.17.2)
- **mongoose** (v6.1.6)
- **mongoose-type-email** (v1.1.2)
- **morgan** (v1.10.0)
- **pug** (v3.0.2)
- **express-validator** (v6.14.0)
- **"bcryptjs** (v2.4.3)
- **jsonwebtoken** (v8.5.1)

#### Postman Document
Books -> https://documenter.getpostman.com/view/19000513/UVXjJb9S
Users -> https://documenter.getpostman.com/view/19000513/UVXonEKa

### Install & Run

```bash
# We download the repo.
git clone https://github.com/gonulkarakoc/books-directory-nodejs-project
cd books-directory-nodejs-project/

# We install dependencies packages.
# We start the application.
# http://127.0.0.1:3000/
nodemon app.js
```


