import React, {Component} from 'react';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from "react-intl/locale-data/en";
import nl from 'react-intl/locale-data/nl';
import localeData from './../../../build/locales/reactIntlMessages.json';

export class HotSwappingIntlProvider extends Component {
  constructor(props) {
    super(props);
    const {initialLocale: locale, initialMessages: messages} = props;
    this.state = {locale, messages};
    addLocaleData([...en, ...nl]);
    HotSwappingIntlProvider.updateLang = HotSwappingIntlProvider.updateLang.bind(this);
  }

  static updateLang(lang){
    this.setState({locale: lang, messages: localeData[lang] || localeData.en})
  }

  render() {
    return (
      <IntlProvider {...this.state}>
        {this.props.children}
      </IntlProvider>
    );
  }
}
