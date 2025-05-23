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

export default function Signup() {
  return (
    <div className="md:w-96">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          {/*<CardDescription>
            Enter your email and password below to create your account
          </CardDescription>*/}
        </CardHeader>
        <CardContent>
          <AuthForm submit_text="Signup with Email" auth_flow="signup" />
        </CardContent>
        <CardFooter>
          <div className="flex flex-col">
            <div className="text-center text-sm text-gray-500">
              Déjà membre ?{' '}
              <Link href="/auth/login" className="leading-7 text-indigo-600 hover:text-indigo-500">
                Connectez-vous ici.
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
