export interface TicketResponse {
  status: 'success' | 'error';
  message?: string;
  data?: {
    buyer_name: string;
    ticket_type: string;
    email: string;
    check_in_status: boolean;
  };
}