import { CardWrapper } from "~/app/auth/_components/card-wrapper";
import { SignInForm } from "~/app/auth/_components/sign-in-form";

export default function SignInPage() {
  return (
    <main>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="No account?"
        backButtonLinkLabel="Sign up"
        backButtonHref="/auth/signup"
        showSocial
        showCredentials
      >
        <SignInForm />
      </CardWrapper>
    </main>
  );
}
