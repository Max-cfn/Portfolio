import { getRequestConfig } from "next-intl/server";
import { defaultLocale, getMessages, locales, type Locale } from "@/lib/i18n";

export default getRequestConfig(async ({ locale }) => {
  const matched = locale as Locale | undefined;
  const resolved = matched && locales.includes(matched) ? matched : defaultLocale;

  return {
    locale: resolved,
    messages: await getMessages(resolved)
  };
});