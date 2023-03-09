import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider, useSession } from "next-auth/react";
import { SWRConfig } from "swr";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

function HandleSession() {
  const { data: session, status } = useSession();
  console.log("session", session, status);
  const path = usePathname();
  const router = useRouter();
  if (path !== "/login" && status === "unauthenticated") {
    router.push("/login");
  }
  // console.log(path)
  return <></>;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // @ts-ignore
  const LayoutParent = Component.layout || (({ children }) => <>{children}</>);
  // const ComponentWithLayout = <LayoutParent {...pageProps}> ;
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionProvider session={session}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <HandleSession />
          <LayoutParent>
            <Component {...pageProps} />
          </LayoutParent>
        </GoogleOAuthProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
