import React from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts';
const EariningChart = ({data}) => {
    const CustomTooltip = (active,payload,label)=>{
        if(active&&payload&&payload.length){
            return(
                <div className='glass-panel px-4 py-2 rounded-xl border border-white/10'>
                    <p className='text-text-muted text-xs font-mono uppercase'>{label}</p>
                    <p className='text-text-primary text-sm font-semibold mt-1'>
                        {payload[0].value.toLocaleString()}
                    </p>
                </div>
            )

        }
        return null;
    }
  return (
    <section className='glass-panel rounded-2xl p-6 space-x-4'>
        <h3 className='text-sm font-mono uppercase tracking-wider text-text-primary'>Earning Overview</h3>
        <div className='w-full h-64'>
            <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={data} margin={{top:10,right:10,left:-20,bottom:0}}>
                    <defs>
                        <linearGradient id='earningsGradient' x1='0' y1='0' x2='0' y2='0'>
                            <stop offset='5%' stopColor='#3B82F6' stopOpacity={0.4}/>
                            <stop offset='95%' stopColor='#3B82F6' stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray='3 3'
                    stroke='rgba(255,255,255,0.05)'
                    vertical={false}
                    />
                    <XAxis
                    dataKey='month'
                    stroke='rgba(255,255,255,0.4'
                    tick={{fill:'rgba(255,255,255,0.04)', fontSize:12}}
                    axisLine = {false}
                    tickLine = {false} 
                    />
                    <YAxis
                    dataKey='month'
                    stroke='rgba(255,255,255,0.4'
                    tick={{fill:'rgba(255,255,255,0.04)', fontSize:12}}
                    axisLine = {false}
                    tickLine = {false} 
                    />
                    <Tooltip content={<CustomTooltip/>}/>
                    <Area type='monotone' dataKey='earnings' stroke='#3b82f6' strokeWidth={2} fill='url(#earningsGradient)'/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </section>
  )
}

export default EariningChart