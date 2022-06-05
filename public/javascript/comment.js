const submitComment = document.getElementById("");
const text = document.getElementById("Vent_Post");

var postComment= document.getElementById("Comment");
post.addEventListener("click", function(){
    var commentText= document.getElementById("comment-box").value;
    var ul = document.createElement("ul")
    var li = document.createElement("li");
    var text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("unordered").appendChild(li);
 

});
// Comment Request
const handleCommentSubmit = async (event) => {
  event.preventDefault();
  const text = document.getElementById("Vent_Post").value.trim();

  // getting post id from the window url
  const postId =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  if (text.length === 0) {
    window.
    return
  }
  const response = await fetch("/api/comments", {
    method: "post",
    body: JSON.stringify({
      text: text,
      post: postId,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(window.location.href);
  }
};
