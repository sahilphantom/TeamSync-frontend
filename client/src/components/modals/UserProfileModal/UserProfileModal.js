import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../hooks/useAuth';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Avatar from '../../common/Avatar/Avatar';
import './UserProfileModal.css';

const UserProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile, isLoading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: user?.username || '',
      bio: user?.bio || '',
      status: user?.status || 'online'
    }
  });

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      onClose();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Your Profile" size="medium">
      <div className="user-profile-modal">
        <div className="profile-avatar-section">
          <Avatar 
            src={user?.avatar} 
            username={user?.username} 
            size="xlarge" 
            status={user?.status}
          />
          <Button variant="secondary" size="small">
            Change Avatar
          </Button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
          <Input
            label="Username"
            {...register('username', { 
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters'
              },
              maxLength: {
                value: 20,
                message: 'Username must be less than 20 characters'
              }
            })}
            error={errors.username?.message}
            disabled={isLoading}
          />
          
          <Input
            label="Bio"
            as="textarea"
            rows={3}
            {...register('bio', {
              maxLength: {
                value: 160,
                message: 'Bio must be less than 160 characters'
              }
            })}
            error={errors.bio?.message}
            disabled={isLoading}
          />
          
          <div className="form-group">
            <label>Status</label>
            <select {...register('status')} disabled={isLoading}>
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          
          <div className="modal-actions">
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserProfileModal;