# Design Story - Design and Development of HomeFinder Portal

## System Context

HomeFinder is an online real estate portal aimed at providing users with a seamless
property search experience. The system enables users to browse, search, select, and
inquire about residential and commercial properties efficiently. HomeFinder
(hereafter referred to as the “system”) streamlines property discovery, supports
personalized recommendations, and fosters user engagement.

### i. User Management and System Access
- Users must register with an email address and secure password.
- Login requires credentials (email and password) with a two-factor authentication token sent via email within 30 seconds.
- To safeguard personal data, the system complies with GDPR principles, collecting only essential information.
- Only one active session per user is allowed at a time to prevent account misuse.

### ii. Property Search, Reservation, and Inquiry
- Users can browse properties categorized as residential, commercial, or rental.
- Filters (location, price range, property type, bedrooms, amenities) simplify discovery.
- Users can save properties to favorites, remove listings, or schedule viewings. Confirmation emails are sent for viewings or inquiries.
- Inquiries and booking requests can be submitted directly through the portal.
- If a property is unavailable, users can subscribe to notifications for similar listings.

### iii. Supervision and Management
- There are two types of managers: Customer Service Supervisors and Admins.
- Supervisors access monthly reports showing inquiries, saved properties, and search trends.
- Admins add and update property listings and manage user interactions.
- Payment options may include credit card, bank transfer, or booking fees for premium services.
- All transactions and interactions are logged for analysis (logs retained for 3
months).

## System Characteristics
- Operates as a web client with secure server storage.
- Scheduled weekly downtime of up to 30 minutes for maintenance.
- Future plans include mobile application support.
- Maintains a detailed activity log for past searches, inquiries, and saved properties.


