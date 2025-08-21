import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Loader from '../../common/Loader/Loader';
import './LoginForm.css';

const LoginForm = ({ onToggleForm }) => {
  const { login, isLoading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-form">
      <h2>Sign in to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        
        {error && <div className="form-error">{error.message}</div>}
        
        <Button 
          type="submit" 
          variant="primary" 
          size="large" 
          loading={isLoading}
          className="login-button"
        >
          Sign In
        </Button>
      </form>
      
      <div className="form-footer">
        <p>
          Don't have an account?{' '}
          <button type="button" onClick={onToggleForm} className="form-link">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;