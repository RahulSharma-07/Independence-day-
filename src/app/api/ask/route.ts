import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import fightersData from '@/data/fighters.json'

// ─── Dataset context (built once at module load) ──────────────────────────────
function buildDatasetContext(): string {
  return fightersData.fighters
    .map(
      (f) =>
        `Name: ${f.name} (${f.years}) | Category: ${f.category} | Region: ${f.region}\nTagline: ${f.tagline}\nBio: ${f.bio}`,
    )
    .join('\n\n---\n\n')
}

const DATASET_CONTEXT = buildDatasetContext()

// ─── POST /api/ask ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // 1. Parse request
    const body = await req.json().catch(() => ({}))
    const question: string = body?.question ?? ''

    if (!question.trim()) {
      return NextResponse.json({ error: 'question is required' }, { status: 400 })
    }
    if (question.trim().length > 500) {
      return NextResponse.json({ error: 'question too long' }, { status: 400 })
    }

    // 2. Check API key
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey || apiKey === 'paste_your_real_key_here') {
      return NextResponse.json({
        answer:
          'Ask Bharat is not yet configured. Add a valid GROQ_API_KEY to .env.local — get one free at aistudio.google.com.',
        relatedFighterSlugs: [],
      })
    }

    // 3. Call Gemini
    const ai = new GoogleGenAI({ apiKey })

    const systemInstruction = `You are Bharat — a respectful, knowledgeable guide to India's freedom struggle.
Answer questions ONLY using the freedom fighters dataset below.
Rules:
- Never invent facts, dates, or quotes about real people.
- If the person is not in the dataset, say so clearly.
- Keep answers to 2–4 sentences unless more detail is needed.
- Only answer questions related to India's independence movement.

DATASET:
${DATASET_CONTEXT}`

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: question.trim(),
      config: {
        systemInstruction,
        maxOutputTokens: 400,
        temperature: 0.3,
      },
    })

    const answer = response.text?.trim() || 'I could not find an answer in the archive.'

    // 4. Find related fighters mentioned in the answer
    const lower = answer.toLowerCase()
    const relatedFighterSlugs = fightersData.fighters
      .filter((f) => lower.includes(f.name.toLowerCase()))
      .map((f) => f.slug)
      .slice(0, 3)

    return NextResponse.json({ answer, relatedFighterSlugs })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[Ask Bharat] Gemini error:', message)

    if (message.includes('429') || message.toLowerCase().includes('quota')) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
    }
    if (
      message.includes('API_KEY_INVALID') ||
      message.includes('invalid') ||
      message.includes('400')
    ) {
      return NextResponse.json(
        {
          answer:
            'The Gemini API key is invalid. Go to aistudio.google.com, create a new key (it starts with AIza...), and paste it into .env.local as GROQ_API_KEY.',
          relatedFighterSlugs: [],
        },
        { status: 200 },
      )
    }

    return NextResponse.json(
      { answer: `Error: ${message}. Check the server console for details.`, relatedFighterSlugs: [] },
      { status: 200 },
    )
  }
}
