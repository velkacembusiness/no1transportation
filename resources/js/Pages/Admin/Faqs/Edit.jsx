import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function FaqEdit({ faq }) {
    const { data, setData, put, processing, errors } = useForm({ question: faq.question || '', answer: faq.answer || '', is_active: faq.is_active ?? true });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.faqs.update', faq.id));
    }

    return (
        <AdminLayout title="Edit FAQ">
            <Head title="Edit FAQ | Admin" />
            <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('admin.faqs.index')}><Button variant="outline" size="sm"><i className="fas fa-arrow-left mr-2" />Back</Button></Link>
                    <h2 className="text-xl font-semibold">Edit FAQ</h2>
                </div>
                <Card><CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Question *</Label>
                            <Textarea value={data.question} onChange={e => setData('question', e.target.value)} rows={2} />
                            {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question}</p>}
                        </div>
                        <div>
                            <Label>Answer *</Label>
                            <Textarea value={data.answer} onChange={e => setData('answer', e.target.value)} rows={5} />
                            {errors.answer && <p className="text-red-500 text-xs mt-1">{errors.answer}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="is_active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="w-4 h-4 rounded" />
                            <Label htmlFor="is_active">Active</Label>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing} className="bg-brand-dark text-brand-green hover:bg-brand-gray">{processing ? 'Updating...' : 'Update FAQ'}</Button>
                            <Link href={route('admin.faqs.index')}><Button variant="outline">Cancel</Button></Link>
                        </div>
                    </form>
                </CardContent></Card>
            </div>
        </AdminLayout>
    );
}