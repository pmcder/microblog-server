# overview

This is a micro blogging site I am working on. I recently completed a server side web dev class. My GitHub jobs search project was the final project for that class.
This is something I have been working on to deepen my understanding of express and MongoDB.

I am currently working on getting the replies fully working on the front end in Vue.js. Then, I will come
back here and build user notifications and secure the replies API. 

My thinking on the notifications is to create one for the user when a post of theirs is replied to. At login, the user page on the front will call a notifications API and display unread notifications. 

## some things I've learned with this project

I had initially wanted to have replies as a subcollection of posts. I like the idea of posts holding their own replies. 
After reading the [MongoDB documentation on one-to-may relationships ](https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/) I ended up implemething the relationship by having the replies hold a reference to their postId. 





