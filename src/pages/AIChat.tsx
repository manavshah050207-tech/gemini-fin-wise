import React, { useState, useEffect, useRef } from 'react';
import { User, Permission, Transaction, Portfolio, Asset, Liability } from '@/entities/all';
import { InvokeLLM } from '@/integrations/Core';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState(null);
  const scrollAreaRef = useRef();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentUser = await User.me();
        const userPermissions = await Permission.filter({ user_email: currentUser.email });
        setPermissions(userPermissions[0]);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    fetchPermissions();
    setMessages([{ sender: 'ai', text: "Hello! I'm your AI financial assistant, now with conversational memory. I can answer follow-up questions. How can I help you today?" }]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !permissions) return;
    
    const userMessage = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // 1. Build context based on permissions
      let financialContext = "This is the user's financial data. Use only the data provided. Be concise and helpful.\n";
      if (permissions.transactions) {
        const transactions = await Transaction.list('-date', 20);
        financialContext += \n**Recent Transactions:**\n${JSON.stringify(transactions.slice(0, 5), null, 2)}\n;
      }
      if (permissions.portfolio) {
        const portfolio = await Portfolio.list();
        const simplifiedPortfolio = portfolio.map(p => ({symbol: p.symbol, quantity: p.quantity, current_price: p.current_price, pnl: (p.current_price - p.avg_buy_price) * p.quantity }));
        financialContext += \n**Stock Portfolio Summary:**\n${JSON.stringify(simplifiedPortfolio, null, 2)}\n;
      }
       if (permissions.assets_liabilities) {
        const assets = await Asset.list();
        const liabilities = await Liability.list();
        financialContext += \n**Assets:**\n${JSON.stringify(assets, null, 2)}\n;
        financialContext += \n**Liabilities:**\n${JSON.stringify(liabilities, null, 2)}\n;
      }

      // 2. Build conversation history
      const conversationHistory = newMessages.slice(-6) // Get last 6 messages for context
        .map(msg => ${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text})
        .join('\n');

      // 3. Create the prompt
      const prompt = `You are an expert personal finance assistant.
        Your underlying model is powerful, like GPT or Gemini.
        Use the following financial data and conversation history to provide a clear, actionable answer in Markdown.

        <FinancialData>
        ${financialContext}
        </FinancialData>

        <ConversationHistory>
        ${conversationHistory}
        </ConversationHistory>
        
        Answer the last user question based on all the above information.
      `;

      // 4. Call the LLM
      const response = await InvokeLLM({ prompt });
      
      const aiMessage = { sender: 'ai', text: response };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage = { sender: 'ai', text: 'Sorry, I encountered an error. Please check your connection and try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-muted/20">
      <Card className="flex-1 flex flex-col shadow-2xl">
        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}}>
                  {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>}
                  <div className={p-4 rounded-2xl max-w-lg shadow-md ${msg.sender === 'ai' ? 'bg-card' : 'bg-primary text-primary-foreground'}}>
                    <ReactMarkdown className="prose dark:prose-invert prose-p:my-0 prose-headings:my-2">{msg.text}</ReactMarkdown>
                  </div>
                  {msg.sender === 'user' && <div className="w-8 h-8 rounded-full flex-shrink-0 bg-slate-200 flex items-center justify-center"><UserIcon className="w-5 h-5 text-slate-600"/></div>}
                </div>
              ))}
              {loading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
                    <div className="p-4 rounded-2xl bg-card shadow-md">
                        <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-card">
            <div className="relative">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask a follow-up, like 'show me the top 3 expenses'..."
                className="pr-12 h-12 rounded-full text-base"
                disabled={loading || !permissions}
              />
              <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full" onClick={handleSend} disabled={loading || !input.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
             {!permissions && <p className="text-xs text-center text-muted-foreground mt-2">Loading permissions...</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
