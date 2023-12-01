import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <section className="w-full px-6 lg:px-12 py-10">
      <div className="border-b-2 pb-8 flex flex-col items-center justify-between space-y-4 text-center lg:flex-row lg:text-left lg:grid-cols-3 lg:gap-12">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
          Get recipes straight to your inbox!
        </h2>
        <div className="w-full max-w-md space-y-2">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1 h-11 px-4 bg-white dark:bg-gray-800"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="pt-8 grid gap-6 lg:grid-cols-3 lg:gap-12">
        <div className="flex flex-col items-center space-y-2 lg:items-start">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
            Perla's Kitchen
          </h3>
          <div className="flex space-x-2">
            <Button size="icon" variant="outline">
              <Facebook className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="outline">
              <Instagram className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="outline">
              <Twitter className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="outline">
              <Youtube className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <Link className="underline transition-colors hover:text-primary" href="#">
            About
          </Link>
          <Link className="underline transition-colors hover:text-primary" href="#">
            Contact
          </Link>
          <Link className="underline transition-colors hover:text-primary" href="#">
            Privacy Policy
          </Link>
          <Link className="underline transition-colors hover:text-primary" href="#">
            Terms & Conditions
          </Link>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <Link className="underline transition-colors hover:text-primary" href="#">
            About
          </Link>
          <Link className="underline transition-colors hover:text-primary" href="#">
            Contact
          </Link>
          <Link className="underline transition-colors hover:text-primary" href="#">
            Privacy Policy
          </Link>
          <Link className="underline transition-colors hover:text-primary" href="#">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </section>
  );
}
