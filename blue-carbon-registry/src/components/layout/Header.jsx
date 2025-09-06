import React from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { FiLogOut, FiShield } from 'react-icons/fi';
import { FaWallet } from 'react-icons/fa';

const Header = ({ walletAddress, setWalletAddress }) => {
  /**
   * Connects to the user's MetaMask wallet and updates the state.
   */
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to continue.');
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (error) { // <-- THE FIX: Added curly braces here
      console.error("Failed to connect wallet:", error);
    } // <-- AND HERE
  };

  /**
   * Logs the user out by clearing the wallet address from the state.
   */
  const logout = () => {
    setWalletAddress(null);
  };

  return (
    <header className="bg-surface h-16 flex items-center justify-end px-8 border-b border-border">
      <div className="flex items-center space-x-4">
        {walletAddress ? (
          // Logged-in state
          <>
            {/* 1. Admin Panel Button */}
            <Link to="/admin/dashboard" className="p-2 rounded-lg hover:bg-background text-text-secondary" title="Admin Panel">
              <FiShield className="h-5 w-5" />
            </Link>

            {/* 2. Wallet Address Display */}
            <div className="flex items-center p-2 bg-background rounded-lg border border-border">
              <FaWallet className="text-primary mr-2" />
              <span className="font-mono text-sm text-text-primary">
                {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
              </span>
            </div>

            {/* 3. Logout Button */}
            <button onClick={logout} className="p-2 rounded-lg hover:bg-background text-text-secondary" title="Logout">
              <FiLogOut className="h-5 w-5" />
            </button>
          </>
        ) : (
          // Logged-out state
          <button
            onClick={connectWallet}
            className="px-4 py-2 font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;