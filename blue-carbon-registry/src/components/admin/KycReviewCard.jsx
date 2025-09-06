import React from 'react';
import { FaFilePdf, FaVideo, FaMapMarkedAlt } from 'react-icons/fa';

const KycReviewCard = ({ ngo, onApprove, onReject, onViewImage }) => {
  const Detail = ({ label, value }) => (
    <div>
      <p className="text-xs font-semibold text-text-secondary">{label}</p>
      <p className="text-sm text-text-primary">{value}</p>
    </div>
  );

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-primary">{ngo.ngoName}</h3>
          <p className="text-sm text-text-secondary">Contact: {ngo.name} ({ngo.email})</p>
        </div>
        <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">PENDING</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 border-t border-border pt-4">
        <Detail label="NGO UID" value={ngo.ngoUid} />
        <Detail label="Phone" value={ngo.phone} />
        <Detail label="Address" value={ngo.address} />
        <Detail label="Wallet" value={`${ngo.walletAddress.slice(0, 6)}...${ngo.walletAddress.slice(-4)}`} />
      </div>
      <div className="mt-4 border-t border-border pt-4 flex items-center space-x-4">
        <p className="text-sm font-semibold text-text-secondary">Documents:</p>
        <div className="flex items-center space-x-3 text-secondary">
          <FaFilePdf className="h-5 w-5" title="Aadhaar, PAN, GST" />
          <FaVideo className="h-5 w-5" title="e-KYC Video" />
          <button onClick={() => onViewImage(ngo.geoTaggedPhoto)} className="flex items-center text-primary hover:underline">
            <FaMapMarkedAlt className="h-5 w-5" title="Geo-tagged Photo"/>
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button onClick={() => onReject(ngo.id)} className="px-4 py-2 text-sm font-medium rounded-md text-secondary bg-background hover:bg-border">Reject</button>
        <button onClick={() => onApprove(ngo.id)} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover">Approve & Grant Credits</button>
      </div>
    </div>
  );
};

export default KycReviewCard;