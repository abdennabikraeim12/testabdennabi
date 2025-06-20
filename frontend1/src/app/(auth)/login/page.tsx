import { LoginForm } from "@/app/components/auth/LoginForm";
import { Card } from "@/app/components/ui/card";


export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-6 text-2xl font-bold">Connexion</h1>
        <LoginForm />
      </Card>
    </div>
  )
}