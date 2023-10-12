import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Chart.css'

function Chart({initialInvestment}) {
    const [endDate, setEndDate] = useState(new Date());
    const [chartData, setChartData] = useState([]);

    const interestRate = 0.07;

    useEffect(() => {
        const monthsBetweenDates = (startDate, endDate) => {
            let months;
            months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
            months -= startDate.getMonth();
            months += endDate.getMonth();
            return months <= 0 ? 0 : months;
        };

        const generateChartData = () => {
            const months = monthsBetweenDates(new Date(), endDate);
            let data = [];
            let amount = initialInvestment;

            for (let i = 0; i <= months; i++) {
                const currentDate = new Date();
                currentDate.setMonth(currentDate.getMonth() + i);

                data.push({
                    time: `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
                    investment: amount
                });

                // Compound Interest Calculation for monthly compounding
                amount += amount * (interestRate / 12);
            }

            return data;
        }

        setChartData(generateChartData());

    }, [endDate, initialInvestment]);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <div>
                <label>Select End Date: </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="MM-yyyy"
                    showMonthYearPicker
                />
            </div>

            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="investment" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;