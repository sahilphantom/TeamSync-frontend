import React from 'react';
import { useForm } from 'react-hook-form';
import { useWorkspaces } from '../../../../hooks/useWorkspaces';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './CreateWorkspaceModal.css';

const CreateWorkspaceModal = ({ isOpen, onClose }) => {
  const { addWorkspace, isLoading } = useWorkspaces();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await addWorkspace(data);
      onClose();
    } catch (error) {
      console.error('Failed to create workspace:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a Workspace" size="medium">
      <form onSubmit={handleSubmit(onSubmit)} className="create-workspace-form">
        <Input
          label="Workspace Name"
          {...register('name', { 
            required: 'Workspace name is required',
            maxLength: {
              value: 50,
              message: 'Workspace name must be less than 50 characters'
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
        
        <div className="modal-actions">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isLoading}>
            Create Workspace
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateWorkspaceModal;