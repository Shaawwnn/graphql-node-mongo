export enum BookingStatus {
  Pending = 'PENDING', // Default state when a booking request is created
  Confirmed = 'CONFIRMED', // Provider has accepted the booking
  InProgress = 'IN_PROGRESS', // Service is currently being provided
  Completed = 'COMPLETED', // Service was successfully delivered
  Canceled = 'CANCELED', // Booking was canceled by customer or provider
  Rejected = 'REJECTED' // Provider declined the request
}
