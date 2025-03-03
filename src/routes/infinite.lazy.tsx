// App.tsx
import React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { InfiniteDataFetcher } from '@k4l3b4/query-adapters';

export const Route = createLazyFileRoute('/infinite')({
    component: App,
})

function App() {
    return (
        <div>
            <h1>Infinite Posts</h1>
            <InfiniteDataFetcher<{
                posts: {
                    id: number, title: string, body: string, tags: string[],
                    reactions: { likes: number, dislikes: number }, views: number
                }[],
                skip: number,
                limit: number,
                total: number,
            }, unknown>
                queryKey={['posts']}
                url={`https://dummyjson.com/posts`}
                queryParams={(pageParam) => ({ limit: 5, skip: pageParam, sort: 'createdAt', order: 'desc' })}
                options={{
                    getNextPageParam: (lastPage) => {
                        const { skip, limit, total } = lastPage;
                        const nextSkip = skip + limit;
                        return nextSkip < total ? nextSkip : undefined;
                    },
                    initialPageParam: 0,
                }}
                enableManualFetch
            >
                {({ data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage }) => (
                    <div>
                        {data?.map((page, pageIndex) => (
                            <React.Fragment key={pageIndex}>
                                {page?.posts.map((post) => (
                                    <div key={post.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                                        <h2>{post.title}</h2>
                                        <p>{post.body}</p>
                                        <div>
                                            <strong>Tags:</strong> {post.tags.join(', ')}
                                        </div>
                                        <div>
                                            <strong>Reactions:</strong> 👍 {post.reactions.likes} 👎 {post.reactions.dislikes}
                                        </div>
                                        <div>
                                            <strong>Views:</strong> {post.views}
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}

                        {isLoading && <p>Loading...</p>}

                        {isFetchingNextPage && <p>Loading more posts...</p>}

                        {hasNextPage && (
                            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                                {isFetchingNextPage ? 'Loading...' : 'Load More'}
                            </button>
                        )}

                        {!isLoading && !hasNextPage && <p>No more posts to load.</p>}
                    </div>
                )}
            </InfiniteDataFetcher>
        </div>
    );
}

export default App;