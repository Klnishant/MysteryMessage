'use client'

import Image from "next/image";
import messages from "@/messages.json";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {data: session} = useSession();
  const router = useRouter();

  const date = new Date().getFullYear();

  if (session) {
    return router.replace('/dashboard');
  }
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive Into The World Of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains secret
          </p>
        </section>
        <Carousel
         plugins={[Autoplay({delay:2000})]}
         className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map(
              (message,index)=>(
                <CarouselItem key={index} className="p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                      <Mail className="flex-shrink-0"  />
                      <div>
                        <p>
                          {message.content}
                        </p>
                        <p>
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        <p>© {date} True Feedback. All rights reserved.</p>
        <p>Created With ❤️ By Nishant Kaushal</p>
      </footer>
    </>
  );
}
