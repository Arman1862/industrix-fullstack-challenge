import { 
  Table, 
  Tag, 
  Space, 
  Button, 
  Tooltip, 
  Popconfirm, 
  Typography, 
  Empty, 
  Checkbox,
  Card
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  CalendarOutlined,
  FlagOutlined
} from '@ant-design/icons';
import { useTodo } from '../context/TodoContext';
import dayjs from 'dayjs';

const { Text } = Typography;

const TodoList = ({ onEdit }) => {
  const { 
    todos, 
    loading, 
    pagination, 
    fetchTodos, 
    toggleTodoComplete, 
    deleteTodo
  } = useTodo();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const columns = [
    {
      title: '',
      dataIndex: 'completed',
      key: 'completed',
      width: 50,
      render: (completed, record) => (
        <Checkbox 
          checked={completed} 
          onChange={() => toggleTodoComplete(record.id)} 
        />
      )
    },
    {
      title: 'Tugas',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text delete={record.completed} strong style={{ fontSize: 16 }}>
            {text}
          </Text>
          {record.description && (
            <Text type="secondary" size="small" style={{ fontSize: 13 }}>
              {record.description}
            </Text>
          )}
        </Space>
      )
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category) => (
        category ? (
          <Tag color={category.color || 'blue'} style={{ borderRadius: 4 }}>
            {category.name}
          </Tag>
        ) : <Text type="secondary">-</Text>
      )
    },
    {
      title: 'Prioritas',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      render: (priority) => (
        <Tag icon={<FlagOutlined />} color={getPriorityColor(priority)}>
          {priority.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Tenggat',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 150,
      render: (date) => (
        date ? (
          <Space size={4}>
            <CalendarOutlined style={{ color: '#8c8c8c' }} />
            <Text type="secondary">{dayjs(date).format('DD MMM YYYY')}</Text>
          </Space>
        ) : <Text type="secondary">-</Text>
      )
    },
    {
      title: 'Aksi',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onEdit(record)} 
            />
          </Tooltip>
          <Popconfirm
            title="Hapus tugas?"
            description="Tindakan ini tidak bisa dibatalkan."
            onConfirm={() => deleteTodo(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      bodyStyle={{ padding: 0 }} 
      style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      <Table 
        columns={columns} 
        dataSource={todos} 
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          onChange: (page) => fetchTodos(page),
          showSizeChanger: false,
          position: ['bottomCenter'],
          style: { padding: '16px 0' }
        }}
        locale={{
          emptyText: <Empty description="Belum ada tugas. Mulai hari Anda dengan membuat tugas baru!" />
        }}
      />
    </Card>
  );
};

export default TodoList;
