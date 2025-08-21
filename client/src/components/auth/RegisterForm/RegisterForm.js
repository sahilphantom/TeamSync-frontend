import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Loader from '../../common/Loader/Loader';
import './RegisterForm.css';

const RegisterForm = ({ onToggleForm }) => {
  const { register: registerUser, isLoading, error } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-form">
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Username can only contain letters, numbers, and underscores'
            }
          })}
          error={errors.username?.message}
          disabled={isLoading}
        />
        
        <Input
          label="Email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email?.message}
          disabled={isLoading}
        />
        
        <Input
          label="Password"
          type="password"
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
          error={errors.password?.message}
          disabled={isLoading}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
        />
        
        {error && <div className="form-error">{error.message}</div>}
        
        <Button 
          type="submit" 
          variant="primary" 
          size="large" 
          loading={isLoading}
          className="register-button"
        >
          Create Account
        </Button>
      </form>
      
      <div className="form-footer">
        <p>
          Already have an account?{' '}
          <button type="button" onClick={onToggleForm} className="form-link">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;