'use client';

import { useState, useEffect, useRef } from 'react';
import { chatData, ChatBubble, Option } from '../data/chatData';
import WeightLossChart from './WeightLossChart';

interface Variables {
    [key: string]: string | number;
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const getFutureDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return formatDate(date);
};

export default function ChatEngine() {
    const [messages, setMessages] = useState<ChatBubble[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [variables, setVariables] = useState<Variables>({});

    useEffect(() => {
        setVariables(prev => ({
            ...prev,
            'target_date': getFutureDate(30)
        }));
    }, []);
    const [userInput, setUserInput] = useState('');

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [messages, isTyping]);

    // Algorithm to calculate dynamic typing delay
    const calculateTypingDelay = (bubble: ChatBubble) => {
        // Special Exception for Images/Media/Charts
        if (bubble.type === 'image' || bubble.type === 'chart') {
            return 1500;
        }

        const text = bubble.content || '';
        const baseLatency = 500;
        const speedFactor = 20; // ms per char

        let delay = baseLatency + (text.length * speedFactor);

        // Patience Cap (Constraints)
        if (delay > 3500) delay = 3500;
        if (delay < 1000) delay = 1000;

        return delay;
    };

    useEffect(() => {
        if (currentIndex >= chatData.length) return;

        const currentBubble = chatData[currentIndex];
        const isUserInteractionReq = ['options', 'input-text', 'input-number', 'redirect'].includes(currentBubble.type);

        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.id === currentBubble.id && isUserInteractionReq) {
            return;
        }

        // Small "thinking" pause before typing starts (reading time)
        const readingDelay = 500;

        const typingDuration = calculateTypingDelay(currentBubble);

        const timer = setTimeout(() => {
            setIsTyping(true);

            setTimeout(() => {
                addMessage(currentBubble);
                setIsTyping(false);

                if (!isUserInteractionReq) {
                    setCurrentIndex((prev) => prev + 1);
                }
            }, typingDuration);
        }, readingDelay);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const replaceText = (text?: string) => {
        if (!text) return '';
        let res = text;
        Object.entries(variables).forEach(([key, val]) => {
            res = res.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
        });
        return res;
    };

    const addMessage = (bubble: ChatBubble) => {
        setMessages((prev) => {
            if (prev.find(m => m.id === bubble.id)) return prev; // Dedup
            return [...prev, bubble];
        });
    };

    const handleOptionClick = (option: Option, bubble: ChatBubble) => {
        // Add user response bubble
        const userMsg: ChatBubble = {
            id: Date.now(),
            type: 'text', // Render as text bubble
            content: option.label,
            // differentiate user messages in rendering
        };

        setMessages(prev => [...prev, { ...userMsg, isUser: true } as any]);

        if (bubble.variable) {
            let valueToSave = option.value;

            // Grammar adjustments for "motivo selecionado"
            if (bubble.variable === 'motivo selecionado') {
                switch (option.value) {
                    case 'Perder peso':
                        valueToSave = 'perder peso';
                        break;
                    case 'Ganar masa muscular':
                        valueToSave = 'ganar masa muscular';
                        break;
                    case 'Mejorar mi salud y energía':
                        valueToSave = 'mejorar tu salud y energía';
                        break;
                    case 'Todos':
                        valueToSave = 'transformar tu cuerpo por completo';
                        break;
                }
            }

            setVariables(prev => ({ ...prev, [bubble.variable!]: valueToSave }));
        }

        setCurrentIndex(prev => prev + 1);
    };

    const handleInputSubmit = (e: React.FormEvent, bubble: ChatBubble) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        if (bubble.type === 'input-number' && isNaN(Number(userInput))) {
            alert('Por favor ingresa un número válido');
            return;
        }

        setMessages(prev => [...prev, { id: Date.now(), type: 'text', content: userInput, isUser: true } as any]);

        if (bubble.variable) {
            setVariables(prev => ({ ...prev, [bubble.variable!]: userInput }));
        }

        setUserInput('');
        setCurrentIndex(prev => prev + 1);
    };

    return (
        <div className="flex flex-col min-h-screen bg-void-black max-w-2xl mx-auto shadow-2xl overflow-hidden font-inter">
            <header className="bg-carbon-charcoal p-4 sticky top-0 z-10 border-b border-gray-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-elite-gold">
                    <img src="https://i.postimg.cc/j5JNhYQD/square-image-1.webp" alt="Bot Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="text-ice-white font-montserrat font-bold text-lg">Javier Martinez</h1>
                    <p className="text-xs text-elite-gold flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                        En línea
                    </p>
                </div>
            </header>

            <div className="flex-1 p-4 overflow-y-auto pb-32 space-y-4">
                {messages.map((msg: any) => {
                    if (msg.isUser) {
                        return (
                            <div key={msg.id} className="chat-bubble-user text-right animate-fade-in">
                                {msg.content}
                            </div>
                        );
                    }

                    const processedContent = replaceText(msg.content);

                    return (
                        <div key={msg.id} className="animate-fade-in-up mb-4">
                            {/* Avatar + Content Group */}
                            {msg.type !== 'redirect' && (
                                <div className="flex gap-2 items-end">
                                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-elite-gold/30">
                                        <img src="https://i.postimg.cc/j5JNhYQD/square-image-1.webp" alt="Avatar" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 max-w-[85%]">
                                        {/* System Bubble Content */}
                                        {(msg.type === 'text' || msg.type === 'options' || msg.type.startsWith('input')) && (
                                            <div className="chat-bubble-system !mb-0 !max-w-full">
                                                {processedContent && <p className="leading-relaxed whitespace-pre-line">{processedContent}</p>}
                                            </div>
                                        )}

                                        {msg.type === 'image' && (
                                            <div className="max-w-[100%] rounded-2xl overflow-hidden border border-gray-800">
                                                <img src={msg.content} alt="Media" className="w-full h-auto" />
                                            </div>
                                        )}

                                        {msg.type === 'chart' && (
                                            <div className="max-w-[95%] animate-fade-in-up">
                                                <WeightLossChart
                                                    currentWeight={Number(variables['current_weight']) || 80}
                                                    targetWeight={Number(variables['peso desejado']) || 70}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Interaction Types (Render below bubble if it's the LAST one) */}
                            {msg.id === chatData[currentIndex]?.id && currentIndex === chatData.indexOf(chatData.find(c => c.id === msg.id)!) && (
                                <div className={`mt-4 space-y-2 ${msg.type !== 'redirect' ? 'ml-10' : ''}`}>
                                    {msg.type === 'options' && (
                                        <div className="flex flex-col gap-2">
                                            {msg.options?.map((opt: Option) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => handleOptionClick(opt, msg)}
                                                    className="bg-carbon-charcoal border border-elite-gold/50 text-white p-3 rounded-xl hover:bg-elite-gold hover:text-void-black transition-all duration-300 font-medium text-left gold-glow-hover"
                                                    style={{ boxShadow: '0 0 10px rgba(212, 175, 55, 0.1)' }}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {(msg.type === 'input-text' || msg.type === 'input-number') && (
                                        <form onSubmit={(e) => handleInputSubmit(e, msg)} className="flex gap-2 w-full">
                                            <input
                                                type={msg.type === 'input-number' ? 'number' : 'text'}
                                                value={userInput}
                                                onChange={(e) => setUserInput(e.target.value)}
                                                placeholder={msg.placeholder || 'Escribe aquí...'}
                                                className="flex-1 min-w-0 bg-carbon-charcoal text-white p-3 rounded-xl border border-gray-700 focus:border-elite-gold focus:outline-none focus:ring-1 focus:ring-elite-gold transition-all"
                                                autoFocus
                                            />
                                            <button
                                                type="submit"
                                                className="bg-elite-gold text-void-black p-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors gold-glow shrink-0"
                                            >
                                                Enviar
                                            </button>
                                        </form>
                                    )}

                                    {msg.type === 'redirect' && (
                                        <a
                                            href={msg.redirectUrl}
                                            className="block w-full text-center bg-elite-gold text-void-black font-montserrat font-bold text-xl p-5 rounded-xl animate-pulse gold-glow transform hover:scale-105 transition-transform"
                                        >
                                            {processedContent || 'Click Here'}
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {isTyping && (
                    <div className="flex gap-2 items-end mb-4">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-elite-gold/30">
                            <img src="https://i.postimg.cc/j5JNhYQD/square-image-1.webp" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="chat-bubble-system w-16 !mb-0">
                            <div className="flex gap-1 justify-center">
                                <div className="typing-dot" style={{ animationDelay: '0ms' }}></div>
                                <div className="typing-dot" style={{ animationDelay: '150ms' }}></div>
                                <div className="typing-dot" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
