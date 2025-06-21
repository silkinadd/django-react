import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { postsAPI } from '../services/api';
import PostForm from './PostForm';
import PostCard from './PostCard';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAllPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Ошибка получения постов:', error);
      setError('Ошибка при загрузке постов');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      const response = await postsAPI.createPost(postData);
      setPosts([response.data, ...posts]);
      setShowForm(false);
      return { success: true };
    } catch (error) {
      console.error('Ошибка создания поста:', error);
      return { 
        success: false, 
        error: error.response?.data || 'Ошибка при создании поста' 
      };
    }
  };

  const handleUpdatePost = async (postId, postData) => {
    try {
      const response = await postsAPI.updatePost(postId, postData);
      setPosts(posts.map(post => 
        post.id === postId ? response.data : post
      ));
      setEditingPost(null);
      return { success: true };
    } catch (error) {
      console.error('Ошибка обновления поста:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Ошибка при обновлении поста' 
      };
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      return;
    }

    try {
      await postsAPI.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Ошибка удаления поста:', error);
      setError('Ошибка при удалении поста');
    }
  };

  const userPosts = posts.filter(post => post.author_id === user.id);

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo">Мой Блог</div>
          <div className="user-info">
            <span>Добро пожаловать, {user.username}!</span>
            <button 
              className="btn btn-secondary btn-small"
              onClick={logout}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="posts-container">
          <div className="post-form">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Мои посты ({userPosts.length})</h2>
              <button 
                className="btn btn-success"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Отменить' : 'Добавить пост'}
              </button>
            </div>
            
            {showForm && (
              <PostForm 
                onSubmit={handleCreatePost}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>

          {error && <div className="error">{error}</div>}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              Загрузка постов...
            </div>
          ) : (
            <>
              <h3>Все посты</h3>
              {posts.length === 0 ? (
                <div className="no-posts">
                  Пока нет ни одного поста. Создайте первый!
                </div>
              ) : (
                posts.map(post => (
                  <PostCard 
                    key={post.id}
                    post={post}
                    currentUser={user}
                    onEdit={setEditingPost}
                    onDelete={handleDeletePost}
                    onUpdate={handleUpdatePost}
                    isEditing={editingPost?.id === post.id}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 