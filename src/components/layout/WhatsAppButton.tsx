import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '919880928877'; // WhatsApp contact number
  const message = encodeURIComponent('Hello! I would like to book an appointment at Care and Cure Fertility Centre.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-32 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[hsl(142_70%_45%)] animate-ping opacity-30" />
        
        {/* Button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[hsl(142_70%_45%)] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" fill="white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card text-foreground text-sm font-medium px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-card" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
