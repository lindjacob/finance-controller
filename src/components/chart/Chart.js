import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, linearGradient } from 'recharts';

function Chart({ initialInvestment, budgets, budgetType, income, headline, description }) {
    const [chartData, setChartData] = useState([]);
    const [years, setYears] = useState(50);
    const interestRate = 7;

    function calculateFutureValue(P, r, n, t, PMT) {
        // P is the initial principal balance
        // r is the annual interest rate
        // n is the number of times that interest is compounded per unit 
        // t is the time the money is invested for in years
        // PMT is the monthly contribution

        r = r / 100;
        const compoundInterest = P * Math.pow(1 + r / n, n * t);
        const futureValueSeries = PMT * (Math.pow(1 + r / n, n * t) - 1) / (r / n);
        const futureValue = compoundInterest + futureValueSeries;

        return futureValue;
    }

    useEffect(() => {
        const generateChartData = () => {
            const currentDate = new Date();
            let data = [];

            for (let i = 0; i <= years; i++) {
                // When years >= 30, only push data every 5 years
                // This ensures the numbers along the x-axis are showing
                if (years >= 30 && i % 5 !== 0) continue;

                const yearData = { date: currentDate.getFullYear() + i };

                if (budgetType === 'investment') {
                    yearData.investment = calculateFutureValue(initialInvestment, interestRate, 12, i, budgets.investment * income);
                } else if (budgetType === 'savings') {
                    yearData.savings = budgets.savings * income * 12 * i;
                }

                data.push(yearData);
            }

            return data;
        }

        setChartData(generateChartData());

    }, [budgets, income, budgetType, initialInvestment, years]);

    function CustomToolTip({ active, payload, label }) {
        if (active) {
            return (
                <div className='container'>
                    <h4>{label}</h4>
                    <p>${new Intl.NumberFormat().format(payload[0].value.toFixed(0))}</p>
                </div>
            )
        }
    }

    return (
        <div className='container'>
            <div className='headerElement'>
                <div className='w-1/2'>
                    <div className='headline'>{headline}</div>
                    <div className='description'>{description}</div>
                </div>
                <div className='flex justify-end w-1/2'>
                    <div className={`btn-sq ${years === 10 ? 'btn-focus' : ''}`} onClick={() => setYears(10)}>10y</div>
                    <div className={`btn-sq ${years === 20 ? 'btn-focus' : ''}`} onClick={() => setYears(20)}>20y</div>
                    <div className={`btn-sq ${years === 30 ? 'btn-focus' : ''}`} onClick={() => setYears(30)}>30y</div>
                    <div className={`btn-sq ${years === 50 ? 'btn-focus' : ''}`} onClick={() => setYears(50)}>50y</div>
                </div>
            </div>

            <ResponsiveContainer height={400}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id='colorInvestment' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor='#10b981' stopOpacity='0.7' />
                            <stop offset='75%' stopColor='#10b981' stopOpacity='0.15' />
                        </linearGradient>
                        <linearGradient id='colorSavings' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor='#06b6d4' stopOpacity='0.7' />
                            <stop offset='75%' stopColor='#06b6d4' stopOpacity='0.15' />
                        </linearGradient>
                    </defs>
                    {budgetType === 'investment' && <Area dataKey='investment' stroke='#10b981' fill='url(#colorInvestment)' />}
                    {budgetType === 'savings' && <Area dataKey='savings' stroke='#06b6d4' fill='url(#colorSavings)' />}
                    <XAxis dataKey='date' axisLine={false} tickLine={false} tickFormatter={str => {
                        const currentYear = new Date().getFullYear();
                        if (str === currentYear) {
                            return str;
                        }
                        if (years === 10) {
                            if (str === currentYear + 2 ||
                                str === currentYear + 4 ||
                                str === currentYear + 6 ||
                                str === currentYear + 8 ||
                                str === currentYear + 10) {
                                return str;
                            }
                        } else if (years === 20) {
                            if (str === currentYear + 5 ||
                                str === currentYear + 10 ||
                                str === currentYear + 15 ||
                                str === currentYear + 20) {
                                return str;
                            }
                        } else if (years === 30) {
                            if (str === currentYear + 5 ||
                                str === currentYear + 10 ||
                                str === currentYear + 15 ||
                                str === currentYear + 20 ||
                                str === currentYear + 25 ||
                                str === currentYear + 30) {
                                return str;
                            }
                        } else {
                            if (str === currentYear + 10 ||
                                str === currentYear + 20 ||
                                str === currentYear + 30 ||
                                str === currentYear + 40 ||
                                str === currentYear + 50) {
                                return str;
                            }
                        }
                        return '';
                    }} />
                    <YAxis axisLine={false} tickLine={false} tickCount={8} tickFormatter={number => {
                        if (number >= 1000000) {
                            const formattedNumber = (number / 1000000).toFixed(1);
                            return `${formattedNumber.endsWith('.0') ? formattedNumber.slice(0, -2) : formattedNumber}M`;
                        } else if (number >= 1000) {
                            const formattedNumber = (number / 1000).toFixed(1);
                            return `${formattedNumber.endsWith('.0') ? formattedNumber.slice(0, -2) : formattedNumber}K`;
                        }
                        return number.toString();
                    }} />
                    <Tooltip content={<CustomToolTip />} />
                    <CartesianGrid opacity={0.2} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;