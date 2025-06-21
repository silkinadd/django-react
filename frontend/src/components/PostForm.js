import React, { useState, useEffect } from 'react';

const PostForm = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await onSubmit(formData);
    
    if (result.success) {
      setFormData({ title: '', content: '' });
    } else {
      if (typeof result.error === 'object') {
        const errors = Object.values(result.error).flat();
        setError(errors.join(', '));
      } else {
        setError(result.error);
      }
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="title">Заголовок:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Введите заголовок поста"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Содержание:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          placeholder="Введите содержание поста"
          rows="6"
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Сохранение...' : (post ? 'Обновить' : 'Создать')}
        </button>
        
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Отменить
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PostForm; 