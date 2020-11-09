import { Flex, IconButton } from '@chakra-ui/core';
import React, { useState } from 'react'
import { PostSnippetFragment, PostsQuery, useVoteMutation } from '../generated/graphql';

interface UpvoteSectionProps {
    post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
    
    const [loadingState, setLoadingState] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>('not-loading');
    const [,vote] = useVoteMutation();
    
    return (
        <Flex direction="column" justifyContent="center" alignItems="center" mr={6}>
            <IconButton 
                onClick={async () => {
                    
                    if (post.voteStatus === 1) {
                        return;
                    }
                    
                    setLoadingState('upvote-loading')
                    await vote({
                        postId: post.id,
                        value: 1
                    });
                    setLoadingState('not-loading')
                }}
                mb="2"
                isLoading={ loadingState === 'upvote-loading' }
                aria-label="upvote"
                icon="arrow-up"
                variantColor={post.voteStatus === 1 ? "green" : undefined}
                size="lg"
            />

			<b>{post.points}</b>
			
            <IconButton
                onClick={async() => {
                    
                    if (post.voteStatus === -1) {
                        return;
                    }
                    
                    setLoadingState('downvote-loading')
                    await vote({
                        postId: post.id,
                        value: -1
                    });
                    setLoadingState('not-loading')
                }}
                
                mt="2"
                isLoading={ loadingState === 'downvote-loading' }
                aria-label="downvote"
                icon="arrow-down"
                variantColor={post.voteStatus === -1 ? "red" : undefined}
                size="lg"
            />
		</Flex>
    );
}