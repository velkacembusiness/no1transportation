import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function PayerCreate() {
    const { data, setData, post, processing, errors } = useForm({ rider_payer: '' });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.payers.store'));
    }

    return (
        <AdminLayout title="Add Payer">
            <Head title="Add Payer | Admin" />
            <div className="max-w-xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('admin.payers.index')}><Button variant="outline" size="sm"><i className="fas fa-arrow-left mr-2" />Back</Button></Link>
                    <h2 className="text-xl font-semibold">Add Payer</h2>
                </div>
                <Card><CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Rider Payer *</Label>
                            <Input value={data.rider_payer} onChange={e => setData('rider_payer', e.target.value)} placeholder="e.g. Insurance, Self-Pay, Medicaid" />
                            {errors.rider_payer && <p className="text-red-500 text-xs mt-1">{errors.rider_payer}</p>}
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing} className="bg-brand-dark text-brand-green hover:bg-brand-gray">{processing ? 'Creating...' : 'Create Payer'}</Button>
                            <Link href={route('admin.payers.index')}><Button variant="outline">Cancel</Button></Link>
                        </div>
                    </form>
                </CardContent></Card>
            </div>
        </AdminLayout>
    );
}