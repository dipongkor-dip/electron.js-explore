import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const overviewData = [
  { time: '9:45', cpu: 18, memory: 33 },
  { time: '9:50', cpu: 23, memory: 34 },
  { time: '9:55', cpu: 19, memory: 34 },
  { time: '10:00', cpu: 31, memory: 35 },
  { time: '10:05', cpu: 25, memory: 35 },
  { time: '10:10', cpu: 28, memory: 34 },
  { time: '10:15', cpu: 21, memory: 36 },
  { time: '10:20', cpu: 34, memory: 36 },
  { time: '10:25', cpu: 27, memory: 37 },
  { time: '10:30', cpu: 22, memory: 36 },
  { time: '10:35', cpu: 29, memory: 37 },
  { time: '10:40', cpu: 24, memory: 37 },
];

const performanceData = [
  { time: '9:42', cpu: 16, memory: 34 },
  { time: '9:47', cpu: 22, memory: 34 },
  { time: '9:52', cpu: 18, memory: 35 },
  { time: '9:57', cpu: 36, memory: 35 },
  { time: '10:02', cpu: 29, memory: 36 },
  { time: '10:07', cpu: 24, memory: 35 },
  { time: '10:12', cpu: 42, memory: 36 },
  { time: '10:17', cpu: 31, memory: 37 },
  { time: '10:22', cpu: 25, memory: 36 },
  { time: '10:27', cpu: 37, memory: 37 },
  { time: '10:32', cpu: 28, memory: 38 },
  { time: '10:37', cpu: 34, memory: 37 },
  { time: '10:42', cpu: 24, memory: 37 },
];

const UsageChart = ({ variant }: { variant: 'overview' | 'performance' }) => {
  const data = variant === 'overview' ? overviewData : performanceData;

  return (
    <div className={`usage-chart ${variant}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 9, left: -22, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#edf1ed"
            strokeDasharray="3 5"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ba49c', fontSize: 9 }}
            tickMargin={11}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ba49c', fontSize: 9 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              border: '1px solid #e5eae5',
              borderRadius: 6,
              fontSize: 10,
            }}
            labelStyle={{ color: '#657168', marginBottom: 5 }}
          />
          <Line
            type="monotone"
            dataKey="cpu"
            name="CPU"
            stroke="#278e66"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: '#278e66',
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
          <Line
            type="monotone"
            dataKey="memory"
            name="Memory"
            stroke="#74a6d8"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: '#74a6d8',
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;
