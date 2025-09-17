import type en from '../locales/en.json';
import type fr from '../locales/fr.json';

type Messages = typeof fr & typeof en;

declare global {
  interface IntlMessages extends Messages {}
}

export {};

