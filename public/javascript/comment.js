const submitComment = document.getElementById("");
const text = document.getElementById("");


// Comment Request
const handleCommentSubmit = async (event) => {
  event.preventDefault();
  const text = document.getElementById("").value.trim();

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
