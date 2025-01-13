import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { NavigationMenuHeader } from '@/components/layout/NavigationMenuHeader';

const phoneNumber = '+34606466550';

export default function SubscriptionPage() {
  const subscribeMessage = encodeURIComponent(
    'Hello! I would like to subscribe to your monthly meal plan.',
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenuHeader title="Subscription" />
      {/* Hero Section */}
      <section className="relative pt-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Get One Week <span className="text-purple-600">FREE</span> Every Month
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our monthly meal plan and get incredible value: Pay for just 3 weeks and
            enjoy a full month of delicious Lebanese cuisine!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="flex items-center gap-3 justify-center">
              <Check className="h-6 w-6 text-purple-600" />
              <span className="text-gray-700">Flexible Menu</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Check className="h-6 w-6 text-purple-600" />
              <span className="text-gray-700">Fresh Weekly Meals</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Check className="h-6 w-6 text-purple-600" />
              <span className="text-gray-700">One Week Free Monthly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Simple, Transparent Pricing</h2>
          <Card className="border-purple-600 shadow-lg relative">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Monthly Subscription</CardTitle>
              <CardDescription>Pay for 3 weeks, get 4 weeks of meals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-purple-600">€140/month</div>
                <div className="text-gray-600 mt-2">(Only €35/week)</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">What&apos;s Included:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />4 full weeks of meals
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      Full menu selection
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      Weekly menu rotation
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Added Benefits:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      No long-term commitment
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      Flexible delivery schedule
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      Easy menu customization
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                className="w-full"
                href={`https://wa.me/${phoneNumber}?text=${subscribeMessage}`}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-md py-6">
                  Subscribe Now - Get 1 Week Free
                </Button>
              </Link>
            </CardFooter>
            <div className="absolute top-[-6px] right-[-12px] rotate-12">
              <span className="rounded-sm bg-purple-600/95 px-2 py-0.5 text-xs text-white flex items-center gap-1">
                <Sparkles className="h-3 w-3 inline" />
                Save 27%
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">How You Save</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">Regular Price</h3>
              <p className="text-gray-600">
                Normal weekly price: €48
                <br />4 weeks would cost: €192
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg shadow-md border-2 border-purple-600">
              <h3 className="font-semibold text-xl mb-4">Subscription Price</h3>
              <p className="text-gray-600">
                Monthly subscription: €140
                <br />
                Effective weekly price: €35
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">Your Savings</h3>
              <p className="text-gray-600">
                Monthly savings: €52
                <br />
                That&apos;s <span className="font-bold text-purple-600">27% off!</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Subscribe</h3>
              <p className="text-gray-600">Sign up for our monthly subscription</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Choose Your Meals</h3>
              <p className="text-gray-600">Select your preferred meals weekly</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Fresh Delivery</h3>
              <p className="text-gray-600">Receive fresh meals at your doorstep</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Enjoy & Save</h3>
              <p className="text-gray-600">Get your fourth week completely free</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the subscription pricing work?</AccordionTrigger>
              <AccordionContent>
                Our monthly subscription is €140, which effectively gives you 4 weeks of meals for
                the price of 3. The regular weekly price would be €48, but with the subscription,
                you&apos;re paying only €35 per week - saving 27% overall.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>When am I billed?</AccordionTrigger>
              <AccordionContent>
                You&apos;ll be billed €140 at the start of each monthly subscription period. This
                covers your entire month of meals, including your free week.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I pause or cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                You can cancel your subscription at any time. However, you will be billed for the
                current month. Pausing your subscription is not possible at the moment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What&apos;s included in the meals?</AccordionTrigger>
              <AccordionContent>
                Each delivery includes a complete Lebanese meal, freshly prepared and delivered to
                your door. You can choose from our weekly rotating menu of authentic dishes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Terms and Conditions Summary */}
      <section className="py-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
          <div className="space-y-2">
            <p>By subscribing to our meal service, you agree to the following terms:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Monthly subscription price is €140, billed at the start of each period</li>
              <li>Subscription includes 4 weeks of meals (one week effectively free)</li>
              <li>24-hour notice required for delivery changes or cancellation</li>
              <li>Delivery times may vary based on location and traffic</li>
              <li>Menu selections must be made at least 24 hours in advance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
