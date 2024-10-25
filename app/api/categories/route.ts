import { fetchCategories } from '@/lib/hooks/useCategories';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const group_category = searchParams.get('group_category');
    let res = {};
    if (group_category) {
        res = await fetchCategories(group_category);
    }
    return Response.json(res)
}