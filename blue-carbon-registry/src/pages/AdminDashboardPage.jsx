import React from 'react';
import KycReviewCard from '../components/admin/KycReviewCard';

// Hardcoded data for admin view
const pendingNgos = [
  { id: 1, ngoName: 'Sundarbans Reforestation Initiative', name: 'Ravi Kumar', email: 'ravi@sundarbans.org', ngoUid: 'DARPAN-12345', phone: '+919876543210', address: 'Kolkata, West Bengal', walletAddress: '0x91F466790F83C4478ae877806B8DE661618Fe5Fe', geoTaggedPhoto: 'https://images.unsplash.com/photo-1501854140801-50d01698950b' },
  { id: 2, ngoName: 'Coastal Cleanup Crew', name: 'Priya Sharma', email: 'priya@coastalcrew.in', ngoUid: 'DARPAN-67890', phone: '+919123456789', address: 'Chennai, Tamil Nadu', walletAddress: '0xF9768A4bc878fC297fC29612C4420a311D93721F', geoTaggedPhoto: 'https://images.unsplash.com/photo-1566081395778-e009b4551152' }
];

const AdminDashboardPage = () => {
    const handleApprove = (id) => alert(`Approving NGO with ID: ${id}. This would trigger a backend process.`);
    const handleReject = (id) => alert(`Rejecting NGO with ID: ${id}.`);
    const handleViewImage = (url) => window.open(url, '_blank'); // Open image in new tab

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-text-secondary mt-1">Review pending KYC submissions and manage the platform.</p>

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Pending KYC Applications</h2>
                <div className="mt-4 space-y-6">
                    {pendingNgos.map(ngo => (
                        <KycReviewCard 
                            key={ngo.id} 
                            ngo={ngo}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onViewImage={handleViewImage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
