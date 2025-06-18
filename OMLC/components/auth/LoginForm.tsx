import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { UI_TEXTS } from '../../constants';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithEmailPassword, authError, setAuthError } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);
    const user = await signInWithEmailPassword(email, password);
    setIsLoading(false);
    if (user) {
      navigate('/'); // Or to dashboard/profile page
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="login-email"
        label={t(UI_TEXTS.email)}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        id="login-password"
        label={t(UI_TEXTS.password)}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      {authError && <p className="text-sm text-red-600">{authError}</p>}
      <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
        {t(UI_TEXTS.login)}
      </Button>
    </form>
  );
};

export default LoginForm;
