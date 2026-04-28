import express from "express";
import bodyParser from "body-parser";

const port=3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const myPosts=[];
//home pag
app.get("/" ,(req,res)=>{
    res.render("index.ejs");
});
//where the post is shown after pressing the "submit" button.
app.post("/submit", (req,res)=>{
  const title= req.body["title-post"];
  const post= req.body["personPost"];

  myPosts.push({
    // id: Date.now(),
    postTitle: title,
    actualPost:post,
  });

  res.render("submit.ejs",{
    postTitle: title,
    actualPost:post,
  });
});
//where the user will be taken if he want... ugh, thats why it wasn't working
// Cause i completely forgot to create the new-post.ejs.

app.post("/new-post", (req,res)=>{
  
  const title= req.body["title-post2"];
  const post= req.body["post2"];

  myPosts.push({
  // id: Date.now(),
  postTitle: title,
  actualPost:post,
  });
  res.render("submit.ejs",{
  postTitle: title,
  actualPost:post,
  });
});

///////////////////////////////////////////////////////
app.get("/my-posts", (req,res)=>{
  res.render("my-posts.ejs",{
    posts: myPosts,
  });
});
/////////////////////////////////////////////////////////
app.post("/delete-posts", (req,res)=>{
  const indexToDelete= req.body.indexToDelete;
  const updatedPost=[];

  for (let i=0; i<myPosts.length; i++){
    if(i != indexToDelete){
      updatedPost.push(myPosts[i]);
    }
  }
  myPosts.length=0

  for(let i=0; i<updatedPost.length;i++){
    myPosts.push(updatedPost[i]);
  }
  res.render("my-posts.ejs",{
    posts: myPosts,
  });
});

/////////////////////////////////////////////////////////

app.post("/update-post", (req, res)=>{
  const indexToUpdate= req.body.indexToUpdate;

  res.render("update-post.ejs",{
    indexToUpdate: indexToUpdate,
    post: myPosts[indexToUpdate],
    // posts: myPosts,
  });
});
/////////////////////////////////////////////////////////

app.post("/updateD-post", (req,res)=>{
  const indexToUpdate= req.body.indexToUpdate;
  const newTitle=req.body.updatedTitle;
  const newPost= req.body.updatedText;

  myPosts[indexToUpdate].postTitle=newTitle;
  myPosts[indexToUpdate].actualPost=newPost;

  res.render("my-posts.ejs",{
    posts: myPosts,
  });

});
/////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});