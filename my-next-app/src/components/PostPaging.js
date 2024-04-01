"use client";
// save as components/PostsPaging.jsx
import {useRouter, usePathname, useSearchParams} from "next/navigation";

// Client component allowing user to choose the number of posts displayed
// and set new value in search params
export default function PostsPaging({defaultPage}) {
    const searchParams = useSearchParams(); // next.js hook for search params
    const router = useRouter(); // next.js hook for client side navigation
    const pathname = usePathname(); // next.js hook for current URL path

    const page = parseInt(searchParams.has("page") ? searchParams.get("page") : defaultPage);
    const limit = parseInt(searchParams.has("limit") ? searchParams.get("limit") : 5);

    const handleChangePage = (newPage) => {
        let pageParam = "page=" + newPage;

        // also need to remember the limit value if it existed
        let limitParam = "limit=" + limit;

        // change the route to the existing path plus the new search param plus any limit params
        router.replace(pathname + "?" + pageParam + "&" + limitParam);
    };
    
    // instead of a drop-down, since we don't know how many pages there will be, make it a button
    return (
        <label className="PostsPaging">
            {page > 1 ? <button onClick={() => handleChangePage(page - 1)}>Previous Page</button> : null}
            {page * limit < 100 ? <button onClick={() => handleChangePage(page + 1)}>Next Page</button> : null }
        </label>
    );
}