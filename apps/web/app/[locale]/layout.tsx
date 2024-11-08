import { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { Metadata } from "next";

import { EmailValidationModal } from "@/components/Auth/EmailValidationModal";
import { Shell } from "@/components/Layout/Shell";
import { I18nProviderClient } from "@/locales/client";
import { theme } from "@/theme";

import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/dropzone/styles.layer.css";
import "@mantine/notifications/styles.layer.css";
import "@mantine/charts/styles.layer.css";

export const metadata: Metadata = {
  title: {
    default: "Visual Dynamics",
    template: "%s | Visual Dynamics",
  },
  description: "A portal to MD Simulations and Malaria studies.",
};

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<Props>) {
  const { locale } = await params;

  return (
    <html lang={locale} data-mantine-color-scheme="dark">
      <body>
        <I18nProviderClient locale={locale}>
          <MantineProvider forceColorScheme="dark" theme={theme}>
            <DatesProvider
              settings={{
                firstDayOfWeek: 0,
                locale,
              }}
            >
              <Notifications position="top-right" />
              <Shell>
                {children}
                <EmailValidationModal />
              </Shell>
            </DatesProvider>
          </MantineProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
