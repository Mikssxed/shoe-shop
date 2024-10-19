import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

import { OPENAI_MODEL } from '@/lib/constants';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai(OPENAI_MODEL),
    messages: convertToCoreMessages(messages),
    maxTokens: 200,
  });

  return result.toDataStreamResponse();
}
