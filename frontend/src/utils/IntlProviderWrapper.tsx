import React from 'react';
import { IntlProvider } from 'react-intl';

const IntlProviderWrapper: React.FC<{ locale: string, messages: any }> = ({ locale, messages, children }) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default IntlProviderWrapper;
