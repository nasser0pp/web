
import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { UI_TEXTS } from '../../constants';

interface InquiryFormProps {
  recipientName: string; 
  onSubmit: (formData: { name: string; email: string; phone?: string; message: string }) => Promise<void>;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ recipientName, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, language, tp } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit({ name, email, phone, message });
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t({en: "An unknown error occurred.", ar: "حدث خطأ غير معروف."}));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Parameterized translation for title
  const inquiryFormTitleParams = { name: recipientName };
  const inquiryFormTitleTranslations = {
    en: (params: { name: string }) => `Send an Inquiry to ${params.name}`,
    ar: (params: { name: string }) => `إرسال استفسار إلى ${params.name}`
  };


  if (isSubmitted) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-md text-center">
        <h3 className="text-lg font-semibold text-green-700">{t(UI_TEXTS.inquirySent)}</h3>
        <p className="text-green-600 mt-2">
          {tp({
            en: params => `Your message has been successfully sent to ${params.name}. They will get back to you soon.`,
            ar: params => `تم إرسال رسالتك بنجاح إلى ${params.name}. سوف يرد عليك قريبا.`
           }, { name: recipientName })}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-50 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-text-primary mb-3">
        {tp(inquiryFormTitleTranslations, inquiryFormTitleParams)}
      </h3>
      <Input
        label={t(UI_TEXTS.yourName)}
        id="inquiry-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder={t({en: "e.g. Abdullah Said", ar: "مثال: عبدالله سعيد"})}
      />
      <Input
        label={t(UI_TEXTS.yourEmail)}
        id="inquiry-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="you@example.com"
      />
      <Input
        label={t(UI_TEXTS.yourPhoneOptional)}
        id="inquiry-phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+968 XXXXXXXX"
      />
      <div>
        <label htmlFor="inquiry-message" className="block text-sm font-medium text-gray-700 mb-1">
          {t(UI_TEXTS.yourMessage)}
        </label>
        <textarea
          id="inquiry-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder={tp({
            en: params => `Briefly describe your legal need or question for ${params.name}...`,
            ar: params => `صف بإيجاز حاجتك القانونية أو سؤالك لـ ${params.name}...`
          }, { name: recipientName })}
          className="form-textarea block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
        {isLoading ? t(UI_TEXTS.sending) : t(UI_TEXTS.sendInquiry)}
      </Button>
    </form>
  );
};

export default InquiryForm;