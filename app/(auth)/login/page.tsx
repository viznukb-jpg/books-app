import { AuthContainer } from "@/features/auth/components/AuthContainer";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthContainer
      title="Login"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkHref="/register"
    >
      <LoginForm />
    </AuthContainer>
  );
}
