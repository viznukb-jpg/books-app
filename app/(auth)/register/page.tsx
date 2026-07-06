import { AuthContainer } from "@/features/auth/ui/AuthContainer";
import { RegisterForm } from "@/features/auth/ui/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthContainer
      title="Register"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthContainer>
  );
}
