import type { Meta, StoryObj } from '@storybook/react';
import { TimelineView } from './TimelineView';
import { ViewMode, TimelineRow, TimelineTask } from '../../types/timeline.types';

// --- Sample Data ---
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
const threeDays = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

const mockRows: TimelineRow[] = [
  { id: 'r1', label: 'Team Alpha (UX)', tasks: ['t1', 't3'] },
  { id: 'r2', label: 'Team Beta (FE)', tasks: ['t2', 't4'] },
  { id: 'r3', label: 'Team Gamma (BE)', tasks: ['t5'] },
];
const mockTasks: Record<string, TimelineTask> = {
  t1: {
    id: 't1',
    title: 'Design Review Phase',
    rowId: 'r1',
    progress: 80,
    startDate: today,
    endDate: threeDays,
    dependencies: ['t2'],
  },
  t2: {
    id: 't2',
    title: 'Implement Frontend Core',
    rowId: 'r2',
    progress: 40,
    startDate: threeDays,
    endDate: nextWeek,
    dependencies: [],
  },
  t3: {
    id: 't3',
    title: 'UX Final Signoff',
    rowId: 'r1',
    progress: 100,
    startDate: nextWeek,
    endDate: nextWeek,
    isMilestone: true,
    dependencies: [],
  },
  t4: {
    id: 't4',
    title: 'Integrate API Endpoints',
    rowId: 'r2',
    progress: 10,
    startDate: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000),
    endDate: nextMonth,
    dependencies: ['t3'],
  },
  t5: {
    id: 't5',
    title: 'Setup Database Schema',
    rowId: 'r3',
    progress: 90,
    startDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
    endDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
    dependencies: [],
  },
};

const generateLargeDataset = () => {
  // 70 rows, each with 4 tasks for demo
  const rows: TimelineRow[] = [];
  const tasks: Record<string, TimelineTask> = {};
  for (let i = 0; i < 70; i++) {
    rows.push({ id: `r${i}`, label: `Resource ${i + 1}`, tasks: [] });
    for (let j = 0; j < 4; j++) {
      const tId = `lt${i * 4 + j}`;
      rows[i].tasks.push(tId);
      tasks[tId] = {
        id: tId,
        title: `Task #${i}-${j}`,
        rowId: `r${i}`,
        progress: Math.round(Math.random() * 100),
        startDate: new Date(today.getTime() + (j * 2 + i) * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + ((j * 2) + i + 2) * 24 * 60 * 60 * 1000),
        dependencies: j > 0 ? [`lt${i * 4 + (j - 1)}`] : [],
      };
    }
  }
  return { rows, tasks };
};

const meta: Meta<typeof TimelineView> = {
  title: 'Timeline/TimelineView',
  component: TimelineView,
  tags: ['autodocs'],
  args: {
    rows: mockRows,
    tasks: mockTasks,
    startDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(nextMonth.getTime() + 7 * 24 * 60 * 60 * 1000),
    viewMode: 'week',
    onTaskUpdate: (taskId, updates) => console.log('Task Updated:', taskId, updates),
    onTaskMove: (taskId, newRowId, newStartDate) =>
      console.log('Task Moved:', taskId, newRowId, newStartDate),
  },
};

export default meta;
type Story = StoryObj<typeof TimelineView>;

// --- Required Stories ---

export const Default: Story = { args: { viewMode: 'week' } };

export const EmptyState: Story = {
  args: { rows: [], tasks: {} },
};

export const WithDependencies: Story = {
  args: {
    viewMode: 'week',
    rows: mockRows,
    tasks: mockTasks,
  },
};

export const DayView: Story = {
  args: {
    viewMode: 'day',
    startDate: today,
    endDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000),
  },
};

export const MonthView: Story = {
  args: {
    viewMode: 'month',
    startDate: today,
    endDate: new Date(today.getFullYear(), today.getMonth() + 6, 1),
  },
};

export const LargeDataset: Story = {
  args: {
    ...generateLargeDataset(),
    startDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(nextMonth.getTime() + 14 * 24 * 60 * 60 * 1000),
    viewMode: 'week',
  },
};

export const InteractiveDemo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Try dragging, resizing, and interacting with tasks. Updates are logged in the browser console.",
      },
    },
  },
  args: {
    viewMode: 'week',
    rows: mockRows,
    tasks: mockTasks,
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
  args: {
    viewMode: 'day',
    rows: mockRows,
    tasks: mockTasks,
  },
};

export const Accessibility: Story = {
  parameters: {
    a11y: { disable: false },
  },
  args: {
    rows: [mockRows[0]],
    tasks: { t1: mockTasks.t1 },
  },
};
