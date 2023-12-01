'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GetSubscription } from '@/lib/API/Services/lemon/subscription';

const Billing = ({ subscription_id }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSubscription = async () => {
    const res = await GetSubscription({ subscription_id });
    console.log(res);
    //@ts-ignore, wrong types on lemon.js
    router.push(res.data.attributes.urls.customer_portal);
  };

  return (
    <div className="mt-6">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader>
          <CardTitle>Manage Subscription & Billing</CardTitle>
          <CardDescription>
            Click below to Manage Subscription and Billing, You will be redirected to the Lemon
            Customer Portal, where you will be able to update or cancel subsciptions, update payment
            methods and view past invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSubscription} className="mt-4">
            Go to Portal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
