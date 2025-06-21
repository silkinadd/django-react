import React, { useState } from 'react';
import PostForm from './PostForm';

const PostCard = ({ post, currentUser, onEdit, onDelete, onUpdate, isEditing }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  
  const isAuthor = post.author_id === currentUser.id;
  const contentPreview = post.content.length > 200 
    ? post.content.substring(0, 200) + '...' 
    : post.content;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleUpdate = async (postData) => {
    const result = await onUpdate(post.id, postData);
    return result;
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div>
          <h3 className="post-title">{post.title}</h3>
          <div className="post-meta">
            Автор: {post.author} | {formatDate(post.created_at)}
            {post.updated_at !== post.created_at && (
              <span> (изменен {formatDate(post.updated_at)})</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="post-content">
        {showFullContent || post.content.length <= 200 ? (
          <p>{post.content}</p>
        ) : (
          <p>{contentPreview}</p>
        )}
        
        {post.content.length > 200 && (
          <button 
            className="link-btn"
            onClick={() => setShowFullContent(!showFullContent)}
          >
            {showFullContent ? 'Свернуть' : 'Читать далее'}
          </button>
        )}
      </div>
      
      {isAuthor && (
        <div className="post-actions">
          <button 
            className="btn btn-warning btn-small"
            onClick={() => onEdit(post)}
          >
            Редактировать
          </button>
          <button 
            className="btn btn-danger btn-small"
            onClick={() => onDelete(post.id)}
          >
            Удалить
          </button>
        </div>
      )}
      
      {isEditing && (
        <div className="edit-form">
          <h4>Редактирование поста</h4>
          <PostForm 
            post={post}
            onSubmit={handleUpdate}
            onCancel={() => onEdit(null)}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard; 