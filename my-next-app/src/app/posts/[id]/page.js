import Link from "next/link";
// Save as app/posts/[id]/page.jsx
async function getPostData(id) {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/" + "posts/" + id
  );
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch post #" + id);
  }
  return res.json();
}
// Uses params prop to get value of [id] from path segment
export default async function Post({ params }) {
  // so for /posts/3/, params will be { id:3 }
  const post = await getPostData(params.id);
  const nextId = parseInt(params.id)+1;
  const prevId = parseInt(params.id)-1;

  return (
    <>
      <div className="post">
        {post ? (
          <>
            <h3>
              Post #{post.id}: {post.title}
            </h3>
            <p>{post.body}</p>
          </>
        ) : (
          "Loading ..."
        )}
      </div>
      <div>
      {prevId > 0 ?<Link href= {"/posts/"+prevId} >Prev{"  "}</Link> : null}
      <Link href="/posts">All Posts{"  "}</Link>
      {nextId <=100 ?<Link href= {"/posts/"+nextId} >Next</Link>:null}
      </div>
    </>
  );
}
