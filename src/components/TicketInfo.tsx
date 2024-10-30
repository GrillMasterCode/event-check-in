import { CheckCircle, XCircle } from 'lucide-react';
import type { TicketResponse } from '../types';

interface TicketInfoProps {
  ticketData: TicketResponse;
}

export default function TicketInfo({ ticketData }: TicketInfoProps) {
  if (ticketData.status === 'error') {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <div className="flex items-center">
          <XCircle className="h-6 w-6 text-red-500 mr-3" />
          <p className="text-red-700">{ticketData.message || 'Check-in failed'}</p>
        </div>
      </div>
    );
  }

  if (!ticketData.data) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Ticket Information</h3>
        {ticketData.data.check_in_status ? (
          <CheckCircle className="h-8 w-8 text-green-500" />
        ) : (
          <XCircle className="h-8 w-8 text-red-500" />
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Attendee Name</p>
          <p className="text-lg font-medium">{ticketData.data.buyer_name}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Ticket Type</p>
          <p className="text-lg font-medium">{ticketData.data.ticket_type}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{ticketData.data.email}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className={`text-lg font-medium ${
            ticketData.data.check_in_status ? 'text-green-600' : 'text-red-600'
          }`}>
            {ticketData.data.check_in_status ? 'Checked In' : 'Not Checked In'}
          </p>
        </div>
      </div>
    </div>
  );
}