import { getSession } from '@/lib/session-server';

export async function GET() {
    const session = await getSession();
    return Response.json(session);
}