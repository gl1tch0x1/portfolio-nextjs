import { Send, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground">Let's discuss your security needs</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="transition-all duration-300 ease-in-out">
          <CardHeader>
            <Terminal className="w-8 h-8 text-primary mb-4" />
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>Send me a message and I'll get back to you</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Name" />
                <Input type="email" placeholder="Email" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Message" rows={4} />
              <Button className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}