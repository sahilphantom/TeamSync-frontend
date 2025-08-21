import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChannels } from '../../../../hooks/useChannels';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './CreateChannelModal.css';

const CreateChannelModal = ({ workspace, isOpen, onClose }) => {
  const { addChannel, isLoading } = useChannels();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isPrivate, setIsPrivate] = useState(false);

  const onSubmit = async (data) => {
    try {
      await addChannel(workspace._id, {
        ...data,
        isPrivate
      });
      onClose();
    } catch (error) {
      console.error('Failed to create channel:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a Channel" size="medium">
      <form onSubmit={handleSubmit(onSubmit)} className="create-channel-form">
        <Input
          label="Channel Name"
          {...register('name', { 
            required: 'Channel name is required',
            pattern: {
              value: /^[a-z0-9_-]+$/,
              message: 'Channel name can only contain lowercase letters, numbers, hyphens, and underscores'
            },
            maxLength: {
              value: 50,
              message: 'Channel name must be less than 50 characters'
            }
          })}
          error={errors.name?.message}
          disabled={isLoading}
        />
        
        <Input
          label="Description (Optional)"
          {...register('description', {
            maxLength: {
              value: 200,
              message: 'Description must be less than 200 characters'
            }
          })}
          error={errors.description?.message}
          disabled={isLoading}
        />
        
        <div className="channel-privacy">
          <label className="privacy-toggle">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span className="privacy-label">
              {isPrivate ? 'Private channel' : 'Public channel'}
            </span>
          </label>
          <p className="privacy-description">
            {isPrivate
              ? 'Only invited members can access this channel'
              : 'Everyone in the workspace can access this channel'
            }
          </p>
        </div>
        
        <div className="modal-actions">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isLoading}>
            Create Channel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;