import LoginHero from "../components/LoginHero";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FAF7FF] p-6">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-[36px] bg-white shadow-2xl lg:grid-cols-2">
        <LoginHero />
        <LoginForm />
      </div>
    </main>
  );
}

export default LoginPage;