'use client';

import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    ReferenceDot,
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip
} from 'recharts';

interface WeightLossChartProps {
    currentWeight: number;
    targetWeight: number;
}

export default function WeightLossChart({ currentWeight, targetWeight }: WeightLossChartProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const data = [
        { name: 'Ahora', weight: currentWeight },
        { name: 'Meta', weight: targetWeight },
    ];

    // Calculate generic intermediate points for a smooth curve effect if needed, 
    // but Recharts 'monotone' or 'natural' interpolation handles 2 points as a straight line or S-curve depending on config.
    // To get a nice curve with 2 points we might need 3 points or just let it simple.
    // Actually, for a "drawing" animation of a curve, 2 points is just a line.
    // Let's add a fake middle point slightly lower to give it a curve if desired, 
    // or just straight strict progress?
    // Let's stick to 2 points for accuracy, but maybe 'monotone' curve.

    // Custom Dot component for the specialized glows
    const CustomDot = (props: any) => {
        const { cx, cy, index } = props;
        if (index === 0) { // Start - Red
            return (
                <svg x={cx - 10} y={cy - 10} width={20} height={20}>
                    <circle cx="10" cy="10" r="6" fill="#EF4444" stroke="none">
                        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="10" cy="10" r="4" fill="white" />
                </svg>
            );
        }
        if (index === 1) { // End - Green
            return (
                <svg x={cx - 10} y={cy - 10} width={20} height={20}>
                    <circle cx="10" cy="10" r="6" fill="#10B981" stroke="none">
                        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="10" cy="10" r="4" fill="white" />
                </svg>
            );
        }
        return null;
    };

    if (!mounted) return null;

    return (
        <div className="w-full h-64 bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="flex justify-between mb-4 text-sm font-montserrat font-bold">
                <span className="text-red-500">Actual: {currentWeight}kg</span>
                <span className="text-green-500">Meta: {targetWeight}kg</span>
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#EF4444" />
                            <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#4B5563', fontSize: 12 }}
                    />
                    <YAxis domain={['auto', 'auto']} hide />
                    <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3" opacity={0.5} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#1F2937' }}
                        cursor={{ stroke: '#D4AF37', strokeWidth: 1 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="weight"
                        stroke="url(#strokeGradient)"
                        strokeWidth={4}
                        fill="url(#colorWeight)"
                        animationDuration={2000}
                        activeDot={{ r: 6, fill: '#D4AF37' }}
                        dot={<CustomDot />}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
