import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CommentsSection = ({ wallpaperId }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock comments data
  const [comments, setComments] = useState([
    {
      id: "comment_001",
      user: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        isVerified: false
      },
      content: "Absolutely stunning! This is now my desktop wallpaper. The colors are so vibrant and the composition is perfect.",
      timestamp: "2024-01-20T10:30:00Z",
      likes: 12,
      isLiked: false
    },
    {
      id: "comment_002",
      user: {
        name: "Mike Chen",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        isVerified: true
      },
      content: "Great shot! What camera settings did you use for this? The depth of field is amazing.",
      timestamp: "2024-01-19T15:45:00Z",
      likes: 8,
      isLiked: true
    },
    {
      id: "comment_003",
      user: {
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        isVerified: false
      },
      content: "This reminds me of my trip to the Alps last summer. Beautiful work! 🏔️",
      timestamp: "2024-01-18T09:20:00Z",
      likes: 5,
      isLiked: false
    }
  ]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const comment = {
      id: `comment_${Date.now()}`,
      user: {
        name: "You",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        isVerified: false
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - commentTime) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Comments ({comments.length})
        </h2>
      </div>
      
      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <Image
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-text-muted">
                {newComment.length}/500 characters
              </span>
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="btn btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </div>
                ) : (
                  'Post Comment'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {comment.user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={10} className="text-white" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="bg-secondary-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-text-primary text-sm">
                    {comment.user.name}
                  </h4>
                  <span className="text-xs text-text-muted">
                    {formatTimeAgo(comment.timestamp)}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-2 ml-3">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center space-x-1 text-xs transition-colors duration-150 ${
                    comment.isLiked 
                      ? 'text-primary' :'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  <Icon 
                    name="ThumbsUp" 
                    size={14} 
                    className={comment.isLiked ? 'fill-current' : ''} 
                  />
                  <span>{comment.likes}</span>
                </button>
                
                <button className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-150">
                  Reply
                </button>
                
                <button className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-150">
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load more comments */}
      {comments.length > 0 && (
        <div className="text-center mt-8">
          <button className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150">
            Load More Comments
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;