import { CardWrapper } from "~/app/auth/_components/card-wrapper";
import { SignUpForm } from "~/app/auth/_components/sign-up-form";

export default function SignUpPage() {
  return (
    <main>
      <CardWrapper
        headerLabel="Create your account"
        backButtonLabel="Have an account?"
        backButtonLinkLabel="Sign in"
        backButtonHref="/auth/signin"
        showSocial
        showCredentials
      >
        <SignUpForm />
      </CardWrapper>
    </main>
  );
}
