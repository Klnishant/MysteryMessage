'use client'

import { apiResponse } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useCompletion } from "ai/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";


export default function Reviewer(){
    const [message,setMessage] = useState('');
    const [isSending,setIsSending] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof messageSchema>>(
        {
            resolver: zodResolver(messageSchema),
        },
    );

    const params = useParams<{username: string}>();
    const username = params.username;
    
    const messageContent = form.watch('content');
    const handleMessageClick = (message: string) => {
        form.setValue('content', message);
      };
    const { toast } = useToast();

    const handleSubmitMessage = async ( data : z.infer<typeof messageSchema>)=> {
        setIsSending(true);
        
        try {
            const response = await axios.post('/api/send-message',{
                username,
                content: data.content,
            });

            toast(
                {
                    title:response?.data.message,
                },
            );
            setMessage('');
            form.setValue('content',message)
        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>;

            toast(
                {
                    title: "Error",
                    description: axiosError.response?.data.message ??
                    "error in sending message",
                    variant: "destructive"
                }
            );
        } finally {
            setIsSending(false);
        }
    }

    const {
        complete,
        completion,
        isLoading,
        error,
      } = useCompletion({
        api: '/api/suggest-messages',
        initialCompletion: initialMessageString,
      });

    const fetchSuggestMessage = async ()=> {
        try {
            complete('');
          } catch (error) {
            
            const axiosError = error as AxiosError<apiResponse>;

            toast({
                title: "Error",
                description: axiosError.response?.data.message ?? 
                "Error in fetching suggest message",
                variant: "destructive",
            });
          } finally {
            setMessage('');
          }
    }
    return (
        <div className="flex justify-center mx-auto my-8">
            <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
                <h1 className="text-4xl mb-6 font-bold text-center">
                    Public Profile Link
                </h1>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitMessage)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                                        <FormControl >
                                            <Textarea  {...field} placeholder="Write your anonymous message here" className="resize-none" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center">
                                {
                                    isSending ? (
                                        <Button disabled>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please Wait
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="px-4 py-2" disabled={ isSending || !messageContent}>Send it</Button>
                                    )
                                }
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            onClick={fetchSuggestMessage}
            className="my-4"
            disabled={isLoading}
          >
            Suggest Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {error ? (
              <p className="text-red-500">Error In Fetching Messages Try After Sometimes</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
            </div>
        </div>
    );
}