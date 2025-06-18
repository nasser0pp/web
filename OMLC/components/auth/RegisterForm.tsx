import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { UI_TEXTS } from '../../constants';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUpWithEmailPassword, authError, setAuthError } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAuthError(t(UI_TEXTS.passwordsDoNotMatch));
      return;
    }
    setAuthError(null);
    setIsLoading(true);
    const user = await signUpWithEmailPassword(email, password);
    setIsLoading(false);
    if (user) {
      navigate('/manage-profile'); // Navigate to profile creation after registration
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="register-email"
        label={t(UI_TEXTS.email)}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        id="register-password"
        label={t(UI_TEXTS.password)}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Input
        id="register-confirm-password"
        label={t(UI_TEXTS.confirmPassword)}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      {authError && <p className="text-sm text-red-600">{authError}</p>}
      <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
        {t(UI_TEXTS.register)}
      </Button>
    </form>
  );
};

export default RegisterForm;
