import { useState, useRef, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Send, 
  MessageSquare, 
  Bot, 
  User, 
  TrendingUp, 
  CreditCard, 
  DollarSign,
  Sparkles
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

const quickPrompts = [
  "What was my biggest expense last month?",
  "Am I saving enough compared to my income?",
  "Should I hold or sell TCS from my portfolio?",
  "Give me a debt repayment strategy",
  "Analyze my spending patterns",
  "What's my current net worth?"
]
const mockResponses = {
  "expense": "Based on your transaction history, your biggest expense last month was Shopping (₹35,000), followed by Food (₹25,000). I notice your shopping expenses increased by 40% compared to the previous month. Consider setting a monthly budget limit for discretionary spending.",
  
  "saving": "You're currently saving 18% of your income, which is above the recommended 15%. However, your emergency fund could be stronger. I suggest increasing it to cover 6 months of expenses (currently at 3.2 months).",
  
  "portfolio": "TCS is showing strong fundamentals with a 12% growth this quarter. Given your long-term investment horizon and the stock's consistent performance, I recommend holding. Consider adding more on any dips below ₹3,200.",
  
  "debt": "I've analyzed your liabilities. Priority order: 1) Clear credit card debt (18% interest) first, 2) Prepay personal loan partially, 3) Continue home loan EMIs as planned. This strategy will save you ₹2.3L in interest over 3 years.",
  
  "spending": "Your spending pattern shows consistency in essentials but volatility in discretionary categories. Peak spending occurs around month-end (salary credit). Consider automated investments right after salary credit to improve savings discipline.",
  
  "networth": "Your current net worth is ₹42.8L (Assets: ₹58.2L, Liabilities: ₹15.4L). This represents a 15.3% growth YoY. Your asset allocation is healthy with 65% in equity, 20% real estate, 15% fixed deposits."
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Finance Assistant. I have access to your financial data and can help you with investment advice, spending analysis, and financial planning. What would you like to know?",
      sender: "ai",
      timestamp: new Date()
          }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('expense') || message.includes('spending') || message.includes('biggest')) {
      return mockResponses.expense
    } else if (message.includes('saving') || message.includes('save') || message.includes('enough')) {
      return mockResponses.saving
    } else if (message.includes('tcs') || message.includes('stock') || message.includes('hold') || message.includes('sell')) {
      return mockResponses.portfolio
    } else if (message.includes('debt') || message.includes('loan') || message.includes('repay')) {
      return mockResponses.debt
    } else if (message.includes('pattern') || message.includes('analyze')) {
      return mockResponses.spending
    } else if (message.includes('net worth') || message.includes('networth') || message.includes('worth')) {
       return mockResponses.networth
    } else {
      return "Sorry i cannot answer that question now. Based on your current data, I can help you with spending analysis, investment advice, debt management, and financial planning. Could you be more specific about what you'd like to know?"
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const sendQuickPrompt = (prompt: string) => {
    setInputMessage(prompt)
    setTimeout(() => sendMessage(), 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
 sendMessage()
    }
  }






  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-gradient-card">
        {/* Chat Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Finance Assistant</h1>
              <p className="text-muted-foreground">Powered by advanced financial intelligence</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Online</span>
            </div>
          </div>
        </div>

        {/* Quick Prompts - Only show when no messages or just welcome */}
        {messages.length <= 1 && (
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickPrompts.map((prompt, index) => (
                <EnhancedButton
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto p-3 whitespace-normal hover:bg-primary/5 hover:border-primary/20"
                  onClick={() => sendQuickPrompt(prompt)}
                >
                  <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                  {prompt}
                </EnhancedButton>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="w-8 h-8 bg-gradient-primary">
                      <AvatarFallback className="bg-transparent">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-card border shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <Avatar className="w-8 h-8 bg-secondary">
                      <AvatarFallback>
                        <User className="h-5 w-5 text-secondary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 bg-gradient-primary">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-card border shadow-sm rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Message Input */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm p-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your finances..."
                className="pr-12 min-h-[48px] text-base"
                disabled={isLoading}
              />
            </div>
            <EnhancedButton
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              variant="gradient"
              size="icon"
              className="min-w-[48px] h-[48px]"
            >
              <Send className="h-5 w-5" />
            </EnhancedButton>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses are based on your financial data. Always consult a financial advisor for major decisions.
          </p>
        </div>
      </div>
    </AppLayout>
  )

