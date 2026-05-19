import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function FaqsIndex({ faqs }) {
    const { data } = faqs;

    function handleDelete(id) {
        if (confirm('Delete this FAQ?')) {
            router.delete(route('admin.faqs.destroy', id));
        }
    }

    return (
        <AdminLayout title="FAQs">
            <Head title="FAQs | Admin" />
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <Link href={route('admin.faqs.create')}>
                            <Button size="sm" className="bg-brand-dark text-brand-green hover:bg-brand-gray"><i className="fas fa-plus mr-2" />Add FAQ</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Question</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((faq) => (
                                    <tr key={faq.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 max-w-lg">{faq.question}</td>
                                        <td className="py-3 px-4">
                                            <Badge variant={faq.is_active ? 'default' : 'secondary'}>{faq.is_active ? 'Active' : 'Inactive'}</Badge>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <Link href={route('admin.faqs.edit', faq.id)}><Button variant="outline" size="sm">Edit</Button></Link>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(faq.id)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!data || data.length === 0) && (
                                    <tr><td colSpan={3} className="py-8 text-center text-gray-500">No FAQs yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}