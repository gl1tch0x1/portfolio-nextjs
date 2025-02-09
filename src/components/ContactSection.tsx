import { motion } from 'framer-motion';
import { Send, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Terminal className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl mb-2">Initialize Connection</CardTitle>
            <CardDescription>
              Have a project in mind? Let's collaborate on something amazing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.form
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Project Discussion" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Tell me about your project..."
                  className="min-h-[150px]"
                />
              </div>
              
              <Button className="w-full group">
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Send Message
              </Button>
            </motion.form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}