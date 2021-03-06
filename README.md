# Readdit

## MVPs (in order of completion)
1. Subreaddit CR UD
2. Post CR UD
3. Comments on Posts
4. Upvote / Downvote -> Karma
5. Following subreaddits
6. Nested Comments

### Strech Goals
1. Comment Karma
2. Subreaddit moderators
3. Saved Posts
4. Users

---
## Database Design

![alt text](Updated-Database-Schema.png "Database")
---

## Wireframes

Home:
https://wireframe.cc/KOzRBB

Create a Post(text):
https://wireframe.cc/XwkLbm

Create a Post(image):
https://wireframe.cc/jiyxth

View an Image Post:
https://wireframe.cc/vzCC6y

View a Text Post:
https://wireframe.cc/wEpFRi

## Routes
---
### Backend
---
### User
| Route                          | Methods                 | Purpose |
| ------------------------------ | ------------------------| ------- |
| /api/register                  | POST                    | User account creation |
| /api/user/:id                  | GET, PUT, DELETE        | Get, edit, or delete User account information |
| /api/user/:id/post             | GET                     | Get posts associated with the User |
| /api/user/:id/comments         | GET                     | Get comments associated with the User |

/api/user/:id/subreaddit/:subreadditId - post/delete

### Subreaddit
| Route                                | Methods                 | Purpose |
| -----------------------------------  | ------------------------| ------- |
| /api/subreaddit/create                | POST                    | creating subreaddits |
| /api/subreaddit/:subreadditId          | GET, PUT, DELETE        | subreaddit retrieval. edit / delete if owner |
| /api/subreaddits/:subreadditId/post/   | GET                     | what was this for again? |
| /api/post/:postId                    | GET, POST, PUT, DELETE  | CRUD Posts |
| /api/post/:postId/karma/             | GET, POST               | Upvote and downvote |

---
### Frontend
---
| Route                                | Methods                 | Purpose |
| -----------------------------------  | ------------------------| ------- |
| /                                    | GET                     | display top posts from subreaddits you follow |
| /login                               | POST                    | Login Functionality |
| /register                            | POST                    | User creation form |
| /r/:subreaddit                        | GET                     | Subreaddit view page |
| /r/:subreaddit/posts/:postId          | GET                     | Viewing a post within a subreaddit |
| /subreaddits/create                   | GET, POST               | Form for creating a subreaddit |
| /posts/create                        | GET, POST               | Form for creating a post |
| /u/user/:user                        | GET, PUT, DELETE        | User profile page |
| /u/user/:user/comments               | GET                     | User comments |
