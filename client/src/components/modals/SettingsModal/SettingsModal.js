import React, { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const { user, updateNotificationPreferences, isLoading } = useAuth();
  const [preferences, setPreferences] = useState(user?.notificationPreferences || {
    email: true,
    push: true,
    desktop: true,
    mentions: true,
    directMessages: true
  });

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    try {
      await updateNotificationPreferences(preferences);
      onClose();
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="medium">
      <div className="settings-modal">
        <div className="settings-section">
          <h3>Notification Preferences</h3>
          
          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.email}
                onChange={() => handlePreferenceChange('email')}
              />
              <span className="preference-text">Email Notifications</span>
            </label>
            <p className="preference-description">Receive notifications via email</p>
          </div>

          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.push}
                onChange={() => handlePreferenceChange('push')}
              />
              <span className="preference-text">Push Notifications</span>
            </label>
            <p className="preference-description">Receive browser push notifications</p>
          </div>

          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.desktop}
                onChange={() => handlePreferenceChange('desktop')}
              />
              <span className="preference-text">Desktop Notifications</span>
            </label>
            <p className="preference-description">Show desktop notifications</p>
          </div>

          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.mentions}
                onChange={() => handlePreferenceChange('mentions')}
              />
              <span className="preference-text">Mention Notifications</span>
            </label>
            <p className="preference-description">Notify when you're mentioned</p>
          </div>

          <div className="preference-item">
            <label className="preference-label">
              <input
                type="checkbox"
                checked={preferences.directMessages}
                onChange={() => handlePreferenceChange('directMessages')}
              />
              <span className="preference-text">Direct Message Notifications</span>
            </label>
            <p className="preference-description">Notify for direct messages</p>
          </div>
        </div>

        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="preference-item">
            <label className="preference-label">
              <span className="preference-text">Theme</span>
              <select defaultValue="light">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </label>
          </div>
        </div>

        <div className="modal-actions">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} loading={isLoading}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;