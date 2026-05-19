import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function PayerEdit({ payer }) {
    const { data, setData, put, processing, errors } = useForm({ rider_payer: payer.rider_payer || '' });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.payers.update', payer.id));
    }

    return (
        <AdminLayout title="Edit Payer">
            <Head title="Edit Payer | Admin" />
            <div className="max-w-xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('admin.payers.index')}><Button variant="outline" size="sm"><i className="fas fa-arrow-left mr-2" />Back</Button></Link>
                    <h2 className="text-xl font-semibold">Edit Payer</h2>
                </div>
                <Card><CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Rider Payer *</Label>
                            <Input value={data.rider_payer} onChange={e => setData('rider_payer', e.target.value)} />
                            {errors.rider_payer && <p className="text-red-500 text-xs mt-1">{errors.rider_payer}</p>}
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing} className="bg-brand-dark text-brand-green hover:bg-brand-gray">{processing ? 'Updating...' : 'Update Payer'}</Button>
                            <Link href={route('admin.payers.index')}><Button variant="outline">Cancel</Button></Link>
                        </div>
                    </form>
                </CardContent></Card>
            </div>
        </AdminLayout>
    );
}