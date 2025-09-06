import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimator from '../components/common/ScrollAnimator';
import InteractiveGlobe from '../components/common/InteractiveGlobe'; // New Globe!
import { FaArrowRight, FaHandshake, FaCamera, FaCoins } from 'react-icons/fa';

const HomePage = () => {
    // UPDATED: Reusable component for "How It Works" with glassmorphism
    const StepCard = ({ icon, title, description, delay }) => (
        <ScrollAnimator
            animationClass="animate-fade-in-up"
            delay={delay}
            // --- NEW GLASSMORPHISM STYLING ---
            className="bg-surface/50 backdrop-blur-lg p-8 rounded-xl border border-white/20 
                       shadow-lg transition-all duration-300 hover:border-primary hover:scale-105"
        >
            <div className="flex items-center justify-center h-12 w-12 bg-primary/10 rounded-full text-primary text-2xl mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-text-primary">{title}</h3>
            <p className="mt-2 text-text-secondary">{description}</p>
        </ScrollAnimator>
    );

    return (
        // The main container needs to be relative to contain the absolute-positioned globe
        <div className="relative overflow-hidden">
            <InteractiveGlobe />
            
            {/* We add a z-index to all content to ensure it appears above the globe */}
            <div className="relative z-10 text-text-primary space-y-24 md:space-y-40 py-20">
                
                {/* Hero Section */}
                <section className="text-center min-h-[70vh] flex flex-col items-center justify-center">
                    <ScrollAnimator animationClass="animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                            Bringing On-Chain Trust to <br />
                            <span className="text-primary">India's Blue Carbon</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg text-text-secondary">
                            Our decentralized MRV platform empowers NGOs and local communities by converting verified ecological data into transparent, tradable carbon credits.
                        </p>
                         <div className="mt-10">
                            <Link to="/dashboard">
                                <button className="px-8 py-4 font-semibold text-white bg-primary rounded-lg shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-105">
                                    Explore the Ecosystem <FaArrowRight className="inline ml-2" />
                                </button>
                            </Link>
                        </div>
                    </ScrollAnimator>
                </section>

                {/* "The Blockchain for Builders" inspired section */}
                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <ScrollAnimator animationClass="animate-fade-in-up">
                        <h2 className="text-4xl font-bold leading-snug">The Infrastructure for Verifiable Climate Action</h2>
                        <ul className="mt-6 space-y-4 text-text-secondary">
                            <li className="flex items-start"><span className="text-primary font-bold mr-3">✓</span> <span><strong>Secure by Default:</strong> Immutable records prevent fraud and double counting.</span></li>
                            <li className="flex items-start"><span className="text-primary font-bold mr-3">✓</span> <span><strong>Lowest Fees:</strong> Maximizing value for on-the-ground projects.</span></li>
                            <li className="flex items-start"><span className="text-primary font-bold mr-3">✓</span> <span><strong>Market Ready:</strong> Compliant with global standards for immediate adoption.</span></li>
                        </ul>
                    </ScrollAnimator>
                    <ScrollAnimator animationClass="animate-fade-in-up" delay={200}>
                        <div className="bg-surface/50 backdrop-blur-lg p-8 rounded-xl border border-white/20 shadow-lg">
                             <h3 className="text-xl font-bold text-primary">A Transparent Path</h3>
                             <p className="mt-2 text-text-secondary">Our system provides end-to-end traceability, from a mangrove sapling in the Sundarbans to a retired carbon credit on the ledger. Every step is verifiable by anyone, at any time.</p>
                        </div>
                    </ScrollAnimator>
                </section>

                {/* "Level Up Your Games" inspired section */}
                 <section className="text-center">
                    <ScrollAnimator animationClass="animate-fade-in-up">
                        <h2 className="text-4xl font-bold">The Essential Toolkit for Climate Impact</h2>
                        <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                           We provide the tools needed to onboard, monitor, and tokenize real-world environmental assets with confidence and clarity.
                        </p>
                    </ScrollAnimator>
                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <StepCard 
                            icon={<FaHandshake />} 
                            title="Onboarding & KYC"
                            description="A secure gateway for NGOs and communities to become trusted project originators."
                            delay={100}
                        />
                         <StepCard 
                            icon={<FaCamera />} 
                            title="Decentralized MRV"
                            description="Immutable data capture from the field using mobile apps, drones, and IoT sensors."
                            delay={300}
                        />
                         <StepCard 
                            icon={<FaCoins />} 
                            title="NFT Credit Minting"
                            description="Tokenize verified carbon data into unique, tradable assets on a public blockchain."
                            delay={500}
                        />
                    </div>
                </section>

            </div>
        </div>
    );
};

export default HomePage;