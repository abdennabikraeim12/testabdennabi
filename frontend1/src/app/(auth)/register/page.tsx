import { RegisterForm } from "@/app/components/auth/RegisterForm";
import { Card } from "@/app/components/ui/card";


export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-6 text-2xl font-bold">Inscription</h1>
        <RegisterForm />
      </Card>
    </div>
  )
}