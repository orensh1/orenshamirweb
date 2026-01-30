import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Bell, MessageCircle, ShoppingBag } from 'lucide-react';

const notificationTypes = [
    { text: "ליד חדש התקבל!", icon: CheckCircle2, color: "text-green-400" },
    { text: "שיחה נכנסת...", icon: Bell, color: "text-blue-400" },
    { text: "פנייה חדשה", icon: MessageCircle, color: "text-purple-400" },
    { text: "הזמנה חדשה", icon: ShoppingBag, color: "text-pink-400" }
];

interface ActiveNotification {
    id: number;
    data: typeof notificationTypes[0];
    xOffset: number;
}

const LiveNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<ActiveNotification[]>([]);

    useEffect(() => {
        let counter = 0;

        const addNotification = () => {
            const newNotif = {
                id: Date.now(),
                data: notificationTypes[counter % notificationTypes.length],
                xOffset: Math.random() * 20 - 10 // Smaller drift
            };
            setNotifications(prev => [...prev.slice(-4), newNotif]);
            counter++;
        };

        // Start immediately
        addNotification();

        const interval = setInterval(addNotification, 3000); // Slightly slower pace

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-[300px] h-[200px] z-0 pointer-events-none overflow-visible">
            <AnimatePresence>
                {notifications.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20, x: item.xOffset, scale: 0.8 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -100, // Float up shorter distance
                            scale: 1
                        }}
                        transition={{
                            duration: 4, // Faster lifecycle
                            ease: "easeOut"
                        }}
                        className="absolute bottom-0 left-0 right-0 mx-auto w-fit flex items-center gap-3 px-4 py-2 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full shadow-xl"
                        onAnimationComplete={() => {
                            setNotifications(prev => prev.filter(n => n.id !== item.id));
                        }}
                    >
                        <div className={`p-1.5 rounded-full bg-white/5 ${item.data.color}`}>
                            <item.data.icon size={14} />
                        </div>
                        <span className="text-white/80 text-sm font-medium tracking-wide whitespace-nowrap">
                            {item.data.text}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default LiveNotifications;
