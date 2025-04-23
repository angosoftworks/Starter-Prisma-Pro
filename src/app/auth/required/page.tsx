'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const AuthRequired = () => {
  const router = useRouter();

  return (
    <Card className="bg-background-light dark:bg-background-dark">
      <CardHeader>
        <CardTitle>Connexion requise </CardTitle>
        <CardDescription>Connectez-vous pour voir cette page.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" onClick={() => router.push('/auth/login')}>
          Cliquez-ici pour vous connecter
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthRequired;
