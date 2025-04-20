import { cn } from '@/lib/utils/helpers';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import Image from 'next/image';
import DashPic from '../../../../public/static/images/marketing/placeholderdash.png';

const HeroScreenshot = () => {
  return (
    <div className="hidden lg:grid items-center justify-center mt-2 mx-8">
      <Image
        src={DashPic}
        alt="App screenshot"
        className="mx-auto h-[90%] lg:max-lg:w-[90%]  2xl:max-w-[72rem]"
        width={3840}
        height={75}
      />
    </div>
  );
};

export default async function Hero() {
  return (
    <div>
      <section className="py-8 px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className=" text-3xl md:text-7xl md:max-w-[54rem] ">
            Propulse ton jeu vidéo aux standards AAA.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Assistant IA pour Blueprints Unreal. Analyse, refactor, génération. En un clic.
          </p>
          <div className="space-x-4">
            <Link href="/auth/login" className={cn(buttonVariants({ size: 'lg' }))}>
              Commencer l’analyse
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
            >
              Voir une démo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <HeroScreenshot />
    </div>
  );
}
