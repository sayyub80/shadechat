import model from '@/lib/geminiAI';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    
    // Ensure messages are properly formatted with '||' separators
    const formattedMessages = text
      .split('\n') // Split by new lines
      .map(line => line.trim()) // Trim whitespace
      .filter(line => line.length > 0) // Remove empty lines
      .join('||'); // Join with '||' separator
    
    return NextResponse.json(
      { messages: formattedMessages },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating messages:', error);
    return NextResponse.json(
      { error: 'Failed to generate messages' },
      { status: 500 }
    );
  }
}
