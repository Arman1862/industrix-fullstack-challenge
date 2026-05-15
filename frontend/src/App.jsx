import { useState } from 'react';
import { 
  Layout, 
  Menu, 
  Typography, 
  Button, 
  Space, 
  Input, 
  ConfigProvider, 
  Divider,
  Tag,
  Row,
  Col,
  Card,
  Statistic
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  CheckCircleOutlined, 
  UnorderedListOutlined,
  TagOutlined,
  DashboardOutlined,
  GithubOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { TodoProvider } from './context/TodoProvider';
import { useTodo } from './context/TodoContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import CategoryManager from './components/CategoryManager';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const MainLayout = () => {
  const { categories, pagination, stats, fetchTodos, setFilters, filters } = useTodo();
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleOpenAddModal = () => {
    setTodoToEdit(null);
    setIsTodoModalOpen(true);
  };

  const handleOpenEditModal = (todo) => {
    setTodoToEdit(todo);
    setIsTodoModalOpen(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    fetchTodos(1, newFilters);
  };

  const handleCategoryFilter = (categoryId) => {
    if (categoryId === 'manage-categories') {
        setIsCategoryModalOpen(true);
        return;
    }
    const newFilters = { ...filters, categoryId: categoryId === 'all' ? null : categoryId };
    setFilters(newFilters);
    fetchTodos(1, newFilters);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
          zIndex: 10
        }}
      >
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
          <DashboardOutlined style={{ fontSize: 24, color: '#1677ff', marginRight: collapsed ? 0 : 8 }} />
          {!collapsed && <Title level={4} style={{ margin: 0 }}>Industrix</Title>}
        </div>
        
        <Menu
          mode="inline"
          defaultSelectedKeys={['all']}
          onSelect={({ key }) => handleCategoryFilter(key)}
          items={[
            {
              key: 'all',
              icon: <DashboardOutlined />,
              label: 'Semua Tugas',
            },
            {
              type: 'divider',
            },
            {
              key: 'manage-categories',
              icon: <SettingOutlined />,
              label: 'Kelola Kategori',
            },
            {
              type: 'divider',
            },
            ...categories.map(cat => ({
              key: cat.id.toString(),
              icon: <TagOutlined style={{ color: cat.color }} />,
              label: cat.name,
            }))
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          zIndex: 9
        }}>
          <Space size="middle" style={{ flex: 1 }}>
            <Input 
              placeholder="Cari tugas..." 
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} 
              onChange={handleSearch}
              style={{ width: 300, borderRadius: 8 }}
              allowClear
            />
          </Space>
          <Space>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleOpenAddModal}
              style={{ borderRadius: 8, height: 40, fontWeight: 600 }}
            >
              Tugas Baru
            </Button>
            <Divider type="vertical" />
            <Button shape="circle" icon={<GithubOutlined />} href="https://github.com" target="_blank" />
          </Space>
        </Header>

        <Content style={{ padding: '24px', overflow: 'initial' }}>
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={2} style={{ margin: 0 }}>Daftar Tugas</Title>
                <Text type="secondary">Kelola produktivitas harian Anda dengan mudah</Text>
              </div>
              <Space>
                <Tag color="blue" icon={<CheckCircleOutlined />}>Full Stack Challenge</Tag>
              </Space>
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col xs={24} sm={8}>
                <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <Statistic 
                    title="Total Tugas" 
                    value={pagination.total} 
                    prefix={<UnorderedListOutlined style={{ color: '#1677ff' }} />} 
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <Statistic 
                    title="Selesai" 
                    value={stats.totalCompleted} 
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<CheckCircleOutlined />} 
                    suffix={`/ ${pagination.total}`}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <Statistic 
                    title="Kategori" 
                    value={categories.length} 
                    prefix={<TagOutlined style={{ color: '#722ed1' }} />} 
                  />
                </Card>
              </Col>
            </Row>

            <TodoList onEdit={handleOpenEditModal} />
          </div>
        </Content>

        <TodoForm 
          open={isTodoModalOpen} 
          onCancel={() => setIsTodoModalOpen(false)} 
          todoToEdit={todoToEdit}
        />
        <CategoryManager 
          open={isCategoryModalOpen} 
          onCancel={() => setIsCategoryModalOpen(false)} 
        />
      </Layout>
    </Layout>
  );
};

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        components: {
          Layout: {
            headerBg: '#ffffff',
          },
        },
      }}
    >
      <TodoProvider>
        <MainLayout />
      </TodoProvider>
    </ConfigProvider>
  );
}

export default App;
