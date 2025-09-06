import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCube, FaLeaf, FaExternalLinkAlt, FaHashtag, FaCalendarAlt, FaUserCheck } from 'react-icons/fa';
// TODO: You'll need ethers.js and the ABI of your deployed contract
// import { ethers } from 'ethers';
// import contractABI from '../utils/CarbonCreditNFT.json';

// const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const CreditDetailsPage = () => {
    const { tokenId } = useParams();
    const [creditData, setCreditData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchCreditData = async () => {
            setLoading(true);
            try {
                // MOCK DATA - Replace with real blockchain call
                await new Promise(res => setTimeout(res, 1000)); // Simulate network delay
                const mockData = {
                    tokenId: tokenId,
                    tonnesCO2: 150,
                    vintageYear: 2023,
                    originator: '0x91F466790F83C4478ae877806B8DE661618Fe5Fe',
                    projectURI: 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi', // Link to metadata
                    transactionHash: '0x77ecca9e1a38b7104a6a0cb77f5907fd7e86f33036add710ca54783b46f85e0',
                    blockNumber: 44055501,
                    // You'd fetch metadata from the projectURI
                    metadata: {
                        name: 'Sundarbans Mangrove Restoration - Phase 1',
                        description: 'Restoration of 50 hectares of mangrove forest in the Sundarbans delta region.',
                        image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a', // Example image
                        location: 'Sundarbans, West Bengal, India',
                        methodology: 'Biochar'
                    }
                };
                setCreditData(mockData);

                /* 
                // --- REAL IMPLEMENTATION ---
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);
                const data = await contract.projectDetails(tokenId);
                const owner = await contract.ownerOf(tokenId);
                
                // Fetch metadata from IPFS/Arweave
                const metadataResponse = await fetch(`https://ipfs.io/ipfs/${data.projectURI.split('//')[1]}`);
                const metadata = await metadataResponse.json();

                setCreditData({
                    tokenId: tokenId,
                    tonnesCO2: data.tonnesCO2.toString(),
                    vintageYear: data.vintageYear.toString(),
                    originator: data.originator,
                    projectURI: data.projectURI,
                    owner: owner,
                    metadata: metadata
                    // You would also query for transaction hash and block number using the mint event
                });
                */
            } catch (error) {
                console.error("Failed to fetch credit details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCreditData();
    }, [tokenId]);

    const InfoRow = ({ icon, label, value, isLink = false, isAddress = false }) => (
        <div className="grid grid-cols-3 gap-4 py-3 border-b border-lightest-navy/20">
            <dt className="flex items-center text-sm font-medium text-slate">
                {icon}
                <span className="ml-2">{label}</span>
            </dt>
            <dd className="col-span-2 text-sm text-lightest-slate break-all">
                {isLink ? (
                     <a href={value} target="_blank" rel="noopener noreferrer" className="text-green hover:underline flex items-center">
                        {value} <FaExternalLinkAlt className="ml-2" />
                    </a>
                ) : isAddress ? (
                    <a href={`https://testnet.snowtrace.io/address/${value}`} target="_blank" rel="noopener noreferrer" className="text-green hover:underline flex items-center">
                        {`${value.substring(0, 8)}...${value.substring(value.length - 8)}`} <FaExternalLinkAlt className="ml-2" />
                    </a>
                ) : (value)}
            </dd>
        </div>
    );

    if (loading) return <div className="text-center text-green">Loading Credit Details...</div>;
    if (!creditData) return <div className="text-center text-red-400">Could not load details for Token ID #{tokenId}.</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-lightest-slate mb-6">Carbon Credit Details</h1>

            <div className="bg-light-navy rounded-lg shadow-lg">
                {/* TABS */}
                <div className="border-b border-lightest-navy/20">
                    <nav className="flex space-x-4 p-4" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`${activeTab === 'overview' ? 'bg-green text-navy' : 'text-slate hover:text-lightest-slate'} px-3 py-2 font-medium text-sm rounded-md`}>Overview</button>
                        <button onClick={() => setActiveTab('logs')} className={`${activeTab === 'logs' ? 'bg-green text-navy' : 'text-slate hover:text-lightest-slate'} px-3 py-2 font-medium text-sm rounded-md`}>Logs</button>
                    </nav>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                    {activeTab === 'overview' && (
                        <dl>
                            <InfoRow icon={<FaHashtag />} label="Token ID" value={creditData.tokenId} />
                            <InfoRow icon={<FaCube />} label="Transaction Hash" value={creditData.transactionHash} isAddress={true}/>
                            <InfoRow icon={<FaLeaf />} label="Tonnes of CO2 Removed" value={creditData.tonnesCO2} />
                            <InfoRow icon={<FaCalendarAlt />} label="Vintage Year" value={creditData.vintageYear} />
                            <InfoRow icon={<FaUserCheck />} label="Originator" value={creditData.originator} isAddress={true}/>
                            <InfoRow icon={<FaExternalLinkAlt />} label="Project Metadata" value={creditData.projectURI} isLink={true}/>
                            <div className="pt-4">
                                <h3 className="text-lg font-semibold text-green">Project Metadata</h3>
                                <p className="text-sm text-light-slate mt-2">{creditData.metadata.description}</p>
                            </div>
                        </dl>
                    )}
                    {activeTab === 'logs' && (
                        <div>
                            <h3 className="font-mono text-lightest-slate">Event Logs (Simulated)</h3>
                            <div className="mt-4 p-4 bg-navy rounded-md font-mono text-xs text-slate overflow-x-auto">
                                <p><span className="text-green">EVENT:</span> CreditMinted(tokenId: {creditData.tokenId}, originator: {creditData.originator}, tonnesCO2: {creditData.tonnesCO2})</p>
                                <p><span className="text-green">FROM:</span> Your Smart Contract Address</p>
                                <p><span className="text-green">BLOCK:</span> {creditData.blockNumber}</p>
                                <p className="mt-4">// In a real app, you would use a library like Ethers.js to query and display all historical events for this Token ID.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreditDetailsPage;