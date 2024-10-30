import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { QrCode, Loader2 } from 'lucide-react';
import QRScanner from './components/QRScanner';
import TicketInfo from './components/TicketInfo';
import type { TicketResponse } from './types';

function App() {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState<TicketResponse | null>(null);

  const checkInTicket = async (ticketId: string) => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint and credentials
      const response = await fetch('http://www.grillngames.com.ng/tc-api/BAD46EBB/check_in/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({ ticket_id: ticketId })
      });
      
      const data: TicketResponse = await response.json();
      setTicketData(data);
      
      if (data.status === 'success') {
        toast.success('Ticket checked in successfully!');
      } else {
        toast.error(data.message || 'Check-in failed');
      }
    } catch (error) {
      toast.error('Failed to connect to the server');
      setTicketData({
        status: 'error',
        message: 'Failed to connect to the server'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <QrCode className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Event Check-in
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Scanner Controls */}
          <div className="flex justify-center">
            <button
              onClick={() => setScanning(!scanning)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {scanning ? 'Stop Scanning' : 'Start Scanning'}
            </button>
          </div>

          {/* Scanner */}
          {scanning && (
            <div className="max-w-md mx-auto">
              <QRScanner
                onScanSuccess={(ticketId) => {
                  setScanning(false);
                  checkInTicket(ticketId);
                }}
                onScanError={(error) => toast.error(error)}
              />
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
          )}

          {/* Ticket Information */}
          {ticketData && !loading && (
            <div className="flex justify-center">
              <TicketInfo ticketData={ticketData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;