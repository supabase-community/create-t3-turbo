import { Card, CardContent, CardFooter, CardHeader } from "@acme/ui/card";

import { BackButton } from "~/app/auth/_components/back-button";
import { Header } from "~/app/auth/_components/header";
import { Social } from "~/app/auth/_components/social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonLinkLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showCredentials?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonLinkLabel,
  backButtonHref,
  showSocial,
  showCredentials,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] p-4 shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      {showCredentials && (
        <>
          <div className="flex items-center justify-center px-6 pb-4 pt-0">
            <div className="flex-grow border-t border-muted-foreground" />
            <span className="px-3 text-muted-foreground">or</span>
            <div className="flex-grow border-t border-muted-foreground" />
          </div>
          <CardContent>{children}</CardContent>
        </>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          linkLabel={backButtonLinkLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
