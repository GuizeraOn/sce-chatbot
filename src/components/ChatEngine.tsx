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

// SVG Icons
const Icons = {
    BackArrow: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M15 18l-6-6 6-6" />
        </svg>
    ),
    Phone: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
    Video: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
    ),
    Camera: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-elite-gold">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" fill="none" stroke="black" strokeWidth="2" />
        </svg>
    ),
    Mic: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
    ),
    Image: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
        </svg>
    ),
    Sticker: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
};

export default function ChatEngine() {
    const [messages, setMessages] = useState<ChatBubble[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [variables, setVariables] = useState<Variables>({});
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        setVariables(prev => ({
            ...prev,
            'target_date': getFutureDate(30)
        }));
    }, []);

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [messages, isTyping]);

    // Reset focused state when moving to a new step
    useEffect(() => {
        setIsInputFocused(false);
    }, [currentIndex]);

    // Algorithm to calculate dynamic typing delay
    const calculateTypingDelay = (bubble: ChatBubble, index: number) => {
        if (bubble.type === 'image' || bubble.type === 'chart') {
            return 1500;
        }

        const text = bubble.content || '';
        // Faster speed for initial messages
        const isInitial = index < 4;

        const baseLatency = isInitial ? 200 : 500;
        const speedFactor = isInitial ? 10 : 20; // ms per char

        let delay = baseLatency + (text.length * speedFactor);

        // Stricter caps for initial messages
        const maxDelay = isInitial ? 1500 : 3500;

        if (delay > maxDelay) delay = maxDelay;
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

        // Fast reading delay for first 4 messages, normal for others
        const readingDelay = currentIndex < 4 ? 100 : 500;
        const typingDuration = calculateTypingDelay(currentBubble, currentIndex);

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
            if (prev.find(m => m.id === bubble.id)) return prev;
            return [...prev, bubble];
        });
    };

    const handleOptionClick = (option: Option, bubble: ChatBubble) => {
        const userMsg: ChatBubble = {
            id: Date.now(),
            type: 'text',
            content: option.label,
        };

        setMessages(prev => [...prev, { ...userMsg, isUser: true } as any]);

        if (bubble.variable) {
            let valueToSave = option.value;
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

    // Derived state for the input spotlight
    const isInputStep = ['input-text', 'input-number'].includes(chatData[currentIndex]?.type);
    const showSpotlight = isInputStep && !isTyping && !isInputFocused;

    return (
        <div className="flex flex-col h-screen bg-black mx-auto max-w-md shadow-2xl overflow-hidden font-inter relative">
            {/* Header - Fixed Top */}
            <header className="bg-black p-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-3" suppressHydrationWarning>
                    <button className="p-1">
                        <Icons.BackArrow />
                    </button>
                    <div className="flex items-center gap-3" suppressHydrationWarning>
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-800">
                            <img src="https://i.postimg.cc/j5JNhYQD/square-image-1.webp" alt="Bot Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-[15px] font-semibold leading-tight">Javier Martinez</h1>
                            <span className="text-xs text-gray-400">Activo ahora</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-5 mr-1">
                    <Icons.Phone />
                    <Icons.Video />
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-black scrollbar-hide">
                {messages.map((msg: any, index: number) => {
                    const isLastMessage = index === messages.length - 1;

                    if (msg.isUser) {
                        return (
                            <div key={msg.id} className="flex flex-col items-end animate-fade-in group">
                                <div className="chat-bubble-user text-[15px] leading-snug shadow-sm">
                                    {msg.content}
                                </div>
                                {isLastMessage && (
                                    <span className="text-[10px] text-gray-400 mr-2 mt-1">Visto</span>
                                )}
                            </div>
                        );
                    }

                    const processedContent = replaceText(msg.content);

                    return (
                        <div key={msg.id} className="animate-fade-in-up mb-2">
                            {/* Avatar + Content Group */}
                            {msg.type !== 'redirect' && (
                                <div className="flex flex-row items-end gap-2">
                                    <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mb-1">
                                        <img src="https://i.postimg.cc/j5JNhYQD/square-image-1.webp" alt="Avatar" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex flex-col items-start max-w-[85%]">
                                        {/* System Bubble Content */}
                                        {(msg.type === 'text' || msg.type === 'options' || msg.type.startsWith('input')) && (
                                            <div className="chat-bubble-system !mb-1 text-[15px] leading-snug">
                                                {processedContent && <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: processedContent }}></p>}
                                            </div>
                                        )}

                                        {msg.type === 'image' && (
                                            <div className="rounded-2xl overflow-hidden border border-gray-800 mb-1">
                                                <img src={msg.content} alt="Media" className="w-full h-auto" />
                                            </div>
                                        )}

                                        {msg.type === 'chart' && (
                                            <div className="w-full animate-fade-in-up mb-1 p-2 bg-carbon-charcoal rounded-2xl">
                                                <WeightLossChart
                                                    currentWeight={Number(variables['current_weight']) || 80}
                                                    targetWeight={Number(variables['peso desejado']) || 70}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}


                            {/* Interaction Types */}
                            {msg.id === chatData[currentIndex]?.id && currentIndex === chatData.indexOf(chatData.find(c => c.id === msg.id)!) && (
                                <div className={`mt-2 ${!['redirect', 'options'].includes(msg.type) ? 'ml-9' : ''} space-y-2`}>
                                    {msg.type === 'options' && (
                                        <div className="flex flex-col gap-2 items-end">
                                            {msg.options?.map((opt: Option) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => handleOptionClick(opt, msg)}
                                                    className="bg-transparent border border-gray-600 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-200 text-sm font-medium text-right"
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Inputs are now handled in the main Footer Input for realism if possible, 
                                        but for specific prompts we render them here to preserve flow logic */}
                                    {(msg.type === 'input-text' || msg.type === 'input-number') && (
                                        <div className="text-xs text-gray-500 italic mb-2">
                                            Escribe abajo para responder...
                                        </div>
                                    )}

                                    {msg.type === 'redirect' && (
                                        <a
                                            href={msg.redirectUrl}
                                            className="block w-full text-center bg-elite-gold text-black font-semibold text-lg py-3 rounded-xl transform hover:scale-[1.02] transition-transform active:scale-95"
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
                    <div className="flex gap-2 items-end mb-4 ml-1">
                        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mb-1">
                            <img src="https://i.postimg.cc/j5JNhYQD/square-image-1.webp" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-carbon-charcoal px-4 py-3 rounded-3xl rounded-tl-sm">
                            <div className="flex gap-1">
                                <div className="typing-dot" style={{ animationDelay: '0ms' }}></div>
                                <div className="typing-dot" style={{ animationDelay: '150ms' }}></div>
                                <div className="typing-dot" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} className="pb-4" />
            </div>

            {/* Footer Input Area (IG Style) */}
            <div className="bg-black p-3 pb-6 flex items-center gap-3 sticky bottom-0 z-20" suppressHydrationWarning>
                <div className="p-2 bg-gray-900 rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
                    <Icons.Camera />
                </div>

                <div
                    className={`flex-1 bg-[#262626] rounded-full flex items-center px-4 py-3 gap-2 transition-all duration-300 ${showSpotlight ? 'input-spotlight' : 'border border-transparent'
                        }`}
                >
                    {/* If current step requires input, we bind this input to the logic, otherwise it's decorative or disabled */}
                    {['input-text', 'input-number'].includes(chatData[currentIndex]?.type) ? (
                        <form
                            onSubmit={(e) => handleInputSubmit(e, chatData[currentIndex])}
                            className="flex-1 flex items-center gap-2"
                        >
                            <input
                                type={chatData[currentIndex]?.type === 'input-number' ? 'number' : 'text'}
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onFocus={() => setIsInputFocused(true)}
                                placeholder={showSpotlight ? "👇 Escribe tu respuesta aquí..." : "Mensaje..."}
                                className="bg-transparent text-white text-[15px] w-full focus:outline-none placeholder-gray-400"
                                autoFocus
                            />
                            {userInput.trim().length > 0 && (
                                <button
                                    type="submit"
                                    className="text-elite-gold font-semibold text-sm hover:text-white transition-colors"
                                >
                                    Enviar
                                </button>
                            )}
                        </form>
                    ) : (
                        <input
                            type="text"
                            placeholder="Mensaje..."
                            className="bg-transparent text-white text-[15px] w-full focus:outline-none placeholder-gray-400"
                            disabled
                        />
                    )}

                    {!userInput && (
                        <div className="flex items-center gap-3 text-white" suppressHydrationWarning>
                            <Icons.Sticker />
                        </div>
                    )}
                </div>

                {!userInput && (
                    <div className="flex items-center gap-3" suppressHydrationWarning>
                        <Icons.Mic />
                        <Icons.Image />
                    </div>
                )}
            </div>
        </div>
    );
}
