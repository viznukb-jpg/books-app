import { AuthContainer } from "@/features/auth/ui/AuthContainer";
import { LoginForm } from "@/features/auth/ui/LoginForm";

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
