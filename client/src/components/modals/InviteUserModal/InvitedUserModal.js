import React, { useState } from 'react';
import { useWorkspaces } from '../../../../hooks/useWorkspaces';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './InviteUserModal.css';

const InviteUserModal = ({ workspace, isOpen, onClose }) => {
  const { inviteUser, isLoading } = useWorkspaces();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await inviteUser(workspace._id, email);
      setSuccess(`Invitation sent to ${email}`);
      setEmail('');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.message || 'Failed to send invitation');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite to Workspace" size="small">
      <form onSubmit={handleSubmit} className="invite-user-form">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          error={error}
          disabled={isLoading}
        />
        
        {success && <div className="success-message">{success}</div>}
        
        <div className="modal-actions">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isLoading}>
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteUserModal;