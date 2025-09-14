import { GoogleGenerativeAI } from "@google/generative-ai";

// This config is essential for Vercel to correctly handle the serverless function
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const body = await req.json();
    const { prompt: userPrompt } = body;

    if (!userPrompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const instructions = `You are "FinanceAI", a friendly and highly knowledgeable personal finance assistant.
    - Your primary purpose is to help users by answering their questions about finance, investment, and market trends.
    - You must answer general financial questions clearly and accurately. For example, if a user asks "what is an IPO?" or "explain inflation", you must provide a helpful definition.
    - Do not fall back to a generic script. Answer the user's question directly and thoughtfully.
    - Always be conversational, professional, and helpful.`;
    
    const fullPrompt = `${instructions}\n\nUser Question: "${userPrompt}"\n\nFinanceAI Response:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in Gemini API call:', error);
    return new Response(JSON.stringify({ error: 'Failed to get response from AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
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
}
