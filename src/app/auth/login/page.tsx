import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card';
import Link from 'next/link';

import AuthForm from '../_PageSections/AuthForm';

export default async function Login() {
  return (
    <div className="md:w-96">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Connexion</CardTitle>
          {/*<CardDescription>Entrez votre email et votre mot de passe pour vous connecter.</CardDescription>*/}
        </CardHeader>
        <CardContent>
          <AuthForm submit_text="Se connecter avec une adresse e-mail" auth_flow="login" />
        </CardContent>

        <CardFooter>
          <div className="flex flex-col">
            <div className="text-center text-sm text-gray-500">
              Pas encore membre ?{' '}
              <Link href="/auth/signup" className="leading-7 text-indigo-600 hover:text-indigo-500">
                Inscrivez-vous maintenant.
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
